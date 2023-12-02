import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCatalogoComponent } from './admin-catalogo.component';

describe('AdminCatalogoComponent', () => {
  let component: AdminCatalogoComponent;
  let fixture: ComponentFixture<AdminCatalogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCatalogoComponent]
    });
    fixture = TestBed.createComponent(AdminCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
