import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestTempletComponent } from './edit-test-templet.component';

describe('EditTestTempletComponent', () => {
  let component: EditTestTempletComponent;
  let fixture: ComponentFixture<EditTestTempletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTestTempletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTestTempletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
