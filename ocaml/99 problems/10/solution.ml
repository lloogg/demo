

let encode list =
  let rec parse list result count =
    match list with
    | [] -> []
    | [ x ] -> (count + 1, x) :: result
    | a :: b :: c ->
        if a = b then parse (b :: c) result (count + 1)
        else parse (b :: c) ((count + 1, a) :: result) 0
  in

  let rec rev list result =
    match list with [] -> result | h :: t -> rev t (h :: result)
  in

  rev (parse list [] 0) []
