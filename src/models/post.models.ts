export interface IPost {
    id: number;
    create_date: string;
    title: string;
    description: string;
    time_read: number;
    upload_image: boolean;
    users: {
        name: string;
        description: string;
        id: number;
    }
    slug: string;
    favorite: boolean;
    content: string;
}