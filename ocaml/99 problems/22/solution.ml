let range st ed =
  let rec range' st ed result =
    if st > ed then range' (st - 1) ed (st :: result) else if st < ed then range' (st + 1) ed (st :: result) else List.rev (st :: result) in
  range' st ed []