import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User>(1);//for logged-in user
  currentUser$ = this.currentUserSource.asObservable();//for logged-in user
  constructor(private http:HttpClient) { }

  register(model : any){
    return this.http.post(this.baseUrl + 'account/register',model).pipe(
      map((user: User) => {
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  login(model:any){
    return this.http.post(this.baseUrl + 'account/login',model).pipe(
      map((response : User) => {
        const user = response;
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }
  //from .pipe function, it is for persisting logged-in user and User interface in user.ts from _models is used as validating data.
  setCurrentUser(user:User){              //call this from app.component.ts
    this.currentUserSource.next(user);
  }
  
  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
