import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash } from "lucide-react"

interface Course {
    title: string
    description: string
}

interface CourseCardProps {
    course: Course
    onEdit: () => void
    onDelete: () => void
}

export function CourseCard({ course, onEdit, onDelete }: CourseCardProps) {
    return (
        <Card className="bg-white p-4 rounded-lg shadow-md">
            <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold text-darkNavy">{course.title}</CardTitle>
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
                <p className="text-darkNavy mb-2">{course.description}</p>
            </CardContent>
        </Card>
    )
}
