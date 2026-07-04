const fs = require('fs');
const path = require('path');

// Array containing 12 distinct 80's Thrash Metal themes
const themes = [
    {
        "name": "Thrash_Master_Of_Puppets",
        "author": "Darkstar [darkstardevx@gmail.com]",
        "category": "metal",
        "background": "#0a0705",
        "foreground": "#d12323",
        "cursor": "#ffcc00",
        "colors": [
            "#050302", "#d12323", "#ffcc00", "#261a11",
            "#422e1e", "#5f432b", "#7d5939", "#9c6f47",
            "#a81616", "#cca300", "#140e0a", "#540707",
            "#ff4d4d", "#ffee55", "#120e09", "#ffffff"
        ]
    },
{
    "name": "Thrash_Reign_In_Blood",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "metal",
    "background": "#050101",
    "foreground": "#aa0000",
    "cursor": "#7a7a7a",
    "colors": [
        "#010000", "#aa0000", "#7a7a7a", "#1c0002",
        "#380004", "#540006", "#730008", "#94000b",
        "#800000", "#4d4d4d", "#0a0000", "#330002",
        "#e60000", "#b3b3b3", "#050000", "#ffffff"
    ]
},
{
    "name": "Thrash_Rust_In_Peace",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "metal",
    "background": "#030807",
    "foreground": "#00ffcc",
    "cursor": "#ffaa00",
    "colors": [
        "#010403", "#00ffcc", "#ffaa00", "#112621",
        "#1e423a", "#2c6155", "#3c8272", "#4f9e8b",
        "#00ccaa", "#cc8800", "#091412", "#005244",
        "#55ffd9", "#ffcc44", "#061311", "#ffffff"
    ]
},
{
    "name": "Thrash_Bonded_By_Blood",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "metal",
    "background": "#0a0404",
    "foreground": "#ff1a1a",
    "cursor": "#ffffff",
    "colors": [
        "#050202", "#ff1a1a", "#ffffff", "#210d0d",
        "#3b1717", "#572222", "#752e2e", "#963b3b",
        "#cc0000", "#e6e6e6", "#140808", "#4d0000",
        "#ff5555", "#ffffff", "#120505", "#ffffff"
    ]
},
{
    "name": "Thrash_Among_The_Living",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "metal",
    "background": "#07040a",
    "foreground": "#bc13fe",
    "cursor": "#39ff14",
    "colors": [
        "#030205", "#bc13fe", "#39ff14", "#1a0f26",
        "#2e1b42", "#452863", "#5f388a", "#7c49b3",
        "#9900cc", "#26cc0d", "#11091c", "#470066",
        "#d655ff", "#7bf56e", "#0e0814", "#ffffff"
    ]
},
{
    "name": "Thrash_Pleasure_To_Kill",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "metal",
    "background": "#0d0502",
    "foreground": "#e64500",
    "cursor": "#8a1414",
    "colors": [
        "#060201", "#e64500", "#8a1414", "#240f05",
        "#3d1b0a", "#592710", "#783616", "#9c481f",
        "#b33600", "#5c0d0d", "#140703", "#520000",
        "#ff6c33", "#b32424", "#120904", "#ffffff"
    ]
},
{
    "name": "Thrash_Beneath_The_Remains",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "metal",
    "background": "#080808",
    "foreground": "#ff5500",
    "cursor": "#d4af37",
    "colors": [
        "#040404", "#ff5500", "#d4af37", "#1c1c1c",
        "#333333", "#4d4d4d", "#666666", "#808080",
        "#cc4400", "#aa7c11", "#0f0f0f", "#541b00",
        "#ff8844", "#ffe875", "#141414", "#ffffff"
    ]
},
{
    "name": "Thrash_The_Legacy",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "metal",
    "background": "#05060a",
    "foreground": "#00bfff",
    "cursor": "#9d00ff",
    "colors": [
        "#020305", "#00bfff", "#9d00ff", "#121521",
        "#1f2438", "#2f3654", "#424c75", "#58659c",
        "#0099cc", "#7a00cc", "#090a12", "#00475e",
        "#55c4ff", "#b555ff", "#070914", "#ffffff"
    ]
},
{
    "name": "Thrash_Battle_Jacket_Denim",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "metal",
    "background": "#0c0e12",
    "foreground": "#cbd5e1",
    "cursor": "#e03131",
    "colors": [
        "#060709", "#cbd5e1", "#e03131", "#1e222b",
        "#2f3542", "#434b5e", "#5a657d", "#73809e",
        "#94a3b8", "#c92a2a", "#12141a", "#1a2436",
        "#f1f5f9", "#ff6b6b", "#0f1114", "#ffffff"
    ]
},
{
    "name": "Thrash_Agent_Orange",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "metal",
    "background": "#0a0806",
    "foreground": "#ff7700",
    "cursor": "#5c6654",
    "colors": [
        "#050403", "#ff7700", "#5c6654", "#211a14",
        "#382c22", "#524031", "#6e5642", "#8c6e54",
        "#cc5f00", "#454d3f", "#14100d", "#4d2400",
        "#ff9933", "#7c8a71", "#120e0b", "#ffffff"
    ]
},
{
    "name": "Thrash_Tape_Trading_Ink",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "metal",
    "background": "#050505",
    "foreground": "#d4d4d4",
    "cursor": "#ff3333",
    "colors": [
        "#010101", "#d4d4d4", "#ff3333", "#141414",
        "#262626", "#3b3b3b", "#545454", "#707070",
        "#a6a6a6", "#cc2929", "#0a0a0a", "#1a1a1a",
        "#ffffff", "#ff7777", "#0d0d0d", "#ffffff"
    ]
},
{
    "name": "Thrash_Violent_Restitution",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "metal",
    "background": "#0a0505",
    "foreground": "#e60000",
    "cursor": "#ccaa00",
    "colors": [
        "#050202", "#e60000", "#ccaa00", "#241010",
        "#3d1919", "#592424", "#783030", "#9c3e3e",
        "#b30000", "#a38800", "#140808", "#400000",
        "#ff4d4d", "#ffee55", "#120505", "#ffffff"
    ]
}
];

// Target directory to save the output files
const outputDir = path.join(__dirname, 'thrash_metal_themes');

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

console.log(`\nSuccess! All 12 Thrash Metal themes saved perfectly inside the '${outputDir}' folder.`);
