let rand_select list num =
  let rand_index num = Random.int num in

  (* result 中包含了取出来的数，以及剩下的数组成的数组，index 是一个随机数 *)
  let rec remove_at list index result =
    match list with 
    | [] -> raise Not_found
    | h :: t -> if index > 0 then remove_at t (index - 1) (h:: result) else (h, result @ t)  in

  (* remove num list [] *)
  (* 数组长度 *)
  let len list = List.length list in


  (* 如果 num 不为零，意味着需要再拿出一个数 *)
  let rec rand_select' num list result =
    if num = 0 then result else 
      (* 在 list 中删除一个元素，并返回（x：删掉的元素，remaining：剩下的元素列表） *)
      let (x, remaining) = remove_at list (rand_index ((len list) - 1)) [] in
      (* 把删除掉的元素放入 result 中，继续递归 *)
      rand_select' (num - 1) remaining (x :: result)
  in

  (* num 为传进来的参数，list 也是传进来的参数，将每次取出来的随机数放进新的数组里面，刚开始为 [] *)
  rand_select' num list []



let range st ed =
  let rec range' st ed result =
    if st > ed then range' (st - 1) ed (st :: result) else if st < ed then range' (st + 1) ed (st :: result) else List.rev (st :: result) in
  range' st ed []

(* Lotto: Draw N different random numbers from the set 1..M. *)
(* The selected numbers shall be returned in a list *)
(* n 是个数，从 1 到 m 中随机取出 n 个数 *)
let lotto_select n m=
  rand_select (range 1 m) n
