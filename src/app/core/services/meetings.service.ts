import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Meeting from '../models/Meeting';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Address from '../models/Address';

@Injectable({
  providedIn: 'root',
})
export class MeetingsService {
  constructor(private http: HttpClient) {}

  public getMeetings() {
    return this.http.get<any>(`${environment.API_URL}/meetings`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  public getOrganizedMeetings() {
    return this.http.get<any>(`${environment.API_URL}/meetings/organized`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  public getEnrolledMeetings() {
    return this.http.get<any>(`${environment.API_URL}/meetings/enrolled`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  public getMeetingDetails(id: number) {
    return this.http.get<any>(`${environment.API_URL}/meetings/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  public addMeeting(
    meeting: Meeting,
    address: Address,
    categoryId: string,
    images
  ): any {
    const formData = new FormData();

    Object.keys(meeting).forEach((key) => {
      if (meeting[key] !== undefined) {
        formData.append(key, meeting[key]);
      }
    });
    Object.keys(address).forEach((key) => {
      formData.append(key, address[key]);
    });

    for (var i = 0; i < images.length; i++) {
      console.log(images[i]);
      formData.append('images', images[i]);
    }

    formData.append('categoryId', categoryId);

    return this.http
      .post<any>(`${environment.API_URL}/meetings`, formData)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
