import React, { useState } from "react";
import { useAuth } from "../components/AuthContext";

const ToDoApp = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    const addTodo = () => {
        if (newTodo.trim() !== "") {
            setTodos([...todos, newTodo]);
            setNewTodo("");
        }
    };

    const removeTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    return (
        <div>
            <h2>ToDo App</h2>

            {isAuthenticated ? (
                <div>
                    <p>로그인을 환영합니다.</p>
                    <button onClick={handleLogout}>Logout</button>
                    <br/>
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                    />
                    
                    <button onClick={addTodo}>Add Todo</button>
                    <ul>
                        {todos.map((todo, index) => (
                            <li key={index}>
                                {todo}
                                <button onClick={() => removeTodo(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>로그인이 안되어있습니다.</p>
            )}


        </div>
    );
};

export default ToDoApp;
