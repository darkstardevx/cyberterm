const fs = require('fs');
const path = require('path');

// Array containing 12 distinct Death Metal themes
const themes = [
    {
        "name": "Death_Scream_Bloody_Gore",
        "author": "Darkstar [darkstardevx@gmail.com]",
        "category": "metal",
        "background": "#0a0404",
        "foreground": "#d11515",
        "cursor": "#39ff14",
        "colors": [
            "#050202", "#d11515", "#39ff14", "#240f0f",
            "#3d1919", "#592424", "#783030", "#9c3e3e",
            "#9e0e0e", "#29cc0d", "#140808", "#400000",
            "#ff4d4d", "#7bf56e", "#120505", "#ffffff"
        ]
    },
{
    "name": "Death_Leprosy_Decay",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "metal",
    "background": "#0d0908",
    "foreground": "#c47a62",
    "cursor": "#a81111",
    "colors": [
        "#060404", "#a81111", "#c47a62", "#241814",
        "#3b2721", "#54382f", "#704a3f", "#8f5f51",
        "#7d0a0a", "#9e5c46", "#14100e", "#3b0808",
        "#ff4545", "#ebd1c7", "#12100e", "#ffffff"
    ]
},
{
    "name": "Death_Symbolic_Horizon",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "metal",
    "background": "#05080c",
    "foreground": "#00a8ff",
    "cursor": "#ff9900",
    "colors": [
        "#020406", "#00a8ff", "#ff9900", "#141e2b",
        "#24344d", "#364d70", "#4b6b96", "#628bbf",
        "#0088cc", "#cc7a00", "#0e131a", "#00475e",
        "#55c4ff", "#ffb84d", "#0a0f14", "#ffffff"
    ]
},
{
    "name": "Cannibal_Eaten_Back_To_Life",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "metal",
    "background": "#050805",
    "foreground": "#39ff14",
    "cursor": "#cc0000",
    "colors": [
        "#020402", "#39ff14", "#cc0000", "#152415",
        "#263d26", "#395c39", "#4e804e", "#64a664",
        "#2ecc71", "#990000", "#0d140d", "#400000",
        "#85ff00", "#ff4d4d", "#0a0f0a", "#ffffff"
    ]
},
{
    "name": "Cannibal_Tomb_Of_Mutilated",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "metal",
    "background": "#0b0c10",
    "foreground": "#8ba3b3",
    "cursor": "#800000",
    "colors": [
        "#050608", "#800000", "#8ba3b3", "#1f2229",
        "#323742", "#495061", "#626b82", "#7e8aa6",
        "#5c0000", "#698191", "#12141a", "#3d0000",
        "#b30000", "#c2d4e0", "#101114", "#ffffff"
    ]
},
{
    "name": "Cannibal_Bleeding_Arteries",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "metal",
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
    "name": "Forbidden_Twisted_Into_Form",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "metal",
    "background": "#06050a",
    "foreground": "#bc13fe",
    "cursor": "#00f0ff",
    "colors": [
        "#030205", "#bc13fe", "#00f0ff", "#1a1529",
        "#2e2447", "#453669", "#5f4b8f", "#7c62bd",
        "#9900cc", "#00bfff", "#11091c", "#00475e",
        "#d655ff", "#55ffff", "#0e0814", "#ffffff"
    ]
},
{
    "name": "Forbidden_Evil_Illusion",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "metal",
    "background": "#080808",
    "foreground": "#9c9c9c",
    "cursor": "#b51212",
    "colors": [
        "#040404", "#b51212", "#9c9c9c", "#1c1c1c",
        "#333333", "#4d4d4d", "#666666", "#808080",
        "#8a0707", "#737373", "#0f0f0f", "#4d0000",
        "#ff3333", "#cccccc", "#141414", "#ffffff"
    ]
},
{
    "name": "Death_Sound_Of_Perseverance",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "metal",
    "background": "#070404",
    "foreground": "#ff3300",
    "cursor": "#bf9b63",
    "colors": [
        "#030202", "#ff3300", "#bf9b63", "#241412",
        "#3d221e", "#59332c", "#78463c", "#9c5d50",
        "#cc2900", "#a37d46", "#140808", "#540000",
        "#ff6644", "#dec299", "#120505", "#ffffff"
    ]
},
{
    "name": "Carcass_Symphony_Sickness",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "metal",
    "background": "#070805",
    "foreground": "#858c6e",
    "cursor": "#ff5500",
    "colors": [
        "#030402", "#ff5500", "#858c6e", "#171c13",
        "#262e1f", "#39452f", "#4d5c3f", "#637552",
        "#cc4400", "#697056", "#10130d", "#4a1500",
        "#ff8844", "#a6ad8f", "#0c0e0a", "#ffffff"
    ]
},
{
    "name": "Morbid_Altars_Of_Madness",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "metal",
    "background": "#050407",
    "foreground": "#bd00ff",
    "cursor": "#ffea00",
    "colors": [
        "#020204", "#bd00ff", "#ffea00", "#15101f",
        "#241c36", "#372b52", "#4c3c70", "#644f94",
        "#9900cc", "#ccbc00", "#0c0914", "#3d0052",
        "#d655ff", "#ffff55", "#08060d", "#ffffff"
    ]
},
{
    "name": "Obituary_Slowly_We_Rot",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "metal",
    "background": "#050604",
    "foreground": "#a6ff00",
    "cursor": "#800000",
    "colors": [
        "#020302", "#a6ff00", "#800000", "#12170f",
        "#20291a", "#2f3d27", "#405436", "#546e47",
        "#85cc00", "#5c0000", "#0b0d09", "#2b4000",
        "#bfff55", "#b30000", "#070806", "#ffffff"
    ]
}
];

// Target directory to save the output files
const outputDir = path.join(__dirname, 'death_metal_themes');

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

console.log(`\nSuccess! All 12 Death Metal themes saved perfectly inside the '${outputDir}' folder.`);
