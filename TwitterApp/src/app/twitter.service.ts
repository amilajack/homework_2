import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Tweet } from './tweet';

export interface TwitterResponse {
  data: any;
  resp: any;
}

@Injectable()

export class TwitterService {

  constructor(private http: HttpClient) { }

  // create httpClient with user() that returns an observable
  // this method returns an observable which can be subscribed to (refer to app.component.ts)
  user() {
  return this.http.get<TwitterResponse>(`${environment.api}/user`);
  }

  home(since?: string) {
  return this.http.get<TwitterResponse>(`${environment.api}/home?since=${since}`);
  }

  action(property: 'favorite'|'retweet', id: string, state: boolean) {
  return this.http.post<TwitterResponse>(`${environment.api}/${property}/${id}`, {state});
  }

  search(q?: string) {
    return this.http.get<TwitterResponse>(`${environment.api}/search?q=${q}`);
  }


  }

