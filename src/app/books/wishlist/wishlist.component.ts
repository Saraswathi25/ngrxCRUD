import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/shared/store/app-state';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { BooksService } from '../books.service';
import { Books } from '../store/books';
import { invokeBooksAPI, updateWishList } from '../store/books.action';
import { selectBooks } from '../store/books.selector';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  public wishList: Observable<any>;
  constructor(private store: Store, private appStore:Store<AppState>,private bookService: BooksService) { 

  }
  visible:boolean=false;
  wishListArray=[];
  books$ =this.store.pipe(select(selectBooks))
  books=[];
  searchInput = '';
  deleteModal: any;
  idToDelete: number = 0;
  user:boolean =false;
  

  ngOnInit(): void {
    
    this.store.dispatch(invokeBooksAPI());
    this.books$.subscribe((data)=>{
     this.books= data.filter(e=> e.wishList==true);
     
   
    })
    let username =sessionStorage.getItem('userName')
    if( username=='admin'){
      console.log(
        username
      )
      this.user=!this.user;
    }
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
