import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";


const gradePackages = [
    {
        id: 1,
        title: "Grade 8 Package",
        description: "Comprehensive courses for Grade 8 students, including Mathematics and Science.",
        thumbnail: "/images/courses/course2.webp",
        courses: [
            {
                title: "Mathematics",
                description: "Fundamentals of Mathematics covering algebra, geometry, and basic calculus.",
                duration: "3 months"
            },
            {
                title: "Science",
                description: "Introduction to general science concepts, including biology and physics.",
                duration: "3 months"
            }
        ],
        price: "700"
    },
    {
        id: 2,
        title: "Grade 9 Package",
        description: "All-in-one package for Grade 9, covering Science and Social Studies.",
        thumbnail: "/images/courses/course2.webp",
        courses: [
            {
                title: "Science",
                description: "Advanced science topics including chemistry and earth science.",
                duration: "4 months"
            },
            {
                title: "Social Studies",
                description: "History and geography of the modern world.",
                duration: "3 months"
            }
        ],
        price: "800"
    },
    {
        id: 3,
        title: "Grade 10 Package",
        description: "Full course package for Grade 10, including Physics, Chemistry, and Mathematics.",
        thumbnail: "/images/courses/course2.webp",
        courses: [
            {
                title: "Physics",
                description: "Detailed study of mechanics, waves, and thermodynamics.",
                duration: "4 months"
            },
            {
                title: "Chemistry",
                description: "In-depth understanding of chemical reactions and periodic table.",
                duration: "4 months"
            },
            {
                title: "Mathematics",
                description: "Advanced algebra, trigonometry, and calculus.",
                duration: "4 months"
            }
        ],
        price: "900"
    },
    {
        id: 4,
        title: "Grade 11 Package",
        description: "Extensive course package for Grade 11 students, with Geography and Biology.",
        thumbnail: "/images/courses/course2.webp",
        courses: [
            {
                title: "Geography",
                description: "Study of physical landscapes and human interactions.",
                duration: "3 months"
            },
            {
                title: "Biology",
                description: "Cell biology, genetics, and ecological principles.",
                duration: "4 months"
            }
        ],
        price: "850"
    },
    {
        id: 5,
        title: "Grade 12 Package",
        description: "Advanced courses for Grade 12, focusing on Accounting and Economics.",
        thumbnail: "/images/courses/course2.webp",
        courses: [
            {
                title: "Accounting",
                description: "Financial accounting principles and practices.",
                duration: "5 months"
            },
            {
                title: "Economics",
                description: "Microeconomics and macroeconomics fundamentals.",
                duration: "4 months"
            }
        ],
        price: "950"
    },
];


export default function PackageDetails({ params }: { params: { id: string } }) {

    const pkg = gradePackages.find(pkg => pkg.id === parseInt(params.id));

    if (!pkg) {
        return <div>Package not found</div>;
    }

    return (
        <>
            <Navbar />
            <main className="pt-24 px-4">
                <section className="max-w-4xl mx-auto">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <Image
                            src={pkg.thumbnail}
                            alt={pkg.title}
                            width={500}
                            height={500}
                            className="w-full h-52 object-cover"
                        />
                        <div className="p-6">
                            <h1 className="text-4xl font-bold mb-4">{pkg.title}</h1>
                            <p className="text-lg mb-6">{pkg.description}</p>
                            <p className="text-lg font-semibold mb-2">Courses included:</p>
                            <ul className="mb-6">
                                {pkg.courses.map((course, index) => (
                                    <li key={index} className="mb-4">
                                        <h3 className="text-2xl font-semibold">{course.title}</h3>
                                        <p className="text-md mb-2">{course.description}</p>
                                        <p className="text-md text-gray-600">Duration: {course.duration}</p>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-red text-xl font-semibold mb-6">NRS.{pkg.price}</p>
                            <Button className="w-[300px] bg-blue">Enroll Now</Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
