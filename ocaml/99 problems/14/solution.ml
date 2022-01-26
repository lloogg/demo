let duplicate list =
  let rec dup list result =
    match list with
    |[] -> result
    | h :: t -> dup t (h::h::result)
  in
 List.rev ( dup list [])

