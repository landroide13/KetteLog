import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionDetailsPage } from './session-details.page';

describe('SessionDetailsPage', () => {
  let component: SessionDetailsPage;
  let fixture: ComponentFixture<SessionDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
