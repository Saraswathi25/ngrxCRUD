import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { AppState } from 'src/app/shared/store/app-state';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { BooksService } from '../books.service';
import { Books } from '../store/books';
import { invokeBooksAPI, invokeSearchBook, updateWishList } from '../store/books.action';
import { selectBooks } from '../store/books.selector';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
 
  private readonly previousProductsData = [];

  books$ : Observable<any>;
  private term: Subject<string> = new Subject<string>();
   subscription:any;
  constructor(private store: Store, private appStore:Store<AppState>,private bookService: BooksService,private http :HttpClient) { 
    //this.books$=this.store.pipe(select(selectBooks))
   // this.store.dispatch(invokeBooksAPI());
  //  this.books$.subscribe((data)=>{
  //   this.books= data.filter(x =>x.title.toLowerCase().includes(this.searchInput)   );
 
  
  //   })
  this.http.get<Books[]>('http://localhost:3000/books').subscribe((data)=>{
    this.books=data.filter(x =>x.title.toLowerCase().includes(this.searchInput));
   })
  }
  visible:boolean=false;
  wishListArray=[];
  user:boolean =false;
  books=[];
  searchInput = '';
  deleteModal: any;
  idToDelete: number = 0;

  // subscription = this.bookService.currentApprovalStageMessage.subscribe(msg=>{
  //   //     console.log(msg)
  //   //       if(!msg) {
  //   //   this.books=[];
  //   // }
  //   // msg = msg.toLowerCase();
  //   // this.books= this.books.filter(
  //   //     x =>x.title.toLowerCase().includes(msg)   
  //   // )  
  //   this.searchInput =msg;
   
  //     })
  ngAfterContentInit(){
    
 
  }
  ngOnInit(): void {
    
    this.subscription = this.bookService.currentApprovalStageMessage.subscribe(msg=>{
      //     console.log(msg)
      //       if(!msg) {
      //   this.books=[];
      // }
      // msg = msg.toLowerCase();
      // this.books= this.books.filter(
      //     x =>x.title.toLowerCase().includes(msg)   
      // )  
      this.searchInput =msg;
     console.log(this.searchInput)
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
