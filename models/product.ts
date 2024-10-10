
export interface ProductModel {
    _id:string
    product:string;
    user:string;
    price: number;
    name: string;
    quantity: number,
    rating:number,
    details:string
    onStack:boolean
    creator:string
    productImageUrl:string
    category:string
}
