import { initSocket } from "../../lib/socket";

export default async function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("Socket is initializing");
    initSocket(res.socket.server);
  }
  res.end();
}
