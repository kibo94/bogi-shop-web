
export interface ProductModel {
    _id:string
    price: number;
    name: string;
    quantity: number,
    creator:string
    rating:number,
    details:string
    onStack:boolean
    productImageUrl:string
    category:string
}