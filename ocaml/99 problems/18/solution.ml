let slice list st ed =
  let rec slice' list st ed result=
    match list with 
    | [] -> result
    | h :: t -> if st > 0 then slice' t (st - 1) ed result else if ed > 1 then slice' t st (ed -1) (h :: result)
    else result
    in

    List.rev (slice' list st ed [])