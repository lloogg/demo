type 'a binary_tree = Empty | Node of 'a * 'a binary_tree * 'a binary_tree

let leaves tree =
  let rec count tree result =
    match tree with
    | Empty -> result
    | Node (x, Empty, Empty) -> x :: result
    | Node (x, left, right) -> count left (count right result)
  in
  count tree []
