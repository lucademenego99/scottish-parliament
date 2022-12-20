import { Component } from '@angular/core';
import { Member } from '../../interfaces/Member';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent {
  members: Member[] = [];
  constructor(private membersService: MembersService) {
    this.membersService.getMembers().then((members: Member[]) => {
      this.members = members;
    });
  }
}
