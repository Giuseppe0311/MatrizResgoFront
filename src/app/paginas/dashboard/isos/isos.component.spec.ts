import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsosComponent } from './isos.component';

describe('IsosComponent', () => {
  let component: IsosComponent;
  let fixture: ComponentFixture<IsosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IsosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IsosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
