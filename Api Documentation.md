
# API Documentation

## Authentication

All endpoints require authentication using the session retrieved through `next-auth`. Unauthorized access will return a `401 Unauthorized` status.

---

## Notifications Endpoints

### **GET /api/notifications**

#### Description:
Fetch a list of notifications for the authenticated user.

#### Query Parameters:
- `page` (optional): Page number for pagination (default: `1`).
- `limit` (optional): Number of notifications per page (default: `10`).

#### Success Response:
- Status: `200 OK`
- Body:
  \`\`\`json
  {
    "notifications": [
      {
        "_id": "notification_id",
        "user": "user_id",
        "content": "Notification content",
        "read": false,
        "createdAt": "timestamp"
      }
    ],
    "currentPage": 1,
    "totalPages": 5,
    "totalNotifications": 50
  }
  \`\`\`

#### Errors:
- `401 Unauthorized`: If the user is not authenticated.
- `500 Internal Server Error`: If there is an error fetching notifications.

---

### **PUT /api/notifications/mark-all-read**

#### Description:
Mark all unread notifications for the authenticated user as read.

#### Success Response:
- Status: `200 OK`
- Body:
  \`\`\`json
  {
    "message": "All notifications marked as read"
  }
  \`\`\`

#### Errors:
- `401 Unauthorized`: If the user is not authenticated.
- `500 Internal Server Error`: If there is an error updating notifications.

---

## Task Endpoints

### **GET /api/tasks/[taskId]**

#### Description:
Fetch details of a specific task by its ID.

#### Path Parameters:
- `taskId` (required): The ID of the task to retrieve.

#### Success Response:
- Status: `200 OK`
- Body:
  \`\`\`json
  {
    "_id": "task_id",
    "name": "Task name",
    "description": "Task description",
    "status": "in-progress",
    "priority": "high",
    "assignedUsers": ["user_id_1", "user_id_2"],
    "createdAt": "timestamp"
  }
  \`\`\`

#### Errors:
- `401 Unauthorized`: If the user is not authenticated.
- `404 Not Found`: If the task does not exist.
- `500 Internal Server Error`: If there is an error fetching the task.

---

### **PUT /api/tasks/[taskId]**

#### Description:
Update a specific task by its ID. Only admins are allowed to update tasks.

#### Path Parameters:
- `taskId` (required): The ID of the task to update.

#### Request Body:
- JSON object containing task fields to update.

#### Success Response:
- Status: `200 OK`
- Body:
  \`\`\`json
  {
    "_id": "task_id",
    "name": "Updated task name",
    "description": "Updated task description",
    "status": "completed",
    "priority": "medium"
  }
  \`\`\`

#### Errors:
- `401 Unauthorized`: If the user is not authenticated.
- `403 Forbidden`: If the user is not an admin.
- `404 Not Found`: If the task does not exist.
- `500 Internal Server Error`: If there is an error updating the task.

---

### **DELETE /api/tasks/[taskId]**

#### Description:
Delete a specific task by its ID. Only admins or users assigned to the task can delete it.

#### Path Parameters:
- `taskId` (required): The ID of the task to delete.

#### Success Response:
- Status: `200 OK`
- Body:
  \`\`\`json
  {
    "message": "Task deleted"
  }
  \`\`\`

#### Errors:
- `401 Unauthorized`: If the user is not authenticated.
- `403 Forbidden`: If the user is not an admin or not assigned to the task.
- `404 Not Found`: If the task does not exist.
- `500 Internal Server Error`: If there is an error deleting the task.

---

### **GET /api/tasks/getTasksByStatus**

#### Description:
Fetch tasks filtered by status.

#### Query Parameters:
- `status` (required): The status of the tasks to retrieve.

#### Success Response:
- Status: `200 OK`
- Body:
  \`\`\`json
  {
    "tasks": [
      {
        "_id": "task_id",
        "name": "Task name",
        "description": "Task description",
        "status": "completed",
        "assignedUsers": [
          {
            "_id": "user_id",
            "name": "User Name",
            "email": "user@example.com"
          }
        ]
      }
    ]
  }
  \`\`\`

#### Errors:
- `400 Bad Request`: If the status is not provided.
- `404 Not Found`: If no tasks are found with the specified status.
- `500 Internal Server Error`: If there is an error fetching tasks.

---

### **POST /api/tasks**

#### Description:
Create a new task. Only admins are allowed to create tasks.

#### Request Body:
- JSON object containing task details.

#### Success Response:
- Status: `201 Created`
- Body:
  \`\`\`json
  {
    "_id": "task_id",
    "name": "New task",
    "description": "Task description",
    "assignedUsers": ["user_id_1", "user_id_2"],
    "createdBy": "admin_id"
  }
  \`\`\`

#### Errors:
- `401 Unauthorized`: If the user is not authenticated.
- `403 Forbidden`: If the user is not an admin.
- `500 Internal Server Error`: If there is an error creating the task.

---

### **GET /api/users**

#### Description:
Fetch a list of users. Only admins can access this endpoint.

#### Success Response:
- Status: `200 OK`
- Body:
  \`\`\`json
  {
    "success": true,
    "data": [
      {
        "_id": "user_id",
        "name": "User Name",
        "email": "user@example.com"
      }
    ]
  }
  \`\`\`

#### Errors:
- `403 Forbidden`: If the user is not an admin.
- `500 Internal Server Error`: If there is an error fetching users.
