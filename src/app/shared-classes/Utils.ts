export class Utils {
  static doNothing(): void {
  }

  static getRandomNumbersInRange(start: number, end: number, count: number): number[] {
    const res: number[] = [];
    for (let i = 0; i < count; i++) {
      let nextRandomValue: number = Math.round(Math.random() * (end - start) + start);
      if (!res.some(val => val === nextRandomValue)) {
        res.push(nextRandomValue);
      } else {
        i--;
      }
    }

    return res;
  }
}
