const fs = require('fs');
const path = require('path');

// Array containing 12 distinct Friday the 13th themes with high-saturation blood elements
const themes = [
    {
        "name": "Friday_Crystal_Lake_Gore",
        "author": "Darkstar [darkstardevx@gmail.com]",
        "category": "horror",
        "background": "#020709",
        "foreground": "#ff0011",
        "cursor": "#ff0033",
        "colors": [
            "#010304", "#ff0011", "#0d3140", "#06151c",
            "#132933", "#1b3d4d", "#26546a", "#326d8a",
            "#8a0303", "#cc0000", "#470000", "#1c4a5e",
            "#ff3344", "#ff6677", "#050f14", "#ffffff"
        ]
    },
{
    "name": "Friday_Hockey_Mask_Splatter",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0a0a0d",
    "foreground": "#d1cdb8",
    "cursor": "#990000",
    "colors": [
        "#050506", "#990000", "#d1cdb8", "#1c1c24",
        "#33323a", "#4d4b54", "#696773", "#878494",
        "#7a0000", "#b39c7d", "#121217", "#4d0000",
        "#ff1a1a", "#e8e5d3", "#101014", "#ffffff"
    ]
},
{
    "name": "Friday_Camp_Blood",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#080605",
    "foreground": "#b51212",
    "cursor": "#ff0000",
    "colors": [
        "#040302", "#b51212", "#42281d", "#1f1511",
        "#33221a", "#4d3326", "#694634", "#875a43",
        "#800000", "#633c2a", "#120e0c", "#3d0000",
        "#ff3333", "#a87458", "#0f0c0a", "#ffffff"
    ]
},
{
    "name": "Friday_Jason_Lives_Viscera",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#050605",
    "foreground": "#e60000",
    "cursor": "#4dff00",
    "colors": [
        "#020302", "#e60000", "#283821", "#0f140d",
        "#1b2417", "#2a3824", "#3b4f33", "#4e6943",
        "#990000", "#456134", "#0a0f0a", "#520000",
        "#ff4d4d", "#6db048", "#0d120d", "#ffffff"
    ]
},
{
    "name": "Friday_Machete_Heck",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0d0e10",
    "foreground": "#8a0505",
    "cursor": "#9ea8b5",
    "colors": [
        "#060708", "#8a0505", "#9ea8b5", "#212429",
        "#373c45", "#505863", "#6c7785", "#8b9aa8",
        "#cc0000", "#697482", "#131517", "#4d0000",
        "#ff3333", "#bdc7d4", "#121417", "#ffffff"
    ]
},
{
    "name": "Friday_Artery_Gush",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#030000",
    "foreground": "#ff0022",
    "cursor": "#80000a",
    "colors": [
        "#010000", "#ff0022", "#80000a", "#1f0003",
        "#3d0007", "#5c000a", "#80000e", "#a30012",
        "#cc001b", "#4a0005", "#0a0001", "#121212",
        "#ff4d66", "#e60018", "#050000", "#ffffff"
    ]
},
{
    "name": "Friday_Cabin_Carnage",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0a0705",
    "foreground": "#d41111",
    "cursor": "#e5a65d",
    "colors": [
        "#050302", "#d41111", "#593e2b", "#241810",
        "#3b271b", "#543826", "#704a33", "#8f5f41",
        "#940000", "#734e32", "#140e0a", "#4d0000",
        "#ff4d4d", "#baa08a", "#120d09", "#ffffff"
    ]
},
{
    "name": "Friday_Drowned_In_Blood",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0c0512",
    "foreground": "#ff0055",
    "cursor": "#7b00a8",
    "colors": [
        "#060209", "#ff0055", "#4c1a57", "#1d0e26",
        "#321840", "#49235e", "#643080", "#813ea3",
        "#a30036", "#501d5c", "#14071f", "#5c001e",
        "#ff4d88", "#b666cc", "#0f0617", "#ffffff"
    ]
},
{
    "name": "Friday_The_Final_Chapter",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#050505",
    "foreground": "#b30000",
    "cursor": "#7a7a7a",
    "colors": [
        "#020202", "#b30000", "#4d4d4d", "#141414",
        "#262626", "#3b3b3b", "#545454", "#707070",
        "#800000", "#333333", "#0a0a0a", "#ff1a1a",
        "#ff4d4d", "#a6a6a6", "#121212", "#ffffff"
    ]
},
{
    "name": "Friday_Slaughter_Moon",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#06060c",
    "foreground": "#ff3344",
    "cursor": "#3366ff",
    "colors": [
        "#030306", "#ff3344", "#3366ff", "#131326",
        "#212140", "#31315e", "#444482", "#5a5aab",
        "#cc1122", "#1c3bb3", "#0f0f24", "#66000c",
        "#ff7785", "#7799ff", "#0d0d1a", "#ffffff"
    ]
},
{
    "name": "Friday_Pamela_Vengeance",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#08090a",
    "foreground": "#c41212",
    "cursor": "#3e524d",
    "colors": [
        "#040405", "#c41212", "#3e524d", "#1b2120",
        "#2b3432", "#3d4a47", "#52635f", "#69807a",
        "#940000", "#374742", "#111417", "#4d0000",
        "#ff4d4d", "#537067", "#101214", "#ffffff"
    ]
},
{
    "name": "Friday_Deep_Woods_Butcher",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#040605",
    "foreground": "#a80000",
    "cursor": "#2b3d26",
    "colors": [
        "#020302", "#a80000", "#2b3d26", "#111a10",
        "#1d2b1a", "#293d25", "#385433", "#496e43",
        "#7a0000", "#20301d", "#0c120e", "#3d0000",
        "#ff3333", "#436139", "#090e0b", "#ffffff"
    ]
}
];

// Target directory to save the output files
const outputDir = path.join(__dirname, 'friday13th_themes');

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
