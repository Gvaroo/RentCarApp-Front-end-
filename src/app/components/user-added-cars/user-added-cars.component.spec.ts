import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddedCarsComponent } from './user-added-cars.component';

describe('UserAddedCarsComponent', () => {
  let component: UserAddedCarsComponent;
  let fixture: ComponentFixture<UserAddedCarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAddedCarsComponent]
    });
    fixture = TestBed.createComponent(UserAddedCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
