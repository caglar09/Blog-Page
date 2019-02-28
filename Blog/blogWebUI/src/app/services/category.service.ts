
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly apiUrl='http://localhost:3000/category/List';
  constructor(private http:HttpClient) {}

  GetAllCategory(){
    return this.http.get(this.apiUrl);
  }


}
