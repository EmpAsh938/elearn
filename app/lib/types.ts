export type TCourses = {
    categoryId: string;
    categoryTitle: string;
    categoryDescription: string;
    mainCategory: string;
    imageName: string;
    price: string;
    courseType: string;
}

export type TPosts = {
    postId: string;
    title: string;
    videoLink: string;
    mentor: string;
    content: string;
    imageName: string;
}

type TRole = {
    id: string;
    name: string;
}

export type TUser = {
    id: string;
    name: string;
    collegename: string;
    email: string;
    imageName: string;
    roles: TRole[];
    discount: string;

}

export type TBookedCourse = {
    bookedId: string;
    category: TCourses;
    user: TUser;
}

export type TExam = {
    examId: string;
    title: string;
    category: TCourses;
    imageName: string;
    deadline: string;
}

export type TLive = {
    liveid: string;
    category: TCourses;
    startingTime: string;
    streamlink: string;
    title: string;
}