let insert_at item pos list =
  let rec insert item pos list result =
    match list with
    | [] -> result
    | h :: t -> if pos > 1 then insert item (pos - 1) t (h::result) else (List.rev (item :: h :: result) @ t) in

  insert item pos list []