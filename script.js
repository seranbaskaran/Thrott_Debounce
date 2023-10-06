const btn = document.querySelector("#search-input");
const select = document.querySelector("#option");

// Throttling Function
const throttleFunction = (func, delay) => {
    let prev = 0;
    return (...args) => {
        let now = new Date().getTime();
        console.log(now - prev, delay);
        if (now - prev > delay) {
            prev = now;
            return func(...args);
        }
    };
};

const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
};

// Event listener for input element
btn.addEventListener("input", () => {
    // Check if the selected option is "throttling"
    if (select.value === "throttling") {
        const throttledFunction = throttleFunction(() => {
            fetch('https://jsonplaceholder.typicode.com/comments')
                .then(response => response.json())
                .then(json => console.log(json));
        }, 1500);
        throttledFunction();
    }
    // Check if the selected option is "debouncing"
    else if (select.value === "debouncing") {
        const debouncedFunction = debounce(() => {
            fetch('https://jsonplaceholder.typicode.com/comments')
                .then(response => response.json())
                .then(json => console.log(json));
        }, 3000);
        debouncedFunction();
    }
});

