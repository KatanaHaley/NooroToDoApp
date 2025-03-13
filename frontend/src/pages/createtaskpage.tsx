import { useState, useEffect } from "react";
import { CheckCircle, Trash, PlusCircle } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

interface Todo {
  id: number;
  title: string;
  color: string;
  completed: boolean;
}

const CreateTaskPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [selectedColor, setSelectedColor] = useState("#4F46E5");
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const router = useRouter();

  const presetColors = [
    "#FF3B30", "#F79000", "#FFCC00", // Red, Orange, Yellow
    "#34C759", "#007AFF", "#5856D6", // Green, Blue
    "#AF52DE", "#FF2D55", "#A2845E", // Cyan, Yellow, Violet
  ];

  // Fetch existing todos on mount
  useEffect(() => {
    axios
      .get("http://localhost:4000/tasks")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  // Handles form submission using Axios
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/tasks", {
        title: taskName,
        description: description,
      });

      if (response.status === 201) {
        console.log("Task created successfully");
        setTaskName("");
        setDescription("");
        setTodos((prevTodos) => [...prevTodos, response.data]); // Update state with new task
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Adds a new Todo using Axios
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const res = await axios.post("http://localhost:4000/tasks", {
        title: newTodo,
        color: selectedColor,
        completed: false,
      });

      setTodos((prevTodos) => [...prevTodos, res.data]);
      setNewTodo("");
      setSelectedColor("#4F46E5");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <>
      <Navbar />

      {/* Back Button */}
      <button
        className="text-sm text-blue-400 underline mt-4 bg-[#1A1A1A]"
        onClick={() => router.push("/")}
      >
        Back
      </button>

      {/* Main Content */}
      <div className="flex flex-col items-center min-h-screen bg-[#1A1A1A] text-white px-6 py-10">
        {/* Create Task Form */}
        <div className="mt-6 w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold text-[#4EA8DE]">Title</label>
              <input
                type="text"
                value={taskName}
                placeholder="Ex: Brush your teeth"
                onChange={(e) => setTaskName(e.target.value)}
                className="w-full mb-10 mt-2 px-3 py-2 rounded text-white bg-[#262626]"
                required
              />
            </div>

            {/* Color Selector */}
            <label className="block font-semibold text-[#4EA8DE]">Color</label>
            <div className="flex space-x-2">
              {presetColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-10 h-10 mb-5 rounded-full border-2 transition-all duration-200 ${
                    selectedColor === color ? "border-white scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>

            <button
              onClick={addTodo}
              type="submit"
              className="w-full bg-blue-600 px-6 py-3 rounded-lg text-white hover:bg-blue-700 transition"
            >
              Add Task
            </button>
          </form>
        </div>

       
      </div>
    </>
  );
};

export default CreateTaskPage;
