import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Books } from "./books";


export const selectBooks = createFeatureSelector<Books[]>('myBooks')

export const selectBookbyId = (bookId:number)=>{
    return createSelector(selectBooks, (books: Books[])=>{
        var bookById = books.filter((book)=> book.id == bookId);
        if(bookById.length ==0){
            return null;
        }
        return bookById[0];
    }
        
    )
}

export const searchBooks = (msg:string)=>{
    return createSelector(selectBooks, (books: Books[])=>{
        var bookSearch = books.filter((book)=> book.author == msg);
        
        return bookSearch;
    }
        
    )
}