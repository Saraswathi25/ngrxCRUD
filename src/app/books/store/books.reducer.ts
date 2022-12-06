import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import { Books } from "./books";
import { bookFetchAPISuccess, deleteBookAPISuccess, invokeSearchBook, saveBookAPISuccess, updateBookAPISuccess, updateWishList, updateWishListAPISuccess } from "./books.action";


export const initialState: ReadonlyArray<Books>=[
  ];

export const bookReducer = createReducer(
    initialState,
    on(bookFetchAPISuccess,(state,{allBooks})=>{
        return allBooks;
    }),

    on(saveBookAPISuccess,(state, {payload})=>{
        let newState =[...state];
        newState.unshift(payload);
        return newState;
    }),

    on(updateBookAPISuccess,(state, {payload})=>{
        let newState = state.filter((book)=>book.id != payload.id)
        console.log(newState)
        newState.unshift(payload);
        return newState;
    }),

    on(deleteBookAPISuccess, (state, { id }) => {
        let newState =state.filter((_) => _.id != id);
        return newState;
      }),

      on(updateWishList,(state,{book})=>{
       
      
            return book;
             
        
    }),
    on(invokeSearchBook,(state,msg)=>{
       let newState = state.filter(data=>{
        
       })
       return newState;
    })
  
)
