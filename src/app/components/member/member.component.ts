import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../../interfaces/Member';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {
  member: Member | undefined;

  constructor(private _ActivatedRoute: ActivatedRoute, private membersService: MembersService) {
    const id = this._ActivatedRoute.snapshot.paramMap.get('id');

    this.membersService.getMemberDetails(Number(id)).then((member: Member | undefined) => {
      this.member = member;
    });
  }
}
