// flags
var              // change to const for final build
sticky   = 2**0, // always save position and if open
reload   = 2**1, // show reload button
awake    = 2**2, // prevent sleep and dim when not active
full     = 2**3, // show full screen button
resize   = 2**4, // show resize buttons (apect ratio maintained)
code     = 2**5, // show code button (cant show code if help is set)

// system flags
closeAll   = 2**6,         // close all open windows
newUserProgram = 2**7,     // create new user program
deleteUserPrograms = 2**8, // remove all user programs

// defaults
defaultFlags = full|reload|resize,
defaultWidth = 720, defaultHeight = 405, // 16:9 aspect

// program format
//[src, icon, width, height, flags, name, help, folder]

programStubs = 
[
['❌',,,,closeAll,'Close All'],
['<b><span style=color:#0f0>?','help.html',380,400,resize,,'Check here to see help, code, or edit user programs.\n\nHave fun! ✌️😄'],
['⚙️',,,,,'System',,
[
    ['🏆','system/trophyCase.html',,,full|resize|sticky],
    ['✏️','system/stickyNote.html',300,263,sticky|reload,,'Ctrl+B = Bold\nCtrl+I = Italic\nCtrl+U = Underline\n\Reload = Clear'],
    ['🕰️','system/clock.dweet.js',198,198,sticky|code|awake],
    ['🎚️','system/settings.html',470,190,sticky],
    ['📁',,,,,'Test',,
    [
        [,'system/systemTest.html',600,370,defaultFlags|code],
        ['⌨️🖱️','system/inputTest.dweet.js'],
        ['✌️😄','index.html',,,,'Meta OS13k'],
    ]],
]],
['🛠️',,,,,'Apps',,
[
    ['⌛','apps/timer.html',400,139,reload],
    ['📈','apps/grapher.html'],
    ['📸','apps/camera.html',640,480],
    ['<span style=color:#0f0;background:#000;font-family:monospace>JS>','apps/console.html']
]],
['🎮',,,,,'Games',,
[
    ['🏂🏻','games/bogusSlopes.dweet.js'],
    ['🙉','games/dontFall.dweet.js'],
    ['🌋','games/lavaRush.html',640,400],
    ['🌈','games/swatch.html',320,340,reload],
    ['👀','games/sn1ke.html',400,280],
    ['♠️','games/freeCell.html',800,900,full|reload],
    ['🌲','games/hueJumper.html'],
    ['🛣️','games/bogusRoadsMini.dweet.js'],
]],
['🎶',,,,,'Music',,
[
    ['🎵','music/musicPlayer.html',400,330,sticky],
    ['👁️','music/visualizer.dweet.js',,,awake|full|resize|code],
    ['🎹','music/piano.html',520,510,reload],
    ['🥁','music/sequencer.html',,360,,,'Keyboard = Note\nUp/Down = Volume\nSpace = Stop\nEnter = End'],
    ['🌱','music/soundSeeds.html',350,480,resize|reload],
    ['🦈','music/byteBeatPlayer.html',300,89,reload],
    ['🎼','music/bach.dweet.js'],
    ['<span style=color:#f00>𝓜','music/minBytes.html',450,450],
    ['🦗','music/smallSeeds.html',520,340,full|reload,,'This is a special tool for devs.\nUse smaller seeds to save space.\nYou can also tab through the list.'],
]],
['🤖',,,,,'Toys',,
[
    ['𝐙𝐙','toys/zzfxSoundBoard.html',700,420,,'ZzFX Sound Board'],
    ['𝓩','toys/zzartLandscape.shader.txt',,,,'ZzFX Landscape'],
    ['<span style=color:#f00>☯','toys/infiniteYinYangs.shader.txt'],
    ['🌀','toys/vogelSpiral.shader.txt'],
]],
['<b>III',,,,,'Dweets',,
[
    ['🌌','dweets/blackHole.dweet.js'],
    ['🌊','dweets/underwaterCavern.dweet.js'],
    ['🚌','dweets/cityTraffic.dweet.js'],
    ['🚂','dweets/trainSet.dweet.js'],
    ['■','dweets/automaticBreakout.dweet.js'],
    ['❤️','dweets/colorZoom.dweet.js'],
    ['🔺','dweets/triFractal.dweet.js'],
]]
];