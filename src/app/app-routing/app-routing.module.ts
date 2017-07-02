import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, } from '@angular/router';
import { QuestionComponent } from '../question/question.component';
import { SlidesComponent } from '../slides/slides.component';
import { ErrorPageComponent } from '../error-page/error-page.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { ExterminateComponent } from '../exterminate/exterminate.component';
import { TetrisComponent } from '../tetris/tetris.component';
import { InstructionsComponent } from '../instructions/instructions.component';
import { SelfReportComponent } from '../self-report/self-report.component';
import { FinalQuestionsComponent } from '../final-questions/final-questions.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'questions', component: QuestionComponent },
      { path: 'final', component: FinalQuestionsComponent },
      { path: 'slides', component: SlidesComponent },
      { path: 'exetrminate', component: ExterminateComponent },
      { path: 'tetris', component: TetrisComponent },
      { path: 'instructions', component: InstructionsComponent },
      { path: 'selfReport', component: SelfReportComponent },
      { path: '', component: WelcomeComponent },
      { path: '**', component: WelcomeComponent }
    ])
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
