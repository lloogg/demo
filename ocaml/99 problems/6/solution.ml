

let is_palindrome list =
  let rec pop result list' =
    match list' with [] -> result | head :: tail -> pop (head :: result) tail
  in

  let rec cmp list_a list_b =
    match (list_a, list_b) with
    | [], [] -> true
    | _, [] -> false
    | [], _ -> false
    | a_head :: a_tail, b_head :: b_tail ->
        if a_head = b_head then cmp a_tail b_tail else false
  in

  let result = pop [] list in

  cmp list result
