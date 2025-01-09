# Problem 4: Sum to N

This problem demonstrates three different approaches to calculate the sum of numbers from 1 to n, comparing their time and space complexities.

## Implementation Details

### Solution A: Mathematical Formula
- Function: `sum_to_n_a(n)`
- Uses the mathematical formula: `n * (n + 1) / 2`
- Time Complexity: O(1)
- Space Complexity: O(1)
- Most efficient solution as it provides instant results regardless of input size

### Solution B: Iterative Approach
- Function: `sum_to_n_b(n)`
- Uses a simple for-loop to accumulate the sum
- Time Complexity: O(n)
- Space Complexity: O(1)
- Traditional approach that scales linearly with input size

### Solution C: Recursive Approach
- Function: `sum_to_n_c(n)`
- Uses recursion to calculate the sum
- Time Complexity: O(n)
- Space Complexity: O(n) due to call stack
- Least efficient due to stack space requirements

## Performance Comparison

The code includes performance testing for different input sizes (n = 5, 10, 10000). Note that the recursive solution is limited to n ≤ 1000 to prevent stack overflow.

## Setup and Running

1. Install dependencies:

```
$ npm install
```

2. Build & Run the code

```
$ npm run build && npm run start
```


## Test Result

```
sum_to_n_a => n = 5, result = 15, time = 0.0052 ms
sum_to_n_b => n = 5, result = 15, time = 0.0064 ms
sum_to_n_c => n = 5, result = 15, time = 0.0077 ms
-------------------------------------------
sum_to_n_a => n = 10, result = 55, time = 0.0006 ms
sum_to_n_b => n = 10, result = 55, time = 0.0021 ms
sum_to_n_c => n = 10, result = 55, time = 0.0014 ms
-------------------------------------------
sum_to_n_a => n = 10000, result = 50005000, time = 0.0004 ms
sum_to_n_b => n = 10000, result = 50005000, time = 0.1935 ms
Skipping sum_to_n_c for n = 10000 to avoid stack overflow.
-------------------------------------------
```
