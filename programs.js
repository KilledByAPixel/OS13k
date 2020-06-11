const programs = 
[
{name:'Close All', icon:'❌',},
{icon:'<b><span style=color:#0f0>?', src:'Help.html?15', width:380, height:380},
{icon:'👨‍💻', src:'MoreInfo.html?9'},
{name:'JS13k Website', icon:'<b><span style=font-family:currier;color:#b33>13k', src:'https://js13kgames.com'},
{name:'System', icon:'⚙️', folder:
[
    {icon:'🏆', src:'system/TrophyCase.html?8', sticky:1},
    {icon:'🕰️', src:'system/Clock.dweet.js?7', width:200, height:200, reload:0, sleep:0, full:0, sticky:1},
    {icon:'<span style=color:#0f0;background:#000>&nbsp;>&nbsp;', src:'system/Shell.html?1', reload:1},
    {src:'system/Test.html?11', reload:1, code:1, width:600, height:400, sticky:1},
    {name:'Test Folder', icon:'📁', folder:
    [
        {name:'Hello!', icon:'✌️😄', src:'system/Test.html', width:600, height:400},
    ]},
]},
{name:'Tools', icon:'🔧', folder:
[
    {icon:'✍️', src:'tools/StickyNote.html?2', width:300, height:264, full:0, sticky:1},
    {icon:'📸', src:'tools/PhotoBooth.html', width:1400, height:550 },
    {icon:'𝖀', author:'Xem', src:'tools/UnicodeToys.html', width:500, height:800},
    {icon:'𝓢', src:'tools/MiniShadertoy.html', width:340, height:400},
    {icon:'📝', src:'tools/TextEditor.html'},
    {name:'ZzFX', icon:'<b>ℤℤ', src:'https://ZzFX.3d2k.com', width:1280, height:880},
    {name:'CapJS', icon:'𝓒𝓪𝓹', src:'https://CapJS.3d2k.com', width:1280, height:750},
    {icon:'<span style=color:#f00;background:#000><b>&nbsp;III&nbsp;', src:'https://DweetView.3d2k.com'}
]},
{name:'Games', icon:'🎮', folder:
[
    {icon:'❤️', src:'https://BounceBack.3d2k.com', author:'Frank Force'},
    {icon:'🌈', src:'games/Swatch.html?1', author:'Nicholas Ortenzio', width:320, height:340},
    {icon:'🌋', author:'Jeremy Burns', src:'games/LavaRush.html?4', width:640, height:400},
    {icon:'👀', author:'Codegolf Team', src:'games/Sn1ke.html', width:450, height:330},
    {icon:'<span style=font-size:10>▀█▀', author:'Veubeke', src:'games/Tetris.html', width:340, height:430, reload:1},
    {icon:'<span style=color:#f0f>♛', src:'games/QueensGambit.html?4', reload:1},
    {icon:'♠️', src:'games/FreeCell.html', width:800, height:900},
    {icon:'<span style=font-family:monospace>☻', src:'games/DigitDilemma.html?2'},
    {icon:'🌲', src:'games/HueJumper.html', reload:1},
]},
{name:'Music', icon:'🎶', folder:
[
    {icon:'<span style=color:#f00>𝓜', width:500, height:500, src:'music/MinBytes.html?5'},
]},
{name:'Toys', icon:'🤖', folder:
[
    {name:'ZzFX Sound Board', icon:'𝐙𝐙', src:'toys/ZzFXSoundBoard.html?1', width:700, height:420},
    {name:'ZzArt Landscape', icon:'𝓩', src:'toys/ZzArtLandscape.shader.txt?3'},
    {icon:'☯', src:'toys/InfiniteYinYangs.shader.txt?2'},
    {icon:'🌀', src:'toys/VogelSpiral.shader.txt?2'},
    {name:'Meta OS13k', icon:'𝐎𝐒', src:'index.html'},
]},
{name:'Dweets', icon:'<b>III', folder:
[
    {icon:'🌌', src:'dweets/BlackHole.dweet.js'},
    {icon:'🌊', author:'Pavel', src:'dweets/UnderwaterCavern.dweet.js'},
    {icon:'🚌', author:'Tomxor', src:'dweets/CityTraffic.dweet.js'},
    {icon:'🚂', author:'jylikangas', src:'dweets/TrainSet.dweet.js'},
    {icon:'●', src:'dweets/AutomaticBreakout.dweet.js'},
    {icon:'🛣️', src:'dweets/BogusRoads.dweet.js'},
]},
];