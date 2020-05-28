# Welcome to OS13k!

OS13k is a tiny pseudo operating system designed for a JS13k community project. It includes support for webgl shaders, zzfx, dweets, medals, fullscreen, and more. The OS (incuding zzfx and shader support) is only about 4k when zipped.

## Please keep this project confidential!

# [Live Demo](https://killedbyapixel.github.io/OS13k)
# [Trello Board](https://trello.com/b/1PNeOZfM/os13k)

## Programming Info

Add an icon config to desktopLayout to create a new program
- {name:'Test', icon:'✌️', src:'system/test.html'}
- {name:'Underwater Cavern', icon:'🌊', author:'Pavel', src:'dweets/underwaterCavern.dweet.js'}
- {name:'Yin Yangs', icon:'☯️', src:'toys/infiniteYinYangs.shader.txt'}
- {name:'Free Cell', icon:'♠️', src:'games/freeCell.html', width:800, height:1e3, hideWhenClosed:1}
- {src:'help.html'}

For faster iteration, top level icons will open on start if they have the flag 'open'
- {src:'help.html', open:1}

### Programming Notes
- OS13k and zzfx features will not work on when browsing localling in Firefox!
- To force a page to refresh you can add ?<version> to the src link... {src:'help.html?1'}
- you do not need charset=utf-8, it will be applied automatically
- programs with the extension .dweet.js will load as dweets
- programs with the extension .shader.txt will load as shadertoy shaders
  
 ### Shadertoy Shaders
 - supports iTime, iMouse, iResolution, and iChannel0
 - iChannel0 is an image of the previous frame
 - pi and e are also exposed as constants

### Icon settings
- width and height of window
- author - name of creator
- hideWhenClosed - hides the window instead of closing it
- allowMultiple - allows multiple copies of the window to open
- open - starts open (only for top level icons)
- background - set background color for iframe (white by default)

### OS13k System Calls
- The function OS13kInit is called on child frames when opened
- To acces OS13k features, use the OS13k object
- ZzFx sounds can played by calling zzfx, volume is controlled by the system
- OS13k.CreateShader(canvas, shaderCode) - create a shadertoy compatible webgl shader
- OS13k.RenderShader(canvas, shaderProgram, time=0) - render a shader
- OS13k.Medal(gameName, medalName='', difficulty=0) - register a medal for your game as complete
- OS13k.GetKeyDirection(key) handles getting and {x, y} position from a key code
- OS13k.PlaySamples(samples, sampleRate=44100) - play audio samples
- OS13k.PlaySeedSound(seed, lengthScale=.5, volume=1, randomness=.05) - Plays a zzfx sound from seed

### OS13k Math Functions
- OS13k.Random(max=1, min=0) - get a seeded random value, OS13k.randomSeed to set the seed
- OS13k.Clamp(a, min=0, max=1) - clamp value between min and max
- OS13k.Percent(v, a, b) - get clamped percent between a and b
- OS13k.Lerp(p, a, b) - lerp clamped percent between a and b
