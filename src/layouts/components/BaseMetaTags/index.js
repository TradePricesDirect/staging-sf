import Head from "next/head";
import { META_DEFAULTS } from "core/config";
import { apiUrl } from "core/constants";
import Link from "next/link";

const BaseMetaTags = () => {
  return (
    <Head>
      <Link rel="preconnect" href={apiUrl} />

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>{META_DEFAULTS.title}</title>
      <meta name="description" content={META_DEFAULTS.description} />

      {/* Custom Font */}
      <Link rel="stylesheet" href="https://use.typekit.net/vlg3ild.css" />

      {/* Open Graph Tags */}
      <meta key="og:title" property="og:title" content={META_DEFAULTS.title} />
      <meta
        key="og:description"
        property="og:description"
        content={META_DEFAULTS.description}
      />
      <meta key="og:type" property="og:type" content={META_DEFAULTS.type} />
      <meta key="og:url" property="og:url" content={META_DEFAULTS.url} />
      <meta key="og:image" property="og:image" content={META_DEFAULTS.image} />

      {/* Favicons */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <Link rel="manifest" href="/favicons/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicons/safari-pinned-tab.svg"
        color="#03284c"
      />
      <Link rel="shortcut icon" href="/favicons/favicon.ico" />
      <meta name="msapplication-TileColor" content="#fc902b" />
      <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
};

export default BaseMetaTags;
