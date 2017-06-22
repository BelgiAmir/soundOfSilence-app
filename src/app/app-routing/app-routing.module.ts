import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, } from '@angular/router';
import { QuestionComponent } from '../question/question.component';
import { SlidesComponent } from '../slides/slides.component';
import { ErrorPageComponent } from '../error-page/error-page.component';
import { WelcomeComponent } from '../welcome/welcome.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'questions', component: QuestionComponent },
      { path: 'slides', component: SlidesComponent },
      { path: '', component: WelcomeComponent },
      { path: '**', component: WelcomeComponent }
    ])
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
