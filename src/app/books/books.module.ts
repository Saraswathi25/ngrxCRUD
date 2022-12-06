import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { bookReducer } from './store/books.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from './store/books.effects';
import { AddComponent } from './add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    HomeComponent,
    AddComponent,
    EditComponent,
    WishlistComponent,
    SearchComponent,
    LoginComponent
    
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('myBooks',bookReducer),
    EffectsModule.forFeature([BooksEffects])
  ]
})
export class BooksModule { }
