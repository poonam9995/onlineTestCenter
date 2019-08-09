import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPublishTestComponent } from './add-publish-test.component';

describe('AddPublishTestComponent', () => {
  let component: AddPublishTestComponent;
  let fixture: ComponentFixture<AddPublishTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPublishTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPublishTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
