import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { MemberBaseComponent } from './components/member-base/member-base.component';
import { MemberComponent } from './components/member/member.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    MemberDetailComponent,
    MemberBaseComponent,
    MemberComponent,
    PaginationComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
