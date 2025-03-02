import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionHistoryComponent } from './adoption-history.component';

describe('AdoptionHistoryComponent', () => {
  let component: AdoptionHistoryComponent;
  let fixture: ComponentFixture<AdoptionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
