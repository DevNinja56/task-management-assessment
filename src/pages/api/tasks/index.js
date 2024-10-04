// src/pages/api/tasks/index.js
import Task from "../../../models/Task";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import sendNotification from "@/utils/sendNotifications";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const { user } = session;
  const isAdmin = user.role === "admin";

  switch (req.method) {
    case "GET":
      try {
        let tasks;
        if (isAdmin) {
          tasks = await Task.find().populate("assignedUsers", "name email");
        } else {
          tasks = await Task.find({ assignedUsers: user.id }).populate(
            "assignedUsers",
            "name email"
          );
        }
        res.status(200).json(tasks);
      } catch (error) {
        res.status(500).json({ message: "Error fetching tasks" });
      }
      break;

    case "POST":
      if (!isAdmin) return res.status(403).json({ message: "Forbidden" });

      try {
        const task = await Task.create({
          ...req.body,
          createdBy: user.id,
        });

        sendNotification(
          task._id,
          task.assignedUsers,
          `${user.name} created a new task`
        );

        sendNotification(task._id, [user.id], `You created a new task`);

        res.status(201).json(task);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating task" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
