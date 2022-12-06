import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { AppState } from 'src/app/shared/store/app-state';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { BooksService } from '../books.service';
import { Books } from '../store/books';
import { invokeSaveBookAPI } from '../store/books.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private store:Store, private appStore:Store<AppState>,private router:Router,private bookService: BooksService) { }
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
  // imageInfos?: Observable<any>;
  // selectedFiles?: FileList;
  // previews: string[] = [];

  file: File = null;
  ngOnInit(): void {
   // this.imageInfos = this.bookService.getFiles();
  }
  save(){
    
    this.store.dispatch(invokeSaveBookAPI({payload:{...this.bookForm}}));
    
   let appStatus$ = this.appStore.pipe(select(selectAppState));
   appStatus$.subscribe((data)=>{
    if(data.apiStatus ==='success'){
      this.appStore.dispatch(setApiStatus({apiStatus:{apiStatus:'',apiResponseMessage:''}}))
      this.router.navigate(['/']);
    }
   })

  }

//   fileChangeEvent(fileInput: any) {
   
//     if (fileInput.target.files && fileInput.target.files[0]) {
//         // Size Filter Bytes
//         const max_size = 20971520;
//         const allowed_types = ['application/vnd.ms-excel'];
//         const max_height = 15200;
//         const max_width = 25600;


//         const reader = new FileReader();
       

//         reader.readAsDataURL(fileInput.target.files[0]);
//     }
// }

// selectFiles(event: any): void {

//   this.selectedFiles = event.target.files;

//   this.previews = [];
//   if (this.selectedFiles && this.selectedFiles[0]) {
//     const numberOfFiles = this.selectedFiles.length;
//     for (let i = 0; i < numberOfFiles; i++) {
//       const reader = new FileReader();

//       reader.onload = (e: any) => {
//         console.log(e.target.result);
//         this.previews.push(e.target.result);
//       };

//       reader.readAsDataURL(this.selectedFiles[i]);
//     }
//   }
// }

// uploadFiles(): void {
  

//   if (this.selectedFiles) {
//     for (let i = 0; i < this.selectedFiles.length; i++) {
//       this.upload(i, this.selectedFiles[i]);
//     }
//   }
// }

// upload(idx: number, file: File): void {
 

//   if (file) {
//     this.bookService.upload(file).subscribe({
//       next: (event: any) => {
//         if (event instanceof HttpResponse) {
//           const msg = 'Uploaded the file successfully: ' + file.name;
//           //this.message.push(msg);
//           this.imageInfos = this.bookService.getFiles();
//           //this.imageInfos = this.uploadService.getFiles();
//         }
//       },
//       error: (err: any) => {
        
//         const msg = 'Could not upload the file: ' + file.name;
//         //this.message.push(msg);
//       }});
//   }
// }
onFilechange(event: any) {
  console.log(event.target.files[0])
  this.file = event.target.files[0]
}

upload() {
  if (this.file) {
    this.bookService.uploadfile(this.file).subscribe(resp => {
      alert("Uploaded")
    })
  } else {
    alert("Please select a file first")
  }
}

// uploadFile(event) {
//   const id = Math.random().toString(36).substring(2);
//   this.ref = this.afStorage.ref(id);
//   this.task = this.ref.put(event.target.files[0]);
// }
}
