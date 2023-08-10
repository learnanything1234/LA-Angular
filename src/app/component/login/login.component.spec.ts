import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/shared/auth.service';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService, LoginComponent],
      imports: [RouterTestingModule] // Add RouterTestingModule
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more test cases for LoginComponent behavior

});
