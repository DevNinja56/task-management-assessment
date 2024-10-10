import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import "@/app/globals.css";
import MainLayout from "@/layout";
import { store } from "@/store";
import { Provider } from "react-redux";
import ModalWrapper from "@/components/modal";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    // Ensure the Socket.IO server is initialized
    const initializeSocketServer = async () => {
      await fetch("/api/socket");
    };

    initializeSocketServer();
  }, []);
  const componentLayout = Component.layout;

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <MainLayout {...componentLayout}>
          <Component {...pageProps} />
        </MainLayout>
        <ModalWrapper />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
