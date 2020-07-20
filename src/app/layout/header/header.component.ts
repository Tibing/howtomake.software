import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';


@Component({
  selector: '[np-header]',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterViewInit {

  @ViewChild('toggle', { read: ElementRef }) toggle: ElementRef;

  constructor(private router: Router) {
  }

  ngAfterViewInit(): void {
    fromEvent(this.toggle.nativeElement, 'change')
      .subscribe(() => this.toggleBodyOverflow(this.toggle.nativeElement.checked));

    this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
      )
      .subscribe(() => this.toggle.nativeElement.checked = false);
  }

  toggleBodyOverflow(checked: boolean): void {
    document.documentElement.style.overflow = checked ? 'hidden' : 'auto';
  }

  close(): void {
    this.toggle.nativeElement.checked = false;
    this.toggleBodyOverflow(false);
  }
}
