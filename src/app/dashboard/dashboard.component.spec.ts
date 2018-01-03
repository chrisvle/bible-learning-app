import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { BibleService } from '../shared/services/bible.service';
import { DashboardService } from './dashboard.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent
      ],
      providers: [
        BibleService,
        DashboardService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('on init', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should instantiate with data from services', () => {
      expect(component.gameTypes.length).toBe(4);
      expect(component.oldTestamentBooks.length).toBe(39);
      expect(component.newTestamentBooks.length).toBe(27);
    });
  });

  describe('functionality', () => {
    it('should set game type', () => {
      expect(component.gameType).toBeUndefined();
      component.setGameType(0);
      expect(component.gameType).toBe(component.gameTypes[0].type);
    });

    it('should reset game settings', () => {
      component.setGameType(0);
      component.oldOrNew = 'old';
      component.bibleBook = 'Genesis';
      component.resetAll();
      expect(component.gameType).toBeNull();
      expect(component.oldOrNew).toBeNull();
      expect(component.bibleBook).toBeNull();
    });
  });
});
