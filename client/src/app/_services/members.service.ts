import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members:Member[] = [];                  //for ngx-spinner otherwise it is not necessary
  constructor(private http:HttpClient) { }

  getMembers(){
    if(this.members.length > 0) return of(this.members);   //for ngx-spinner otherwise it is not necessary
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(        //from .pipe() method,it is only for ngx-spinner
      map(members => {
        this.members = members;
        return members;
      })
    );
  }

  getMember(username:string){
    const member = this.members.find(x => x.username === username);    //for ngx-spinner otherwise it is not necessary
    if(member !== undefined) return of(member);                        //for ngx-spinner otherwise it is not necessary
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member:Member){
    return this.http.put(this.baseUrl + 'users',member).pipe(         //from .pipe() method,it is only for ngx-spinner
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );                
  }

  setMainPhoto(photoId:number){
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId,{});
  }

  deletePhoto(photoId:number){
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}
