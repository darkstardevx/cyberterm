const fs = require('fs');
const path = require('path');

// Array containing 12 distinct Nightmare on Elm Street themes
const themes = [
    {
        "name": "Elm_Freddy_Sweater",
        "author": "Darkstar [darkstardevx@gmail.com]",
        "category": "horror",
        "background": "#0c0505",
        "foreground": "#d12323",
        "cursor": "#2b5937",
        "colors": [
            "#060202", "#d12323", "#2b5937", "#1a0b0b",
            "#122617", "#4d1414", "#26402d", "#1a1c1a",
            "#a81616", "#1c3d25", "#801111", "#132b1a",
            "#ff4545", "#478c58", "#120505", "#ffffff"
        ]
    },
{
    "name": "Elm_Boiler_Room",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0f0805",
    "foreground": "#d9531e",
    "cursor": "#ffcc00",
    "colors": [
        "#070402", "#d9531e", "#ffcc00", "#3a1f14",
        "#543217", "#6e4221", "#8c532b", "#21140e",
        "#b33c0d", "#cca300", "#732506", "#997a00",
        "#ff733b", "#ffee55", "#170c07", "#ffffff"
    ]
},
{
    "name": "Elm_Razor_Claw",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0d0e10",
    "foreground": "#e6e8ea",
    "cursor": "#ff0033",
    "colors": [
        "#060708", "#e6e8ea", "#ff0033", "#292e33",
        "#454c54", "#636d78", "#8592a0", "#aab7c4",
        "#b0b5bc", "#cc0029", "#1a1d21", "#780018",
        "#ffffff", "#ff5577", "#121417", "#ffffff"
    ]
},
{
    "name": "Elm_Dream_Demon",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#07040a",
    "foreground": "#bd00ff",
    "cursor": "#ff0055",
    "colors": [
        "#030205", "#bd00ff", "#ff0055", "#251233",
        "#3d1f54", "#59307a", "#7a43a3", "#9e59cf",
        "#9900cc", "#cc0044", "#13091a", "#780028",
        "##d655ff", "#ff5588", "#0e0712", "#ffffff"
    ]
},
{
    "name": "Elm_Blood_Geyser",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#050101",
    "foreground": "#800000",
    "cursor": "#ff1a1a",
    "colors": [
        "#020000", "#800000", "#ff1a1a", "#330000",
        "#4d0000", "#660000", "#990000", "#cc0000",
        "#4a0000", "#cc0000", "#b30000", "#ff4d4d",
        "#e60000", "#ff8080", "#120202", "#ffffff"
    ]
},
{
    "name": "Elm_Charred_Flesh",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0a0908",
    "foreground": "#a67c6c",
    "cursor": "#e0115f",
    "colors": [
        "#050404", "#a67c6c", "#e0115f", "#241915",
        "#3b2b25", "#543d35", "#705247", "#8f695b",
        "#855d4e", "#b50e4c", "#141210", "#5c0524",
        "#c49a8b", "#ff5493", "#12100e", "#ffffff"
    ]
},
{
    "name": "Elm_Never_Sleep",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#04050d",
    "foreground": "#00bfff",
    "cursor": "#fe019a",
    "colors": [
        "#020207", "#00bfff", "#fe019a", "#141733",
        "#222854", "#343c7a", "#4a55a3", "#6373cf",
        "#0088cc", "#cc017a", "#05091c", "#4d002b",
        "#55c4ff", "#ff66cc", "#070914", "#ffffff"
    ]
},
{
    "name": "Elm_Hypnocil_Blur",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#050a0a",
    "foreground": "#00ffcc",
    "cursor": "#7b2cbf",
    "colors": [
        "#020505", "#00ffcc", "#7b2cbf", "#142626",
        "#213d3d", "#315958", "#447876", "#5a9c9a",
        "#00ccaa", "#601fa3", "#070f0f", "#3c1061",
        "#55ffd9", "#a85eff", "#071212", "#ffffff"
    ]
},
{
    "name": "Elm_Nancy_Defiance",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0d0c0c",
    "foreground": "#f7f0e9",
    "cursor": "#ff3333",
    "colors": [
        "#060606", "#f7f0e9", "#ff3333", "#242121",
        "#3b3636", "#544e4e", "#706969", "#8f8585",
        "#ded3c8", "#cc2929", "#171414", "#7a1414",
        "#ffffff", "#ff7777", "#121010", "#ffffff"
    ]
},
{
    "name": "Elm_Springwood_Asphalt",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0b0c10",
    "foreground": "#9aa0a6",
    "cursor": "#d12323",
    "colors": [
        "#050608", "#9aa0a6", "#d12323", "#1f2229",
        "#323742", "#495061", "#626b82", "#7e8aa6",
        "#757b80", "#a81616", "#12141a", "#610b0b",
        "#bd\nc2cf", "#ff4545", "#101114", "#ffffff"
    ]
},
{
    "name": "Elm_Prime_Time",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#08080c",
    "foreground": "#ffff00",
    "cursor": "#ea00d9",
    "colors": [
        "#040406", "#ffff00", "#ea00d9", "#1c1c2b",
        "#2e2e47", "#454569", "#5f5f8f", "#7b7bb8",
        "#cca300", "#b500a8", "#0f0f17", "#5c0055",
        "#ffee55", "#f35588", "#121217", "#ffffff"
    ]
},
{
    "name": "Elm_1_2_Freddy_Comes",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#030303",
    "foreground": "#e0e0e0",
    "cursor": "#b30000",
    "colors": [
        "#010101", "#e0e0e0", "#b30000", "#141414",
        "#262626", "#3b3b3b", "#545454", "#707070",
        "#b3b3b3", "#800000", "#0a0a0a", "#4d0000",
        "#ffffff", "#ff3333", "#000000", "#ffffff"
    ]
}
];

// Target directory to save the output files
const outputDir = path.join(__dirname, 'nightmare_themes');

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
