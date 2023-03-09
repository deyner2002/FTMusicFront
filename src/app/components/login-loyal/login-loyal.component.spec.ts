import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLoyalComponent } from './login-loyal.component';

describe('LoginLoyalComponent', () => {
  let component: LoginLoyalComponent;
  let fixture: ComponentFixture<LoginLoyalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginLoyalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginLoyalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
