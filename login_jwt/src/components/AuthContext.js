import React, { createContext, useContext, useState, useEffect } from "react";

// 사용자 인증을 위한 컨텍스트 생성
const AuthContext = createContext();

// 애플리케이션 전체를 감싸며 인증 컨텍스트를 제공하는 AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
    // 인증 상태를 추적하는 상태
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // 컴포넌트 마운트 시 로컬 스토리지에서 인증 토큰 확인
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(Boolean(token));
    }, []);

    // 로그인하여 인증 상태 설정하는 함수
    const login = (token) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
    };

    // 로그아웃하여 인증 상태 초기화하는 함수
    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    // 인증 컨텍스트 값을 감싸서 하위 컴포넌트에 제공
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 함수형 컴포넌트에서 인증 컨텍스트를 사용하는 커스텀 훅
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth는 AuthProvider 내에서 사용되어야 합니다");
    }
    return context;
};
