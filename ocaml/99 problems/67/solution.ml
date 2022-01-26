type 'a binary_tree = Empty | Node of 'a * 'a binary_tree * 'a binary_tree

let rec string_of_tree = function
  | Empty -> ""
  | Node (data, l, r) -> (
      let data = String.make 1 data in
      match (l, r) with
      | Empty, Empty -> data
      | _, _ -> data ^ "(" ^ string_of_tree l ^ "," ^ string_of_tree r ^ ")")
