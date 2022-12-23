import { Component } from '@angular/core';
import { Member } from 'src/app/interfaces/Member';
import { MembersService } from 'src/app/services/members.service';
import { MemberBaseComponent } from '../member-base/member-base.component';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  members: Member[] = [];
  currentPage: number = 0;
  pages: Member[][] = [];
  itemsPerPage: number = 12;
  fakeCards: number[] = [];
  
  constructor(private membersService: MembersService) {
    this.fakeCards = new Array(this.itemsPerPage).fill(0).map((x, i) => i);
    this.membersService.getMembers().then((members: Member[]) => {
      this.members = members;
      this.pages = this.getPages(this.members, this.itemsPerPage);
    });
  }

  getPages(members: Member[], pageSize: number) {
    let pages: Member[][] = [];
    let page: Member[] = [];
    members.forEach((member, index) => {
      if (index % pageSize === 0) {
        page = [];
        pages.push(page);
      }
      page.push(member);
    });
    return pages;
  }

  getPagesCount() {
    return this.pages.length;
  }

  nextPage() {
    if (this.currentPage < this.getPagesCount()) {
      this.currentPage++;
      window.scrollTo(0, 0);
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      window.scrollTo(0, 0);
    }
  }
}
