let rec gcd m n =
    if n = 0 then m else gcd n (m mod n)