import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'webp' })
export class WebpPipe implements PipeTransform {

  transform(path: string): string {
    if (path.startsWith('http')) {
      return path;
    }

    const extensions: string[] = ['jpg', 'png', 'webp', 'jpeg'];
    const ext: string | undefined = extensions.find((e: string) => path.endsWith(e));

    if (ext) {
      path = path.slice(0, path.lastIndexOf(ext));
    }

    return `${path}webp`;
  }
}
