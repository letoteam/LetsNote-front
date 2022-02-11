import {ILabel} from "./ILabel";

export interface INote{
    id: number,
    title: string,
    content: string,
    isPrivate: boolean,
    updatedAt: string,
    labels: ILabel[];
}