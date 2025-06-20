import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

interface Test {
  id: number;
  name: string;
  questions: Array<{
    id: number;
    question: string;
    type: "single" | "multiple" | "text" | "formula";
    options?: string[];
    correctAnswer: string | string[];
  }>;
  createdAt: Date;
}

interface HomeworkPageProps {
  user: {
    name: string;
    role: "student" | "teacher";
  };
  tests: Test[];
}

const HomeworkPage: React.FC<HomeworkPageProps> = ({ user, tests }) => {
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});

  const handleAnswerChange = (
    questionId: number,
    answer: string | string[],
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const submitTest = () => {
    // Здесь можно добавить логику отправки результатов
    alert("Тест отправлен!");
    setSelectedTest(null);
    setAnswers({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Домашние задания
        </h1>
        <p className="text-gray-600">
          {user.role === "teacher"
            ? "Управляйте домашними заданиями для учеников"
            : "Выполните домашние задания по химии"}
        </p>
      </div>

      {tests.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Icon
              name="FileX"
              size={48}
              className="mx-auto text-gray-400 mb-4"
            />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Нет доступных заданий
            </h3>
            <p className="text-gray-600">
              {user.role === "teacher"
                ? "Создайте первое задание через раздел 'Создать тест'"
                : "Задания появятся здесь после создания учителем"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{test.name}</CardTitle>
                    <CardDescription>
                      {test.questions.length} вопросов
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">
                    {user.role === "teacher" ? "Создано" : "Доступно"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Icon name="Calendar" size={16} className="mr-2" />
                    {test.createdAt.toLocaleDateString("ru-RU")}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Icon name="Clock" size={16} className="mr-2" />~
                    {test.questions.length * 2} минут
                  </div>

                  <div className="pt-2">
                    {user.role === "student" ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="w-full"
                            onClick={() => setSelectedTest(test)}
                          >
                            <Icon name="Play" size={16} className="mr-2" />
                            Начать выполнение
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{test.name}</DialogTitle>
                            <DialogDescription>
                              Ответьте на все вопросы и нажмите "Отправить"
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-6">
                            {test.questions.map((question, index) => (
                              <div key={question.id} className="space-y-3">
                                <h4 className="font-medium">
                                  {index + 1}. {question.question}
                                </h4>

                                {question.type === "single" &&
                                  question.options && (
                                    <RadioGroup
                                      onValueChange={(value) =>
                                        handleAnswerChange(question.id, value)
                                      }
                                    >
                                      {question.options.map(
                                        (option, optIndex) => (
                                          <div
                                            key={optIndex}
                                            className="flex items-center space-x-2"
                                          >
                                            <RadioGroupItem
                                              value={option}
                                              id={`${question.id}-${optIndex}`}
                                            />
                                            <Label
                                              htmlFor={`${question.id}-${optIndex}`}
                                            >
                                              {option}
                                            </Label>
                                          </div>
                                        ),
                                      )}
                                    </RadioGroup>
                                  )}

                                {question.type === "multiple" &&
                                  question.options && (
                                    <div className="space-y-2">
                                      {question.options.map(
                                        (option, optIndex) => (
                                          <div
                                            key={optIndex}
                                            className="flex items-center space-x-2"
                                          >
                                            <Checkbox
                                              id={`${question.id}-${optIndex}`}
                                              onCheckedChange={(checked) => {
                                                const currentAnswers =
                                                  (answers[
                                                    question.id
                                                  ] as string[]) || [];
                                                if (checked) {
                                                  handleAnswerChange(
                                                    question.id,
                                                    [...currentAnswers, option],
                                                  );
                                                } else {
                                                  handleAnswerChange(
                                                    question.id,
                                                    currentAnswers.filter(
                                                      (a) => a !== option,
                                                    ),
                                                  );
                                                }
                                              }}
                                            />
                                            <Label
                                              htmlFor={`${question.id}-${optIndex}`}
                                            >
                                              {option}
                                            </Label>
                                          </div>
                                        ),
                                      )}
                                    </div>
                                  )}

                                {(question.type === "text" ||
                                  question.type === "formula") && (
                                  <Textarea
                                    placeholder="Введите ваш ответ..."
                                    onChange={(e) =>
                                      handleAnswerChange(
                                        question.id,
                                        e.target.value,
                                      )
                                    }
                                  />
                                )}
                              </div>
                            ))}

                            <Button onClick={submitTest} className="w-full">
                              <Icon name="Send" size={16} className="mr-2" />
                              Отправить тест
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          <Icon name="Eye" size={16} className="mr-2" />
                          Просмотр
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Icon name="BarChart3" size={16} className="mr-2" />
                          Статистика
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeworkPage;
