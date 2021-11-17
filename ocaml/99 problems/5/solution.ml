
let rev list =
  let rec pop_to_result result cur =
    match cur with
    | [] -> result
    | head :: tail -> pop_to_result (head :: result) tail
  in
  pop_to_result [] list
