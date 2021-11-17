let phi m =
  let rec gcd m n = if n = 0 then m else gcd n (m mod n) in

  let coprime m n = gcd m n = 1 in

  let rec count m n result =
    if m < n then
      if coprime m n then count (m + 1) n (result + 1)
      else count (m + 1) n result
    else result
  in

  count 1 m 0
