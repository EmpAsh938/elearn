import Link from 'next/link';
import Image from 'next/image';

const FreeCoursesSection = () => {
    // Array of free courses with YouTube video links
    const freeCourses = [
        {
            thumbnail: "/images/youtube/6.webp",
            title: "Statistics I (CSIT 2nd Sem)",
            youtubeLink: "https://www.youtube.com/playlist?list=PLacXNk1LcMgy706sKNz7fFLRhBTSylWr-"
        },
        {
            thumbnail: "/images/youtube/3.webp",
            title: "BBS First Year (Business Statistics)",
            youtubeLink: "https://www.youtube.com/playlist?list=PLacXNk1LcMgwB3Vd2WmUqJyOhtMachsXt"
        },
    ];

    return (
        <section>
            <h2 className="text-left text-2xl font-semibold my-4">Free Courses</h2>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
                {freeCourses.map((course, index) => (
                    <Link href={course.youtubeLink} key={index} target="_blank">
                        <div className="relative">
                            <div className="transition-transform transform hover:scale-105">
                                <Image
                                    src={course.thumbnail}
                                    alt={course.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-auto object-cover rounded"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-black bg-opacity-50 p-4 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-12 w-12 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M14.752 11.168l-5.197-3.03A1 1 0 008 9v6a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z"
                                            />
                                        </svg>
                                    </div>
                                </div>
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
