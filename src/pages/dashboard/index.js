// src/components/Dashboard.js
// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import axios from "axios";
// import io from "socket.io-client";
import BoardContainer from "@/components/pages/dashboard/boardContainer";
import { allEnums } from "@/constants/enums";
import { useTask } from "@/hooks/useTask";
import axios from "axios";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

// let socket;

function Dashboard() {
  const [isClient, setIsClient] = useState(false);
  const { refetchTask, data: taskData, updateTasks } = useTask();
  const { query } = useSelector((state) => state.searchSlice);

  useEffect(() => {
    refetchTask();
    setIsClient(true);
  }, []);

  // const { data: session } = useSession();
  // const [tasks, setTasks] = useState([]);
  // const [users, setUsers] = useState([]);
  // const [newTask, setNewTask] = useState({
  //   title: "",
  //   description: "",
  //   assignedUsers: [],
  //   priority: "medium",
  // });
  // const [isAdmin, setIsAdmin] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [notifications, setNotifications] = useState([]);

  // Initialize socket connection
  // useEffect(() => {
  //   if (session) {
  //     // Ensure the socket connects to the right endpoint
  //     socket = io("/", {
  //       path: "/api/socketio", // Ensure this matches the path used in the server
  //     });

  //     socket.on("connect", () => {
  //       console.log("Connected to Socket.IO server");

  //       // Listen for task notifications
  //       socket.on(`notification-${session?.user?.id}`, (data) => {
  //         setNotifications((prevNotifications) => [...prevNotifications, data]);
  //         alert(data.message);
  //       });
  //     });

  //     socket.on("connect_error", (err) => {
  //       console.error("Connection failed:", err.message);
  //     });

  //     return () => {
  //       if (socket) {
  //         socket.disconnect();
  //       }
  //     };
  //   }
  // }, [session]);

  // Fetch tasks, notifications, and set initial data
  // useEffect(() => {
  //   if (session) {
  //     const fetchInitialData = async () => {
  //       try {
  //         const [taskRes, userRes, notificationRes] = await Promise.all([
  //           axios.get("/api/tasks"), // Fetch tasks
  //           isAdmin ? axios.get("/api/users") : Promise.resolve({ data: [] }), // Fetch users if admin
  //           axios.get("/api/notifications"), // Fetch existing notifications
  //         ]);

  //         setTasks(taskRes.data);
  //         setUsers(userRes.data.data || []); // Set users only if admin
  //         setNotifications(notificationRes.data);
  //         setIsAdmin(session.user.role === "admin");
  //         setLoading(false);
  //       } catch (error) {
  //         console.error("Error fetching data", error);
  //         setLoading(false);
  //       }
  //     };

  //     fetchInitialData();
  //   }
  // }, [session, isAdmin]);

  // Handle form input changes
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  // };

  // const handleUserChange = (e) => {
  //   const selectedUsers = Array.from(
  //     e.target.selectedOptions,
  //     (option) => option.value
  //   );
  //   setNewTask((prevTask) => ({
  //     ...prevTask,
  //     assignedUsers: selectedUsers,
  //   }));
  // };

  // Handle task creation
  // const handleTaskCreate = async () => {
  //   if (!isAdmin) return;

  //   try {
  //     const res = await axios.post("/api/tasks", newTask, {
  //       withCredentials: true,
  //     });
  //     setTasks((prevTasks) => [...prevTasks, res.data]); // Update task list with the new task
  //     setNewTask({
  //       title: "",
  //       description: "",
  //       assignedUsers: [],
  //       priority: "medium",
  //     });
  //   } catch (error) {
  //     console.error("Error creating task", error);
  //   }
  // };

  // Handle task status and priority update
  // const handleTaskUpdate = async (taskId, updateData) => {
  //   try {
  //     await axios.post("/api/tasks/status", { taskId, ...updateData });
  //     setTasks((prevTasks) =>
  //       prevTasks.map((task) =>
  //         task._id === taskId ? { ...task, ...updateData } : task
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error updating task", error);
  //   }
  // };

  // Handle task delete
  // const handleTaskDelete = async (taskId) => {
  //   try {
  //     await axios.delete(`/api/tasks/${taskId}`);
  //     setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  //   } catch (error) {
  //     console.error("Error deleting task", error);
  //   }
  // };

  // If loading, display loading message
  // if (loading) return <div>Loading...</div>;

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await axios.get("/api/tasks");
  //       if (response.status === 200) {
  //         setTasks(response.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error);
  //       toast.error("Failed to fetch tasks.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await axios.patch("/api/tasks/status", {
        taskId,
        status: newStatus,
      });

      if (response.status === 200) {
        toast.success("Task status updated!");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status.");
    }
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId !== source.droppableId) {
      const newStatus = destination.droppableId;
      const taskId = draggableId;

      updateTasks(taskId, newStatus);

      await updateTaskStatus(taskId, newStatus);
    }
  };

  const filteredTasks = query
    ? taskData.filter((task) =>
        task.title.toLowerCase().includes(query.toLowerCase())
      )
    : taskData;

  return (
    isClient && (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="px-2 md:px-6 lg:px-8 xl:px-12 py-9 flex gap-4 w-full overflow-x-auto notification-scroll">
          {allEnums.boards.map(({ label, value }, index) => (
            <Droppable key={value} droppableId={value}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col"
                >
                  <BoardContainer
                    key={"board--" + label + index}
                    label={label}
                    tasks={filteredTasks.filter(
                      (task) => task.status === value
                    )}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    )
  );
}

export default Dashboard;
