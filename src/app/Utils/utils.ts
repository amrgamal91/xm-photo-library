export class Utility {
  static handleBreakPoint(windowWidt: number): number {
    return windowWidt <= 600 ? 1 : 3;
  }
}
