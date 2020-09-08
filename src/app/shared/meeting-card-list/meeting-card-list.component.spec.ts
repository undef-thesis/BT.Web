import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingCardListComponent } from './meeting-card-list.component';

describe('MeetingCardListComponent', () => {
  let component: MeetingCardListComponent;
  let fixture: ComponentFixture<MeetingCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingCardListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
