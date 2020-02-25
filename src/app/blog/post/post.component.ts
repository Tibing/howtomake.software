import { AfterViewChecked, ChangeDetectionStrategy, Component } from '@angular/core';

import { HighlightService } from '../highlight.service';
import { MetadataService } from '../metadata.service';


@Component({
  selector: 'np-post',
  styleUrls: ['./post.component.scss'],
  templateUrl: './post.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements AfterViewChecked {

  constructor(private highlightService: HighlightService,
              private metadataService: MetadataService) {
  }

  ngAfterViewChecked(): void {
    this.highlightService.highlightAll();
    this.metadataService.trackMetadataChanges();
  }
}
