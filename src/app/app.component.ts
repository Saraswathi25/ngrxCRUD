import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BooksService } from './books/books.service';
import { invokeBooksAPI, invokeSearchBook } from './books/store/books.action';
import { selectBooks } from './books/store/books.selector';
import { AppState } from './shared/store/app-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ngrxEffects';
  
  constructor(private store: Store, private appStore:Store<AppState>,private router: Router,private bookService: BooksService) { }
 
  searchValue='';
  ngOnInit(): void {
  

  }
  filterTable(msg){
  //   if(!searchInput) {
  //   this.books=[];
  // }
  // searchInput = searchInput.toLowerCase();
  // this.books= this.books.filter(
  //     x =>x.title.toLowerCase().includes(searchInput)   
  // )  
  // this.searchValue=searchInput;
   this.bookService.searchMethod(msg);

  //this.store.dispatch(invokeSearchBook(msg));
  this.router.navigate(['/search']);
  }
  
}
