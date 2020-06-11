const programs = 
[{name:'Close All', icon:'❌',},
{name:'Help', icon:'<b><span style=color:#0f0>?', src:'help.html?12', width:380, height:380},
{name:'More Info', icon:'👨‍💻', src:'info.html?9'},
{name:'JS13k Website', icon:'<b><span style=font-family:currier;color:#b33>13k', src:'https://js13kgames.com'},
{name:'System', icon:'⚙️', folder:
[
    {name:'Trophy Case', icon:'🏆', src:'system/trophies.html?3'},
    {name:'Clock', icon:'🕰️', src:'system/clock.dweet.js?4', width:200, height:200, reload:0, code:0, sleep:0, full:0},
    {name:'Shell', icon:'<span style=color:#0f0;background:#000>&nbsp;>&nbsp;', src:'system/shell.html?1', reload:1},
    {name:'Test', icon:'😄', src:'system/test.html?10', reload:1, code:1},
    {name:'Test Folder', icon:'📁', folder:
    [
        {name:'Test2', icon:'✌️', src:'system/test.html?6'},
    ]},
]},
{name:'Tools', icon:'🔧', folder:
[
    {name:'ZzFX', icon:'<b>ℤℤ', src:'https://zzfx.3d2k.com', height:880},
    {name:'CapJS', icon:'𝓒𝓪𝓹', src:'https://capjs.3d2k.com', height:900},
    {name:'Dweet View', icon:'<span style=color:#f00;background:#000><b>&nbsp;III&nbsp;', src:'https://dweetview.3d2k.com'},
    {name:'Photo Booth', icon:'📸', src:'tools/photoBooth.html', width:1400 },
    {name:'Unicode Toys', icon:'𝖀', author:'Xem', src:'tools/unicodeToys.html', width:500, height:800},
    {name:'Mini Shadertoy', icon:'𝓢', src:'tools/miniShadertoy.html', width:340, height:400},
    {name:'Text Editor', icon:'📝', src:'tools/textEditor.html'},
    {name:'Sticky Note', icon:'🟨', src:'tools/stickyNote.html?2', width:300, height:264, full:0},
]},
{name:'Games', icon:'🎮', folder:
[
    {name:'Bounce Back', icon:'❤️', src:'https://bounceback.3d2k.com', author:'Frank Force'},
    {name:'Swatch', icon:'🌈', src:'games/swatch.html?1', author:'Nicholas Ortenzio', width:320, height:340},
    {name:'Lava Rush', icon:'🌋', author:'Jeremy Burns', src:'games/lavaRush.html?4', width:640, height:400},
    {name:'Sn1ke', icon:'👀', author:'Codegolf Team', src:'games/sn1ke.html', width:450, height:330},
    {name:'Tetris', icon:'<span style=font-size:10>▀█▀', author:'Veubeke', src:'games/tetris.html', width:340, height:430, reload:1},
    {name:`Queen's Gambit`, icon:'<span style=color:#f0f>♛', src:'games/queensGambit.html?4', reload:1},
    {name:'Free Cell', icon:'♠️', src:'games/freeCell.html', width:800, height:900},
    {name:'Digit Dilemma', icon:'<span style=font-family:monospace>☻', src:'games/digitDilemma.html?2'},
    {name:'Hue Jumper', icon:'🌲', src:'games/hueJumper.html', reload:1},
]},
{name:'Music', icon:'🎶', folder:
[
    {name:'Min Bytes', icon:'<span style=color:#f00>𝓜', width:500, height:500, src:'music/minBytes.html?5'},
]},
{name:'Toys', icon:'🤖', folder:
[
    {name:'ZzFX Soundboard', icon:'𝐙𝐙', src:'toys/zzfxSoundBoard.html?1'},
    {name:'Yin Yangs', icon:'☯️', src:'toys/infiniteYinYangs.shader.txt?2'},
    {name:'Vogel Spiral', icon:'🌀', src:'toys/vogelSpiral.shader.txt?2'},
    {name:'Meta OS13k', icon:'𝐎𝐒', src:'index.html'},
    {name:'ZzArt Landscape', icon:'𝓩', src:'toys/zzart.shader.txt?3'},
]},
{name:'Dweets', icon:'<b>III', folder:
[
    {name:'Black Hole', icon:'🌌', src:'dweets/blackHole.dweet.js'},
    {name:'Mandelbrot Nebula', icon:'🌟', src:'dweets/mandelbrotNebula.dweet.js'},
    {name:'Bogus Roads', icon:'🛣️', src:'dweets/bogusRoads.dweet.js'},
    {name:'Automatic Breakout', icon:'●', src:'dweets/breakout.dweet.js'},
    {name:'Underwater Cavern', icon:'🌊', author:'Pavel', src:'dweets/underwaterCavern.dweet.js'},
    {name:'City Traffic', icon:'🚌', author:'Tomxor', src:'dweets/cityTraffic.dweet.js'},
    {name:'Train Set', icon:'🚂', author:'jylikangas', src:'dweets/trainSet.dweet.js'},
]},
];