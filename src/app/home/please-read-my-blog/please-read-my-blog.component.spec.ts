import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaseReadMyBlogComponent } from './please-read-my-blog.component';

describe('PleaseReadMyBlogComponent', () => {
  let component: PleaseReadMyBlogComponent;
  let fixture: ComponentFixture<PleaseReadMyBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PleaseReadMyBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PleaseReadMyBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
