function Main(input) {
    input = input.split("\n");
    console.log(input);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
