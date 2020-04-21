import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinUserComponent } from './user.component';

describe('UserComponent', () => {
  let component: MedecinUserComponent;
  let fixture: ComponentFixture<MedecinUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
