import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { FormControl } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: '[np-header]',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  hamburger = new FormControl();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
      )
      .subscribe(() => this.hamburger.patchValue(false));
  }
}
