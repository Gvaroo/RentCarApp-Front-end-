import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCarCardComponent } from './delete-car-card.component';

describe('DeleteCarCardComponent', () => {
  let component: DeleteCarCardComponent;
  let fixture: ComponentFixture<DeleteCarCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteCarCardComponent]
    });
    fixture = TestBed.createComponent(DeleteCarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
