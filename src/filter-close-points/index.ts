import { Observable, scan, filter, map } from "rxjs";

export function filterClosePoints(input: Observable<{ x: number, y: number }>): Observable<{ x: number, y: number }> {
  return input.pipe(
    scan((acc, point) => {
      if (!acc.previousPoint) {
        return { ...acc, previousPoint: point, emit: true };
      }

      const distance = Math.sqrt(
        Math.pow(point.x - acc.previousPoint.x, 2) +
        Math.pow(point.y - acc.previousPoint.y, 2)
      );

      if (distance >= 1) {
        return { previousPoint: point, emit: true };
      }

      return { ...acc, emit: false };
    }, { previousPoint: null, emit: false }),
    filter(state => state.emit),
    map(state => state.previousPoint),
  )
}
