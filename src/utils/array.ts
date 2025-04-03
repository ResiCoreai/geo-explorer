export function prevCircular<T>(arr: T[], index: number) {
  if (arr.length === 0) return null;
  return arr[(index - 1 + arr.length) % arr.length];
}

export function nextCircular<T>(arr: T[], index: number) {
  if (arr.length === 0) return null;
  return arr[(index + 1) % arr.length];
}
