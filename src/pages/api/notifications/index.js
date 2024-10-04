// pages/api/notifications/index.js
import { getSession } from "next-auth/react";
import Notification from "../../../models/Notification";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const { user } = session;

  try {
    const notifications = await Notification.find({ user: user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications" });
  }
}
