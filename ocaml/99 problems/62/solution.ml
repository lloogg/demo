type 'a binary_tree = Empty | Node of 'a * 'a binary_tree * 'a binary_tree

let internals tree =
  let rec count tree result =
    match tree with
    | Empty -> result
    | Node (x, left, Empty) -> count left (x :: result)
    | Node (x, Empty, right) -> count right (x :: result)
    | Node (x, left, right) -> count left (x :: count right result)
  in

  count tree []
