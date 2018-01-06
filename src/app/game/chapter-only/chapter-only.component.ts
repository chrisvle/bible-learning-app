import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './chapter-only.component.html',
  styleUrls: ['./chapter-only.component.scss']
})
export class ChapterOnlyComponent implements OnInit {

  book: string;

  constructor(private ar: ActivatedRoute, private router: Router) {
    this.book = this.ar.snapshot.queryParams['book'];
    this.router.navigateByUrl('/game/chapter-only');
  }

  ngOnInit() {
    if (!this.book) {
      this.router.navigateByUrl('/dashboard');
    }
  }
}
