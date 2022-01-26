type 'a binary_tree = Empty | Node of 'a * 'a binary_tree * 'a binary_tree

let at_level tree num =
  let rec at_level' tree num result =
    match tree with
    | Empty -> result
    | Node (x, left, right) ->
        if num = 0 then x :: result
        else at_level' left (num - 1) (at_level' right (num - 1) result)
  in

  at_level' tree (num - 1) []

let example_tree =
  Node
    ( 'a',
      Node ('b', Node ('d', Empty, Empty), Node ('e', Empty, Empty)),
      Node ('c', Empty, Node ('f', Node ('g', Empty, Empty), Empty)) )
