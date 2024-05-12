import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaseventosComponent } from './tablaseventos.component';

describe('TablaseventosComponent', () => {
  let component: TablaseventosComponent;
  let fixture: ComponentFixture<TablaseventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaseventosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaseventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
