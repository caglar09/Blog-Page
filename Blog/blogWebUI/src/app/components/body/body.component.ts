import { PostService } from './../../services/post.service';
import { Post } from './../../models/post';
import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  categories:Category[];
  posts:Post[];
  constructor(private categoryService:CategoryService,private postSevice:PostService) { }

  ngOnInit() {
  this.categoryService.GetAllCategory().subscribe((result:Category[])=>this.categories=result);
  this.postSevice.GelAllPost().subscribe((post:Post[])=>this.posts=post);
  }

}
