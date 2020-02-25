import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faDev, faGithubSquare, faMedium, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'np-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  twitter = faTwitterSquare;
  medium = faMedium;
  github = faGithubSquare;
  dev = faDev;
}
