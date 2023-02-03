const run = document.querySelector(".run");
const code = document.querySelector(".actualcode");
const out = document.querySelector(".console");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const save = document.querySelector(".save");

let currentPage = 1;
let toDisplay = "";
let vars = {};
let lastCdn = undefined;
let kwds = ["OUT", "EQU", "VAR", "CDN", "EXS", "NXT", "RDM", "EVL", "ELSE", "LST"]

run.addEventListener("click", () => {
    clearConsole(out);
    interpretCode();
    displayCode(0, 13);
})

window.addEventListener("load", () => {
    code.value = window.localStorage.getItem(window.localStorage.getItem("name"));
})

save.addEventListener("click", () => {
    window.localStorage.setItem(code.textContent, code.value);
    window.localStorage.setItem("name", code.textContent)
})

next.addEventListener("click", () => {
    currentPage++;
    clearConsole(out);
    displayCode(currentPage * 13 - 13, currentPage * 13)

    if (currentPage > code.value.split("\n").length / 13) {
        next.style.display = "none";
    }
})

prev.addEventListener("click", () => {
    currentPage--;
    clearConsole(out);
    displayCode(currentPage * 13 - 13, currentPage * 13)

    if (currentPage < 2) {
        prev.style.display = "none";
    }
})

function displayCode(s, e) {

    let codes = toDisplay.split("\n");
    let shown_code = [];

    for (i = s; i < e; i++) {
        shown_code.push(codes[i])
    }

    if (codes.length > e) {
        next.style.display = "inherit";
    }

    if (currentPage > 1) {
        prev.style.display = "inherit";
    }

    shown_code.forEach(instr => {
        let tmp = document.createElement("p");
        tmp.textContent = instr;
        out.appendChild(tmp);
    });

    toDisplay = "";
    vars = {};
}

function clearConsole(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

}

function interpretCode() {
    let c = code.value.split("\n");

    c.forEach(line => {
        kwd = line.split(" ")[0]
        args = line.split(" ").slice(1);

        if (kwd === "OUT") {
            if (findIn(kwds, args[0])) {
                args[0] = externalRun(args[0], args.slice(1));
                toDisplay += args[0] + "\n";
            } else {
                toDisplay += listToStr(args, check = true) + "\n";
            }
        } else if (kwd === "VAR") {
            if (findIn(kwds, args[1])) {
                args[1] = externalRun(args[1], args.slice(2));
                vars[args[0]] = args[1];
            } else {
                vars[args[0]] = listToStr(args.slice(1));
            }

        } else if (kwd === "EQU") {
            if (getValue(args[0]).toString() === getValue(args[1]).toString()) {
                toDisplay += "true" + "\n";
            } else {
                toDisplay += "false" + "\n";
            }
        } else if (kwd === "CDN") {
            externalRun(args[0], args.slice(1))
        } else if (kwd === "EXS") {
            if (getValue(args[0]) === args[0]) {
                toDisplay += "false" + "\n";
            } else {
                toDisplay += "true" + "\n";
            }
        } else if (kwd === "NXT") {
            if (lastCdn === true) {
                externalRun(args[0], args.slice(1))
                lastCdn = undefined;
            }
        } else if (kwd === "ELSE") {
            if (lastCdn === false) {
                externalRun(args[0], args.slice(1))
                lastCdn = undefined;
            }
        } else if (kwd === "EVL") {
            toDisplay += math.evaluate(listToStr(args)) + "\n";
        } else if (kwd === "LST") {
            vars[args[0]] = listToStr(args.slice(1), true).split(" ");
        } else {
            console.log("lost in translation")
        }
    });
}

function listToStr(l, check) {
    let tmp = "";
    if (l.length !== 1) {
        for (i = 0; i < l.length; i++) {
            if (check === true) {
                tmp += getValue(l[i]) + " ";
            } else {
                tmp += l[i] + " ";
            }
        }
    } else {
        if (check === true) {
            tmp += getValue(l[0]);
        } else {
            tmp += l[0];
        }
    }

    return tmp;
}


function getValue(v) {
    if (vars[v.split(".")[0]] !== undefined && v.split(".")[0] !== v) {
        return vars[v.split(".")[0]][v.split(".")[1]];
    }

    if (vars[v] != undefined) {
        return vars[v];
    } else {
        return v;
    }
}

function externalRun(kwd, args) {
    if (kwd === "EXS") {
        if (getValue(args[0]) === args[0]) {
            lastCdn = false;
        } else {
            lastCdn = true;
        }
    } else if (kwd === "EQU") {
        if (getValue(args[0]).toString() === getValue(args[1]).toString()) {
            lastCdn = true;
        } else {
            lastCdn = false;
        }
    } else if (kwd === "VAR") {
        vars[args[0]] = args[1];
    } else if (kwd === "OUT") {
        toDisplay += listToStr(args, true) + "\n";
    } else if (kwd === "RDM") {
        if (Array.isArray(vars[args[0]])) {
            return vars[args[0]][Math.floor(Math.random() * parseInt(vars[args[0]].length))]
        }
        return Math.floor(Math.random() * (parseInt(args[0]) + 1));
    } else if (kwd === "EVL") {
        return math.evaluate(listToStr(args, true));
    } else {
        return;
    }

    return;
}

function findIn(arr, s) {
    for (i = 0; i < arr.length; i++) {
        if (arr[i] === s) {
            return true;
        }
    }

    return false;
}