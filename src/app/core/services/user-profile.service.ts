import { Profile } from './../models/Profile';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private http: HttpClient) {}

  public getUserProfile() {
    return this.http.get<any>(`${environment.API_URL}/account`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  public addProfile(profile: Profile) {
    console.log(profile);

    const formData = new FormData();

    Object.keys(profile).forEach((key) => {
      formData.append(key, profile[key]);
    });

    return this.http.post<any>(`${environment.API_URL}/account`, formData).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
