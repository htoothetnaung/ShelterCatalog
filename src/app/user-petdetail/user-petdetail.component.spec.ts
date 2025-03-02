import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPetdetailComponent } from './user-petdetail.component';

describe('UserPetdetailComponent', () => {
  let component: UserPetdetailComponent;
  let fixture: ComponentFixture<UserPetdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPetdetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPetdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
