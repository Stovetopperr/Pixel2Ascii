const browseBtn =
document.getElementById("browse-btn");

const fileInput =
document.getElementById("image-upload");

browseBtn.addEventListener("click", () => {
    fileInput.click();
});




const upload =
document.getElementById("image-upload");

const preview =
document.getElementById("preview-image");

upload.addEventListener("change", () => {

    const file = upload.files[0];

    if (file) {
        preview.src = URL.createObjectURL(file);
    }

});
let activeTheme = "classic";

const themeButtons =
document.querySelectorAll(".theme-btn");

themeButtons.forEach(button => {

    button.addEventListener("click", () => {

        themeButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        activeTheme =
        button.dataset.theme;

    });

});

const invertToggle =
document.getElementById("invert-toggle");

const widthSlider =
document.getElementById("width-slider");

const widthValue =
document.getElementById("width-value");
widthSlider.addEventListener("input", () => {

    widthValue.textContent =
    widthSlider.value;

});


const convertBtn =
document.getElementById("convert-btn");

const canvas =
document.getElementById("canvas");

const ctx =
canvas.getContext("2d");

convertBtn.addEventListener("click", () => {

    const image =
    document.getElementById("preview-image");

    let asciiChars;

switch(activeTheme) {

    case "technical":
        asciiChars =
        "01#MW&@+=-:. ";
        break;

    case "blocks":
        asciiChars =
        "█▓▒░ ";
        break;

    default:
        asciiChars =
        "@%#*+=-:. ";

}

    let width = parseInt(widthSlider.value);
    canvas.width = width;
    canvas.height =
    image.height *
    (width / image.width) *
    0.55;

    ctx.drawImage(
        image,
        0,
        0,
        canvas.width,
        canvas.height
    );
    const imageData =
    ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const pixels =
    imageData.data;

    let asciiOutput = "";
    for(let y = 0; y < canvas.height; y++) {
        for(let x = 0; x < canvas.width; x++) {
            const index = (y * canvas.width + x) * 4;
            const r = pixels[index];
            const g = pixels[index + 1];
            const b = pixels[index + 2];
            const a = pixels[index + 3];
            if (a < 10) {
    asciiOutput += " ";
    continue;
}
            const brightness = (r + g + b) / 3;
            let charIndex = Math.floor((brightness / 255) * (asciiChars.length - 1));
            if (invertToggle.checked) {

    charIndex =
    asciiChars.length - 1 - charIndex;

}
            asciiOutput += asciiChars[charIndex];
        }
        asciiOutput += "\n";
    }

    document.getElementById("ascii-result").innerText = asciiOutput;    
document.getElementById(
"ascii-result"
).textContent =
asciiOutput;
});

const copyBtn =
document.getElementById("copy-btn");

copyBtn.addEventListener("click", () => {

    const ascii =
    document.getElementById("ascii-result")
    .innerText;

    navigator.clipboard.writeText(ascii);

    copyBtn.textContent = "Copied!";

    setTimeout(() => {
        copyBtn.textContent = "📋 Copy";
    }, 1500);

});
const pixelAnimation =
document.getElementById("pixel-animation");

const frames = [

`■■■■■
■■■■■
■■■■■
■■■■■
■■■■■`,

`■■■■@
■■■■■
■■■■■
■■■■■
■■■■■`,

`■■■@#
■■■■@
■■■■■
■■■■■
■■■■■`,

`■■@#$
■■■@#
■■■■@
■■■■■
■■■■■`,

`■@#$%
■■@#$
■■■@#
■■■■@
■■■■■`,

`@#$%^
■@#$%
■■@#$
■■■@#
■■■■@`,

`@#$%^
@#$%^
■@#$%
■■@#$
■■■@#`,

`@#$%^
@#$%^
@#$%^
■@#$%
■■@#$`,

`@#$%^
@#$%^
@#$%^
@#$%^
■@#$%`,

`@#$%^
@#$%^
@#$%^
@#$%^
@#$%^`,

`@■■■■
@#■■■
@#$■■
@#$%■
@#$%^`,

`■■■■■
■■■■■
■■■■■
■■■■■
■■■■■`

];

let frameIndex = 0;

setInterval(() => {

    pixelAnimation.textContent =
    frames[frameIndex];

    frameIndex++;

    if (frameIndex >= frames.length) {
        frameIndex = 0;
    }

}, 600);