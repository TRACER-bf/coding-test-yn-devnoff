import { Observable, scan } from "rxjs";
import { filter, last } from 'rxjs/operators';

interface Data {
  value: number;
  category: string;
}

interface Stats {
  totalSum: number;
  categoryCounts: Record<string, number>;
}

export function processDataAndComputeStats(input: Observable<Data>): Observable<Stats> {
  return input.pipe(
    filter(({ category }) => ['A', 'B'].includes(category)),
    scan((acc, curr) => {
      acc.totalSum += curr.value;
      if (acc.categoryCounts[curr.category]) {
        acc.categoryCounts[curr.category] += 1;
      } else {
        acc.categoryCounts[curr.category] = 1;
      }
      return acc;
    }, { totalSum: 0, categoryCounts: {} }),
    last()
  );
}