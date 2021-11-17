type 'a binary_tree = Empty | Node of 'a * 'a binary_tree * 'a binary_tree

let construct list =
  let rec insert i tree =
    match tree with
    | Empty -> Node (i, Empty, Empty)
    | Node (value, left, right) ->
        if i < value then Node (value, insert i left, right)
        else Node (value, left, insert i right)
  in

  let rec construct' list result =
    match list with [] -> result | h :: t -> construct' t (insert h result)
  in

  construct' list Empty
