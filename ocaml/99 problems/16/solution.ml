let drop list n =
  let rec drop' list result n default =
  match list with 
  | [] -> result
  | h :: t -> if n > 1 then drop' t (h :: result) (n - 1) default else drop' t result default default
  in

  List.rev (drop' list [] n n)