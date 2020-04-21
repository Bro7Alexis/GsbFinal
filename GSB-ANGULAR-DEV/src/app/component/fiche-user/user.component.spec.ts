import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheUserComponent } from './user.component';

describe('UserComponent', () => {
  let component: FicheUserComponent;
  let fixture: ComponentFixture<FicheUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
