import { CommentModel } from "./comment";

export interface ProductModel {
    _id:string
    price: number;
    name: string;
    quantity: number,
    rating:number,
    details:string
    onStack:boolean
    // comments:CommentModel[]
}