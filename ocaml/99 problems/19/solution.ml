let rotate list n =
  let rec len list result =
    match list with 
    | [] -> result
    | h :: t -> len t (result + 1)
  in

  let rec rotate' list n result =
    match list with
    | [] -> result
    | h :: t -> if n > 1 then rotate' t (n - 1) (h:: result) else (t@List.rev (h:: result))

  in

  let r len n = if n < 0 then len +n else n in
  
  rotate' list ( r (len list 0) n) []