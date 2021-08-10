import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from '../helpers/utils';

@Pipe({
  name: 'shortenContent'
})
export class ShortenContentPipe implements PipeTransform {

  transform(htmlContent: string, ...args: string[]): string {
    let shortenContent: string;
    
    htmlContent = Utils.replaceAll("&quot;", '"', htmlContent); // replace quotes

    shortenContent = `${htmlContent.slice(htmlContent.indexOf("<p>") + 3, htmlContent.length)}...`;

    let maxLength = shortenContent.length > 300 ? 300 : shortenContent.length;
    shortenContent = shortenContent.replace(/(<([^>]+)>)/ig , ''); // remove HTML tags
    shortenContent = `${shortenContent.slice(0, maxLength)}...`;

    return shortenContent;
  }

}
