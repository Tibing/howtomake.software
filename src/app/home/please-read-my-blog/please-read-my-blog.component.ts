import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'np-please-read-my-blog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './please-read-my-blog.component.html',
  styleUrls: ['./please-read-my-blog.component.scss'],
})
export class PleaseReadMyBlogComponent {
}
