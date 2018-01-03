import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authenticated = true;
  const authServiceStub = {
    isAuthenticated: () => authenticated
  };
  const routerStub = jasmine.createSpyObj('router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    });
  });

  beforeEach(inject([AuthGuard], (g: AuthGuard) => {
    authGuard = g;
  }));

  it('should activate when the user is authenticated', async(() => {
    expect(authGuard.canActivate()).toBe(true);
    expect(routerStub.navigate).not.toHaveBeenCalled();
  }));

  it('should not activate when user is not authenticated', async(() => {
    authenticated = false;
    expect(authGuard.canActivate()).toBe(false);
    expect(routerStub.navigate).toHaveBeenCalled();
  }));
});
