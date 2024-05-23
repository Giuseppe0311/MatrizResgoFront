import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuteventosComponent } from './puteventos.component';

describe('PuteventosComponent', () => {
  let component: PuteventosComponent;
  let fixture: ComponentFixture<PuteventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuteventosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PuteventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
