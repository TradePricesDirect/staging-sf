import Head from "next/head";
import { META_DEFAULTS } from "core/config";

const MetaTags = ({ title, description, meta }) => {
  return (
    <Head>
      {title && (
        <>
          <title>{`${title} - ${META_DEFAULTS.title}`}</title>
          <meta
            key="og:title"
            property="og:title"
            content={`${title} - ${META_DEFAULTS.title}`}
          />
        </>
      )}

      {description && (
        <>
          <meta name="description" content={description} />
          <meta
            key="og:description"
            property="og:description"
            content={description}
          />
        </>
      )}

      {meta &&
        Object.entries(meta).map(([key, value]) => (
          <meta key={key} property={key} content={value} />
        ))}
    </Head>
  );
};

export default MetaTags;
