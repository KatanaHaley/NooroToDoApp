import { useState, useEffect } from "react";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  color: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [selectedColor, setSelectedColor] = useState("#000000");

  // Fetch Todos on Component Mount
  useEffect(() => {
    axios.get("http://localhost:4000/tasks")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  // Add a New Todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      const res = await axios.post("http://localhost:4000/tasks", { 
        title: newTodo, 
        color: selectedColor, 
        completed: false 
      });

      setTodos((prevTodos) => [...prevTodos, res.data]);
      setNewTodo("");
      setSelectedColor("#000000"); // Reset color
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Toggle Todo Completion
  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      const res = await axios.put(`http://localhost:4000/tasks/${id}`, { completed });
      setTodos((prevTodos) => 
        prevTodos.map((todo) => (todo.id === id ? res.data : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Update Todo Title & Color
  const updateTodo = async (id: number, title: string, color: string) => {
    try {
      const res = await axios.put(`http://localhost:4000/tasks/${id}`, { title, color });
      setTodos((prevTodos) => 
        prevTodos.map((todo) => (todo.id === id ? res.data : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Delete Todo
  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/tasks/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-5">To-Do App</h1>

      {/* Input & Add Button */}
      <div className="flex space-x-2">
        <input 
          type="text" 
          value={newTodo} 
          onChange={(e) => setNewTodo(e.target.value)} 
          placeholder="Enter a task" 
          className="px-3 py-2 text-white rounded border-gray-100"
        />
        <input 
          type="color" 
          value={selectedColor} 
          onChange={(e) => setSelectedColor(e.target.value)} 
          className="w-10 h-10"
        />
        <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700" onClick={addTodo}>
          +
        </button>
      </div>

      {/* Task List */}
      <ul className="mt-5 w-full max-w-md">
        {todos.map((todo) => (
          <li 
            key={todo.id} 
            className="flex justify-between items-center p-3 my-2 rounded shadow-lg"
            style={{ backgroundColor: todo.color }} // Apply color from DB
          >
            {/* Checkbox + Editable Title */}
            <div className="flex items-center space-x-3">
              <input 
                type="checkbox" 
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id, !todo.completed)}
                className="w-5 h-5 cursor-pointer"
              />
              
              {/* Editable Task Title */}
              <input 
                type="text" 
                value={todo.title}
                onChange={(e) => updateTodo(todo.id, e.target.value, todo.color)}
                className={`bg-transparent text-lg outline-none w-full ${todo.completed ? "line-through text-gray-400" : "text-white"}`}
              />
            </div>

            {/* Change Color & Delete */}
            <div className="flex items-center space-x-2">
              <input 
                type="color" 
                value={todo.color} 
                onChange={(e) => updateTodo(todo.id, todo.title, e.target.value)}
                className="w-6 h-6 cursor-pointer"
              />
              <button className="bg-red-500 px-2 py-1 rounded hover:bg-red-700" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
