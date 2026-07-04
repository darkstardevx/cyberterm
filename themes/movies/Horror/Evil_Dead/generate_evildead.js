const fs = require('fs');
const path = require('path');

// Array containing 12 distinct Evil Dead (New Version) themes
const themes = [
    {
        "name": "EvilDead_Naturom_Demonto",
        "author": "Darkstar [darkstardevx@gmail.com]",
        "category": "horror",
        "background": "#080605",
        "foreground": "#9c2424",
        "cursor": "#bf9b63",
        "colors": [
            "#030202", "#9c2424", "#bf9b63", "#241812",
            "#3d291e", "#593c2c", "#78513b", "#9c6a4e",
            "#731111", "#a37d46", "#140e0b", "#400404",
            "#ff4545", "#dec299", "#120e0c", "#ffffff"
        ]
    },
{
    "name": "EvilDead_Abomination_Rain",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#030000",
    "foreground": "#ff0011",
    "cursor": "#ff1a33",
    "colors": [
        "#010000", "#ff0011", "#ff1a33", "#240003",
        "#470005", "#6b0008", "#94000b", "#bd000e",
        "#e60012", "#470005", "#0a0001", "#141414",
        "#ff4d5a", "#ff808b", "#050000", "#ffffff"
    ]
},
{
    "name": "EvilDead_Deadite_Stare",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0b0c0f",
    "foreground": "#ffd700",
    "cursor": "#cc1111",
    "colors": [
        "#040506", "#ffd700", "#cc1111", "#171a21",
        "#272c38", "#3a4254", "#4f5a73", "#687694",
        "#cca300", "#990000", "#101217", "#ffffff",
        "#ffee55", "#ff4d4d", "#0d0e12", "#ffffff"
    ]
},
{
    "name": "EvilDead_Chainsaw_Disposal",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0b0b0d",
    "foreground": "#a61212",
    "cursor": "#7c848c",
    "colors": [
        "#040405", "#a61212", "#7c848c", "#1c1c24",
        "#30303d", "#474759", "#61617a", "#7e7e9e",
        "#800000", "#5c636a", "#121217", "#3d0000",
        "#ff4d4d", "#a6b0ba", "#101014", "#ffffff"
    ]
},
{
    "name": "EvilDead_Wood_Chipper_Gore",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#050604",
    "foreground": "#b80f0f",
    "cursor": "#ff5500",
    "colors": [
        "#020302", "#b80f0f", "#ff5500", "#151c12",
        "#24301f", "#35472e", "#49613f", "#5e7d51",
        "#8c0505", "#cc4400", "#0e120d", "#400000",
        "#ff4d4d", "#ff7733", "#0a0c09", "#ffffff"
    ]
},
{
    "name": "EvilDead_Cellar_Hatch",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#050506",
    "foreground": "#858f99",
    "cursor": "#800000",
    "colors": [
        "#020203", "#800000", "#858f99", "#14141a",
        "#24242e", "#373747", "#4d4d63", "#666682",
        "#5c0000", "#5e6975", "#0d0d12", "#2e0000",
        "#b30000", "#abb5c2", "#0a0a0d", "#ffffff"
    ]
},
{
    "name": "EvilDead_Rise_Apartment",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0d0f12",
    "foreground": "#cf3434",
    "cursor": "#5c6970",
    "colors": [
        "#060708", "#cf3434", "#5c6970", "#20252b",
        "#343b45", "#4b5663", "#657385", "#8193a8",
        "#9e1b1b", "#434e54", "#14161c", "#470505",
        "#ff6666", "#7b8d96", "#101214", "#ffffff"
    ]
},
{
    "name": "EvilDead_Vinyl_Curse",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#050505",
    "foreground": "#9e846b",
    "cursor": "#a81111",
    "colors": [
        "#010101", "#a81111", "#9e846b", "#141414",
        "#262626", "#3b3b3b", "#545454", "#707070",
        "#800000", "#806851", "#0a0a0a", "#ff3333",
        "#ff4545", "#bfa993", "#0d0d0d", "#ffffff"
    ]
},
{
    "name": "EvilDead_Marni_Corrupted",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#07040a",
    "foreground": "#a11884",
    "cursor": "#e6ac00",
    "colors": [
        "#030205", "#a11884", "#e6ac00", "#1a0f26",
        "#2e1b42", "#452863", "#5f388a", "#7c49b3",
        "#7d0d65", "#b38600", "#11091c", "#470034",
        "#ff5cd3", "#ffcc33", "#0e0814", "#ffffff"
    ]
},
{
    "name": "EvilDead_Staff_Slaughter",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0a0806",
    "foreground": "#bf2121",
    "cursor": "#8c765c",
    "colors": [
        "#050403", "#bf2121", "#8c765c", "#211a14",
        "#382c22", "#524031", "#6e5642", "#8c6e54",
        "#941212", "#6e5a44", "#14100d", "#420404",
        "#ff5252", "#baa388", "#120e0b", "#ffffff"
    ]
},
{
    "name": "EvilDead_Elevator_Crush",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#08090a",
    "foreground": "#9e0606",
    "cursor": "#364147",
    "colors": [
        "#040405", "#9e0606", "#364147", "#171a1c",
        "#262c30", "#394247", "#4f5b63", "#677782",
        "#730000", "#21282c", "#111314", "#3d0000",
        "#e62e2e", "#4f5f69", "#0f1112", "#ffffff"
    ]
},
{
    "name": "EvilDead_Feast_On_Souls",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#000000",
    "foreground": "#ff0000",
    "cursor": "#ffffff",
    "colors": [
        "#000000", "#ff0000", "#ffffff", "#1f1f1f",
        "#3d3d3d", "#5c5c5c", "#808080", "#a30000",
        "#cc0000", "#cccccc", "#0a0a0a", "#400000",
        "#ff4d4d", "#e6e6e6", "#000000", "#ffffff"
    ]
}
];

// Target directory to save the output files
const outputDir = path.join(__dirname, 'evildead_themes');

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

console.log(`\nSuccess! All 12 Evil Dead themes saved perfectly inside the '${outputDir}' folder.`);
