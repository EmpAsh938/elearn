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
    // image
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
    title: string;
    data: Date;
}