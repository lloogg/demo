let coprime m n = 
let rec gcd m n =
    if n = 0 then m else gcd n (m mod n) in
    (gcd m n) = 1