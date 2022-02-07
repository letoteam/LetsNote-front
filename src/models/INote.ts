export interface INote{
    id: number,
    title: string,
    content: string,
    isPrivate: boolean,
    updatedAt: string,
    labels: string[];
}