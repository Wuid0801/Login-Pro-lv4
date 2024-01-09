import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";

const SignUp = () => {
    const { login } = useAuth(); // AuthContext에서 제공된 login 함수 사용
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();
    const [error, setError] = useState("");

    // 회원가입 폼 제출 핸들러
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/signup", user);

            if (response.data) {
                login(response.data); // AuthContext에서 제공된 login 함수로 로그인 처리
                alert("회원가입 성공");
                navigate("/");
            } else {
                setError("회원가입 실패");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    setError("회원가입 실패: 이미 존재하는 아이디입니다.");
                } else {
                    setError("회원가입 실패: 서버 오류가 발생했습니다.");
                }
            } 
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
