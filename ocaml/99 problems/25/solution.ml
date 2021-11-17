let permutation list =
  let rec take_one_from_list list index result =
    match list with
    | [] -> raise Not_found
    | h :: t -> if index > 0 then take_one_from_list t (index -1) (h :: result) else (h, (List.rev result) @ t) in
  let rec insert_one_to_list list index item result =
    match list with 
    | [] -> raise Not_found
    | h :: t -> if index > 0 then insert_one_to_list t (index - 1) item (h::result) else (List.rev result) @  (item :: h ::t) in

  let rec take_and_insert times result =
    if times > 0 then 
      let (item,remaining) = take_one_from_list result (Random.int (List.length list)) [] in
      let insert_result = insert_one_to_list remaining (Random.int (List.length list) - 1)  item [] in
      take_and_insert (times -1) insert_result
    else 
      result

  in

  take_and_insert (List.length list) list
