import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
  //members:Member[];
  members$:Observable<Member[]>;                          //for ngx-spinner,otherwise as above
  constructor(private memberService:MembersService) { }

  ngOnInit(): void {
    //this.loadMembers();
    this.members$ = this.memberService.getMembers();     //for ngx-spinner,otherwise as above
  }

  //loadMembers(){
  //  this.memberService.getMembers().subscribe(members => {
  //    this.members = members;
  //  });
  //}
}
