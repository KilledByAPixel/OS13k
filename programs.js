const programs = 
[
{name:'Close All', icon:'❌',},
{src:'help.html?19', icon:'<b><span style=color:#0f0>?', width:380, height:400, help:'Check here to see help when available.\nSome programs have a option to show code instead.\n\nHave fun! ✌️😄', reload:0},
{src:'moreInfo.html?12', icon:'👨‍💻'},
{name:'System', icon:'⚙️', folder:
[
    {src:'system/console.html?56',icon:'<span style=color:#0f0;background:#000;font-family:monospace>JS>'},
    {src:'system/dictionary.html?3',icon:'📕', sticky:1},
    {src:'system/trophyCase.html?16', icon:'🏆', width:680, sticky:1, help:'All your trophies are shown here.\nTotal trophy count is displayed in the taskbar.\n\nPlay games and experiment to win more trophies!'},
    {src:'system/clock.dweet.js?13', icon:'🕰️', width:200, height:200, reload:0, sleep:0, full:0, sticky:1, resize:0},
    {src:'system/test.html?20', code:1, width:600, height:400, sticky:1},
    {name:'Test Folder', icon:'📁', folder:
    [
        {src:'index.html?1', name:'Meta OS13k', icon:'✌️😄'},
    ]},
]},
{name:'Apps', icon:'🛠️', folder:
[
    {src:'apps/stickyNote.html?4', icon:'✍️', width:300, height:264, full:0, sticky:1, resize:0, help:'Ctrl+B - Bold\nCtrl+I - Italic\nCtrl+U - Underline\n\Reload to clear'},
    {src:'apps/photoBooth.html', icon:'📸', width:1400, height:550 },
    {src:'apps/unicodeToys.html', icon:'𝖀', author:'Xem', width:500, height:800},
    {src:'apps/miniShadertoy.html', icon:'𝓢', width:340, height:400, resize:0},
    {src:'apps/textEditor.html', icon:'📝'},
    {src:'apps/sheets.html', icon:'🔠', width:650, height:130, resize:0},
    {src:'https://dweetview.3d2k.com', name:'Dweet View', icon:'<span style=color:#f00;background:#000><b>&nbsp;III&nbsp;'},
]},
{name:'Games', icon:'🎮', folder:
[
    {src:'https://bounceback.3d2k.com', name:'Bounce Back', icon:'❤️', author:'Frank Force', reload:0},
    {src:'games/swatch.html?3', icon:'🌈', author:'Nicholas Ortenzio', width:320, height:340, resize:0},
    {src:'games/lavaRush.html?5', icon:'🌋', author:'Jeremy Burns', width:640, height:400},
    {src:'games/sn1ke.html', icon:'👀', author:'Codegolf Team', width:400, height:280, resize:0},
    {src:'games/tetris.html', icon:'<span style=font-size:10>▀█▀', author:'Veubeke', width:210, height:380, resize:0},
    {src:'games/queensGambit.html?4', icon:'<span style=color:#f0f>♛'},
    {src:'games/freeCell.html', icon:'♠️', width:800, height:900, resize:0},
    {src:'games/hueJumper.html', icon:'🌲'},
    {src:'dweets/bogusRoads.dweet.js', icon:'🛣️'},
]},
{name:'Music', icon:'🎶', folder:
[
    {src:'music/minBytes.html?6', icon:'<span style=color:#f00>𝓜', width:450, height:450, resize:0},
    {src:'music/piano.html', icon:'🎹', width:800, height:300},
    {src:'music/bach.dweet.js', icon:'♫'},
]},
{name:'Toys', icon:'🤖', folder:
[
    {src:'toys/zzfxSoundBoard.html?1', name:'ZzFX Sound Board', icon:'𝐙𝐙', width:700, height:420},
    {src:'toys/zzartLandscape.shader.txt?3', name:'ZzArt Landscape', icon:'𝓩'},
    {src:'toys/infiniteYinYangs.shader.txt?2', icon:'<span style=color:#f00>☯'},
    {src:'toys/vogelSpiral.shader.txt?2', icon:'🌀'},
]},
{name:'Dweets', icon:'<b>III', folder:
[
    {src:'dweets/blackHole.dweet.js', icon:'🌌'},
    {src:'dweets/underwaterCavern.dweet.js', icon:'🌊', author:'Pavel'},
    {src:'dweets/cityTraffic.dweet.js', icon:'🚌', author:'Tomxor'},
    {src:'dweets/trainSet.dweet.js', icon:'🚂', author:'jylikangas'},
    {src:'dweets/automaticBreakout.dweet.js', icon:'●'},
    {src:'dweets/colorZoom.dweet.js', icon:'❤', author:'Cantelope'},
    {src:'dweets/triFractal.dweet.js?1', icon:'🔺', author:'Cantelope'},
]},
]