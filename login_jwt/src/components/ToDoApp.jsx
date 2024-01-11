import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import {
    TodoAppContainer,
    Button,
    Input,
    TodoList,
    TodoItem,
    RemoveButton,
} from "../style/styles";
const ToDoApp = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [editableTodo, setEditableTodo] = useState(null);
    const { isAuthenticated, logout } = useAuth();
    const [title, setTitle] = useState({
        title: "",
        content: "",
    });
    const handleLogout = () => {
        logout();
    };

    // const addTodo = () => {
    //     if (newTodo.trim() !== "") {
    //         setTodos([...todos, newTodo]);
    //         setNewTodo("");
    //     }
    // };

    const removeTodo = (id) => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
    };


    // 전체 리스트 가져오기
    const onCheckMainHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get("http://localhost:3001/articles");
            console.log(data);
            setTodos(data.map(item => ({ id: item.id, title: item.title, content: item.content })));

        }
        catch (error) {
            console.error("에러 발생:", error);
        }
    }
    // 특정 리스트 가져오기 지금은 id = 2로 지정해놓음
    const onCheckHandler = async (id) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/articles/${id}`);
            console.log(data);
            setTodos([{ id: data.id, title: data.title, content: data.content }]);
        }
        catch (error) {
            console.error("에러 발생:", error);
        }
    }

    // 리스트에 추가기능
    const onAddHandler = async () => {
        try {
            // title 상태를 사용하여 새로운 할 일 추가
            const { data } = await axios.post("http://localhost:3001/articles", {
                id: uuidv4(),
                title: title.title,
                content: title.content
            });
            // 추가된 할 일을 기존 할 일 목록에 추가
            setTodos([...todos, { id: data.id, title: data.title, content: data.content }]);
            // 추가 후 입력 필드 초기화
            setTitle({ title: "", content: "" });
        } catch (error) {
            console.error("에러 발생:", error);
        }
    }

    // 본문 삭제 
    const onRemoveHandler = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/articles/${id}`);
            setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error("에러 발생:", error);
        }
    };

    // 본문 수정 
    const onUpdateHandler = async (id, updatedContent) => {
        try {
            const { data } = await axios.put(`http://localhost:3001/articles/${id}`, {
                title: updatedContent.title,
                content: updatedContent.content,
            });
            setTodos((prevTodos) => {
                const updatedTodos = [...prevTodos];
                const index = updatedTodos.findIndex(todo => todo.id === id);
                if (index !== -1) {
                    updatedTodos[index] = { id: data.id, title: data.title, content: data.content };
                }
                return updatedTodos;
            });
        } catch (error) {
            console.error("에러 발생:", error);
        }
    };


    return (
        <TodoAppContainer>

            {isAuthenticated ? (
                // 인증된 사용자일 때
                <div>
                    <p>로그인을 환영합니다.</p>
                    <Button onClick={handleLogout}>Logout</Button>
                    <h2>ToDo App</h2>
                    <Button onClick={onCheckMainHandler}>Get</Button>
                    <Button onClick={() => onCheckHandler(2)}>Get2</Button>
                    <Input
                        type="text"
                        value={title.title}
                        onChange={(e) => setTitle({ ...title, title: e.target.value })}
                        placeholder="Title"
                    />
                    <Input
                        type="text"
                        value={title.content}
                        onChange={(e) => setTitle({ ...title, content: e.target.value })}
                        placeholder="Content"
                    />
                    <Button onClick={onAddHandler}>Add Todo</Button>
                    <TodoList>
                        {todos.map((todo) => (
                            <TodoItem key={todo.id}>
                                {editableTodo && editableTodo.id === todo.id ? (
                                    <div>
                                        <label>
                                            Title:
                                            <input
                                                type="text"
                                                value={editableTodo.title}
                                                onChange={(e) => setEditableTodo({ ...editableTodo, title: e.target.value })}
                                            />
                                        </label>
                                        <br />
                                        <label>
                                            Content:
                                            <input
                                                type="text"
                                                value={editableTodo.content}
                                                onChange={(e) => setEditableTodo({ ...editableTodo, content: e.target.value })}
                                            />
                                        </label>
                                        <Button onClick={() => onUpdateHandler(todo.id, editableTodo)}>Update</Button>
                                        <Button onClick={() => setEditableTodo(null)}>Cancel</Button>
                                    </div>
                                ) : (
                                    <div>
                                        <div>
                                            <strong>Title:</strong> {todo.title}
                                        </div>
                                        <div>
                                            <strong>Content:</strong> {todo.content}
                                        </div>
                                        <RemoveButton onClick={() => onRemoveHandler(todo.id)}>
                                            Remove
                                        </RemoveButton>
                                        <Button onClick={() => setEditableTodo({ id: todo.id, title: todo.title, content: todo.content })}>
                                            Edit
                                        </Button>
                                    </div>
                                )}
                            </TodoItem>
                        ))}
                    </TodoList>
                </div>
            ) : (
                // 인증되지 않은 사용자일 때
                <p>로그아웃상태</p>
            )}
        </TodoAppContainer>
    );
};

export default ToDoApp;
