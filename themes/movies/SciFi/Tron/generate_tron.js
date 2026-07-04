const fs = require('fs');
const path = require('path');

// Array containing 12 distinct TRON inspired themes
const themes = [
    {
        "name": "Tron_The_Grid_System",
        "author": "Darkstar [darkstardevx@gmail.com]",
        "category": "neon",
        "background": "#02040a",
        "foreground": "#00f0ff",
        "cursor": "#ff5500",
        "colors": [
            "#010205", "#00f0ff", "#ff5500", "#7000ff",
            "#ffff00", "#222226", "#44444a", "#888894",
            "#00a8ff", "#ff2a00", "#5500cc", "#ccaa00",
            "#55ffff", "#ff9955", "#050a14", "#ffffff"
        ]
    },
{
    "name": "Tron_Identity_Disc",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#050508",
    "foreground": "#ffffff",
    "cursor": "#00e5ff",
    "colors": [
        "#020204", "#00e5ff", "#ffffff", "#0044ff",
        "#1a1a24", "#333344", "#555566", "#aaaa88",
        "#0088cc", "#d1f7ff", "#0022aa", "#33333b",
        "#66f0ff", "#ffffff", "#0b0b12", "#ffffff"
    ]
},
{
    "name": "Tron_Lightcycle_Blaze",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#040506",
    "foreground": "#ff6c00",
    "cursor": "#00f3ff",
    "colors": [
        "#020203", "#ff6c00", "#00f3ff", "#ff0055",
        "#26262b", "#3d3d45", "#595963", "#a1a1b5",
        "#cc5500", "#00a2cc", "#cc0044", "#ffaa44",
        "#ff9d55", "#66f7ff", "#0a0c0e", "#ffffff"
    ]
},
{
    "name": "Tron_MCP_Overlord",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#0a0202",
    "foreground": "#ff0033",
    "cursor": "#ffaa00",
    "colors": [
        "#050101", "#ff0033", "#ffaa00", "#3a0000",
        "#1f1f1f", "#333333", "#555555", "#888888",
        "#cc0029", "#cc8800", "#660000", "#ff5500",
        "#ff5577", "#ffcc66", "#140505", "#ffffff"
    ]
},
{
    "name": "Tron_Legacy_Clu",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#080705",
    "foreground": "#ffcc00",
    "cursor": "#ff5500",
    "colors": [
        "#040302", "#ffcc00", "#ff5500", "#ffea00",
        "#1c1a17", "#302d26", "#4a463b", "#787160",
        "#cca300", "#cc4400", "#ffee55", "#ffaa00",
        "#ffe680", "#ff8844", "#12100b", "#ffffff"
    ]
},
{
    "name": "Tron_Rinzler_Purge",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#060505",
    "foreground": "#ff3300",
    "cursor": "#4d4d4d",
    "colors": [
        "#030202", "#ff3300", "#262626", "#121212",
        "#3d3d3d", "#595959", "#787878", "#9e9e9e",
        "#cc2900", "#ff5533", "#1a1a1a", "#000000",
        "#ff7755", "#c2c2c2", "#0f0d0d", "#ffffff"
    ]
},
{
    "name": "Tron_User_Faith",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#03080c",
    "foreground": "#00ffcc",
    "cursor": "#ffffff",
    "colors": [
        "#010406", "#00ffcc", "#ffffff", "#0088ff",
        "#0e1f2b", "#1c3b52", "#2e5b7a", "#4582ab",
        "#00cca3", "#d1f7ff", "#0066cc", "#00a8ff",
        "#55ffd9", "#ffffff", "#06131c", "#ffffff"
    ]
},
{
    "name": "Tron_Recognizer_Patrol",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#060608",
    "foreground": "#ff2a2a",
    "cursor": "#00a8ff",
    "colors": [
        "#030304", "#ff2a2a", "#00a8ff", "#292933",
        "#3d3d4d", "#545466", "#707085", "#9090a8",
        "#cc2222", "#0088cc", "#1c1c24", "#005588",
        "#ff6666", "#55c4ff", "#0d0d12", "#ffffff"
    ]
},
{
    "name": "Tron_Bit_Binary",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#050705",
    "foreground": "#39ff14",
    "cursor": "#ff3333",
    "colors": [
        "#020402", "#39ff14", "#ff3333", "#172d17",
        "#264a26", "#376b37", "#4d944d", "#66c266",
        "#2ecc71", "#cc2222", "#0b140b", "#ff6666",
        "#85ff00", "#ff7777", "#0a0e0a", "#ffffff"
    ]
},
{
    "name": "Tron_Sea_Of_Simulation",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#030612",
    "foreground": "#0077ff",
    "cursor": "#00ffff",
    "colors": [
        "#010208", "#0077ff", "#00ffff", "#140d33",
        "#221954", "#34277a", "#4a39a3", "#634dcf",
        "#0055cc", "#00cccc", "#0a0d24", "#00a8ff",
        "#5599ff", "#55ffff", "#05091c", "#ffffff"
    ]
},
{
    "name": "Tron_Grid_Bug_Glitch",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#08040a",
    "foreground": "#bd00ff",
    "cursor": "#39ff14",
    "colors": [
        "#040205", "#bd00ff", "#39ff14", "#251233",
        "#3d1f54", "#59307a", "#7a43a3", "#9e59cf",
        "#9900cc", "#2ecc71", "#13091a", "#00ff66",
        "#d655ff", "#85ff00", "#0e0712", "#ffffff"
    ]
},
{
    "name": "Tron_Solar_Sailer",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#05090a",
    "foreground": "#00ffaa",
    "cursor": "#ffaa00",
    "colors": [
        "#020405", "#00ffaa", "#ffaa00", "#14262d",
        "#213d47", "#315966", "#44788a", "#5a9cb3",
        "#00cc88", "#cc8800", "#0d1c21", "#ff7700",
        "#55ffcc", "#ffcc44", "#070e12", "#ffffff"
    ]
}
];

// Target directory to save the output files
const outputDir = path.join(__dirname, 'tron_themes');

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
