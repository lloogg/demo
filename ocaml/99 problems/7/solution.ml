type 'a node = One of 'a | Many of 'a node list

let flatten list =
  let rec parse res list' =
    match list' with
    | One h :: t -> parse (h :: res) t
    | Many h :: t -> parse (parse res h) t
  in

  parse [] list

(* flatten [One 1; Many [One 2; Many [One 3; One 4]; One 5]];; *)