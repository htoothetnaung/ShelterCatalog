import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostDetailComponent } from './admin-post-detail.component';

describe('PostDetailComponent', () => {
  let component: AdminPostDetailComponent;
  let fixture: ComponentFixture<AdminPostDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPostDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
