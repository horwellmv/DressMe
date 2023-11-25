import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandinPageComponent } from './landin-page.component';

describe('LandinPageComponent', () => {
  let component: LandinPageComponent;
  let fixture: ComponentFixture<LandinPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandinPageComponent]
    });
    fixture = TestBed.createComponent(LandinPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
