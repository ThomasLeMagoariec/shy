const run = document.querySelector(".run");
const code = document.querySelector(".actualcode");
const out = document.querySelector(".console");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let currentPage = 1;
let toDisplay = "";
let vars = {};
let lastCdn = false;

run.addEventListener("click", () => {
    clearConsole(out);
    interpretCode();
    displayCode(0, 13);
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
            toDisplay += listToStr(args, true) + "\n";
        } else if (kwd === "VAR") {
            if (args[1] === "RDM") {
                args[1] = externalRun("RDM", args.slice(1))
            }
            vars[args[0]] = args[1];
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
            }
        } else if (kwd === "EVL") {
            toDisplay += math.evaluate(listToStr(args)) + "\n";
        } else {
            console.log("lost in translation")
        }
    });
}

function listToStr(l, check) {
    let tmp = "";
    for (i = 0; i < l.length; i++) {
        if (check === true) {
            tmp += getValue(l[i]) + " ";
        } else {
            tmp += l[i] + " ";
        }


    }

    return tmp;
}

function getValue(v) {
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
        return Math.floor(Math.random() * (parseInt(args[1]) + 1));
    } else if (kwd === "EVL") {
        return math.evaluate(listToStr(args));
    } else {
        return;
    }

    return;
}