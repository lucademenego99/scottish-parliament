import { Component, Input } from '@angular/core';
import { Gender } from 'src/app/enums/Gender';
import { Member } from '../../interfaces/Member';

@Component({
  selector: 'app-member-base',
  templateUrl: './member-base.component.html',
  styleUrls: ['./member-base.component.css']
})
export class MemberBaseComponent {
  @Input() member: Member | undefined;

  onImageError(event: any) {
    event.target.src = this.member?.GenderTypeID == Gender.MALE ? 'assets/male.jpg' : 'assets/female.jpg';
  }
}
