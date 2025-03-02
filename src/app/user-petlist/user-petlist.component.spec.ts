import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPetlistComponent } from './user-petlist.component';

describe('UserPetlistComponent', () => {
  let component: UserPetlistComponent;
  let fixture: ComponentFixture<UserPetlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPetlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPetlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
