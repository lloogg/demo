
type 'a rle = One of 'a | Many of int * 'a

let decode list =
  let rec gen_list result n x =
    if n > 0 then gen_list (x :: result) (n - 1) x else result
  in
  let rec parse list result =
    match list with
    | [] -> result
    | One x :: t -> parse t (x :: result)
    | Many (n, x) :: t -> parse t ((gen_list [] n x) @ result)
  in

  List.rev (parse list [])
