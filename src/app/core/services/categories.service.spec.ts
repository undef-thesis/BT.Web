import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';

import { CategoriesService } from './categories.service';

describe('MeetingsService', () => {
  let service: CategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getCategories should return value from observable', fakeAsync(() => {
    service.getCategories().subscribe((value) => {
      expect(value).toBe('observable value');
    });
  }));
});
