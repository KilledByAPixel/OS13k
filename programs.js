const programs = 
[
{name:'Close All', icon:'❌',},
{src:'help.html?16', icon:'<b><span style=color:#0f0>?', width:380, height:400, help:'Check here to see help when available.\nSome programs have a option to show code instead.\n\nHave fun! ✌️😄'},
{src:'moreInfo.html?10', icon:'👨‍💻'},
{src:'https://js13kgames.com', name:'JS13k Website', icon:'<b><span style=font-family:currier;color:#b33>13k'},
{name:'System', icon:'⚙️', folder:
[
    {src:'system/trophyCase.html?8', icon:'🏆', width:680, help:'All your trophies are shown here.\nTotal trophy count is displayed in the taskbar.\n\nPlay games and experiment to win more trophies!'},
    {src:'system/clock.dweet.js?8', icon:'🕰️', width:200, height:200, reload:0, sleep:0, full:0, sticky:1},
    {src:'system/shell.html?1',icon:'<span style=color:#0f0;background:#000>&nbsp;>&nbsp;',  reload:1},
    {src:'system/test.html?12', reload:1, code:1, width:600, height:400, sticky:1},
    {name:'Test Folder', icon:'📁', folder:
    [
        {src:'system/test.html', name:'Hello!', icon:'✌️😄', width:600, height:400},
    ]},
]},
{name:'Apps', icon:'🛠️', folder:
[
    {src:'apps/stickyNote.html?2', icon:'✍️', width:300, height:264, full:0, sticky:1, help:'This note is persistant.\n\nYou can use commands like Ctrl+B, Ctrl+I, and Ctrl+U to add formatting.'},
    {src:'apps/photoBooth.html', icon:'📸', width:1400, height:550 },
    {src:'apps/unicodeToys.html', icon:'𝖀', author:'Xem', width:500, height:800},
    {src:'apps/miniShadertoy.html', icon:'𝓢', width:340, height:400},
    {src:'apps/textEditor.html', icon:'📝'},
    {src:'https://zzfx.3d2k.com', name:'ZzFX', icon:'<b>ℤℤ', width:1280, height:880},
    {src:'https://capjs.3d2k.com', name:'CapJS', icon:'𝓒𝓪𝓹', width:1280, height:750},
    {src:'https://dweetview.3d2k.com', name:'Dweet View', icon:'<span style=color:#f00;background:#000><b>&nbsp;III&nbsp;'},
]},
{name:'Games', icon:'🎮', folder:
[
    {src:'https://bounceback.3d2k.com', name:'Bounce Back', icon:'❤️', author:'Frank Force'},
    {src:'games/swatch.html?2', icon:'🌈', author:'Nicholas Ortenzio', width:320, height:340},
    {src:'games/lavaRush.html?4', icon:'🌋', author:'Jeremy Burns', width:640, height:400},
    {src:'games/sn1ke.html', icon:'👀', author:'Codegolf Team', width:450, height:330},
    {src:'games/tetris.html', icon:'<span style=font-size:10>▀█▀', author:'Veubeke', width:340, height:430, reload:1},
    {src:'games/queensGambit.html?4', icon:'<span style=color:#f0f>♛', reload:1},
    {src:'games/freeCell.html', icon:'♠️', width:800, height:900},
    {src:'games/hueJumper.html', icon:'🌲', reload:1},
]},
{name:'Music', icon:'🎶', folder:
[
    {src:'music/minBytes.html?5', icon:'<span style=color:#f00>𝓜', width:500, height:500},
]},
{name:'Toys', icon:'🤖', folder:
[
    {src:'toys/zzfxSoundBoard.html?1', name:'ZzFX Sound Board', icon:'𝐙𝐙', width:700, height:420},
    {src:'toys/zzartLandscape.shader.txt?3', name:'ZzArt Landscape', icon:'𝓩'},
    {src:'toys/infiniteYinYangs.shader.txt?2', icon:'<span style=color:#f00>☯'},
    {src:'toys/vogelSpiral.shader.txt?2', icon:'🌀'},
    {src:'index.html', name:'Meta OS13k', icon:'𝐎𝐒'},
]},
{name:'Dweets', icon:'<b>III', folder:
[
    {src:'dweets/blackHole.dweet.js', icon:'🌌'},
    {src:'dweets/underwaterCavern.dweet.js', icon:'🌊', author:'Pavel'},
    {src:'dweets/cityTraffic.dweet.js', icon:'🚌', author:'Tomxor'},
    {src:'dweets/trainSet.dweet.js', icon:'🚂', author:'jylikangas'},
    {src:'dweets/automaticBreakout.dweet.js', icon:'●'},
    {src:'dweets/bogusRoads.dweet.js', icon:'🛣️'},
    {src:'dweets/colorZoom.dweet.js', icon:'❤', author:'Cantelope'},
]},
];