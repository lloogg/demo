
let compress list =
  let rec cmp res list' =
    match (res, list') with
    | _, [] -> res
    | [], h :: t -> cmp (h :: res) t
    | h :: t, hh :: tt -> if h = hh then cmp res tt else cmp (hh :: res) tt
  in

  (* 反转 list *)
  let rec rev res list =
    match list with [] -> res | head :: tail -> rev (head :: res) tail
  in

  rev [] (cmp [] list)
