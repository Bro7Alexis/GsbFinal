import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmedicamentComponent } from './addmedicament.component';

describe('AddmedicamentComponent', () => {
  let component: AddmedicamentComponent;
  let fixture: ComponentFixture<AddmedicamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmedicamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmedicamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
