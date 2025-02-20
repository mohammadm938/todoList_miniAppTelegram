import { useEffect, useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const webApp = window.Telegram.WebApp;
  const user = window.Telegram.WebApp.initDataUnsafe?.user;

  const themeParams = window.Telegram.WebApp.themeParams;
  const isDarkMode = window.Telegram.WebApp.colorScheme === "dark";

  const styles = {
    backgroundColor:
      themeParams.bg_color || (isDarkMode ? "#17212B" : "#FFFFFF"),
    textColor: themeParams.text_color || (isDarkMode ? "#FFFFFF" : "#000000"),
    buttonColor:
      themeParams.button_color || (isDarkMode ? "#5288C1" : "#2EA6FF"),
    buttonTextColor: themeParams.button_text_color || "#FFFFFF",
    secondaryBgColor:
      themeParams.secondary_bg_color || (isDarkMode ? "#232E3C" : "#F0F2F5"),
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask,
        },
      ]);
      setNewTask("");
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };
  return (
    <div
      className="min-h-screen p-4"
      style={{
        backgroundColor: styles.backgroundColor,
        color: styles.textColor,
      }}
    >
      <div
        className="max-w-md mx-auto p-6 rounded-lg"
        style={{ backgroundColor: styles.secondaryBgColor }}
      >
        <h1 className="text-2xl font-bold mb-4">لیست کارها</h1>
        <div className="flex mb-4 space-x-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="اضافه کردن کار جدید"
            className="flex-1 p-2 border rounded-l-lg focus:outline-none"
            style={{
              backgroundColor: styles.backgroundColor,
              color: styles.textColor,
              borderColor: styles.buttonColor,
            }}
          />
          <button
            className="p-2 rounded-lg"
            onClick={() => addTask()}
            style={{
              backgroundColor: styles.buttonColor,
              color: styles.buttonTextColor,
            }}
          >
            اضافه کردن
          </button>
        </div>

        <ul className="pt-8 flex flex-col gap-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 rounded-lg mb-2"
              style={{ backgroundColor: styles.backgroundColor }}
            >
              <div className="flex items-center  gap-x-2 ">
                <input
                  type="checkbox"
                  checked={task.completed || false}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="h-5 w-5 rounded-lg"
                  style={{
                    accentColor: styles.buttonColor,
                  }}
                />
                <span className={task.completed ? "line-through" : ""}>
                  {task.text}
                </span>
              </div>
              <button
                className="text-red-500 hover:text-red-700 focus:outline-none"
                style={{ color: styles.buttonColor }}
                onClick={() => {
                  deleteTask(task.id);
                }}
              >
                حذف
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
