const fs = require('fs');
const path = require('path');

// Array containing 12 distinct Child's Play themes
const themes = [
    {
        "name": "Chucky_Good_Guys_Box",
        "author": "Darkstar [darkstardevx@gmail.com]",
        "category": "horror",
        "background": "#ffcc00",
        "foreground": "#002244",
        "cursor": "#cc0000",
        "colors": [
            "#ffaa00", "#cc0000", "#004499", "#ffffff",
            "#0088cc", "#e6a100", "#1a1100", "#473000",
            "#aa0000", "#002266", "#e6b800", "#ffffff",
            "#ff4d4d", "#3388ff", "#291f00", "#ffffff"
        ]
    },
{
    "name": "Chucky_Overalls_Denim",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0b1626",
    "foreground": "#e03131",
    "cursor": "#f08c00",
    "colors": [
        "#050b12", "#e03131", "#f08c00", "#2f9e44",
        "#1864ab", "#1971c2", "#102a45", "#0c1f33",
        "#c92a2a", "#e67e22", "#2b8a3e", "#1c7ed6",
        "#ff6b6b", "#ffd43b", "#08101c", "#ffffff"
    ]
},
{
    "name": "Chucky_Striped_Malice",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0d0d0d",
    "foreground": "#ffffff",
    "cursor": "#e03131",
    "colors": [
        "#000000", "#e03131", "#e67e22", "#2b8a3e",
        "#1c7ed6", "#9c27b0", "#333333", "#555555",
        "#c92a2a", "#d946ef", "#06b6d4", "#facc15",
        "#ff6b6b", "#a855f7", "#171717", "#ffffff"
    ]
},
{
    "name": "Chucky_Stitched_Plastic",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0f0d0c",
    "foreground": "#d94141",
    "cursor": "#704214",
    "colors": [
        "#060505", "#d94141", "#704214", "#241610",
        "#3b251b", "#54382c", "#704c3d", "#8f6452",
        "#a61e1e", "#54300c", "#14100e", "#4d0000",
        "#ff6b6b", "#8c5623", "#120e0d", "#ffffff"
    ]
},
{
    "name": "Chucky_Ginger_Rage",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0d0602",
    "foreground": "#e65c00",
    "cursor": "#1c7ed6",
    "colors": [
        "#050201", "#e65c00", "#1c7ed6", "#241003",
        "#3d1c07", "#592a0c", "#783b12", "#9c4f1c",
        "#cc4400", "#115da3", "#140703", "#5c1b00",
        "#ff8533", "#4dabf7", "#120904", "#ffffff"
    ]
},
{
    "name": "Chucky_Wanna_Play",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#04050d",
    "foreground": "#ffcc00",
    "cursor": "#e03131",
    "colors": [
        "#020207", "#ffcc00", "#e03131", "#12142b",
        "#1f2447", "#2f3869", "#42508f", "#586cb8",
        "#cca300", "#c92a2a", "#090a17", "#4d0000",
        "#ffee55", "#ff6b6b", "#070914", "#ffffff"
    ]
},
{
    "name": "Chucky_Bride_Leather",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#050505",
    "foreground": "#e0e0e0",
    "cursor": "#9c27b0",
    "colors": [
        "#010101", "#e0e0e0", "#9c27b0", "#141414",
        "#262626", "#3b3b3b", "#545454", "#707070",
        "#b3b3b3", "#7b1fa2", "#0a0a0a", "#4a005c",
        "#ffffff", "#d946ef", "#0d0d0d", "#ffffff"
    ]
},
{
    "name": "Chucky_Seed_Of_Blood",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0a0303",
    "foreground": "#b50e0e",
    "cursor": "#2b8a3e",
    "colors": [
        "#040101", "#b50e0e", "#2b8a3e", "#210909",
        "#3b1212", "#571d1d", "#752929", "#963939",
        "#870707", "#20662e", "#140606", "#3d0000",
        "#ff4d4d", "#40c057", "#120505", "#ffffff"
    ]
},
{
    "name": "Chucky_Voodoo_Awakening",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#08040d",
    "foreground": "#9c27b0",
    "cursor": "#39ff14",
    "colors": [
        "#040207", "#9c27b0", "#39ff14", "#1a0d29",
        "#2e1847", "#452569", "#5f348f", "#7c47bd",
        "#7b1fa2", "#26cc0d", "#11091c", "#4d0066",
        "#e040fb", "#7bf56e", "#0f0817", "#ffffff"
    ]
},
{
    "name": "Chucky_Toy_Factory",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0b0c10",
    "foreground": "#c5cbd3",
    "cursor": "#0088cc",
    "colors": [
        "#050608", "#0088cc", "#cc0000", "#1f2229",
        "#323742", "#495061", "#626b82", "#7e8aa6",
        "#006699", "#990000", "#12141a", "#003b5c",
        "#33a8ff", "#ff3333", "#101114", "#ffffff"
    ]
},
{
    "name": "Chucky_Play_Pals_Glow",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#040909",
    "foreground": "#00ffcc",
    "cursor": "#ffff00",
    "colors": [
        "#020404", "#00ffcc", "#ffff00", "#112626",
        "#1d3d3d", "#2b5958", "#3c7876", "#4f9c9a",
        "#00ccaa", "#cca300", "#070f0f", "#005241",
        "#55ffd9", "#ffee55", "#091313", "#ffffff"
    ]
},
{
    "name": "Chucky_Friends_To_The_End",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#000000",
    "foreground": "#cc0000",
    "cursor": "#004499",
    "colors": [
        "#000000", "#cc0000", "#004499", "#ffff00",
        "#222222", "#444444", "#888888", "#cccccc",
        "#990000", "#002b66", "#b38f00", "#4d4d4d",
        "#ff3333", "#3388ff", "#ffff55", "#ffffff"
    ]
}
];

// Target directory to save the output files
const outputDir = path.join(__dirname, 'chucky_themes');

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

console.log(`\nSuccess! All 12 Chucky themes saved perfectly inside the '${outputDir}' folder.`);
