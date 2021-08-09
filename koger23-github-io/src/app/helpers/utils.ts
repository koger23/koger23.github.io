export class Utils {
  public static replaceAll(find: string, replace: string, str: string): string {
    while (str.indexOf(find) > -1) {
      str = str.replace(find, replace);
    }

    return str;
  }

  public static removeHtmlTags(htmlContent: string) {
      const pattern = new RegExp("\\<.*?\\>");

      htmlContent = new String(htmlContent).replace(pattern, "");
   
      return htmlContent;
  }
}
