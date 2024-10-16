import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash } from "lucide-react"

interface Exam {
    title: string
    // description: string
    date: string
}

interface ExamCardProps {
    exam: Exam
    onEdit: () => void
    onDelete: () => void
}

export function ExamCard({ exam, onEdit, onDelete }: ExamCardProps) {
    return (
        <Card className="bg-white p-4 rounded-lg shadow-md">
            <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold text-darkNavy">{exam.title}</CardTitle>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={onEdit}>
                        <Edit size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={onDelete}>
                        <Trash size={16} className="text-red-500" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {/* <p className="text-darkNavy mb-2">{exam.description}</p> */}
                <p className="text-gray-500 text-sm">Date: {exam.date}</p>
            </CardContent>
            <CardFooter>
                <Button className="bg-blue text-white w-full">View Details</Button>
            </CardFooter>
        </Card>
    )
}
