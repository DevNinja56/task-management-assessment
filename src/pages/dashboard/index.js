// src/components/Dashboard.js
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import io from "socket.io-client";
import BoardContainer from "@/components/pages/dashboard/boardContainer";

let socket;

function Dashboard() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedUsers: [],
    priority: "medium",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  // Initialize socket connection
  useEffect(() => {
    if (session) {
      // Ensure the socket connects to the right endpoint
      socket = io("/", {
        path: "/api/socketio", // Ensure this matches the path used in the server
      });

      socket.on("connect", () => {
        console.log("Connected to Socket.IO server");

        // Listen for task notifications
        socket.on(`notification-${session?.user?.id}`, (data) => {
          setNotifications((prevNotifications) => [...prevNotifications, data]);
          alert(data.message);
        });
      });

      socket.on("connect_error", (err) => {
        console.error("Connection failed:", err.message);
      });

      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    }
  }, [session]);

  // Fetch tasks, notifications, and set initial data
  useEffect(() => {
    if (session) {
      const fetchInitialData = async () => {
        try {
          const [taskRes, userRes, notificationRes] = await Promise.all([
            axios.get("/api/tasks"), // Fetch tasks
            isAdmin ? axios.get("/api/users") : Promise.resolve({ data: [] }), // Fetch users if admin
            axios.get("/api/notifications"), // Fetch existing notifications
          ]);

          setTasks(taskRes.data);
          setUsers(userRes.data.data || []); // Set users only if admin
          setNotifications(notificationRes.data);
          setIsAdmin(session.user.role === "admin");
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data", error);
          setLoading(false);
        }
      };

      fetchInitialData();
    }
  }, [session, isAdmin]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleUserChange = (e) => {
    const selectedUsers = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setNewTask((prevTask) => ({
      ...prevTask,
      assignedUsers: selectedUsers,
    }));
  };

  // Handle task creation
  const handleTaskCreate = async () => {
    if (!isAdmin) return;

    try {
      const res = await axios.post("/api/tasks", newTask, {
        withCredentials: true,
      });
      setTasks((prevTasks) => [...prevTasks, res.data]); // Update task list with the new task
      setNewTask({
        title: "",
        description: "",
        assignedUsers: [],
        priority: "medium",
      });
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  // Handle task status and priority update
  const handleTaskUpdate = async (taskId, updateData) => {
    try {
      await axios.post("/api/tasks/status", { taskId, ...updateData });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, ...updateData } : task
        )
      );
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  // Handle task delete
  const handleTaskDelete = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  // If loading, display loading message
  // if (loading) return <div>Loading...</div>;

  return (
    // <div>
    //   <h1>Dashboard</h1>

    //   {/* Notifications Section */}
    //   <div>
    //     <h2>Notifications</h2>
    //     <ul>
    //       {notifications.length === 0 ? (
    //         <li>No notifications</li>
    //       ) : (
    //         notifications.map((notification, index) => (
    //           <li key={index}>
    //             {notification.message} (Task ID: {notification.taskId})
    //           </li>
    //         ))
    //       )}
    //     </ul>
    //   </div>

    //   {/* Task Creation Form (Admin Only) */}
    //   {isAdmin && (
    //     <div>
    //       <h2>Create New Task</h2>
    //       <form onSubmit={(e) => e.preventDefault()}>
    //         <div>
    //           <label>Title</label>
    //           <input
    //             type="text"
    //             name="title"
    //             value={newTask.title}
    //             onChange={handleInputChange}
    //           />
    //         </div>
    //         <div>
    //           <label>Description</label>
    //           <textarea
    //             name="description"
    //             value={newTask.description}
    //             onChange={handleInputChange}
    //           ></textarea>
    //         </div>
    //         <div>
    //           <label>Priority</label>
    //           <select
    //             name="priority"
    //             value={newTask.priority}
    //             onChange={handleInputChange}
    //           >
    //             <option value="low">Low</option>
    //             <option value="medium">Medium</option>
    //             <option value="high">High</option>
    //             <option value="urgent">Urgent</option>
    //           </select>
    //         </div>
    //         <div>
    //           <label>Assign Users</label>
    //           <select
    //             multiple
    //             name="assignedUsers"
    //             value={newTask.assignedUsers}
    //             onChange={handleUserChange}
    //           >
    //             {users.map((user) => (
    //               <option key={user._id} value={user._id}>
    //                 {user.name} ({user.email})
    //               </option>
    //             ))}
    //           </select>
    //         </div>
    //         <button type="button" onClick={handleTaskCreate}>
    //           Create Task
    //         </button>
    //       </form>
    //     </div>
    //   )}

    //   {/* Task List */}
    //   <h2>Tasks</h2>
    //   <ul>
    //     {tasks.length === 0 ? (
    //       <li>No tasks assigned</li>
    //     ) : (
    //       tasks.map((task) => (
    //         <li key={task._id}>
    //           <h3>{task.title}</h3>
    //           <p>{task.description}</p>
    //           <p>Status: {task.status}</p>
    //           <p>Priority: {task.priority}</p>
    //           <p>
    //             Assigned Users:{" "}
    //             {task.assignedUsers.map((u) => u.name).join(", ")}
    //           </p>

    //           {isAdmin ? (
    //             <div>
    //               <button
    //                 onClick={() =>
    //                   handleTaskUpdate(task._id, { status: "development" })
    //                 }
    //               >
    //                 Move to Development
    //               </button>
    //               <button
    //                 onClick={() =>
    //                   handleTaskUpdate(task._id, { priority: "high" })
    //                 }
    //               >
    //                 Set High Priority
    //               </button>
    //               <button onClick={() => handleTaskDelete(task._id)}>
    //                 Delete Task
    //               </button>
    //             </div>
    //           ) : (
    //             <button onClick={() => handleTaskDelete(task._id)}>
    //               Delete Task
    //             </button>
    //           )}
    //         </li>
    //       ))
    //     )}
    //   </ul>
    // </div>
    <div className="px-12 py-9 flex gap-4 w-full overflow-x-auto h-screen notification-scroll">
      <BoardContainer boardName="To do" />
    </div>
  );
}

export default Dashboard;
