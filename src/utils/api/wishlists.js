import { PrismaClient } from "@prisma/client";
import _ from "lodash";
import gql from "graphql-tag";
import {
  baseProductFragment,
  productPricingFragment,
} from "@saleor/sdk/lib/fragments/products";
import { channelSlug } from "core/constants";
import { getSaleorApi } from "utils/ssr";

const prisma = new PrismaClient();

export const getWishlists = async (user_id) => {
  let wishlists = await prisma.wishlist.findMany({
    where: { user_id },
    include: { lines: true },
    orderBy: { updated_at: "desc" },
  });

  wishlists = await mergeProductData(wishlists);

  return wishlists;
};

export const getWishlist = async (id, user) => {
  let wishlist;

  // Staff Member
  if (user?.is_staff) {
    wishlist = await prisma.wishlist.findFirst({
      where: { id },
      include: { lines: true },
    });
  } else {
    wishlist = await prisma.wishlist.findFirst({
      where: {
        AND: { id },
        OR: [{ type: "PUBLIC" }, { user_id: user?.user_id }],
      },
      include: { lines: true },
    });
  }

  if (!wishlist) return null;

  [wishlist] = await mergeProductData([wishlist]);

  return wishlist;
};

export const createWishlist = async (data) => {
  return await prisma.wishlist.create({ data });
};

export const updateWishlist = async (id, data) => {
  return await prisma.wishlist.update({
    where: { id },
    data,
  });
};

export const deleteWishlist = async (id) => {
  return await prisma.wishlist.delete({ where: { id } });
};

export const addWishlistProduct = async (id, products) => {
  return await prisma.wishlistLine.createMany({
    data: products.map(({ product_id, variant_id }) => ({
      wishlist_id: id,
      product_id,
      variant_id,
    })),
  });
};

export const removeWishlistProduct = async (id, products) => {
  const product_ids = _.map(products, "product_id");
  const variant_ids = _.map(products, "variant_id");

  return await prisma.wishlistLine.deleteMany({
    where: {
      wishlist_id: id,
      product_id: { in: product_ids },
      variant_id: { in: variant_ids },
    },
  });
};

const mergeProductData = async (wishlists) => {
  const { apolloClient } = await getSaleorApi();

  // Get product ids
  const ids = wishlists.reduce((acc, curr) => {
    const ids = _.map(curr.lines, "product_id");
    return _.uniq([...acc, ...ids]);
  }, []);

  if (!ids.length) return wishlists;

  const { data } = await apolloClient.query({
    query: gql`
      ${baseProductFragment}
      ${productPricingFragment}
      query ProductsById($ids: [ID!], $channel: String!) {
        products(first: 100, filter: { ids: $ids }, channel: $channel) {
          edges {
            node {
              ...BaseProduct
              ...ProductPricingField
              collections {
                id
                slug
                name
              }
              variants {
                id
                pricing {
                  onSale
                  price {
                    gross {
                      currency
                      amount
                    }
                    net {
                      currency
                      amount
                    }
                  }
                }
                attributes {
                  attribute {
                    id
                    slug
                    name
                  }
                  values {
                    id
                    slug
                    name
                  }
                }
              }
              productType {
                id
                slug
              }
            }
          }
        }
      }
    `,
    variables: { ids, channel: channelSlug },
  });

  const products = data.products?.edges.map((e) => e.node) || [];

  return wishlists.map((wishlist) => ({
    ...wishlist,
    lines: wishlist.lines.map((line) => {
      const product = _.find(products, ["id", line.product_id]);
      const variant = _.find(product.variants, ["id", line.variant_id]);

      return {
        ...line,
        product: _.omit(product, ["variants"]),
        variant,
      };
    }),
  }));
};
