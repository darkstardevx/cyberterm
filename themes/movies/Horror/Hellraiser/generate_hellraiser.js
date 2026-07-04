const fs = require('fs');
const path = require('path');

// Array containing 12 distinct Hellraiser themes
const themes = [
    {
        "name": "Hellraiser_Lament_Configuration",
        "author": "Darkstar [darkstardevx@gmail.com]",
        "category": "horror",
        "background": "#060402",
        "foreground": "#d4af37",
        "cursor": "#cc0000",
        "colors": [
            "#000000", "#d4af37", "#aa7c11", "#ffcc00",
            "#8a0303", "#cc0000", "#1c140d", "#2e251c",
            "#aa2222", "#ffd700", "#140e0a", "#540000",
            "#ff4d4d", "#ffe875", "#0a0705", "#ffffff"
        ]
    },
{
    "name": "Hellraiser_Order_Of_The_Gash",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#08080a",
    "foreground": "#e0e0e3",
    "cursor": "#990011",
    "colors": [
        "#030304", "#990011", "#c5a059", "#17171c",
        "#26262e", "#3a3a45", "#525261", "#6e6e80",
        "#cc001b", "#aa8033", "#121214", "#4a0005",
        "#ff4d66", "#d4af37", "#0d0d12", "#ffffff"
    ]
},
{
    "name": "Hellraiser_Leviathan_Labyrinth",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0a0b0d",
    "foreground": "#a3a9b0",
    "cursor": "#d4af37",
    "colors": [
        "#040506", "#d4af37", "#b30000", "#181b21",
        "#292e38", "#3d4554", "#545f73", "#6e7c96",
        "#b38f24", "#e60000", "#12141a", "#ffffff",
        "#ffd700", "#ff4d4d", "#0f1114", "#ffffff"
    ]
},
{
    "name": "Hellraiser_Cenobite_Leather",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#040405",
    "foreground": "#b8b8ba",
    "cursor": "#b51212",
    "colors": [
        "#010102", "#b51212", "#c99e32", "#121217",
        "#22222b", "#363642", "#4c4c5c", "#66667a",
        "#e60000", "#ffd700", "#0b0b0f", "#4d0000",
        "#ff4d4d", "#ffe680", "#08080a", "#ffffff"
    ]
},
{
    "name": "Hellraiser_Flesh_Bound",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0a0404",
    "foreground": "#e62e2e",
    "cursor": "#cca33d",
    "colors": [
        "#050202", "#e62e2e", "#cca33d", "#240f0f",
        "#3d1919", "#592424", "#783030", "#9c3e3e",
        "#a81616", "#a17e25", "#140808", "#4d0000",
        "#ff6666", "#ffd700", "#120505", "#ffffff"
    ]
},
{
    "name": "Hellraiser_Golden_Chime",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0d0a06",
    "foreground": "#ffcc00",
    "cursor": "#b30000",
    "colors": [
        "#060503", "#ffcc00", "#b30000", "#211a10",
        "#382d1b", "#524128", "#705a37", "#917447",
        "#cca300", "#e60000", "#17120b", "#4a0000",
        "#ffee55", "#ff4d4d", "#120e09", "#ffffff"
    ]
},
{
    "name": "Hellraiser_Hooks_And_Chains",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#08090a",
    "foreground": "#8a9299",
    "cursor": "#990000",
    "colors": [
        "#040405", "#990000", "#cfa13c", "#171a1c",
        "#282d30", "#3b4347", "#515c61", "#69777d",
        "#cc0000", "#b58724", "#111314", "#4d0000",
        "#ff3333", "#ffd700", "#0f1112", "#ffffff"
    ]
},
{
    "name": "Hellraiser_Pillar_Of_Souls",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#080605",
    "foreground": "#b59f84",
    "cursor": "#a81111",
    "colors": [
        "#040302", "#a81111", "#c49c3b", "#1c1613",
        "#302620", "#47382f", "#5e4b3f", "#785f50",
        "#7d0a0a", "#9c7929", "#120f0d", "#3d0000",
        "#ff4545", "#e5b849", "#0f0c0a", "#ffffff"
    ]
},
{
    "name": "Hellraiser_Engineering_Pleasure",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#050101",
    "foreground": "#ff1a1a",
    "cursor": "#d4af37",
    "colors": [
        "#020000", "#ff1a1a", "#d4af37", "#1f0003",
        "#3d0007", "#5c000a", "#80000e", "#a30012",
        "#cc0000", "#aa7c11", "#0a0001", "#4d0000",
        "#ff4d66", "#ffe875", "#050000", "#ffffff"
    ]
},
{
    "name": "Hellraiser_Gothic_Schism",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#07050a",
    "foreground": "#a688b5",
    "cursor": "#cc0033",
    "colors": [
        "#030205", "#cc0033", "#c29938", "#1a1326",
        "#2c2040", "#41305c", "#59427d", "#7356a1",
        "#990026", "#a17b25", "#110d1a", "#540011",
        "#ff4d77", "#ffd700", "#0e0a14", "#ffffff"
    ]
},
{
    "name": "Hellraiser_Bloodline_Legacy",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0a0808",
    "foreground": "#cca352",
    "cursor": "#940000",
    "colors": [
        "#050404", "#940000", "#cca352", "#241c1c",
        "#3b2e2e", "#544242", "#705858", "#8f7070",
        "#730000", "#a37f39", "#141010", "#3d0000",
        "#ff3333", "#ffd580", "#120e0e", "#ffffff"
    ]
},
{
    "name": "Hellraiser_To_Tear_Your_Soul",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#030303",
    "foreground": "#ffffff",
    "cursor": "#b30000",
    "colors": [
        "#000000", "#b30000", "#d4af37", "#141414",
        "#262626", "#3b3b3b", "#545454", "#707070",
        "#800000", "#aa7c11", "#090909", "#400000",
        "#ff3333", "#ffe875", "#000000", "#ffffff"
    ]
}
];

// Target directory to save the output files
const outputDir = path.join(__dirname, 'hellraiser_themes');

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

console.log(`\nSuccess! All 12 Hellraiser themes saved perfectly inside the '${outputDir}' folder.`);
