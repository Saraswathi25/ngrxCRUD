import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { WishlistComponent } from './wishlist/wishlist.component';


const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
{
  path:'add',
  component: AddComponent
},
{
  path:'edit/:id',
  component: EditComponent
},
{
  path:'wishList',
  component:WishlistComponent
},
{
  path:'search',
  component:SearchComponent
},
{
  path:'login',
  component:LoginComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
 