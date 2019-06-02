// !/bin/sh node

var fs = require('fs');

var ver = 1;
console.log("version : " + ver);

var animates = JSON.parse(fs.readFileSync("animate.json"));
console.log("animates: " + animates.length);
// console.log(animates);

var bgcolors = JSON.parse(fs.readFileSync("bgColor.json"));
console.log("bgcolors: " + bgcolors.length);
// console.log(bgcolors);

var txtcolors = JSON.parse(fs.readFileSync("txtColor.json"));
console.log("txtcolors: " + txtcolors.length);
// console.log(bgcolors);

var fonts = JSON.parse(fs.readFileSync("font.json"));
console.log("fonts: " + fonts.length);
// console.log(fonts);

var scenes = JSON.parse(fs.readFileSync("scenes.json"));
console.log("scenes: " + scenes.length);
// console.log(scenes);

var configs = {};
configs.verson = ver;
configs.scenes = scenes;
configs.effects = [];
configs.animates = [];
configs.fonts = [];
configs.fontSizes=[];

var distinctFonts = Array.from(new Set(fonts));
var distinctAnimates = Array.from(new Set(animates));

distinctFonts.forEach(function (font, index) {
    // console.log(font + ' : ' + index);
    configs.fonts.push({
        text: font,
        value: font
    });
});

distinctAnimates.forEach(function (animate, index) {
    // console.log(animate + ' : ' + index);
    configs.animates.push({
        text: animate,
        value: animate
    });
});

for (var i = 1; i <= 20; i++) {
    configs.fontSizes.push({
        text: i + "em",
        value: i
    });
}

animates.forEach(function (animate, index) {
    // console.log(animate + ' : ' + index);
    configs.effects.push({
        label: animate,
        fontFamily: fonts[index],
        fontSize: 6,
        txtColor: txtcolors[index],
        bgColor: bgcolors[index],
        animate: animate
    });
});



var output = "output.json";
fs.writeFileSync(output, JSON.stringify(configs));
fs.writeFileSync("../src/assets/configs.json", JSON.stringify(configs));