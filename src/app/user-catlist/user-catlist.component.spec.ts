import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCatlistComponent } from './user-catlist.component';

describe('UserCatlistComponent', () => {
  let component: UserCatlistComponent;
  let fixture: ComponentFixture<UserCatlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCatlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCatlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
