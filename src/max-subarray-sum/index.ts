import { Observable, scan, last, map } from "rxjs";

export function maxSubarraySum(m: Observable<number>): Observable<number[]> {
  return m.pipe(
    // 스캔 연산자를 사용해 부분 배열 합을 계산하고 최대 합을 추적
    scan((acc, current) => {
      // 현재 요소를 포함하는 새로운 부분 배열 생성
      const newSubarray = [...acc.currentSubarray, current];
      const newSum = acc.currentSum + current;

      // 새로운 부분 배열이 더 크다면 갱신, 아니면 현재 상태 유지
      const updatedSubarray = newSum > current ? newSubarray : [current];
      const updatedSum = Math.max(newSum, current);

      const newAccumulator = {
        currentSubarray: updatedSubarray,
        currentSum: updatedSum,
        maxSubarray: updatedSum > acc.maxSum ? updatedSubarray : acc.maxSubarray, // 새로운 부분 배열의 합이 maxSum 보다 크다면 maxSubarray 갱신
        maxSum: Math.max(acc.maxSum, updatedSum),
      };

      console.log('Current Element:', current);
      console.log('Current Subarray:', newAccumulator.currentSubarray);
      console.log('Current Sum:', newAccumulator.currentSum);
      console.log('Max Subarray:', newAccumulator.maxSubarray);
      console.log('Max Sum:', newAccumulator.maxSum);
      console.log('------------------------');

      return newAccumulator;
    }, { currentSubarray: [], currentSum: 0, maxSubarray: [], maxSum: -Infinity }),

    // 마지막 결과만 추출
    last(),
    
    map(result => result.maxSubarray)
  );
}
