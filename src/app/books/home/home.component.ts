import { Component, OnInit ,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/shared/store/app-state';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { BooksService } from '../books.service';
import { Books } from '../store/books';
import { invokeBooksAPI, invokeDeleteBookAPI, updateWishList } from '../store/books.action';
import { selectBooks } from '../store/books.selector';

declare var window: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store, private appStore:Store<AppState>, private el: ElementRef,private router: Router,private bookService: BooksService) { 
  //   this.subscription = this.bookService.getMessage().subscribe(msg=>{
  //     console.log(msg)
  //       if(!msg) {
  //   this.books=[];
  // }
  // msg = msg.toLowerCase();
  // this.books= this.books.filter(
  //     x =>x.title.toLowerCase().includes(msg)   
  // )  
  //   })
  this.books$ =this.store.pipe(select(selectBooks))
  this.store.dispatch(invokeBooksAPI());  
  }
  books$:Observable<any>;
  visible:boolean=false;
  wishListArray=[];
  
  books=[];
  searchInput = '';
  deleteModal: any;
  idToDelete: number = 0;
  subscription: Subscription;
   myTag = this.el.nativeElement.querySelector(".empty");
   user:boolean =false;
  ngOnInit(): void {
   
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
    
   this.books$.subscribe((data)=>{
    this.books= data.filter(e=> e.title);
  
  
   })
   let username =sessionStorage.getItem('userName')
   if( username=='admin'){
     console.log(
       username
     )
     this.user=!this.user;
   }
  }
  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.deleteModal.show();
  }

  delete() {
    this.store.dispatch(
      invokeDeleteBookAPI({
        id: this.idToDelete,
      })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.deleteModal.hide();
        this.appStore.dispatch(
          setApiStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
      }
    });
  }
 
  toggle(book:Books){
    if(this.wishListArray.some(x=>x.id == book.id)){
      this.wishListArray=this.wishListArray.filter(e=> e.id != book.id)
      book={
        id:book.id,
        author:book.author,
        title:book.title,
        cost:book.cost,
        wishList: !book.wishList,
        link:book.link,
        image:book.image,
        fileUrl:book.fileUrl
      }
     
    }
    else
    {
      this.wishListArray.push(book);  
      book={
        id:book.id,
        author:book.author,
        title:book.title,
        cost:book.cost,
        wishList: !book.wishList,
        link:book.link,
        image:book.image,
        fileUrl:book.fileUrl
      }
      
    }
   
   console.log(this.wishListArray)
   console.log(book.wishList)
   
  this.store.dispatch(updateWishList({book}));

    
  let appStatus$ = this.appStore.pipe(select(selectAppState));
  appStatus$.subscribe((data)=>{
   if(data.apiStatus ==='success'){
     this.appStore.dispatch(setApiStatus({apiStatus:{apiStatus:'',apiResponseMessage:''}}))
     window.location.reload();
   }
  })
  }

}
