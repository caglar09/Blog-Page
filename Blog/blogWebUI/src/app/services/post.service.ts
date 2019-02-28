import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly apiUrl='http://localhost:3000/makale/List';

  constructor(private http:HttpClient) { }

  GelAllPost(){
    return this.http.get(this.apiUrl);
  }
}
