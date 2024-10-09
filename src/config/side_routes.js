import { ROUTES } from "./routes";
import DashboardIcon from "@/components/icon/dashboardIcon";
import TaskIcon from "@/components/icon/taskIcon";
import NotificationIcon from "@/components/icon/notificationIcon";

export const SIDE_ROUTES = [
  {
    path: ROUTES.DASHBOARD,
    title: "Dashboard",
    Icon: DashboardIcon,
  },
  {
    path: ROUTES.TASKS,
    title: "Tasks",
    Icon: TaskIcon,
  },
  {
    path: ROUTES.NOTIFICATION,
    title: "Notification",
    Icon: NotificationIcon,
  },
];
