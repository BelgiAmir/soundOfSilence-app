import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AppComponent } from './app.component';
import { SlidesComponent } from './slides/slides.component';
import { SlidesService } from './slides/slides.service';

@NgModule({
  declarations: [
    AppComponent,
    SlidesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(), 
    CarouselModule.forRoot()
  ],
  providers: [SlidesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
