import { Observable, filter, toArray, take } from "rxjs";

export function collectSpecificData(input: Observable<number>): Observable<number[]> {
  return input.pipe(
    filter(num => num % 2 === 0),
    filter(num => num >= 6),
    take(3),
    toArray()
  );
}
