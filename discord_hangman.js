const letter_map = new Map();
for (let i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++) {
    letter_map.set(String.fromCharCode(i), `:regional_indicator_${String.fromCharCode(i)}:`)
}

let out = "";
let star = "⭐️";
let question = ":grey_question:";
let space = "⬛️";
let blank = ":black_large_square:";
let red = ":red_square:";
let green = ":green_square:";

function generateHangman() {
    let phrase = d3.select("#phrase").property("value");
    if (phrase == "") {
        alert("You didn't enter a phrase dingus");
        return;
    }

    phrase = phrase.toLowerCase();

    // Build First Row of Hangman
    out += `${star} - `;
    for (let i = 0; i < phrase.length; i++) {
        let c = phrase[i];
        if (c == " ") {
            out += `${space} `;
        }
        else {
            out += `${question} `;
        }
    }
    out += "<br>";
    // Build Subsequent Rows
    for (let i = 0; i < 26; i++) {
        let l = String.fromCharCode("a".charCodeAt(0) + i);
        out += `${letter_map.get(l)} - ||`;
        for (let j = 0; j < phrase.length; j++) {
            let c = phrase[j];
            if (c == " ") {
                out += blank;
            } else if (c == l) {
                out += letter_map.get(l);
            }
            else if (phrase.indexOf(l) != -1) {
                out += green;
            } else {
                out += red;
            }
            out += " ";
        }
        out += "||<br>";
        if (i == 12) {
            d3.select("#first").html(out);
            console.log("First Half has been made, please paste into discord (click any key to recieve second half)");
            out = ""
        }
    }
    out += `<br>
        Lives(unspoiler the next one(left to right) if u get an all red row):<br>
    ||:person_shrugging:||  ||:woozy_face:|| ||:flushed:|| ||:pleading_face:|| ||:sob:|| ||:zany_face:|| ||:skull: GAME OVER ||
            `;
    console.log("Second Half has been made");
    d3.select("#second").html(out);
}

function copyMessage(message) {
    console.log(message);
    navigator.clipboard.writeText(message).then(
        () => {
          alert("Copied message to clipboard!");
        },
        () => {
          alert("Copy failed, browser may be incompatible :(");
        }
      );
}

d3.select("#generate").on("click", generateHangman);

d3.select("#copy-1").on("click", () => copyMessage(d3.select("#first").html().replaceAll("<br>", "\n")));
d3.select("#copy-2").on("click", () => copyMessage(d3.select("#second").html().replaceAll("<br>", "\n")));
