import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { BlogService, Post } from './blog.service';


@Component({
  selector: 'np-blog',
  styleUrls: ['./blog.component.scss'],
  templateUrl: './blog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {


  readonly new$: Observable<Post> = this.blog.new$;

  readonly stream$: Observable<Post[]> = this.blog.stream$;

  constructor(private blog: BlogService, title: Title, meta: Meta) {
    title.setTitle('Blog by Nikita Poltoratsky');
    meta.updateTag({ name: 'description', content: 'Personal blog by Nikita Poltoratsky' });
    meta.updateTag({ name: 'og:image', content: '/assets/home/cover.png' });
  }
}
