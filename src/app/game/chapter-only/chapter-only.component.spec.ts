import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterOnlyComponent } from './chapter-only.component';

xdescribe('ChapterOnlyComponent', () => {
  let component: ChapterOnlyComponent;
  let fixture: ComponentFixture<ChapterOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
