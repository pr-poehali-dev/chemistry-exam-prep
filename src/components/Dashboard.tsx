import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

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

interface DashboardProps {
  user: {
    name: string;
    role: "student" | "teacher";
  };
  tests: Test[];
  onNavigateToHomework: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  user,
  tests,
  onNavigateToHomework,
}) => {
  const isTeacher = user.role === "teacher";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Добро пожаловать, {user.name}!
        </h1>
        <p className="text-gray-600">
          {isTeacher
            ? "Управляйте своими курсами и проверяйте задания"
            : "Изучайте химию и выполняйте задания"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Теоретические материалы</CardTitle>
              <Icon name="BookOpen" className="text-blue-500" size={24} />
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              {isTeacher
                ? "Управление учебными материалами"
                : "Изучите теорию по химии"}
            </CardDescription>
            <Button
              variant="outline"
              className="w-full"
              onClick={onNavigateToHomework}
            >
              <Icon name="ArrowRight" size={16} className="mr-2" />
              Перейти
            </Button>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Записи занятий</CardTitle>
              <Icon name="Video" className="text-green-500" size={24} />
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              {isTeacher
                ? "Загрузка и управление записями"
                : "Просмотр записей уроков"}
            </CardDescription>
            <Button
              variant="outline"
              className="w-full"
              onClick={onNavigateToHomework}
            >
              <Icon name="ArrowRight" size={16} className="mr-2" />
              Перейти
            </Button>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Домашние задания</CardTitle>
              <Icon name="FileText" className="text-orange-500" size={24} />
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              {isTeacher
                ? `Создано тестов: ${tests.length}`
                : "Выполнение домашних заданий"}
            </CardDescription>
            {isTeacher && tests.length > 0 && (
              <div className="mb-3 space-y-2 max-h-20 overflow-y-auto">
                {tests.slice(-2).map((test) => (
                  <div
                    key={test.id}
                    className="text-xs bg-orange-50 p-2 rounded"
                  >
                    {test.name} ({test.questions.length} вопр.)
                  </div>
                ))}
              </div>
            )}
            <Button
              variant="outline"
              className="w-full"
              onClick={onNavigateToHomework}
            >
              <Icon name="ArrowRight" size={16} className="mr-2" />
              Перейти
            </Button>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Статистика</CardTitle>
              <Icon name="BarChart3" className="text-purple-500" size={24} />
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              {isTeacher
                ? "Анализ успеваемости учеников"
                : "Ваш прогресс в обучении"}
            </CardDescription>
            <Button
              variant="outline"
              className="w-full"
              onClick={onNavigateToHomework}
            >
              <Icon name="ArrowRight" size={16} className="mr-2" />
              Перейти
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon name="Calendar" className="mr-2" size={20} />
              Календарь занятий
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">Органическая химия</p>
                  <p className="text-sm text-gray-600">Сегодня, 14:00</p>
                </div>
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">Лабораторная работа</p>
                  <p className="text-sm text-gray-600">Завтра, 10:00</p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-medium">Контрольная работа</p>
                  <p className="text-sm text-gray-600">25 декабря, 15:00</p>
                </div>
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon name="TrendingUp" className="mr-2" size={20} />
              {isTeacher ? "Статистика класса" : "Ваш прогресс"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Теория</span>
                  <span>{isTeacher ? "85%" : "78%"}</span>
                </div>
                <Progress value={isTeacher ? 85 : 78} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Практика</span>
                  <span>{isTeacher ? "92%" : "65%"}</span>
                </div>
                <Progress value={isTeacher ? 92 : 65} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Тесты</span>
                  <span>{isTeacher ? "88%" : "72%"}</span>
                </div>
                <Progress value={isTeacher ? 88 : 72} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
