const fs = require('fs');
const path = require('path');

// Array containing 12 distinct Synthwave themes
const themes = [
    {
        "name": "Synthwave_Outrun_Grid",
        "author": "Darkstar [darkstardevx@gmail.com]",
        "category": "neon",
        "background": "#050512",
        "foreground": "#ff007f",
        "cursor": "#00ffff",
        "colors": [
            "#000000", "#39ff14", "#1a0033", "#2b0054",
            "#ff007f", "#00ffff", "#ff00ff", "#ff0055",
            "#711c91", "#0d47a1", "#1b1b1b", "#2a2a2a",
            "#ff4500", "#ffff00", "#00ffcc", "#ffffff"
        ]
    },
{
    "name": "Synthwave_Sunset_Blvd",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#0f051d",
    "foreground": "#ff5500",
    "cursor": "#ff00aa",
    "colors": [
        "#07020e", "#1b0a33", "#331361", "#4f1e94",
        "#6f2ad1", "#933bfe", "#41187a", "#270f4a",
        "#ff5500", "#ff00aa", "#ffee00", "#9d00ff",
        "#ff2a6d", "#ffaa00", "#05d9e8", "#ffffff"
    ]
},
{
    "name": "Synthwave_Miami_Vise",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#090414",
    "foreground": "#00f0ff",
    "cursor": "#f35588",
    "colors": [
        "#04020a", "#150a2e", "#291359", "#411f8c",
        "#5c2bc4", "#7b3bfe", "#341870", "#1f0e42",
        "#00f0ff", "#f35588", "#05dfd7", "#ea00d9",
        "#240090", "#3500d3", "#190061", "#ffffff"
    ]
},
{
    "name": "Synthwave_Laser_Tag",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#060606",
    "foreground": "#39ff14",
    "cursor": "#ff007f",
    "colors": [
        "#030303", "#141414", "#262626", "#3d3d3d",
        "#575757", "#737373", "#2e2e2e", "#1c1c1c",
        "#39ff14", "#ff007f", "#00ffff", "#ffff00",
        "#00ffcc", "#ff00aa", "#6a0dad", "#ffffff"
    ]
},
{
    "name": "Synthwave_Cyber_Cruise",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#04050f",
    "foreground": "#00bfff",
    "cursor": "#fe019a",
    "colors": [
        "#020207", "#0d1030", "#1a2054", "#2a337a",
        "#3b49a3", "#4f62cf", "#212861", "#14183b",
        "#00bfff", "#fe019a", "#711c91", "#0ffe6b",
        "#0077ff", "#ff0055", "#4d0099", "#ffffff"
    ]
},
{
    "name": "Synthwave_Rad_Racer",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#0d0409",
    "foreground": "#ff2a6d",
    "cursor": "#ffea00",
    "colors": [
        "#060204", "#1a0812", "#331024", "#521a3b",
        "#752554", "#9c3170", "#42152f", "#270c1c",
        "#ff2a6d", "#ffea00", "#05d9e8", "#01012b",
        "#ff5e00", "#e1ff00", "#b500ff", "#ffffff"
    ]
},
{
    "name": "Synthwave_Grid_Runner",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#05040a",
    "foreground": "#bc13fe",
    "cursor": "#00ffaa",
    "colors": [
        "#020205", "#0f0c1f", "#1f183e", "#322764",
        "#48388f", "#614cbd", "#2a2154", "#191433",
        "#bc13fe", "#00ffaa", "#ff007f", "#39ff14",
        "#9d4edd", "#00f0ff", "#ff00aa", "#ffffff"
    ]
},
{
    "name": "Synthwave_Vector_Viper",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#030807",
    "foreground": "#00ffcc",
    "cursor": "#bd00ff",
    "colors": [
        "#010403", "#061411", "#0d2923", "#164239",
        "#215d50", "#2d7a69", "#12342d", "#0a1f1b",
        "#00ffcc", "#bd00ff", "#ff0055", "#e1ff00",
        "#33ffdd", "#ff55ff", "#0f3830", "#ffffff"
    ]
},
{
    "name": "Synthwave_Analog_Dream",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#07050d",
    "foreground": "#e0115f",
    "cursor": "#0abfbc",
    "colors": [
        "#030206", "#120d24", "#231942", "#372769",
        "#4f3994", "#694bc4", "#2c2057", "#1b1336",
        "#e0115f", "#0abfbc", "#ffb703", "#7015ff",
        "#ff5588", "#05dfd7", "#4a154b", "#ffffff"
    ]
},
{
    "name": "Synthwave_Vapor_Glow",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#0b0512",
    "foreground": "#ff7ff5",
    "cursor": "#8000ff",
    "colors": [
        "#050209", "#150a21", "#28123e", "#3f1d61",
        "#5a2a8b", "#7938ba", "#351552", "#200d31",
        "#ff7ff5", "#8000ff", "#00ffff", "#ff00aa",
        "#ffb3ff", "#c77dff", "#1c0033", "#ffffff"
    ]
},
{
    "name": "Synthwave_Chrome_Heart",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#080407",
    "foreground": "#ff0055",
    "cursor": "#ffcc00",
    "colors": [
        "#040203", "#140a11", "#261320", "#3d1f34",
        "#572c4a", "#743b63", "#33162a", "#1f0d19",
        "#ff0055", "#ffcc00", "#ff00aa", "#00ff66",
        "#ff5588", "#ffee55", "#3a0022", "#ffffff"
    ]
},
{
    "name": "Synthwave_Static_Horizon",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "neon",
    "background": "#08080c",
    "foreground": "#ea00d9",
    "cursor": "#00f0ff",
    "colors": [
        "#040406", "#111119", "#1e1e2d", "#2d2d42",
        "#3e3e5b", "#515177", "#242433", "#15151f",
        "#ea00d9", "#00f0ff", "#ffdd00", "#ff3300",
        "#f35588", "#55ffff", "#0f0f17", "#ffffff"
    ]
}
];

// Target directory to save the output files
const outputDir = path.join(__dirname, 'synthwave_themes');

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
