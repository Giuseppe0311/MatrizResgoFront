import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatematrizComponent } from './updatematriz.component';

describe('UpdatematrizComponent', () => {
  let component: UpdatematrizComponent;
  let fixture: ComponentFixture<UpdatematrizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatematrizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatematrizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
