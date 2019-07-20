import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestTempletComponent } from './add-test-templet.component';

describe('AddTestTempletComponent', () => {
  let component: AddTestTempletComponent;
  let fixture: ComponentFixture<AddTestTempletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTestTempletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTestTempletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
