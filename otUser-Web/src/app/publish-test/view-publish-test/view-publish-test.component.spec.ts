import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPublishTestComponent } from './view-publish-test.component';

describe('ViewPublishTestComponent', () => {
  let component: ViewPublishTestComponent;
  let fixture: ComponentFixture<ViewPublishTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPublishTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPublishTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
