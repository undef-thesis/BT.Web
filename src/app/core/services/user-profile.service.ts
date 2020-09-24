import { Profile } from './../models/Profile';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private http: HttpClient) {}

  public getUserProfile(): Observable<Profile> {
    return this.http.get<any>(`${environment.API_URL}/account`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  public updateProfileData(profile: Profile) {
    return this.http.post<any>(`${environment.API_URL}/account`, profile).pipe(
      map((response) => {
        return response;
      })
    );
  }

  public updateAvatar(avatar) {
    const formData = new FormData();
    formData.append('avatar', avatar);

    return this.http.post<any>(`${environment.API_URL}/account`, formData).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
