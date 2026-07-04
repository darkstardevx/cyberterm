const fs = require('fs');
const path = require('path');

// Array containing 12 distinct Texas Chainsaw themes
const themes = [
    {
        "name": "Leatherface_Slaughterhouse_74",
        "author": "Darkstar [darkstardevx@gmail.com]",
        "category": "horror",
        "background": "#0c0a07",
        "foreground": "#d42424",
        "cursor": "#b58d3d",
        "colors": [
            "#050403", "#d42424", "#b58d3d", "#241d14",
            "#3b3021", "#54442f", "#705b3f", "#8f7551",
            "#a81616", "#9c7329", "#14100c", "#540707",
            "#ff4d4d", "#cfab65", "#120e0a", "#ffffff"
        ]
    },
{
    "name": "Leatherface_Pretty_Woman_Mask",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0f0d0c",
    "foreground": "#d9a78f",
    "cursor": "#990011",
    "colors": [
        "#060505", "#990011", "#d9a78f", "#241d1a",
        "#3b302a", "#54443c", "#705b51", "#8f7567",
        "#cc001b", "#bf8b73", "#14100f", "#4d0005",
        "#ff4d66", "#f2cfbe", "#12100e", "#ffffff"
    ]
},
{
    "name": "Leatherface_Rust_And_Bone",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0d0b09",
    "foreground": "#e3dac9",
    "cursor": "#bf5a2b",
    "colors": [
        "#050403", "#bf5a2b", "#e3dac9", "#211a14",
        "#382c22", "#524031", "#6e5642", "#8c6e54",
        "#9e4216", "#c2b69f", "#120f0c", "#401805",
        "#ff7844", "#f7f2e8", "#120e0c", "#ffffff"
    ]
},
{
    "name": "Leatherface_Chainsaw_Gasoline",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#080907",
    "foreground": "#e6a100",
    "cursor": "#b51212",
    "colors": [
        "#030403", "#b51212", "#e6a100", "#181c15",
        "#272e22", "#3a4533", "#4e5c44", "#647557",
        "#8a0707", "#b88100", "#0f120e", "#3d0000",
        "#ff3333", "#ffbe33", "#0b0d0a", "#ffffff"
    ]
},
{
    "name": "Leatherface_Meat_Hook_Gore",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0a0a0c",
    "foreground": "#b50e0e",
    "cursor": "#858f99",
    "colors": [
        "#040405", "#b50e0e", "#858f99", "#1c1c24",
        "#2e2e3b", "#434354", "#5b5b73", "#757594",
        "#870707", "#646d75", "#111114", "#4d0000",
        "#ff4d4d", "#abb6c2", "#101014", "#ffffff"
    ]
},
{
    "name": "Leatherface_Sun_Bleached_Graveyard",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#14120f",
    "foreground": "#a89b87",
    "cursor": "#ff3300",
    "colors": [
        "#090807", "#ff3300", "#a89b87", "#26221c",
        "#3d372d", "#574e40", "#736855", "#91836c",
        "#cc2900", "#877b69", "#171512", "#540000",
        "#ff6644", "#cfc5b4", "#14120f", "#ffffff"
    ]
},
{
    "name": "Leatherface_Sewn_Stitches",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "background": "#0a0808",
    "foreground": "#a6513c",
    "cursor": "#940000",
    "colors": [
        "#040303", "#940000", "#a6513c", "#241c1c",
        "#3b2e2e", "#544242", "#705858", "#8f7070",
        "#730000", "#823e2e", "#141010", "#3d0000",
        "#ff3333", "#c46c56", "#120e0e", "#ffffff"
    ]
},
{
    "name": "Leatherface_Black_Basement",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#050505",
    "foreground": "#a81111",
    "cursor": "#4d4d4d",
    "colors": [
        "#010101", "#a81111", "#4d4d4d", "#141414",
        "#262626", "#3b3b3b", "#545454", "#707070",
        "#7d0a0a", "#333333", "#090909", "#400000",
        "#ff4545", "#969696", "#0d0d0d", "#ffffff"
    ]
},
{
    "name": "Leatherface_Family_Dinner",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0b0806",
    "foreground": "#bd3a15",
    "cursor": "#cc9c3d",
    "colors": [
        "#050302", "#bd3a15", "#cc9c3d", "#211812",
        "#38281e", "#523b2c", "#6e4f3b", "#8c654b",
        "#962b0e", "#a37d32", "#140e0b", "#470d00",
        "#ff633b", "#e0b663", "#120d09", "#ffffff"
    ]
},
{
    "name": "Leatherface_Rotting_Trophies",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#070805",
    "foreground": "#858c6e",
    "cursor": "#800000",
    "colors": [
        "#030402", "#800000", "#858c6e", "#171c13",
        "#262e1f", "#39452f", "#4d5c3f", "#637552",
        "#5e0000", "#697056", "#10130d", "#330000",
        "#b30000", "#a6ad8f", "#0c0e0a", "#ffffff"
    ]
},
{
    "name": "Leatherface_Artery_Spray",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#030000",
    "foreground": "#ff001e",
    "cursor": "#5c0007",
    "colors": [
        "#010000", "#ff001e", "#5c0007", "#1f0002",
        "#3d0004", "#5c0007", "#800009", "#a3000c",
        "#cc0018", "#3d0004", "#0a0000", "#121212",
        "#ff4d62", "#e60015", "#050000", "#ffffff"
    ]
},
{
    "name": "Leatherface_Head_Cheese",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0a0706",
    "foreground": "#cf947c",
    "cursor": "#a81616",
    "colors": [
        "#050303", "#a81616", "#cf947c", "#241815",
        "#3b2823", "#543932", "#704d43", "#8f6256",
        "#851111", "#b58069", "#140e0c", "#470505",
        "#ff4d4d", "#e3baa8", "#120d0b", "#ffffff"
    ]
}
];

// Target directory to save the output files
const outputDir = path.join(__dirname, 'texas_chainsaw_themes');

// Create the folder if it does not exist
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

// Loop through each theme and write its json file
themes.forEach(theme => {
    const fileName = `${theme.name}.json`;
    const filePath = path.join(outputDir, fileName);

    // Custom replacer logic to force formatting the 'colors' array 4-per-row on single lines
    const jsonString = JSON.stringify(theme, (key, value) => {
        if (key === 'colors' && Array.isArray(value)) {
            return "__COLORS_ARRAY_PLACEHOLDER__";
        }
        return value;
    }, 2);

    // Chunk the colors array manually into strings of 4 items
    const colorsArray = theme.colors;
    const chunkedRows = [];
    for (let i = 0; i < colorsArray.length; i += 4) {
        const chunk = colorsArray.slice(i, i + 4).map(c => `"${c}"`).join(', ');
        chunkedRows.push(`    ${chunk}`);
    }

    const colorsFormattedBlock = `[\n${chunkedRows.join(',\n')}\n  ]`;

    // Swap the placeholder out with our custom text block
    const finalJsonOutput = jsonString.replace(
        '"__COLORS_ARRAY_PLACEHOLDER__"',
        colorsFormattedBlock
    );

    fs.writeFileSync(filePath, finalJsonOutput, 'utf8');
    console.log(`Saved theme: ${fileName}`);
});

console.log(`\nSuccess! All 12 Texas Chainsaw themes saved perfectly inside the '${outputDir}' folder.`);
