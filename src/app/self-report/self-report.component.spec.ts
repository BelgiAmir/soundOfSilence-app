import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfReportComponent } from './self-report.component';

describe('SelfReportComponent', () => {
  let component: SelfReportComponent;
  let fixture: ComponentFixture<SelfReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
