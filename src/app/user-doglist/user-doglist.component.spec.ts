import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDoglistComponent } from './user-doglist.component';

describe('UserDoglistComponent', () => {
  let component: UserDoglistComponent;
  let fixture: ComponentFixture<UserDoglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDoglistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDoglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
