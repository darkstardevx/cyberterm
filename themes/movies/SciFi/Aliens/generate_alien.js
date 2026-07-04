const fs = require('fs');
const path = require('path');

// Array containing 12 distinct Alien / H.R. Giger themes
const themes = [
    {
        "name": "Alien_Xenomorph_Carapace",
        "author": "Darkstar [darkstardevx@gmail.com]",
        "category": "horror",
        "background": "#050608",
        "foreground": "#858e96",
        "cursor": "#107840",
        "colors": [
            "#020304", "#107840", "#858e96", "#14161c",
            "#22262e", "#333945", "#474f5e", "#5d677a",
            "#0a4a27", "#616970", "#0e1014", "#112e1b",
            "#39ff14", "#adb5bd", "#0a0c0e", "#ffffff"
        ]
    },
{
    "name": "Alien_Acid_Vitals",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#040804",
    "foreground": "#39ff14",
    "cursor": "#ccff00",
    "colors": [
        "#020402", "#39ff14", "#ccff00", "#112111",
        "#1f3d1f", "#305c30", "#448244", "#5baa5b",
        "#26b312", "#99cc00", "#091209", "#204008",
        "#66ff66", "#e1ff55", "#070e07", "#ffffff"
    ]
},
{
    "name": "Alien_Giger_Necronom",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0d0d0f",
    "foreground": "#9fa4a6",
    "cursor": "#4b5320",
    "colors": [
        "#060608", "#4b5320", "#9fa4a6", "#1c1d21",
        "#2e3036", "#44464f", "#5b5e69", "#757885",
        "#333816", "#73787a", "#141417", "#22260f",
        "#8b9467", "#cbd0d2", "#101012", "#ffffff"
    ]
},
{
    "name": "Alien_Nostromo_Corridor",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0b0d0e",
    "foreground": "#788780",
    "cursor": "#e6a100",
    "colors": [
        "#050607", "#e6a100", "#788780", "#1a1e21",
        "#2b3236", "#3f494f", "#56636b", "#70808a",
        "#b88100", "#54615b", "#111417", "#473200",
        "#ffbe33", "#a3b3ac", "#0f1112", "#ffffff"
    ]
},
{
    "name": "Alien_Biomechanical_Spine",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#09090b",
    "foreground": "#b5b0a5",
    "cursor": "#2e3b26",
    "colors": [
        "#040405", "#2e3b26", "#b5b0a5", "#19191f",
        "#2c2c36", "#424252", "#5b5b70", "#777791",
        "#1f291a", "#8c887f", "#121214", "#151f10",
        "#5c734d", "#ded9cf", "#0f0f12", "#ffffff"
    ]
},
{
    "name": "Alien_Egg_Silo_Slime",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#060907",
    "foreground": "#508265",
    "cursor": "#8be35d",
    "colors": [
        "#030403", "#8be35d", "#508265", "#162119",
        "#283b2d", "#3d5945", "#567d61", "#71a37f",
        "#67ab41", "#395c47", "#0f1411", "#2b4d14",
        "#adff80", "#99cfad", "#0a0f0c", "#ffffff"
    ]
},
{
    "name": "Alien_Facehugger_Flesh",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0d0908",
    "foreground": "#c4a08f",
    "cursor": "#8a1b1b",
    "colors": [
        "#060404", "#8a1b1b", "#c4a08f", "#241916",
        "#3d2b25", "#593f37", "#78564a", "#9c7061",
        "#5e1212", "#9e7f71", "#14100e", "#3b0808",
        "#b33030", "#ebd2c7", "#120e0d", "#ffffff"
    ]
},
{
    "name": "Alien_Weyland_Yutani",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0b0c10",
    "foreground": "#c5cbd3",
    "cursor": "#ffcc00",
    "colors": [
        "#050608", "#ffcc00", "#c5cbd3", "#1f2229",
        "#323742", "#495061", "#626b82", "#7e8aa6",
        "#cca300", "#9ca2a8", "#12141a", "#524100",
        "#ffee55", "#e6edf5", "#101114", "#ffffff"
    ]
},
{
    "name": "Alien_LV426_Atmosphere",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#05080d",
    "foreground": "#607d8b",
    "cursor": "#00e5ff",
    "colors": [
        "#020406", "#00e5ff", "#607d8b", "#141d2b",
        "#24344d", "#364d70", "#4b6b96", "#628bbf",
        "#00a2cc", "#455a64", "#0e131a", "#004754",
        "#66f3ff", "#90a4ae", "#0a0f14", "#ffffff"
    ]
},
{
    "name": "Alien_Hive_Breathing",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#040505",
    "foreground": "#425449",
    "cursor": "#1df06e",
    "colors": [
        "#010202", "#1df06e", "#425449", "#151c18",
        "#26332c", "#3a4d42", "#506b5c", "#688a77",
        "#12a64a", "#2d3b33", "#0c100e", "#04421c",
        "#6bf7a3", "#8cbfa1", "#080a0a", "#ffffff"
    ]
},
{
    "name": "Alien_Chestburster_Artery",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#0a0404",
    "foreground": "#cc1111",
    "cursor": "#39ff14",
    "colors": [
        "#050202", "#cc1111", "#39ff14", "#240f0f",
        "#3d1919", "#592424", "#783030", "#9c3e3e",
        "#990000", "#26cc0d", "#140808", "#400000",
        "#ff4d4d", "#7bf56e", "#120505", "#ffffff"
    ]
},
{
    "name": "Alien_Perfect_Organism",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "horror",
    "background": "#000000",
    "foreground": "#22edc7",
    "cursor": "#ffffff",
    "colors": [
        "#000000", "#22edc7", "#ffffff", "#1a1a1a",
        "#333333", "#4d4d4d", "#666666", "#808080",
        "#0abfbc", "#e6e6e6", "#0a0a0a", "#00473b",
        "#66ffd9", "#ffffff", "#000000", "#ffffff"
    ]
}
];

// Target directory to save the output files
const outputDir = path.join(__dirname, 'alien_themes');

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

console.log(`\nSuccess! All 12 Alien themes saved perfectly inside the '${outputDir}' folder.`);
