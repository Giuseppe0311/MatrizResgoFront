import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostmatrizComponent } from './postmatriz.component';

describe('PostmatrizComponent', () => {
  let component: PostmatrizComponent;
  let fixture: ComponentFixture<PostmatrizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostmatrizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostmatrizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
