
let rec length list =
  match list with [] -> 0 | head :: tail -> 1 + length tail
