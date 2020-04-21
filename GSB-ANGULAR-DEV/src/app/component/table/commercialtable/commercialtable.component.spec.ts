import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialtableComponent } from './commercialtable.component';

describe('CommercialtableComponent', () => {
  let component: CommercialtableComponent;
  let fixture: ComponentFixture<CommercialtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommercialtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
