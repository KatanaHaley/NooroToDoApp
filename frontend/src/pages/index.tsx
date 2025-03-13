import { useState, useEffect } from "react";
import axios from "axios";
import { CheckCircle, Trash, PlusCircle } from "lucide-react";
import CreateTaskPage from "./createtaskpage";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";


interface Todo {
  id: number;
  title: string;
  completed: boolean;
  color: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [selectedColor, setSelectedColor] = useState("#4F46E5");

  const router = useRouter();

  useEffect(() => {
    axios.get("http://localhost:4000/tasks")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  // const addTodo = async () => {
  //   if (!newTodo.trim()) return;
  //   try {
  //     const res = await axios.post("http://localhost:4000/tasks", { 
  //       title: newTodo, 
  //       color: selectedColor, 
  //       completed: false 
  //     });
  //     setTodos([...todos, res.data]);
  //     setNewTodo("");
  //     setSelectedColor("#4F46E5");
  //   } catch (error) {
  //     console.error("Error adding todo:", error);
  //   }
  // };

  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      const res = await axios.put(`http://localhost:4000/tasks/${id}`, { completed });
      setTodos(todos.map(todo => (todo.id === id ? res.data : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/tasks/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center min-h-screen bg-[#1A1A1A] text-white px-6 py-10">
       <button
      className="w-full bg-[#1E6F9F] px-6 py-3 rounded-lg mt-6 flex items-center justify-center space-x-2 text-white hover:bg-blue-700 transition"
      onClick={() => router.push("/createtaskpage")} // Update with the correct route
    >
      <PlusCircle size={20} /> <span>Create Task</span>
    </button>

      {/* Task List Container */}
      <div className="mt-8 w-full max-w-2xl">
        {/*Tasks & Completed Count */}
        <div className="flex justify-between text-[#1E6F9F] text-lg font-bold pb-2 border-b border-gray-700">
          <span>Tasks <span className="bg-[#262626] px-2 py-1 rounded text-sm text-white">{todos.length}</span></span>
          <span className="text-[#8284FA]">Completed <span className="bg-[#262626] px-2 py-1 rounded text-sm text-white">{completedCount} / {todos.length}</span></span>
        </div>

        {/* Task List */}
        <ul className="mt-4 space-y-3">
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center justify-between bg-[#262626] border-[#333333] p-4 rounded-lg shadow-lg">
              {/* Checkbox & Title */}
              <div className="flex items-center space-x-3">
                <button onClick={() => toggleTodo(todo.id, !todo.completed)}>
                  {todo.completed ? (
                    <CheckCircle size={22} className="text-green-500" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-500 rounded-full"></div>
                  )}
                </button>
                <span 
                  className={`text-lg ${todo.completed ? "line-through text-gray-500" : "text-white"}`}
                >
                  {todo.title}
                </span>
              </div>

              {/* Delete Button */}
              <button 
                className="text-white hover:text-red-700 transition"
                onClick={() => deleteTodo(todo.id)}
              >
                <Trash size={20} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
}
