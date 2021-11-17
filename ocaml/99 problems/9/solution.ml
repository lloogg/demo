let pack list =
  let rec pack' list' temp res =
    match list' with
    | [] -> res
    | head :: tail -> if tail != [] && head == List.hd tail then pack' tail (head :: temp) res
    else if tail !=[] && head != List.hd tail then pack' tail (head :: temp) (temp::res) else pack' tail temp res in

    pack' list [] [[]]