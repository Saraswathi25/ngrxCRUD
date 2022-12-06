import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Books } from './store/books';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http :HttpClient) { }
  private subject = new Subject<any>();
  private approvalStageMessage = new BehaviorSubject('');
  private baseUrl =' ';
  currentApprovalStageMessage = this.approvalStageMessage.asObservable();
  get(){
    return this.http.get<Books[]>('http://localhost:3000/books')
  }

  create(payload: Books){
    return this.http.post<Books>('http://localhost:3000/books',payload)
  }

  update(payload:Books){
    return this.http.put<Books>(
      `http://localhost:3000/books/${payload.id}`,payload);
  }
  delete(id: number) {
    return this.http.delete(`http://localhost:3000/books/${id}`);
  }

  updateWishList(payload:Books){
    return this.http.put<Books>(
      `http://localhost:3000/books/${payload.id}`,payload);
  }

searchMethod(searchValue){
  this.approvalStageMessage.next(searchValue);
  
}

// upload(file: File): Observable<HttpEvent<any>> {
//   const formData: FormData = new FormData();

//   formData.append('file', file);

//   const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
//     reportProgress: true,
//     responseType: 'json'
//   });

//   return this.http.request(req);
// }
// getFiles(): Observable<any> {
//   return this.http.get(`${this.baseUrl}/files`);
// }
public uploadfile(file: File) {
  let formParams = new FormData();
  formParams.append('file', file)
  return this.http.post('http://localhost:3000/uploadFile', formParams)
}
}
