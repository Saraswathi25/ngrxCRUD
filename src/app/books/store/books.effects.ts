import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap } from "rxjs";
import { AppState } from "src/app/shared/store/app-state";
import { setApiStatus } from "src/app/shared/store/app.action";
import { BooksService } from "../books.service";
import { bookFetchAPISuccess, deleteBookAPISuccess, invokeBooksAPI, invokeDeleteBookAPI, invokeSaveBookAPI, invokeSearchBook, invokeUpdateBookAPI, saveBookAPISuccess, updateBookAPISuccess, updateWishList } from "./books.action";



@Injectable()
export class BooksEffects {

    constructor(private actions$:Actions, private bookService: BooksService, private appStore:Store<AppState>){}

         loadAllBooks$ =createEffect( ()=>{
            return this.actions$.pipe(
                 ofType(invokeBooksAPI),
                 switchMap(() => {
                     return this.bookService.get()
                         .pipe(
                             map((data) => bookFetchAPISuccess({ allBooks: data })

                             )
                         );
                 })
             );
        });

        saveNewBook$ = createEffect( ()=>{
            return this.actions$.pipe(
                ofType(invokeSaveBookAPI),
                switchMap((action)=>{
                    this.appStore.dispatch(setApiStatus({apiStatus:{apiResponseMessage:'', apiStatus:''}}))
                    return this.bookService
                    .create(action.payload).
                    pipe(map((data)=> {
                        this.appStore.dispatch(setApiStatus({apiStatus:{apiResponseMessage:'', apiStatus:'success'}}))
                     return saveBookAPISuccess({payload: data } )
                    }
                    ));
                })
                )
            
        })

        updateBook$ = createEffect( ()=>{
            return this.actions$.pipe(
                ofType(invokeUpdateBookAPI),
                switchMap((action)=>{
                    this.appStore.dispatch(setApiStatus({apiStatus:{apiResponseMessage:'', apiStatus:''}}))
                    return this.bookService
                    .update(action.payload).
                    pipe(map((data)=> {
                        this.appStore.dispatch(setApiStatus({apiStatus:{apiResponseMessage:'', apiStatus:'success'}}))
                     return updateBookAPISuccess({payload: data } )
                    }
                    ));
                })
                )
            
        })

        deleteBooksAPI$ = createEffect(() => {
            return this.actions$.pipe(
              ofType(invokeDeleteBookAPI),
              switchMap((actions) => {
                this.appStore.dispatch(
                    setApiStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
                );
                return this.bookService.delete(actions.id).pipe(
                  map(() => {
                    this.appStore.dispatch(
                        setApiStatus({
                        apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                      })
                    );
                    return deleteBookAPISuccess({ id: actions.id });
                  })
                );
              })
            );
          });


          updateWishList$ = createEffect( ()=>{
            return this.actions$.pipe(
                ofType(updateWishList),
                switchMap((action)=>{
                    this.appStore.dispatch(setApiStatus({apiStatus:{apiResponseMessage:'', apiStatus:''}}))
                    return this.bookService
                    .updateWishList(action.book).
                    pipe(map((data)=> {
                        this.appStore.dispatch(setApiStatus({apiStatus:{apiResponseMessage:'', apiStatus:'success'}}))
                     return updateBookAPISuccess({payload: data } )
                    }
                    ));
                })
                )
            
        })

        searchBooks$ = createEffect( ()=>{
          return this.actions$.pipe(
              ofType(invokeSearchBook),
              switchMap((action)=>{
                  this.appStore.dispatch(setApiStatus({apiStatus:{apiResponseMessage:'', apiStatus:''}}))
                  return this.bookService
                  .get().
                  pipe(map((data) => bookFetchAPISuccess({ allBooks: data })

                  )
              );
              })
              )
          
      })
    
}
