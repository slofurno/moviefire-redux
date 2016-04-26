function numericSort(a, b) {
  return a - b
}
export function union(xs1 = [], ys1 = []) {
  let xs = xs1.slice()
  let ys = ys1.slice()
  xs.sort(numericSort)
  ys.sort(numericSort)

  let i = 0
  let j = 0
  let acc = []

  for(;i < xs.length && j < ys.length;) {
    if (xs[i] < ys[j]) {
      i++
    } else if (ys[j] < xs[i]) {
      j++
    } else {
      acc.push(xs[i])
      i++
      j++
    }
  }

  return acc
}
