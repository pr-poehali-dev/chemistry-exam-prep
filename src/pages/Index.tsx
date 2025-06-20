import React, { useState } from "react";
import Header from "@/components/Header";
import AuthForm from "@/components/AuthForm";
import Dashboard from "@/components/Dashboard";
import TestCreator from "@/components/TestCreator";
import HomeworkPage from "@/components/HomeworkPage";

interface User {
  name: string;
  role: "student" | "teacher";
}

interface Test {
  id: number;
  name: string;
  questions: Array<{
    id: number;
    question: string;
    type: "multiple" | "text" | "formula";
    options?: string[];
    correctAnswer: string;
  }>;
  createdAt: Date;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [tests, setTests] = useState<Test[]>([]);
  const [currentView, setCurrentView] = useState<
    "dashboard" | "test-creator" | "homework"
  >("dashboard");

  const handleSaveTest = (testName: string, questions: any[]) => {
    const newTest: Test = {
      id: Date.now(),
      name: testName,
      questions,
      createdAt: new Date(),
    };
    setTests((prev) => [...prev, newTest]);
    setCurrentView("dashboard");
  };

  const handleLogin = (username: string, password: string) => {
    // Простая система авторизации для демонстрации
    const users: Record<string, User> = {
      user1: { name: "Анна Петрова", role: "student" },
      user2: { name: "Максим Сидоров", role: "student" },
      teacher: { name: "Елена Викторовна", role: "teacher" },
    };

    const validPasswords: Record<string, string> = {
      user1: "password1",
      user2: "password2",
      teacher: "password",
    };

    if (users[username] && validPasswords[username] === password) {
      setUser(users[username]);
    } else {
      alert("Неверный логин или пароль");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("dashboard");
  };

  if (!user) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />

      {user.role === "teacher" && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8 py-4">
              <button
                onClick={() => setCurrentView("dashboard")}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  currentView === "dashboard"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Дашборд
              </button>
              <button
                onClick={() => setCurrentView("test-creator")}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  currentView === "test-creator"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Создать тест
              </button>
              <button
                onClick={() => setCurrentView("homework")}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  currentView === "homework"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Домашние задания
              </button>
            </nav>
          </div>
        </div>
      )}

      {currentView === "dashboard" && (
        <Dashboard
          user={user}
          tests={tests}
          onNavigateToHomework={() => setCurrentView("homework")}
        />
      )}
      {currentView === "test-creator" && user.role === "teacher" && (
        <TestCreator onSaveTest={handleSaveTest} />
      )}
      {currentView === "homework" && <HomeworkPage user={user} tests={tests} />}
    </div>
  );
};

export default Index;
