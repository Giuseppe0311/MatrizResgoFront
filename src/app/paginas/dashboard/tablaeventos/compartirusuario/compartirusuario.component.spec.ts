import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartirusuarioComponent } from './compartirusuario.component';

describe('CompartirusuarioComponent', () => {
  let component: CompartirusuarioComponent;
  let fixture: ComponentFixture<CompartirusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompartirusuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompartirusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
