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
['<b><span style=color:#0f0>?','help.html',300,300,resize,,'Check here to see help, code, or edit user programs.\n\nHave fun! ✌️😄'],
['⚙️',,,,,'System',,
[
    ['🏆','system/trophyCase.html',,,full|resize|sticky,,'View all your trophies here.\nAny JS13k game can add trophies, play to win more!'],
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
    ['📈','apps/grapher.html',,,,,'Enter an function of x to see the graph.\n\nMouse = Show Values\nWheel = Zoom'],
    ['📸','apps/camera.html',640,480],
    ['👾','apps/spriteGenerator.html'],
    ['<span style=color:#0f0;background:#000;font-family:monospace>JS>','apps/console.html']
]],
['🎶',,,,,'Music',,
[
    ['🎵','music/musicPlayer.html',400,330,sticky,,'OS13k can play music using the tiny ZzFXM format.\nJS13k games can add their music to your library.\nPlay games to collect more music.'],
    ['👁️','music/visualizer.dweet.js',,,awake|full|resize|code],
    ['🎹','music/piano.html',520,510,reload],
    ['🥁','music/sequencer.html',800,,,,'Keyboard = Note\nUp/Down = Volume\nSpace = Stop\nEnter = End'],
    ['🌱','music/soundSeeds.html',350,480,resize|reload,,'OS13k can play sounds using a hashed string.\nYou can also paste in ZzFX sounds.'],
    ['🦈','music/byteBeatPlayer.html',320,89,reload,,'Enter a funtion and length in seconds to generate music.'],
    ['🎼','music/bach.dweet.js'],
    ['<span style=color:#f00>𝓜','music/minBytes.html',450,450],
    ['🦗','music/smallSeeds.html',520,340,full|reload,,'This is a special tool for devs.\nUse smaller seeds to save space.\nYou can also tab through the list.'],
    ['𝐙𝐙','music/zzfxSoundBoard.html',700,420,,'ZzFX Sound Board'],
]],
['🎮',,,,,'Games',,
[
    ['💖','games/bounceBack.html',1280,720,,,'When life gets you down, it\'s never too late to... BOUNCE BACK!\n\nWASD = Move\nMouse = Aim\nClick = Throw\nShift = Dash'],
    ['🙉','games/dontFall.dweet.js',,,,,'Build energy to bounce higher.\n\nLeft/Right = Move\nDown = Bounce'],
    ['🏂🏻','games/bogusSlopes.dweet.js',,,,,'Star = Invincible\nClick = Move'],
    ['🌋','games/lavaRush.html',640,400,,,'Escape the rising lava for as long as you can.\n\nWASD = Move\nMouse = Look\nSpace = Jump'],
    ['🌈','games/swatch.html',320,340,reload,,'Create a smooth gradient.\n\nClick = Swap Colors'],
    ['🧜🏽‍♂️','games/aquaPop.html',640,480,,,'Left/Right = Move\nSpace = Shoot\nEnter = Restart'],
    ['<span style=color:#fff;background:#000;font-family:monospace>&nbsp;☻&nbsp;','games/digitDilemma.html',400,560,,,'Push numbers until none are left.\nAll puzzles are solvable!\n\nArrows = Move\nSpace = Undo\nR = Randomize'],
    ['<span style=font-size:25px>♠️','games/freeCell.html',800,900,full|reload],
    ['🌲','games/hueJumper.html',,,,,'Reach checkpoints to get more time.\nThe road ends at 1000.\n\nMouse = Turn\nClick = Brake\nDouble Click = Jump'],
    ['🛣️','games/bogusRoadsMini.dweet.js'],
]],
['<span style=color:#f40><b>𝓢',,,,,'Shader Toys',,
[
    ['𝓩𝔃','shaders/zzartLandscape.shader.txt',,,,'ZzArt Landscape'],
    ['<span style=color:#f00>☯','shaders/infiniteYinYangs.shader.txt'],
    ['🌀','shaders/vogelSpiral.shader.txt'],
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