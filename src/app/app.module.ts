import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppComponent } from './app.component';
import { SlidesComponent } from './slides/slides.component';
import { SlidesService } from './slides/slides.service';
import { QuestionComponent } from './question/question.component';
import { MdButtonModule, MdCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing/app-routing.module'
import { RouterModule, Routes, } from '@angular/router';
import { provideRoutes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SlidesComponent,
    QuestionComponent,
    WelcomeComponent,
    ErrorPageComponent
  ],
  imports: [ReactiveFormsModule, MaterialModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    CarouselModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [SlidesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
