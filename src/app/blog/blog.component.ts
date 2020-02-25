import { AfterViewChecked, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { HighlightService } from './highlight.service';
import { MetadataService } from './metadata.service';


@Component({
  selector: 'app-blog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit, AfterViewChecked {

  constructor(private highlight: HighlightService,
              private metadata: MetadataService) {
  }

  ngOnInit(): void {
    this.highlight.highlightAll();

  }

  ngAfterViewChecked(): void {
    this.metadata.trackMetadataChanges();
  }
}
