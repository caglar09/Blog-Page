import { CategoryService } from './services/category.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }  from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';
import { DetailComponent } from './components/detail/detail.component';
import { RouterModule } from '@angular/router';
import { AddpostComponent } from './components/admin/addpost/addpost.component';

const routeConfig: RouterModule[] = [
  {
    path: '',
    component: BodyComponent
  },
  {
    path: '',
    component: HeaderComponent
  },
  {
    path: '',
    component: FooterComponent
  },
  {
    path: '',
    component: DetailComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    DetailComponent,
    AddpostComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routeConfig),
    HttpClientModule
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
