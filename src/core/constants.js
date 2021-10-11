export const apiUrl = process.env.NEXT_PUBLIC_API_URI;

export const channelSlug = process.env.NEXT_PUBLIC_SALEOR_CHANNEL_SLUG;

export const ssrMode = typeof window === "undefined";

export const incrementalStaticRegenerationRevalidate = parseInt(
  process.env.INCREMENTAL_STATIC_REGENERATION_REVALIDATE,
  10
);

export const staticPathsFetchBatch = 100;

export const paymentGatewayNames = {
  dummy: "mirumee.payments.dummy",
  stripe: "saleor.payments.stripe",
};
