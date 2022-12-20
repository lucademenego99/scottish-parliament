import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MemberBaseComponent } from './member-base.component';

describe('MemberBaseComponent', () => {
  let component: MemberBaseComponent;
  let fixture: ComponentFixture<MemberBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [ MemberBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
