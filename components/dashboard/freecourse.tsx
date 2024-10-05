import Link from 'next/link';
import Image from 'next/image';

const FreeCoursesSection = () => {
    // Array of free courses with YouTube video links
    const freeCourses = [
        {
            thumbnail: "/images/youtube/1.webp",
            title: "Important Question from Introduction to Probability|| CSIT 2nd Semester",
            youtubeLink: "https://www.youtube.com/watch?v=Ys_joMqgZMo"
        },
        {
            thumbnail: "/images/youtube/2.webp",
            title: "Important question from Descriptive Statistics|| CSIT 2nd Sem",
            youtubeLink: "https://www.youtube.com/watch?v=B8z5afp2vqA"
        },
        {
            thumbnail: "/images/youtube/3.webp",
            title: "Moments || Statistics",
            youtubeLink: "https://www.youtube.com/watch?v=nDSADlPx9J4"
        },
        {
            thumbnail: "/images/youtube/4.webp",
            title: "Probability Mass Function | CSIT 2nd sem",
            youtubeLink: "https://www.youtube.com/watch?v=USVuPIawq1g"
        },
        {
            thumbnail: "/images/youtube/5.webp",
            title: "Probability Density Function | CSIT 2nd sem",
            youtubeLink: "https://www.youtube.com/watch?v=Y5_S1AApXBo"
        },
        {
            thumbnail: "/images/youtube/6.webp",
            title: "Expected Value, Variance and Co-variance of pdf | CSIT 2nd Sem",
            youtubeLink: "https://www.youtube.com/watch?v=7AqtHk4Gels"
        }
    ];

    return (
        <section>
            <h2 className="text-left text-2xl font-semibold my-4">Free Courses</h2>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
                {freeCourses.map((course, index) => (
                    <Link href={course.youtubeLink} key={index} target="_blank">
                        <div>
                            <div className="transition-transform transform hover:scale-105">
                                <Image
                                    src={course.thumbnail}
                                    alt={course.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-auto object-cover rounded"
                                />
                                <p className="text-center py-2 font-medium text-lg line-clamp-2 overflow-hidden text-ellipsis">{course.title}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default FreeCoursesSection;
