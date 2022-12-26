import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../../interfaces/Member';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-member',
  template: `
    <div>
        <app-member-detail [member]="member"></app-member-detail>
    </div>
  `
})
export class MemberComponent {
  member: Member | undefined;

  constructor(private _ActivatedRoute: ActivatedRoute, private _Router: Router, private membersService: MembersService) {}

  ngOnInit(): void {
    const id = this._ActivatedRoute.snapshot.paramMap.get('id');

    this.membersService.getMemberDetails(Number(id)).then((member: Member | undefined) => {
      if (member === undefined) {
        // Redirect to 404 page
        this._Router.navigate(['/404']);
      } else {
        this.member = member;
      }
    });
  }
}
