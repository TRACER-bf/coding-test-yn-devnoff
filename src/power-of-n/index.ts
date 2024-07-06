import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export function powerOfN(m: number): Observable<number> {
  return new Observable<number>(observer => {
    for (let i = 1; i <= m; i++) {
      const value = i * i;
      const delayTime = (i === 1 ? 0 : (i * i) * 1000);
      console.log(`Scheduling value ${value} with delay ${delayTime} ms`);

      of(value).pipe(
        delay(delayTime)
      ).subscribe({
        next: (val) => {
          console.log(`Emitting value ${val}`);
          observer.next(val);
        },
        complete: () => {
          if (i === m) {
            console.log('All values emitted, completing Observable');
            observer.complete();
          }
        }
      });
    }
  });
}
