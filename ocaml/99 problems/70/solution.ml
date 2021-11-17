type 'a mult_tree = T of 'a * 'a mult_tree list

let string_of_tree tree =
  let rec stringify tree depth result =
    match tree with
    | T (x, []) -> result ^ (String.make 1 x) ^ (String.make depth '^')
    | T (x, h :: t) -> stringify h (depth + 1) (result ^ (String.make 1 x))
  in
  stringify tree 0 ""
