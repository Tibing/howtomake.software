import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetsGetAcquaintedComponent } from './lets-get-acquainted.component';

describe('LetsGetAcquaintedComponent', () => {
  let component: LetsGetAcquaintedComponent;
  let fixture: ComponentFixture<LetsGetAcquaintedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LetsGetAcquaintedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetsGetAcquaintedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
