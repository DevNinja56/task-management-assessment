import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import "@/app/globals.css";
import MainLayout from "@/layout";

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
      <MainLayout {...componentLayout}>
        <Component {...pageProps} />
      </MainLayout>
    </SessionProvider>
  );
}

export default MyApp;
