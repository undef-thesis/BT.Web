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

  public getFilteredMeetings(type: string, value: string) {
    return this.http
      .get<any>(`${environment.API_URL}/meetings/filter?${type}=${value}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public citySuggest(lookingCity: string) {
    return this.http
      .get<any>(
        `${environment.API_URL}/helpers/city-suggest?lookingCity=${lookingCity}`
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public searchMeetings(term: string, city: string, country: string) {
    return this.http
      .get<any>(
        `${environment.API_URL}/meetings/search?city=${city}&country=${country}&term=${term}`
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public getMeetingDetails(id: string) {
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
    images,
    isEditMode: boolean,
    editedMeetingId: string
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
      formData.append('images', images[i]);
    }

    formData.append('categoryId', categoryId);

    if (!isEditMode) {
      return this.http
        .post<any>(`${environment.API_URL}/meetings`, formData)
        .pipe(
          map((response) => {
            return response;
          })
        );
    } else {
      return this.http
        .patch<any>(
          `${environment.API_URL}/meetings/${editedMeetingId}`,
          formData
        )
        .pipe(
          map((response) => {
            return response;
          })
        );
    }
  }

  public joinMeeting(meetingId: string): any {
    return this.http
      .post<any>(`${environment.API_URL}/meetings/join`, { id: meetingId })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public quitMeeting(meetingId: string): any {
    return this.http
      .delete<any>(`${environment.API_URL}/meetings/quit/${meetingId}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public deleteMeeting(meetingId: string): any {
    return this.http
      .delete<any>(`${environment.API_URL}/meetings/${meetingId}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
