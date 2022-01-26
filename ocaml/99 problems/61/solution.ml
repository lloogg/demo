type 'a binary_tree = Empty | Node of 'a * 'a binary_tree * 'a binary_tree

let rec count_leaves tree =
  match tree with
  | Empty -> 0
  | Node (_, Empty, Empty) -> 1
  | Node (_, left, right) -> count_leaves left + count_leaves right
