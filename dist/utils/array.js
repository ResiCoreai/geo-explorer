export function prevCircular(arr, index) {
  if (arr.length === 0) return null;
  return arr[(index - 1 + arr.length) % arr.length];
}
export function nextCircular(arr, index) {
  if (arr.length === 0) return null;
  return arr[(index + 1) % arr.length];
}
