/**
 * sum_to_n_a
 *
 * Straightforward solution for this problem where it executes the correct maths formula
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 * -> instant result, most efficient way
 */
function sum_to_n_a(n) {
    return (n * (n + 1)) / 2;
}
/**
 * sum_to_n_b
 * Implementation using a simple for-loop accumulation (iterative approach).
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * -> This is the good-old traditional iteration approach, where we just loop through the series of number then add them by incremental increase of the series
 *
 */
function sum_to_n_b(n) {
    var sum = 0;
    for (var i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
/**
 * sum_to_n_c
 * Implementation using recursion.
 * Time Complexity: O(n)
 * Space Complexity: O(n) due to call stack usage in recursion.
 * -> This is the worst case as it consumes both time & space in memnory as far as we increase the n
 */
function sum_to_n_c(n) {
    // Base case
    if (n === 1) {
        return 1;
    }
    // Recursive case
    return n + sum_to_n_c(n - 1);
}
/********************************************************************
 * TEST CASES / PERFORMANCE CHECKS
 ********************************************************************/
// Helper function to measure performance
function testFunctionPerformance(func, n) {
    var startTime = performance.now();
    var result = func(n);
    var endTime = performance.now();
    console.log("".concat(func.name, " => n = ").concat(n, ", result = ").concat(result, ", time = ").concat((endTime - startTime).toFixed(4), " ms"));
}
// A few test values for n
var testValues = [5, 10, 10000];
for (var _i = 0, testValues_1 = testValues; _i < testValues_1.length; _i++) {
    var val = testValues_1[_i];
    testFunctionPerformance(sum_to_n_a, val);
    testFunctionPerformance(sum_to_n_b, val);
    if (val <= 1000) {
        // Only test recursion if n <= 1000
        // (Adjust this threshold as needed)
        testFunctionPerformance(sum_to_n_c, val);
    }
    else {
        console.log("Skipping sum_to_n_c for n = ".concat(val, " to avoid stack overflow."));
    }
    console.log('-------------------------------------------');
}
