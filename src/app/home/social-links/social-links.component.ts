import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faDev, faGithubSquare, faMedium, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'np-social-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss'],
})
export class SocialLinksComponent {

  twitter = faTwitterSquare;
  medium = faMedium;
  github = faGithubSquare;
  dev = faDev;
}
