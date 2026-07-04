const fs = require('fs');
const path = require('path');

// Array containing 12 distinct Cyberpunk / Hacker themes
const themes = [
    {
        "name": "Cyberpunk_Netrunner_Root",
        "author": "Darkstar [darkstardevx@gmail.com]",
        "category": "hacker",
        "background": "#020604",
        "foreground": "#39ff14",
        "cursor": "#00ff66",
        "colors": [
            "#010302", "#0b140d", "#15291b", "#22402a",
            "#305c3d", "#407d52", "#1b3824", "#0f2115",
            "#39ff14", "#00ff66", "#00aa44", "#107840",
            "#66ff66", "#99ffbb", "#050d08", "#ffffff"
        ]
    },
{
    "name": "Cyberpunk_Proxy_Leak",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "hacker",
    "background": "#02070a",
    "foreground": "#00f0ff",
    "cursor": "#0088ff",
    "colors": [
        "#010305", "#06131c", "#0d2434", "#16384e",
        "#204d6b", "#2c678c", "#112e42", "#081b28",
        "#00f0ff", "#0088ff", "#0055ff", "#00a8ff",
        "#55ffff", "#99f0ff", "#051119", "#ffffff"
    ]
},
{
    "name": "Cyberpunk_Icebreaker_Breach",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "hacker",
    "background": "#0b0404",
    "foreground": "#ff0055",
    "cursor": "#ff3300",
    "colors": [
        "#050202", "#1a0909", "#301212", "#4a1b1b",
        "#672626", "#873232", "#3d1616", "#240d0d",
        "#ff0055", "#ff3300", "#b2003b", "#ff6600",
        "#ff5588", "#ff99bb", "#140707", "#ffffff"
    ]
},
{
    "name": "Cyberpunk_Mainframe_Meltdown",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "hacker",
    "background": "#06050a",
    "foreground": "#bd00ff",
    "cursor": "#ff00aa",
    "colors": [
        "#030205", "#130b1c", "#241535", "#382052",
        "#4f2e73", "#6a3e9c", "#2f1b46", "#1c102a",
        "#bd00ff", "#ff00aa", "#800080", "#d600ff",
        "#d655ff", "#ff99ee", "#0d0a17", "#ffffff"
    ]
},
{
    "name": "Cyberpunk_Glitch_Matrix",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "hacker",
    "background": "#050606",
    "foreground": "#85ff00",
    "cursor": "#ffea00",
    "colors": [
        "#020303", "#0f1414", "#1f2929", "#324242",
        "#485e5e", "#5f7d7d", "#293636", "#192121",
        "#85ff00", "#ffea00", "#55aa00", "#ccff00",
        "#b3ff55", "#ffff99", "#0b0d0d", "#ffffff"
    ]
},
{
    "name": "Cyberpunk_Black_Hat_Sec",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "hacker",
    "background": "#08080c",
    "foreground": "#7b2cbf",
    "cursor": "#e0115f",
    "colors": [
        "#040406", "#111119", "#1e1e2d", "#2d2d42",
        "#3e3e5b", "#515177", "#242433", "#15151f",
        "#7b2cbf", "#e0115f", "#4a154b", "#9d4edd",
        "#b57edc", "#ff66cc", "#0f0f17", "#ffffff"
    ]
},
{
    "name": "Cyberpunk_Sub_Grid_Zero",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "hacker",
    "background": "#030809",
    "foreground": "#00ffcc",
    "cursor": "#39ff14",
    "colors": [
        "#010405", "#061417", "#0d262d", "#163c46",
        "#215462", "#2d7082", "#12343d", "#0a2026",
        "#00ffcc", "#39ff14", "#00a88f", "#00ff66",
        "#66ffd9", "#99ffbb", "#061317", "#ffffff"
    ]
},
{
    "name": "Cyberpunk_Encrypted_Asphalt",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "hacker",
    "background": "#0b0c10",
    "foreground": "#c5cbd3",
    "cursor": "#00ffff",
    "colors": [
        "#050608", "#11141a", "#1f242e", "#2f3645",
        "#414b5f", "#56637d", "#252b37", "#161a21",
        "#00ffff", "#ff0055", "#708090", "#495057",
        "#66ffff", "#ff6699", "#12141a", "#ffffff"
    ]
},
{
    "name": "Cyberpunk_Overclock_Viper",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "hacker",
    "background": "#040905",
    "foreground": "#a6ff00",
    "cursor": "#ff3300",
    "colors": [
        "#020402", "#0b190f", "#172d1c", "#25462c",
        "#35623e", "#478253", "#1b3722", "#102115",
        "#a6ff00", "#ff3300", "#77cc00", "#cc2200",
        "#ccff66", "#ff7755", "#0a130c", "#ffffff"
    ]
},
{
    "name": "Cyberpunk_Daemon_Spawn",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "hacker",
    "background": "#090408",
    "foreground": "#fe019a",
    "cursor": "#9d00ff",
    "colors": [
        "#040204", "#190b16", "#2f152a", "#4a2142",
        "#672e5b", "#873d77", "#3a1a33", "#23101f",
        "#fe019a", "#9d00ff", "#aa0066", "#6600cc",
        "#ff66cc", "#d677ff", "#140a12", "#ffffff"
    ]
},
{
    "name": "Cyberpunk_Static_Void",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "hacker",
    "background": "#070707",
    "foreground": "#e0e0e0",
    "cursor": "#00ffaa",
    "colors": [
        "#030303", "#121212", "#242424", "#383838",
        "#4c4c4c", "#636363", "#2c2c2c", "#1c1c1c",
        "#00ffaa", "#ff007f", "#00aa77", "#b50055",
        "#55ffcc", "#ff66b2", "#121212", "#ffffff"
    ]
},
{
    "name": "Cyberpunk_Sat_Link_Down",
    "author": "Darkstar [darkstardevx@gmail.com]",
    "category": "hacker",
    "background": "#05060f",
    "foreground": "#00bcff",
    "cursor": "#ffaa00",
    "colors": [
        "#020308", "#0f1224", "#1e2444", "#2f3967",
        "#42508e", "#586aba", "#252d54", "#151a33",
        "#00bcff", "#ffaa00", "#0088cc", "#cc8800",
        "#66d7ff", "#ffcc66", "#0b0d19", "#ffffff"
    ]
}
];

// Target directory to save the output files
const outputDir = path.join(__dirname, 'cyberpunk_themes');

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

