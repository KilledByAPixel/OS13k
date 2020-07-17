// flags
var              // change to const for final build
sticky   = 2**0, // always save position and if open
reload   = 2**1, // show reload button
awake    = 2**2, // prevent sleep and dim when not active
full     = 2**3, // show full screen button
resize   = 2**4, // show resize buttons (apect ratio maintained)
code     = 2**5, // show code button (cant show code if help is set)
close    = 2**6, // show code button (cant show code if help is set)

// system flags
closeAll   = 2**7,         // close all open windows
newUserProgram = 2**8,     // create new user program
deleteUserPrograms = 2**9, // remove all user programs

// defaults
defaultFlags = full|reload|resize,
defaultWidth = 720, defaultHeight = 405, // 16:9 aspect

// program format
//[src, icon, width, height, flags, name, help, folder]

programStubs = 
[
[,'❌',,,closeAll,'Close All'],
['help.html','<b><span style=color:#0f0>?',380,400,sticky,,'Check here to see help, code, or edit user programs.\n\nHave fun! ✌️😄'],
[,'⚙️',,,,'System',,
[
    ['system/settings.html','🎚️',470,190,sticky],
    ['system/trophyCase.html','🏆',,,full|resize|sticky],
    ['system/stickyNote.html','✏️',300,263,sticky|reload,,'Ctrl+B - Bold\nCtrl+I - Italic\nCtrl+U - Underline\n\Reload to clear'],
    ['system/clock.dweet.js','🕰️',198,198,sticky|code|awake],
    [,'📁',,,,'Test',,
    [
        ['system/systemTest.html',,600,370,defaultFlags|code],
        ['system/inputTest.dweet.js','⌨️🖱️'],
        ['index.html','✌️😄',,,,'Meta OS13k'],
    ]],
]],
[,'🛠️',,,,'Apps',,
[
    ['apps/console.html','<span style=color:#0f0;background:#000;font-family:monospace>JS>'],
    ['apps/timer.html','⌛',400,139,sticky|reload],
    ['apps/camera.html','📸',700,650],
    ['apps/calculator.html','🧮'],
    ['apps/textEditor.html','📝'],
]],
[,'🎮',,,,'Games',,
[
    ['games/bogusSlopes.dweet.js','🏂🏻'],
    ['games/dontFall.dweet.js','🙉'],
    ['games/lavaRush.html','🌋',640,400],
    ['games/swatch.html','🌈',320,340,reload],
    ['games/sn1ke.html','👀',400,280],
    ['games/tetris.html','<span style=font-size:10>▀█▀',210,380,reload],
    ['games/queensGambit.html','<span style=color:#f0f>♛'],
    ['games/freeCell.html','♠️',800,900,full|reload],
    ['games/hueJumper.html','🌲'],
    ['dweets/bogusRoads.dweet.js','🛣️'],
]],
[,'🎶',,,,'Music',,
[
    ['music/musicPlayer.html','🎵',400,330,sticky],
    ['music/piano.html','🎹',520,510,reload],
    ['music/soundSeeds.html','🌱',350,480,close|resize|reload],
    ['music/visualizer.dweet.js','👁️',,,awake|full|resize|code],
    ['music/bach.dweet.js','🎼'],
    ['music/minBytes.html','<span style=color:#f00>𝓜',450,450],
    ['music/smallSeeds.html','🦗',520,340,full|reload,,'This is a special tool for devs.\nUse smaller seeds to save space.\nYou can also tab through the list.'],
]],
[,'🤖',,,,'Toys',,
[
    ['toys/zzfxSoundBoard.html','𝐙𝐙',700,420,,'ZzFX Sound Board'],
    ['toys/zzartLandscape.shader.txt','𝓩',,,,'ZzFX Landscape'],
    ['toys/infiniteYinYangs.shader.txt','<span style=color:#f00>☯'],
    ['toys/vogelSpiral.shader.txt','🌀'],
]],
[,'<b>III',,,,'Dweets',,
[
    ['dweets/blackHole.dweet.js','🌌'],
    ['dweets/underwaterCavern.dweet.js','🌊'],
    ['dweets/cityTraffic.dweet.js','🚌'],
    ['dweets/trainSet.dweet.js','🚂'],
    ['dweets/automaticBreakout.dweet.js','■'],
    ['dweets/colorZoom.dweet.js','❤️'],
    ['dweets/triFractal.dweet.js','🔺'],
]]
];