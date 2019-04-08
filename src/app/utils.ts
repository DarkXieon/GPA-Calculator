export class Utils {

  public static GetOutput(num: number): string {

    return !isNaN(num) ? num.toFixed(2) : "";
  }
}
