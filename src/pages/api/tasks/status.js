// src/pages/api/tasks/status.js
import Task from "../../../models/Task";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { getIO } from "../../../lib/socket";
import sendNotification from "@/utils/sendNotifications";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const { taskId, status, priority } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (status) task.status = status;
    if (priority) task.priority = priority;

    await task.save();

    const message = status
      ? `Task status updated to ${status} by ${session.user.name}`
      : `Task priority updated to ${priority} by ${session.user.name}`;

    sendNotification(task._id, task.assignedUsers, message);

    sendNotification(task._id, [user.id], `You updated the task`);

    res.status(200).json({ message: "Task updated", task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
}
