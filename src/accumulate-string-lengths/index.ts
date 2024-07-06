import { Observable } from "rxjs";
import { scan, map } from "rxjs/operators";

export function accumulateStringLengths(input: Observable<string>): Observable<number> {
  return input.pipe(
    map(str => str.length),  
    scan((acc, length) => acc + length, 0)  
  );
}
