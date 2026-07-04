const fs = require('fs');
const path = require('path');

// Array containing 12 distinct Pac-Man and Ms. Pac-Man inspired themes
const themes = [
    {
        "name": "Pacman_Classic_Maze",
        "author": "Darkstar [darkstardevx@gmail.com]",
        "category": "neon",
        "background": "#000000",
        "foreground": "#ffff00",
        "cursor": "#2121ff",
        "colors": [
            "#000000", "#ff0000", "#ffb8ff", "#00ffff",
            "#ffb852", "#2121ff", "#dedede", "#ffff00",
            "#333333", "#ff3333", "#ff99ff", "#66ffff",
            "#ffcc00", "#1111ff", "#ffffff", "#ffff33"
        ]
    },
{
    "name": "Ms_Pacman_Cabinet",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#050015",
    "foreground": "#ff1493",
    "cursor": "#ffff00",
    "colors": [
        "#02000a", "#ff1493", "#ffff00", "#00bfff",
        "#ff8c00", "#4b0082", "#ffb8ff", "#2121ff",
        "#1a0033", "#ff69b4", "#ffee00", "#00ffff",
        "#ff5500", "#7a11cc", "#ffffff", "#0000ff"
    ]
},
{
    "name": "Pacman_Blinky_Chaser",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#0a0202",
    "foreground": "#ff0000",
    "cursor": "#ffff00",
    "colors": [
        "#030101", "#ff0000", "#7a0000", "#ff5555",
        "#2121ff", "#ffff00", "#dedede", "#333333",
        "#ff3333", "#cc0000", "#ff6666", "#0000ff",
        "#ffee00", "#ffffff", "#121212", "#ffb8ff"
    ]
},
{
    "name": "Pacman_Pinky_Ambush",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#0c040c",
    "foreground": "#ffb8ff",
    "cursor": "#2121ff",
    "colors": [
        "#050205", "#ffb8ff", "#b55eb5", "#ff66ff",
        "#ffff00", "#2121ff", "#00ffff", "#333333",
        "#ff99ff", "#cc00cc", "#ffccff", "#ffee00",
        "#0000ff", "#66ffff", "#140714", "#ffffff"
    ]
},
{
    "name": "Pacman_Inky_Tactics",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#02080a",
    "foreground": "#00ffff",
    "cursor": "#ff0000",
    "colors": [
        "#010405", "#00ffff", "#008b8b", "#66ffff",
        "#ffb852", "#2121ff", "#ffff00", "#333333",
        "#33ffff", "#00aaaa", "#99ffff", "#ff9900",
        "#0000ff", "#ffee00", "#05131a", "#ffffff"
    ]
},
{
    "name": "Pacman_Clyde_Wander",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#0a0602",
    "foreground": "#ffb852",
    "cursor": "#2121ff",
    "colors": [
        "#050301", "#ffb852", "#b3741b", "#ffcc80",
        "#00ffff", "#2121ff", "#ff0000", "#333333",
        "#ffaa44", "#8c5100", "#ffe0b2", "#66ffff",
        "#0000ff", "#ff3333", "#140d05", "#ffffff"
    ]
},
{
    "name": "Pacman_Power_Pellet",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#080808",
    "foreground": "#ffdeae",
    "cursor": "#ffff00",
    "colors": [
        "#040404", "#ffdeae", "#ffb852", "#2121ff",
        "#ff0000", "#00ffff", "#ffb8ff", "#222222",
        "#ffebd2", "#ffcc80", "#0000ff", "#ff3333",
        "#66ffff", "#ff99ff", "#141414", "#ffffff"
    ]
},
{
    "name": "Pacman_Blue_Ghost",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#030312",
    "foreground": "#4d4dff",
    "cursor": "#ffdeae",
    "colors": [
        "#010108", "#1111ff", "#4d4dff", "#ffdeae",
        "#ff0000", "#ffff00", "#00ffff", "#1c1c1c",
        "#0000cc", "#3333ff", "#8080ff", "#ffebb3",
        "#cc0000", "#ffee00", "#00aaaa", "#ffffff"
    ]
},
{
    "name": "Ms_Pacman_Pink_Maze",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#000000",
    "foreground": "#ff69b4",
    "cursor": "#ffff00",
    "colors": [
        "#000000", "#ff69b4", "#ff00ff", "#00ffff",
        "#ffb852", "#ffff00", "#dedede", "#333333",
        "#ff1493", "#cc00cc", "#66ffff", "#ffaa00",
        "#ffee00", "#ffffff", "#121212", "#ff0000"
    ]
},
{
    "name": "Pacman_Kill_Screen",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#050505",
    "foreground": "#39ff14",
    "cursor": "#ff00ff",
    "colors": [
        "#020202", "#39ff14", "#ffff00", "#2121ff",
        "#ff0000", "#00ffff", "#ffffff", "#262626",
        "#00ff00", "#ffee00", "#0000ff", "#cc0000",
        "#33ffff", "#ff00aa", "#141414", "#000000"
    ]
},
{
    "name": "Pacman_Arcade_Glow",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#07040d",
    "foreground": "#ffff00",
    "cursor": "#ff007f",
    "colors": [
        "#030206", "#2121ff", "#ff007f", "#ffff00",
        "#00ffff", "#ffb852", "#ff0000", "#1a1326",
        "#0000ff", "#ff0055", "#ffee00", "#33ffff",
        "#ff9933", "#cc0000", "#090512", "#ffffff"
    ]
},
{
    "name": "Ms_Pacman_Fruit_Bonus",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#080305",
    "foreground": "#ff3366",
    "cursor": "#ffcc00",
    "colors": [
        "#040102", "#ff3366", "#ffcc00", "#4caf50",
        "#ff5722", "#9c27b0", "#00ffff", "#241016",
        "#cc0033", "#ff9900", "#357a38", "#d03b0d",
        "#6a0dad", "#33ffff", "#000000", "#ffffff"
    ]
}
];

// Target directory to save the output files
const outputDir = path.join(__dirname, 'pacman_themes');

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

console.log(`\nSuccess! All 12 themes saved perfectly inside the '${outputDir}' folder.`);
