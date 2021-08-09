import { stringify } from '@angular/compiler/src/util';
import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from '../helpers/utils';

@Pipe({
  name: 'shortenContent'
})
export class ShortenContentPipe implements PipeTransform {

  transform(htmlContent: string, ...args: string[]): string {
    let shortenContent: string;
    const pattern = new RegExp("\\<.*?\\>");
    
    htmlContent = Utils.replaceAll("&quot;", '"', htmlContent); // replace quotes
    htmlContent = htmlContent.replace(pattern, ''); // remove HTML tags

    shortenContent = `${htmlContent.slice(htmlContent.indexOf("<p>") + 3, 300)}...`;

    return shortenContent;
  }

}
