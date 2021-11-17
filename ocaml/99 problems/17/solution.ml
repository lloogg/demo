let split list n = 
  let rec split' list n result =
    match list with 
    | [] -> (List.rev result, []) 
    | h :: t -> if n > 1 then split' t (n-1) (h :: result) else ( List.rev (h::result) ,t)
    in
  split' list n []