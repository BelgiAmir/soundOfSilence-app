import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestioneerComponent } from './questioneer.component';

describe('QuestioneerComponent', () => {
  let component: QuestioneerComponent;
  let fixture: ComponentFixture<QuestioneerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestioneerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestioneerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
