import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { FormControl } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';


const HOME_URL = '/';

@Component({
  selector: '[np-header]',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  hamburger = new FormControl();
  private navigationEnd: Observable<NavigationEnd> = this.router.events
    .pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
    ) as Observable<NavigationEnd>;
  showMenu$: Observable<boolean> = this.navigationEnd
    .pipe(
      map((event: NavigationEnd) => event.url !== HOME_URL),
    );

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.navigationEnd
      .subscribe(() => this.hamburger.patchValue(false));
  }
}
