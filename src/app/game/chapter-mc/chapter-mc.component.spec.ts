import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterMcComponent } from './chapter-mc.component';

describe('ChapterMcComponent', () => {
  let component: ChapterMcComponent;
  let fixture: ComponentFixture<ChapterMcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterMcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterMcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
