import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlikeCarCardComponent } from './unlike-car-card.component';

describe('UnlikeCarCardComponent', () => {
  let component: UnlikeCarCardComponent;
  let fixture: ComponentFixture<UnlikeCarCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnlikeCarCardComponent]
    });
    fixture = TestBed.createComponent(UnlikeCarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
