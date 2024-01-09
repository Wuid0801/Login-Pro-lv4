import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext"; 

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // AuthContext에서 제공된 login 함수 사용
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");

    // 로그인 폼 제출 핸들러
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!user.username || !user.password) {
            setError("아이디와 비밀번호를 모두 입력하세요.");
            return;
        }
        try {
            const { data } = await axios.post("http://localhost:3001/login", user);
            if (data) {
                login(data); // AuthContext에서 제공된 login 함수로 로그인 처리
                alert("로그인 성공");
                // 로그인 성공 시 ToDo 페이지로 이동
                navigate("/todos");
            } else {
                setError("로그인 실패: 아이디나 패스워드가 틀립니다.");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setError("로그인 실패: 아이디나 패스워드가 틀립니다.");
                } else if (error.response.status === 403) {
                    setError("로그인 실패: 토큰이 만료되었습니다. 다시 로그인해주세요.");
                }
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={onSubmitHandler}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
            <p>
                아이디가?{" "}
                <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default Login;
