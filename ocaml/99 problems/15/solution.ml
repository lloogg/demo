let replicate list num =
let rec gen_list result n x =
    if n > 0 then gen_list (x :: result) (n - 1) x else result
  in
 let rec rep list num result =
   match list with 
   |[] -> result
   | h :: t -> rep t num ((gen_list [] num h)@result)
   in
  List.rev (rep list num [])