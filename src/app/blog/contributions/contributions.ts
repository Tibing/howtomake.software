export interface Contribution {
  href: string;
  date: Date;
  title: string;
}

export const CONTRIBUTIONS: Contribution[] = [
  {
    href: 'https://youtu.be/aqxsbEbh1vs',
    date: new Date(2019, 7, 15),
    title: 'Rendering Angular applications in Terminal (Angular In Depth Conf)',
  },
  {
    href: 'https://blog.angularindepth.com/angular-platforms-in-depth-part-3-rendering-angular-applications-in-terminal-117e4da9c0cc',
    date: new Date(2019, 7, 16),
    title: 'Angular Platforms in depth. Part 3. Rendering Angular applications in Terminal',
  },
  {
    href: 'https://dev.to/nikpoltoratsky/don-t-follow-rxjs-best-practices-4893',
    date: new Date(2019, 7, 15),
    title: 'Don\'t follow RxJS Best Practices',
  },
  {
    date: new Date(2019, 7, 10),
    href: 'https://blog.angularindepth.com/angular-platforms-in-depth-part-2-application-bootstrap-process-8be461b4667e',
    title: 'Angular Platforms in depth. Part 2. Application bootstrap process',
  },
  {
    href: 'https://dev.to/nikpoltoratsky/how-to-deal-with-github-spambots-5e6n',
    date: new Date(2019, 7, 10),
    title: 'How to deal with GitHub spambots',
  },
  {
    href: 'https://blog.angularindepth.com/angular-platforms-in-depth-part-1-what-are-angular-platforms-9919d45f3054',
    title: 'Angular Platforms in depth. Part 1. What are Angular Platforms?',
    date: new Date(2019, 7, 7),
  },
  {
    href: 'https://blog.angularindepth.com/doing-a11y-easily-with-angular-cdk-keyboard-navigable-lists-d32f458b8851',
    date: new Date(2019, 5, 7),
    title: 'Doing A11y easily with Angular CDK. Keyboard-Navigable Lists\n',
  },
  {
    href: 'https://blog.angularindepth.com/building-tooltips-for-angular-3cdaac16d138',
    date: new Date(2019, 2, 13),
    title: 'Tooltip with Angular CDK',
  },
  {
    href: 'https://blog.angular.io/nebular-meets-angular-cdk-b83fc921d6b2',
    date: new Date(2019, 1, 31),
    title: 'Nebular meets Angular CDK',
  },
  {
    href: 'https://www.akveo.com/blog/angular-change-detection',
    date: new Date(2019, 5, 11),
    title: 'How Angular detects changes',
  },
];
