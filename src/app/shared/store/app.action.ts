import { createAction, props } from "@ngrx/store";
import { AppState } from "./app-state";


export const setApiStatus =createAction(

    '[api] success or failure status',
    props<{apiStatus:AppState}>()
)