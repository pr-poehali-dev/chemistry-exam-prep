import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";

interface Question {
  id: number;
  question: string;
  type: "single" | "multiple" | "text" | "formula";
  options?: string[];
  correctAnswer: string | string[];
}

interface TestCreatorProps {
  onSaveTest: (testName: string, questions: Question[]) => void;
}

const TestCreator: React.FC<TestCreatorProps> = ({ onSaveTest }) => {
  const [testName, setTestName] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    question: "",
    type: "single",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  const addQuestion = () => {
    if (currentQuestion.question && currentQuestion.correctAnswer) {
      setQuestions([
        ...questions,
        {
          ...(currentQuestion as Question),
          id: Date.now(),
        },
      ]);
      setCurrentQuestion({
        question: "",
        type: "single",
        options: ["", "", "", ""],
        correctAnswer: "",
      });
    }
  };

  const saveTest = () => {
    if (testName && questions.length > 0) {
      onSaveTest(testName, questions);
      setTestName("");
      setQuestions([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Создание теста
        </h1>
        <p className="text-gray-600">Создайте новый тест для учеников</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Новый вопрос</CardTitle>
            <CardDescription>Добавьте вопрос в тест</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="question">Вопрос</Label>
              <Textarea
                id="question"
                placeholder="Введите текст вопроса..."
                value={currentQuestion.question}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    question: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="type">Тип вопроса</Label>
              <Select
                value={currentQuestion.type}
                onValueChange={(
                  value: "single" | "multiple" | "text" | "formula",
                ) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    type: value,
                    correctAnswer: value === "multiple" ? [] : "",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Единичный выбор</SelectItem>
                  <SelectItem value="multiple">Множественный выбор</SelectItem>
                  <SelectItem value="text">Текстовый ответ</SelectItem>
                  <SelectItem value="formula">Химическая формула</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(currentQuestion.type === "single" ||
              currentQuestion.type === "multiple") && (
              <div className="space-y-2">
                <Label>Варианты ответов</Label>
                {currentQuestion.options?.map((option, index) => (
                  <Input
                    key={index}
                    placeholder={`Вариант ${index + 1}`}
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...(currentQuestion.options || [])];
                      newOptions[index] = e.target.value;
                      setCurrentQuestion({
                        ...currentQuestion,
                        options: newOptions,
                      });
                    }}
                  />
                ))}
              </div>
            )}

            {currentQuestion.type === "single" && (
              <div>
                <Label>Правильный ответ</Label>
                <Select
                  value={currentQuestion.correctAnswer as string}
                  onValueChange={(value) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      correctAnswer: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите правильный ответ" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentQuestion.options?.map(
                      (option, index) =>
                        option && (
                          <SelectItem key={index} value={option}>
                            {option}
                          </SelectItem>
                        ),
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}

            {currentQuestion.type === "multiple" && (
              <div>
                <Label>Правильные ответы (можно выбрать несколько)</Label>
                <div className="space-y-2 mt-2">
                  {currentQuestion.options?.map(
                    (option, index) =>
                      option && (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`correct-${index}`}
                            checked={(
                              (currentQuestion.correctAnswer as string[]) || []
                            ).includes(option)}
                            onCheckedChange={(checked) => {
                              const currentAnswers =
                                (currentQuestion.correctAnswer as string[]) ||
                                [];
                              if (checked) {
                                setCurrentQuestion({
                                  ...currentQuestion,
                                  correctAnswer: [...currentAnswers, option],
                                });
                              } else {
                                setCurrentQuestion({
                                  ...currentQuestion,
                                  correctAnswer: currentAnswers.filter(
                                    (a) => a !== option,
                                  ),
                                });
                              }
                            }}
                          />
                          <Label htmlFor={`correct-${index}`}>{option}</Label>
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}

            {(currentQuestion.type === "text" ||
              currentQuestion.type === "formula") && (
              <div>
                <Label htmlFor="correct">Правильный ответ</Label>
                <Input
                  id="correct"
                  placeholder="Введите правильный ответ"
                  value={currentQuestion.correctAnswer as string}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      correctAnswer: e.target.value,
                    })
                  }
                />
              </div>
            )}

            <Button onClick={addQuestion} className="w-full">
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить вопрос
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Предварительный просмотр</CardTitle>
                <CardDescription>Вопросы: {questions.length}</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Название теста"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  className="w-48"
                />
                <Button
                  onClick={saveTest}
                  disabled={!testName || questions.length === 0}
                >
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {questions.map((question, index) => (
                <div key={question.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">Вопрос {index + 1}</h4>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {question.type === "single"
                        ? "Единичный"
                        : question.type === "multiple"
                          ? "Множественный"
                          : question.type === "text"
                            ? "Текст"
                            : "Формула"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    {question.question}
                  </p>
                  {(question.type === "single" ||
                    question.type === "multiple") && (
                    <div className="space-y-1">
                      {question.options?.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className="text-xs text-gray-600 flex items-center"
                        >
                          <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-2 text-xs text-green-600">
                    ✓ Ответ:{" "}
                    {Array.isArray(question.correctAnswer)
                      ? question.correctAnswer.join(", ")
                      : question.correctAnswer}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestCreator;
