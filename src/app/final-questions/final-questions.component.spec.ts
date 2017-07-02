import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalQuestionsComponent } from './final-questions.component';

describe('FinalQuestionsComponent', () => {
  let component: FinalQuestionsComponent;
  let fixture: ComponentFixture<FinalQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
