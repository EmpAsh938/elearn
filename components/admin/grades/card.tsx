import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash } from "lucide-react"

interface Grade {
    title: string
    description: string
}

interface GradeCardProps {
    grade: Grade
    onEdit: () => void
    onDelete: () => void
}

export function GradeCard({ grade, onEdit, onDelete }: GradeCardProps) {
    return (
        <Card className="bg-white p-4 rounded-lg shadow-md">
            <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold text-darkNavy">{grade.title}</CardTitle>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={onEdit}>
                        <Edit size={16} />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={onDelete}>
                        <Trash size={16} className="text-red-500" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-darkNavy mb-2">{grade.description}</p>
            </CardContent>
        </Card>
    )
}
