import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';

import { MeetingsService } from './meetings.service';

describe('MeetingsService', () => {
  let service: MeetingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MeetingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getMeetings should return value from observable', fakeAsync(() => {
    service.getMeetings().subscribe((value) => {
      expect(value).toBe('observable value');
    });
  }));

  it('#getEnrolledMeetings should return value from observable', fakeAsync(() => {
    service.getEnrolledMeetings().subscribe((value) => {
      expect(value).toBe('observable value');
    });
  }));

  it('#getOrganizedMeetings should return value from observable', fakeAsync(() => {
    service.getOrganizedMeetings().subscribe((value) => {
      expect(value).toBe('observable value');
    });
  }));
});
