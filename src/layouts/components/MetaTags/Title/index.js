import Head from "next/head";
import data from "../config.json";

const Title = ({ title }) => {
  return (
    <Head>
      <title>{`${title} - ${data.title}`}</title>
    </Head>
  );
};

export default Title;
