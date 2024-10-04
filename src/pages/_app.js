import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    // Ensure the Socket.IO server is initialized
    const initializeSocketServer = async () => {
      await fetch("/api/socket");
    };

    initializeSocketServer();
  }, []);

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
