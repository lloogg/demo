type 'a rle = One of 'a | Many of int * 'a

let encode list =
  let rec parse list result repeat =
    match list with
    | [] -> []
    | [ x ] ->
      if repeat = 0 then (One x :: result) else (Many (repeat + 1, x) :: result)
    | a :: b :: c ->
      if a = b then parse (b :: c) result (repeat + 1)
      else if repeat = 0 then parse (b :: c) (One a :: result) 0
      else parse (b :: c) (Many (repeat + 1, a) :: result) 0
  in

  List.rev (parse list [] 0)