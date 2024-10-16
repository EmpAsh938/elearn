import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash } from "lucide-react"

interface Question {
    questionText: string
    options: string[]
    correctOption: number
}

interface Exam {
    title: string
    description: string
    questions: Question[]
    date: string

}

export function CreateExamDialog({ onCreate }: { onCreate: (newExam: Exam) => void }) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [questions, setQuestions] = useState<Question[]>([
        { questionText: "", options: ["", "", "", ""], correctOption: 0 }
    ])

    const addQuestion = () => {
        setQuestions([...questions, { questionText: "", options: ["", "", "", ""], correctOption: 0 }])
    }

    const updateQuestion = (index: number, updatedQuestion: Partial<Question>) => {
        const newQuestions = [...questions]
        newQuestions[index] = { ...newQuestions[index], ...updatedQuestion }
        setQuestions(newQuestions)
    }

    const removeQuestion = (index: number) => {
        const newQuestions = questions.filter((_, i) => i !== index)
        setQuestions(newQuestions)
    }

    const handleCreate = () => {
        const newExam: Exam = {
            title,
            description,
            questions,
            date: new Date().getTime().toString()
        }
        onCreate(newExam)
        // Reset form fields
        setTitle("")
        setDescription("")
        setQuestions([{ questionText: "", options: ["", "", "", ""], correctOption: 0 }])
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue">Create Exam</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[600px] w-full max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Exam Details</DialogTitle>
                    <DialogDescription>
                        Enter the details of the exam below. Click create when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Exam Title
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    {questions.map((question, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <Label className="font-bold">Question {index + 1}</Label>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeQuestion(index)}
                                    className="hover:text-red-500"
                                >
                                    <Trash size={16} />
                                </Button>
                            </div>
                            <Input
                                placeholder="Question text"
                                value={question.questionText}
                                onChange={(e) =>
                                    updateQuestion(index, { questionText: e.target.value })
                                }
                                className="mb-2"
                            />
                            {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="grid grid-cols-5 items-center gap-2 mb-1">
                                    <Label className="col-span-1">Option {optionIndex + 1}</Label>
                                    <Input
                                        value={option}
                                        onChange={(e) => {
                                            const newOptions = [...question.options]
                                            newOptions[optionIndex] = e.target.value
                                            updateQuestion(index, { options: newOptions })
                                        }}
                                        className="col-span-3"
                                    />
                                    <input
                                        type="radio"
                                        name={`correct-option-${index}`}
                                        checked={question.correctOption === optionIndex}
                                        onChange={() => updateQuestion(index, { correctOption: optionIndex })}
                                        className="col-span-1"
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={addQuestion}
                        className="flex items-center gap-1 text-blue-500"
                    >
                        <Plus size={16} />
                        Add Question
                    </Button>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleCreate}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
