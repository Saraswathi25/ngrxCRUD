import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { AppState } from 'src/app/shared/store/app-state';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Books } from '../store/books';
import { invokeUpdateBookAPI } from '../store/books.action';
import { selectBookbyId } from '../store/books.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private store:Store, private route :ActivatedRoute, private router: Router, private appStore:Store<AppState>) { }
  bookForm: Books={
    id: 0,
    author: '',
    title: '',
    cost: 0,
    wishList:false,
    link:'',
    image:'',
    fileUrl:''
  }
  ngOnInit(): void {
    let fetchFormData$ =this.route.paramMap.pipe(
      switchMap((param)=>{
        var id= Number(param.get(''));id
        return  this.store.pipe(select(selectBookbyId(id)));
      })
    )
   fetchFormData$.subscribe((data)=>{
    if(data){
      this.bookForm = {...data}
    }
    else{
      this.router.navigate(['/']);
    }
   })
  }
update(){
  this.store.dispatch(invokeUpdateBookAPI({payload:{...this.bookForm}}));

    
  let appStatus$ = this.appStore.pipe(select(selectAppState));
  appStatus$.subscribe((data)=>{
   if(data.apiStatus ==='success'){
     this.appStore.dispatch(setApiStatus({apiStatus:{apiStatus:'',apiResponseMessage:''}}))
     this.router.navigate(['/']);
   }
  })
}
}
