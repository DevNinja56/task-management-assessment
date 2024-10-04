// src/pages/api/tasks/[taskId].js
import Task from "../../../models/Task";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { getIO } from "../../../lib/socket";
import sendNotification from "@/utils/sendNotifications";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const { taskId } = req.query;
  const { user } = session;
  const isAdmin = user.role === "admin";

  switch (req.method) {
    case "GET":
      try {
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.status(200).json(task);
      } catch (error) {
        res.status(500).json({ message: "Error fetching task" });
      }
      break;

    case "PUT":
      if (!isAdmin) return res.status(403).json({ message: "Forbidden" });

      try {
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: "Task not found" });

        Object.assign(task, req.body);
        await task.save();

        sendNotification(
          task._id,
          task.assignedUsers,
          `${user.name} updated task`
        );

        sendNotification(task._id, [user.id], `You updated task`);

        res.status(200).json(task);
      } catch (error) {
        res.status(500).json({ message: "Error updating task" });
      }
      break;

    case "DELETE":
      try {
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: "Task not found" });

        if (!isAdmin && !task.assignedUsers.includes(user.id)) {
          return res.status(403).json({ message: "Forbidden" });
        }

        await Task.findByIdAndDelete(taskId);

        sendNotification(
          task._id,
          task.assignedUsers,
          `${user.name} deleted task`
        );

        sendNotification(task._id, [user.id], `You deleted task`);

        res.status(200).json({ message: "Task deleted" });
      } catch (error) {
        res.status(500).json({ message: "Error deleting task" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
