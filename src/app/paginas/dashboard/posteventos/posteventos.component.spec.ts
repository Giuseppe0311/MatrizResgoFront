import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteventosComponent } from './posteventos.component';

describe('PosteventosComponent', () => {
  let component: PosteventosComponent;
  let fixture: ComponentFixture<PosteventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosteventosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PosteventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
