import { getIO } from "@/lib/socket";
import Notification from "@/models/Notification";

const sendNotification = async (taskId, userIds, message) => {
  try {
    // Make sure Socket.IO is initialized
    const io = getIO();

    // Create notifications in the database for all users in parallel
    await Promise.all(
      userIds.map(async (userId) => {
        // Create the notification in the database
        await Notification.create({
          user: userId,
          message,
          taskId,
        });

        // Emit the notification via socket.io to the user's specific room
        io.emit(`notification-${userId.toString()}`, { message, taskId });
      })
    );
  } catch (error) {
    console.error("Error sending notification", error);
  }
};

export default sendNotification;
