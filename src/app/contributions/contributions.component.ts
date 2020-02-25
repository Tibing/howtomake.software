import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Contribution {
  href: string;
  date: string;
  title: string;
}

@Component({
  selector: 'np-contributions',
  styleUrls: ['./contributions.component.scss'],
  templateUrl: './contributions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContributionsComponent {

  articles: Contribution[] = [
    {
      href: 'https://blog.angularindepth.com/angular-platforms-in-depth-part-3-rendering-angular-applications-in-terminal-117e4da9c0cc',
      date: 'JUL 16, 2019',
      title: 'Angular Platforms in depth. Part 3. Rendering Angular applications in Terminal',
    },
    {
      href: 'https://dev.to/nikpoltoratsky/don-t-follow-rxjs-best-practices-4893',
      date: 'JUL 15, 2019',
      title: 'Don\'t follow RxJS Best Practices',
    },
    {
      href: 'https://blog.angularindepth.com/angular-platforms-in-depth-part-2-application-bootstrap-process-8be461b4667e',
      title: 'Angular Platforms in depth. Part 2. Application bootstrap process',
      date: 'JUL 10, 2019',
    },
    {
      href: 'https://dev.to/nikpoltoratsky/how-to-deal-with-github-spambots-5e6n',
      date: 'JUL 10, 2019',
      title: 'How to deal with GitHub spambots',
    },
    {
      href: 'https://blog.angularindepth.com/angular-platforms-in-depth-part-1-what-are-angular-platforms-9919d45f3054',
      title: 'Angular Platforms in depth. Part 1. What are Angular Platforms?',
      date: 'JUL 7, 2019',
    },
    {
      href: 'https://blog.angularindepth.com/doing-a11y-easily-with-angular-cdk-keyboard-navigable-lists-d32f458b8851',
      date: 'MAY 16, 2019',
      title: 'Doing A11y easily with Angular CDK. Keyboard-Navigable Lists\n',
    },
    {
      href: 'https://blog.angularindepth.com/building-tooltips-for-angular-3cdaac16d138',
      date: 'FEB 13, 2019',
      title: 'Tooltip with Angular CDK',
    },
    {
      href: 'https://blog.angular.io/nebular-meets-angular-cdk-b83fc921d6b2',
      date: 'JAN 31, 2019',
      title: 'Nebular meets Angular CDK',
    },
    {
      href: 'https://www.akveo.com/blog/angular-change-detection',
      date: 'MAY 11, 2018',
      title: 'How Angular detects changes',
    },
  ];

  talks: Contribution[] = [
    {
      href: 'https://youtu.be/aqxsbEbh1vs',
      date: 'JUL 15, 2019',
      title: 'Rendering Angular applications in Terminal (Angular In Depth Conf)',
    },
  ];
}
