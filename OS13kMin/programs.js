// flags
var
sticky  = 2**0, // always save position and if open
reload  = 2**1, // show reload button
awake   = 2**2, // prevent dim and pause when not active
full    = 2**3, // show full screen button
resize  = 2**4, // show resize buttons (apect ratio maintained)
code    = 2**5, // show code button (cant show code if help is set)

// defaults
defaultFlags = full|reload|resize,
defaultWidth = 720, defaultHeight = 405, // 16:9 aspect

// program format
//[src, icon, width, height, flags, author, name, help, folder]

programs = 
[
[,'❌',,,,'Close All'],
['help.html','<b><span style=color:#0f0>?',380,400,full|resize,,'Check here to see help when available.\nSome programs have a option to show code instead.\n\nHave fun! ✌️😄'],
[,'⚙️',,,,'System',,
[
    ['system/test.html',,,resize|code|sticky],
    ['system/trophyCase.html','🏆',,,resize|sticky],
    ['system/wordList.html','📕',,,resize|sticky],
    ['system/clock.dweet.js','🕰️',200,200,sticky|code|awake],
    [,'📁',,,,'Test',,
    [
        ['index.html','✌️😄',,,,'Meta OS13k'],
    ]],
]],
]; // programs