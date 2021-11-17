

let rec at num list =
  match list with
  | [] -> None
  | head :: tail -> if num > 1 then at (num - 1) tail else Some head
