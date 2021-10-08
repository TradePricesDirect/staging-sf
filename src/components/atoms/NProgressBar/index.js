import Router from "next/router";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeError", NProgress.done);
Router.events.on("routeChangeComplete", NProgress.done);

const NProgressBar = () => null;

export default NProgressBar;
