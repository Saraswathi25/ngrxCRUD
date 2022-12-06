export interface Books {
    id: number,
    title: string,
    author:string,
    cost:number,
    wishList:boolean;
    link:string;
    image:String;
    fileUrl: String;
}

export interface BookState{
    books: Books[];
    apiStatus:string;
    apiResponse:string;
}

export interface WishList{
    id: number,
    title: string,
    author:string,
    cost:number,
    wishList:boolean;
}
