import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookingPageComponent } from './create-booking-page.component';

describe('CreateBookingPageComponent', () => {
  let component: CreateBookingPageComponent;
  let fixture: ComponentFixture<CreateBookingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBookingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBookingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
