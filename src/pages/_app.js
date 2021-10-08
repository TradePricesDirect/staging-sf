import { ApolloProvider } from "@apollo/client";
import client from "lib/apollo-client";
import AppLayout from "layouts/App";
import ShopProvider from "contexts/ShopContext";
import OverlayProvider from "contexts/OverlayContext";
import NProgressBar from "components/atoms/NProgressBar";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "styles/global.scss";

// Default layout wrapper
const defaultLayout = (page) => <AppLayout>{page}</AppLayout>;

const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || defaultLayout;

  return (
    <ApolloProvider client={client}>
      <ShopProvider>
        <OverlayProvider>
          <NProgressBar />

          {getLayout(<Component {...pageProps} />)}
        </OverlayProvider>
      </ShopProvider>
    </ApolloProvider>
  );
};

export default App;
