import { createAction, props } from "@ngrx/store";
import { Books } from "./books";


export const invokeBooksAPI = createAction(
    "[Books API] invoke books fetch API"
)

export const bookFetchAPISuccess = createAction(
    "[Books API]  books fetch API Success",
    props<{allBooks:Books[]}>()
)

export const invokeSaveBookAPI = createAction(
    "[Books API]  books save API",
    props<{payload:Books}>()
  

)

export const saveBookAPISuccess = createAction(
    "[Books API]  books save API success",
    props<{payload:Books}>()
  
) 

export const invokeUpdateBookAPI = createAction(
    "[Books API]  books update Book API ",
    props<{payload:Books}>()
  
) 

export const updateBookAPISuccess = createAction(
    "[Books API]   update Book API Success ",
    props<{payload:Books}>()
  
) 

export const invokeDeleteBookAPI = createAction(
    '[Books API] Inovke delete book api',
    props<{id:number}>()
  );
   
  export const deleteBookAPISuccess = createAction(
    '[Books API] deleted book api success',
    props<{id:number}>()
  );

  export const updateWishList =createAction('[update WishList] UPDATE_POST_ACTION',props<{book:any }>()); 
//   export const updateWishListAPI = createAction(
//     "[Books API]  WishList update  API ",
//     props<{payload:Books}>()
  
// ) ;
export const updateWishListAPISuccess = createAction(
    "[Books API]   update Book API Success ",
    props<{payload:Books}>()
  
) 

export const invokeSearchBook = createAction(
    "[Books API]  books search Book API ",
    props<{msg: String}>()
  
) 
  