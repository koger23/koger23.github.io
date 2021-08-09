export class Utils {
  public static replaceAll(find: string, replace: string, str: string): string {
    while (str.indexOf(find) > -1) {
      str = str.replace(find, replace);
    }

    return str;
  }
}
