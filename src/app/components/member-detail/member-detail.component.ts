import { Component, Input } from '@angular/core';
import { Gender } from 'src/app/enums/Gender';
import { Member } from '../../interfaces/Member';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
})
export class MemberDetailComponent {
  @Input() member: Member | undefined;

  onImageError(event: any) {
    event.target.src = this.member?.GenderTypeID == Gender.MALE ? 'assets/male.jpg' : 'assets/female.jpg';
  }
}
