import Error from "next/error";
import Bugsnag from "utils/bugsnag";

const ErrorPage = ({ statusCode }) => {
  return <Error statusCode={statusCode} />;
};

ErrorPage.getInitialProps = ({ res, err }) => {
  if (err) Bugsnag.notify(err);

  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default ErrorPage;
