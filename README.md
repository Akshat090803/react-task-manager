# React Task Manager

A sleek and functional To-Do List application built with **React and Vite**, offering intuitive task management with a beautiful, mobile-responsive UI. This project demonstrates core React concepts, state management, conditional rendering, and dynamic data manipulation.

## ✨ Features

* **Task Management:**
    * **Add Tasks:** Easily add new to-do items with a description and an optional due date.
    * **Remove Tasks:** Delete tasks once they are no longer needed.
    * **Edit Tasks:** Modify existing task descriptions.
    * **Mark as Complete:** Toggle task status between pending and completed.
* **Input Validation:** Ensures tasks are not added with empty descriptions or invalid past dates.
* **Dynamic Display:** Tasks are rendered dynamically as they are added, updated, or filtered/sorted.
* **Persistent Storage:** Integrates `localStorage` to save your tasks, so they persist even after closing the browser.
* **Filtering Options:** Organize your view with various filters:
    * **All Tasks:** Display all tasks, regardless of status or date.
    * **Pending:** Show only incomplete tasks.
    * **Completed:** Show only finished tasks.
    * **Created Today:** View tasks added on the current day.
    * **Due Today:** See tasks with a due date set for the current day.
* **Sorting Options:** Arrange your tasks in different orders:
    * **Oldest First (Created Date):** Sort tasks by their creation time, oldest first.
    * **Newest First (Created Date):** Sort tasks by their creation time, newest first.
    * **Soonest Due (Due Date):** Order tasks by their due date, with the earliest due date first.
    * **Latest Due (Due Date):** Order tasks by their due date, with the latest due date first.
* **Aesthetic UI/UX:** A visually appealing and user-friendly interface.
* **Mobile Responsiveness:** Optimized for seamless usage across various screen sizes, from desktops to mobile devices.

## 📸 Screenshots

Here are some visual examples of the application in action:

### Empty State
[![Empty State](empty.png)](empty.png)

### Home Page with Tasks
[![Home Page](home.png)](home.png)

### Adding a New Task
[![Adding Task](Add.png)](Add.png)

### Filtering Results
[![Filter Results](filter.png)](filter.png)

### Sorting Options Menu
[![Sorting Options](sortMenu.png)](sortMenu.png)

### Mobile Responsiveness
[![Mobile View 1](resp-1.png)](resp-1.png)
[![Mobile View 2](resp-2.png)](resp-2.png)


## 🚀 Technologies Used

* **React.js:** A JavaScript library for building user interfaces.
* **Vite:** A fast build tool that provides a lightning-fast development experience for React.
* **HTML5 & CSS3:** For structuring and styling the application.
* **JavaScript (ES6+):** Core programming logic.
* **React Icons:** For scalable vector icons (`react-icons/fa`).
* **localStorage API:** For client-side data persistence.

## 🛠️ Installation and Setup

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Akshat090803/react-task-manager.git](https://github.com/Akshat090803/react-task-manager.git)
    cd react-task-manager
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

    The application will open in your browser at `http://localhost:5173` (Vite's default port, though it might vary).

## 🧪 Brief Testing Guidance

To quickly test the core functionalities:

1.  **Adding Tasks:**
    * Type a task in the input field.
    * A "Deadline" input will appear. Select a future date.
    * Click "Add Task".
    * **Test Validation:** Try adding an empty task or a task with a past date to see the alerts.

2.  **Task Operations:**
    * Hover over or click on a task to reveal edit/delete/complete options (if applicable).
    * Click the checkbox/button to mark a task as completed/pending.
    * Click the edit button to change the task description.
    * Click the delete button to remove a task.

3.  **Filtering:**
    * Click the "Filter" button.
    * Select different filter options ("All Tasks", "Pending", "Completed", "Created Today", "Due Today"). Observe how the displayed tasks and the summary message change.
    * Ensure "Created Today" and "Due Today" work correctly for tasks you've added/due today.

4.  **Sorting:**
    * Click the "Sort" button.
    * Select different sort options ("Oldest First", "Newest First", "Soonest Due", "Latest Due"). Observe the order of tasks in the list.
    * **Crucial Test:** Test sorting after applying a filter. The sorting should apply to the *currently filtered* tasks.

5.  **Persistence (localStorage):**
    * Add a few tasks.
    * Close your browser tab or refresh the page.
    * Verify that your tasks are still present.

6.  **Responsiveness:**
    * Resize your browser window to simulate different screen sizes (e.g., mobile).
    * Check if the layout adjusts correctly, and all elements remain accessible and usable.

