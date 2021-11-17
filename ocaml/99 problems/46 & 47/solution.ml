type bool_expr =
  | Var of string
  | Not of bool_expr
  | And of bool_expr * bool_expr
  | Or of bool_expr * bool_expr

let table2 a b expr =
  let rec calculate_expr a fa b fb expr =
    match expr with
    | Var x -> if x = a then fa else fb
    | Not x -> if x = a then not fa else not fb
    | And (x, y) -> calculate_expr a fa b fb x && calculate_expr a fa b fb y
    | Or (x, y) -> calculate_expr a fa b fb x || calculate_expr a fa b fb y
  in

  let table2' a b expr =
    [
      (true, true, calculate_expr a true b true expr);
      (true, false, calculate_expr a true b false expr);
      (false, true, calculate_expr a false b true expr);
      (false, false, calculate_expr a false b false expr);
    ]
  in
  table2' a b expr
