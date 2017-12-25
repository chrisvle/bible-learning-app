import { ReflectiveInjector } from '@angular/core';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let dashboardService;

  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      DashboardService
    ]);

    dashboardService = this.injector.get(DashboardService);
  });

  it('should be created', () => {
    expect(dashboardService).toBeTruthy();
  });

  it('should return game types', () => {
    const gameTypes = dashboardService.getGameTypes();
    expect(gameTypes.length).toBe(4);
  });
});
