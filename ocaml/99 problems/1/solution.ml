let rec last list =
  match list with [] -> None | [ x ] -> Some x | h :: t -> last t
