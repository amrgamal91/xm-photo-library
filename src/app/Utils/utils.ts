export class Utility {
  static handleBreakPoint(windowWidth: number): number {
    return windowWidth <= 600 ? 1 : 3;
  }
}
