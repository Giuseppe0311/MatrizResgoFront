import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaeventosComponent } from './tablaeventos.component';

describe('TablaeventosComponent', () => {
  let component: TablaeventosComponent;
  let fixture: ComponentFixture<TablaeventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaeventosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaeventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
