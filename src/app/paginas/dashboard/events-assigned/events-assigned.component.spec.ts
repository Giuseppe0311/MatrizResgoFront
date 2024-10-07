import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsAssignedComponent } from './events-assigned.component';

describe('EventsAssignedComponent', () => {
  let component: EventsAssignedComponent;
  let fixture: ComponentFixture<EventsAssignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsAssignedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
