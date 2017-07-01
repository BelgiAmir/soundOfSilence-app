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
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RouterModule, Routes, } from '@angular/router';
import { provideRoutes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SharedService } from './shared/shared.service';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ExterminateComponent } from './exterminate/exterminate.component';
import { QuestioneerComponent } from './questioneer/questioneer.component';
import { TetrisComponent } from './tetris/tetris.component';
import { TimerComponent } from './timer/timer.component';
import { AutofocusDirective } from './shared/focus.directive';
import { InstructionsComponent } from './instructions/instructions.component';
import { SelfReportComponent } from './self-report/self-report.component';
import { PosterService } from './shared/poster.service';
import { InstructionsService } from './instructions/instructions.service';

@NgModule({
  declarations: [
    AppComponent,
    SlidesComponent,
    QuestionComponent,
    WelcomeComponent,
    ErrorPageComponent,
    ExterminateComponent,
    QuestioneerComponent,
    TetrisComponent,
    TimerComponent,
    AutofocusDirective,
    InstructionsComponent,
    SelfReportComponent,
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
    ProgressbarModule.forRoot()
  ],
  providers: [PosterService, SlidesService, SharedService, InstructionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
