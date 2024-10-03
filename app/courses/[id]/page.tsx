import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";


const gradePackages = [
    {
        id: 1,
        title: "Grade 8 Course",
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
        title: "Grade 9 Course",
        description: "All-in-one Course for Grade 9, covering Science and Social Studies.",
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
        title: "Grade 10 Course",
        description: "Full course Course for Grade 10, including Physics, Chemistry, and Mathematics.",
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
        title: "Grade 11 Course",
        description: "Extensive course Course for Grade 11 students, with Geography and Biology.",
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
        title: "Grade 12 Course",
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
        <div className="overflow-x-hidden">
            <Navbar />
            <main className="px-6 pb-8">
                <section className="max-w-4xl mx-auto flex flex-col gap-4">
                    <h1 className="text-2xl sm:text-4xl font-bold">{pkg.title}</h1>
                    <Image
                        src={pkg.thumbnail}
                        alt={pkg.title}
                        width={900}
                        height={900}
                        className="w-full h-52 object-cover"
                    />
                    <p className="text-red text-xl font-semibold ">NRS.{pkg.price}</p>
                    <p className="text-lg">{pkg.description}</p>
                    {/* <p className="text-lg font-semibold mb-2">Courses included:</p>
                            <ul className="mb-6">
                                {pkg.courses.map((course, index) => (
                                    <li key={index} className="mb-4">
                                        <h3 className="text-2xl font-semibold">{course.title}</h3>
                                        <p className="text-md mb-2">{course.description}</p>
                                        <p className="text-md text-gray-600">Duration: {course.duration}</p>
                                    </li>
                                ))}
                            </ul> */}

                    <h3 className="font-semibold text-xl"> Includes</h3>
                    <div>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-darkNavy mr-2"></div>
                                <p>Comprehensive Notes</p>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-darkNavy mr-2"></div>
                                <p>Recorded Videos</p>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-darkNavy mr-2"></div>
                                <p>Upcoming Live Classes</p>
                            </div>
                        </div>

                    </div>
                    <h3 className="font-semibold text-xl"> Instructors</h3>
                    <div className="flex flex-wrap gap-4 justify-left">
                        <Image src="/images/profile/user.jpeg" alt="Instructor A" width={600} height={600} className="cover w-20 h-20 rounded-full" />
                        <Image src="/images/profile/user.jpeg" alt="Instructor A" width={600} height={600} className="cover w-20 h-20 rounded-full" />
                        <Image src="/images/profile/user.jpeg" alt="Instructor A" width={600} height={600} className="cover w-20 h-20 rounded-full" />
                        <Image src="/images/profile/user.jpeg" alt="Instructor A" width={600} height={600} className="cover w-20 h-20 rounded-full" />
                    </div>

                    <Button className="w-[300px] mx-auto bg-blue">Book Now</Button>
                </section>
            </main>
            <Footer />
        </div>
    );
}
