import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturetableComponent } from './facturetable.component';

describe('FacturetableComponent', () => {
  let component: FacturetableComponent;
  let fixture: ComponentFixture<FacturetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
