import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import add from "../assets/images/add.svg";
import checked from "../assets/images/checked.svg";
import unchecked from "../assets/images/unchecked.svg";
import deleted from "../assets/images/delete.svg";

const TodoListApp = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addTodoItem = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const toggleTodoCompletion = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;

    if (newTodos[index].completed) {
      setTodos(newTodos.filter((todo, i) => i !== index));
      setCompletedTodos([...completedTodos, newTodos[index]]);
    } else {
      const newCompletedTodos = completedTodos.filter((_, i) => i !== index);
      setTodos([...newTodos, ...newCompletedTodos]);
      setCompletedTodos(newCompletedTodos);
    }

    if (newTodos.filter((todo) => !todo.completed).length === 0) {
      setShowConfetti(true);
    }
  };

  const deleteTodoItem = (index, isCompleted) => {
    if (isCompleted) {
      setCompletedTodos(completedTodos.filter((_, i) => i !== index));
    } else {
      setTodos(todos.filter((_, i) => i !== index));
    }
  };

  const clearAllCompletedTodos = () => {
    setCompletedTodos([]);
  };

  useEffect(() => {
    if (showConfetti) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => {
        document.body.style.overflow = "auto";
        clearTimeout(timer);
      };
    }
  }, [showConfetti]);

  return (
    <div className="todo-container relative z-20 text-black align-center bg-white w-5/12 rounded-bl-2xl rounded-br-2xl">
      <h1 className="text-5xl text-center bg-gray-600 text-white p-4">
        TODO LIST
      </h1>

      <div className="w-[90%] mx-auto p-8 ">
        <div className="flex justify-between align-center p-2">
          <input
            className="w-[90%] border outline-0 p-4 text-2xl"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Add a new task"
          />
          <div className="w-[10%] flex justify-center align-center">
            <img
              className="bg-gray-600"
              onClick={addTodoItem}
              src={add}
              alt="Add Task"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        <h2 className="font-bold">Active Todos</h2>
        <ul className="border-b pt-6 mb-6">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between bg-gray-100 mb-4 p-4 border-b"
            >
              <div className="flex">
                <img
                  src={todo.completed ? checked : unchecked}
                  alt={todo.completed ? "Checked" : "Unchecked"}
                  onClick={() => toggleTodoCompletion(index)}
                  style={{ cursor: "pointer", marginRight: "3px" }}
                />
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.text}
                </span>
              </div>
              <img
                src={deleted}
                alt="Delete"
                onClick={() => deleteTodoItem(index, false)}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              />
            </li>
          ))}
        </ul>

        <h2 className="font-bold">Completed Todos</h2>
        <ul className="pt-6">
          {completedTodos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between bg-gray-100 mb-4 p-4"
            >
              <div className="flex">
                <img
                  src={checked}
                  alt="Checked"
                  style={{ marginRight: "10px" }}
                />
                <span style={{ textDecoration: "line-through" }}>
                  {todo.text}
                </span>
              </div>
              <img
                src={deleted}
                alt="Delete"
                onClick={() => deleteTodoItem(index, true)}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              />
            </li>
          ))}
        </ul>

        {completedTodos.length > 0 && (
          <div className="text-center">
            <button
              className="mt-4 p-2 bg-gray-600 text-white rounded"
              onClick={clearAllCompletedTodos}
            >
              Clear All Completed
            </button>
          </div>
        )}

        {showConfetti && (
          <Confetti
            width={document.querySelector(".todo-container").offsetWidth}
            height={document.querySelector(".todo-container").offsetHeight}
          />
        )}
      </div>
    </div>
  );
};

export default TodoListApp;
