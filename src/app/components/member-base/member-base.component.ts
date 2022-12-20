import { Component, Input } from '@angular/core';
import { Member } from '../../interfaces/Member';

@Component({
  selector: 'app-member-base',
  templateUrl: './member-base.component.html',
  styleUrls: ['./member-base.component.css']
})
export class MemberBaseComponent {
  @Input() member: Member | undefined;
}
