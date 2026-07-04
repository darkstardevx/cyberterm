const fs = require('fs');
const path = require('path');

// Array containing 12 distinct Dystopian themes
const themes = [
    {
        "name": "Dystopian_Brutalist_Block",
        "author": "Darkstar [darkstardevx@gmail.com]",
        "category": "dystopian",
        "background": "#121414",
        "foreground": "#b2b8b8",
        "cursor": "#ff3b30",
        "colors": [
            "#090a0a", "#1a1e1e", "#2c3333", "#404a4a",
            "#566363", "#6e7e7e", "#333c3c", "#212626",
            "#ff3b30", "#788282", "#9ca6a6", "#4f5555",
            "#ff6b63", "#d1d9d9", "#151717", "#ffffff"
        ]
    },
{
    "name": "Dystopian_Toxic_Fallout",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "dystopian",
    "background": "#0a0d08",
    "foreground": "#94a684",
    "cursor": "#a3ff00",
    "colors": [
        "#040503", "#12170e", "#202a1a", "#303e27",
        "#425536", "#566e46", "#25301e", "#161d12",
        "#a3ff00", "#70825e", "#556644", "#3d4d30",
        "#c2ff55", "#b8c7ad", "#0b0f09", "#ffffff"
    ]
},
{
    "name": "Dystopian_Smog_Choked",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "dystopian",
    "background": "#14120f",
    "foreground": "#c2b4a0",
    "cursor": "#ff9500",
    "colors": [
        "#090807", "#211e19", "#3b352d", "#595044",
        "#7a6e5d", "#9e8e79", "#453e35", "#292520",
        "#ff9500", "#a89984", "#8c7e6c", "#5c5347",
        "#ffb855", "#ded3c3", "#171512", "#ffffff"
    ]
},
{
    "name": "Dystopian_Rust_Monolith",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "dystopian",
    "background": "#0f0a08",
    "foreground": "#c4a395",
    "cursor": "#d9531e",
    "colors": [
        "#070403", "#1c110e", "#331f19", "#4f3027",
        "#6e4337", "#915949", "#412720", "#271713",
        "#d9531e", "#a67c6c", "#855d4e", "#5c3d31",
        "#ff7b47", "#e3cfc6", "#140e0b", "#ffffff"
    ]
},
{
    "name": "Dystopian_Ash_Sky",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "dystopian",
    "background": "#101012",
    "foreground": "#a1a1a8",
    "cursor": "#e63946",
    "colors": [
        "#070708", "#1a1a1f", "#2e2e36", "#454552",
        "#5f5f70", "#7b7b91", "#363640", "#212126",
        "#e63946", "#737380", "#8e8e9c", "#4d4d54",
        "#ff6b76", "#ccccd6", "#121214", "#ffffff"
    ]
},
{
    "name": "Dystopian_Ministry_Sec",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "dystopian",
    "background": "#0b0c10",
    "foreground": "#9aa0a6",
    "cursor": "#cc0000",
    "colors": [
        "#050608", "#14161c", "#242730", "#373b4a",
        "#4d5266", "#646b85", "#2b2e3b", "#1a1c24",
        "#cc0000", "#5c6273", "#777f94", "#404552",
        "#ff3333", "#bdc2cf", "#101114", "#ffffff"
    ]
},
{
    "name": "Dystopian_Wasteland_Sand",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "dystopian",
    "background": "#0d0b08",
    "foreground": "#bfa88a",
    "cursor": "#c7923c",
    "colors": [
        "#060504", "#1a1610", "#30291f", "#4a3f30",
        "#665843", "#877459", "#3d3527", "#242018",
        "#c7923c", "#948065", "#786751", "#524536",
        "#ffcd73", "#ded1be", "#120f0b", "#ffffff"
    ]
},
{
    "name": "Dystopian_Acid_Rain",
    "author": "Darkstar [darkstardevx4@gmail.com]",
    "category": "dystopian",
    "background": "#060a0a",
    "foreground": "#7da3a1",
    "cursor": "#00ffaa",
    "colors": [
        "#030505", "#0e1717", "#1b2b2b", "#2b4544",
        "#3d6160", "#528280", "#233837", "#152121",
        "#00ffaa", "#517371", "#688f8d", "#3b5453",
        "#55ffcc", "#a4c4c2", "#0a0f0f", "#ffffff"
    ]
},
{
    "name": "Dystopian_Blackout_Grid",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "dystopian",
    "background": "#050505",
    "foreground": "#7a7a7a",
    "cursor": "#333333",
    "colors": [
        "#020202", "#0f0f0f", "#1f1f1f", "#303030",
        "#454545", "#5c5c5c", "#292929", "#191919",
        "#333333", "#4d4d4d", "#666666", "#1c1c1c",
        "#808080", "#b3b3b3", "#080808", "#ffffff"
    ]
},
{
    "name": "Dystopian_Neon_Decay",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "dystopian",
    "background": "#0a050d",
    "foreground": "#937da3",
    "cursor": "#fe019a",
    "colors": [
        "#050206", "#170c1f", "#2b163a", "#422259",
        "#5c2f7c", "#7a3fa6", "#361b47", "#21102b",
        "#fe019a", "#68537a", "#4f3f5e", "#352a40",
        "#ff66cc", "#c3b4cc", "#100814", "#ffffff"
    ]
},
{
    "name": "Dystopian_Silo_Depth",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "dystopian",
    "background": "#060809",
    "foreground": "#7d8b94",
    "cursor": "#00a8ff",
    "colors": [
        "#030404", "#101417", "#1e252b", "#2d3942",
        "#3f4f5c", "#53697a", "#242e36", "#161b20",
        "#00a8ff", "#53636e", "#6b7d8a", "#3b4852",
        "#55c4ff", "#a3b4bf", "#0a0c0e", "#ffffff"
    ]
},
{
    "name": "Dystopian_Scrap_Heap",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "dystopian",
    "background": "#0b0a08",
    "foreground": "#a89b87",
    "cursor": "#ff6200",
    "colors": [
        "#050504", "#171411", "#2b251f", "#423930",
        "#5c4f43", "#7a6959", "#363028", "#201c18",
        "#ff6200", "#706454", "#8c7e6b", "#4f4539",
        "#ff924d", "#cfc5b4", "#110f0c", "#ffffff"
    ]
}
];

// Target directory to save the output files
const outputDir = path.join(__dirname, 'dystopian_themes');

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
