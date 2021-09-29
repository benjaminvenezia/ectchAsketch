let container = document.querySelector(".container");
let range = document.getElementById('myRange');
let rainbow_btn = document.getElementById('rainbow_btn');
let colormode_btn = document.getElementById('colormode_btn');
let eraser_btn = document.getElementById('eraser_btn');
const size_lbl = document.getElementById('size_lbl');

let color = 'black';
let rainbowMode = false;
let eraserMode = false;

//initialize the project
colormode_btn.style.border = '1px solid black';
let sidePx = 16;
size_lbl.textContent = `${sidePx}px x ${sidePx}px`;
range.value = 3;
generateMatrix(sidePx);

//update when range is changed
range.addEventListener('change', (c) => {

    rangeInPx = {
        '1': 4,
        '2': 8,
        '3': 16,
        '4': 32,
        '5': 64,
        '6': 128,
        '7': 256,
        '8': 512
    };

    container.innerHTML = '';

    sidePx = rangeInPx[c.target.value];

    size_lbl.textContent = `${sidePx}px x ${sidePx}px`;
    generateMatrix(sidePx);
})

//choose color
const palette = document.getElementById('colorpick');

let reset = document.getElementById('reset');
reset.addEventListener('click', () => { addResetMatrixFunction('container') });

rainbow_btn.addEventListener('click', () => {
    rainbow_btn.style.border = "1px solid black"
    colormode_btn.style.border = '';
    eraser_btn.style.border = '';

    rainbowMode = true;
    eraserMode = false;

});

colormode_btn.addEventListener('click', () => {
    rainbow_btn.style.border = '';
    eraser_btn.style.border = '';
    colormode_btn.style.border = "1px solid black"
    rainbowMode = false;
    eraserMode = false;
    color = palette.value;
});

eraser_btn.addEventListener('click', () => {
    rainbow_btn.style.border = '';
    colormode_btn.style.border = '';
    eraser_btn.style.border = "1px solid black";
    eraserMode = true;
});

/**
 * associated at an click event, allow to clean the matrix.
 */
function addResetMatrixFunction(containerName) {
    let elements = document.querySelectorAll(`.${containerName}>div`);
    elements.forEach(el => {
        el.style.backgroundColor = "";
    });
}

/**
 * return random value, is active when btn is clicked. 
 */
function pickRandomColor() {
    let randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    let r = randomBetween(0, 255);
    let g = randomBetween(0, 255);
    let b = randomBetween(0, 255);
    const rgb = `rgb(${r},${g},${b})`;

    return rgb;
}

/**
 * give a colorpick html element and return a color dynamically when changed.
 */
function pickColor(palette, rainbowMode, eraserMode) {
    if (!eraserMode) {
        if (!rainbowMode) {
            palette.addEventListener('change', c => {
                color = c.target.value;
            });

            return color;
        } else {
            color = pickRandomColor();
            return color;
        }

    } else {
        return color = '';
    }

}

/**
 * generate a matrix 
 */
function generateMatrix(sidePx) {

    let row = (512 / sidePx);
    let total = row * row;

    for (let i = 0; i < total; i++) {
        let div = document.createElement('div');
        div.addEventListener('mouseover', () => {
            div.style.backgroundColor = pickColor(palette, rainbowMode, eraserMode);
        });
        div.style.width = `${sidePx}px`;
        div.style.height = `${sidePx}px`;
        div.style.border = "1px solid #EDEDED";
        container.append(div);
    }
}