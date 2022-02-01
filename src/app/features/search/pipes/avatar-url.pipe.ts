import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarUrl',
})
export class AvatarUrlPipe implements PipeTransform {
  private IMAGE_WIDTH = 620;

  transform(avatarUrl?: string): string {
    if (!avatarUrl) return '';

    avatarUrl = avatarUrl.replace('s=', '');
    avatarUrl = `${avatarUrl}&s=${this.IMAGE_WIDTH}`;

    return avatarUrl;
  }
}
