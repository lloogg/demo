type 'a binary_tree =
  | Empty
  | Node of 'a * 'a binary_tree * 'a binary_tree;;

let add_trees_with left right all =
  let add_right_tree all l =
    List.fold_left (fun a r -> Node('x', l, r) :: a) all right in
  List.fold_left add_right_tree all left


let rec cbal_tree n =
  if n = 0 then [Empty] 
  else if n mod 2 = 1 then 
    let t = cbal_tree (n / 2) in
    add_trees_with t t []
  else 
    let tl = cbal_tree (n /2 -1) in
    let tr = cbal_tree (n / 2) in
    add_trees_with tl tr (add_trees_with tr tl []);;
cbal_tree 5