type bool_expr =
  | Var of string
  | Not of bool_expr
  | And of bool_expr * bool_expr
  | Or of bool_expr * bool_expr

let table var_list expr =
  let rec calculate var_list expr =
    match expr with
    | Var x -> List.assoc x var_list
    | Not x -> not (calculate var_list x)
    | And (x, y) -> calculate var_list x && calculate var_list y
    | Or (x, y) -> calculate var_list x || calculate var_list y
  in
  let rec table_make result vars expr =
    match vars with
    | [] -> [ (List.rev result, calculate result expr) ]
    | h :: t ->
      table_make ((h, true) :: result) t expr
      @ table_make ((h, false) :: result) t expr
  in

  table_make [] var_list expr
