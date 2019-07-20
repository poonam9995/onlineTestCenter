import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestTempletComponent } from './view-test-templet.component';

describe('ViewTestTempletComponent', () => {
  let component: ViewTestTempletComponent;
  let fixture: ComponentFixture<ViewTestTempletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTestTempletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTestTempletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
