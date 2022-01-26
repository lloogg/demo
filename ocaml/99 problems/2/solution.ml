let rec last_two l =
  match l with
  | [] -> None
  | [ x ] -> None
  | [ last_but_two; last ] -> Some (last_but_two, last)
  | head :: tail -> last_two tail
