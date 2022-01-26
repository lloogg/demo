let remove_at num list =
  let rec remove num list result =
    match list with 
    | [] -> result
    | h :: t -> if num > 0 then remove (num - 1) t (h:: result) else List.rev result @ t in

    remove num list []