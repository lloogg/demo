let factors n =

  let rec factors' st n result =
    if (n != 1) then
    if (n mod st) = 0 then factors' st (n / st) (st :: result) else factors' (st + 1) n result
    else result
  in

  List.rev (factors' 2 n [])