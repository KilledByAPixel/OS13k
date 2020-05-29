# Welcome to OS13k!

OS13k is a tiny pseudo operating system designed for a JS13k community project. It includes native support for webgl shaders, zzfx, dweets, medals, fullscreen, and more. The OS (incuding zzfx and shader support) is under 6k when zipped.

## Please keep this project confidential!

# [Live Demo](https://killedbyapixel.github.io/OS13k)
# [Trello Board](https://trello.com/b/1PNeOZfM/os13k)

## Programming Info

Add an icon config to desktopLayout to register a new program
- {name:'Test', icon:'✌️', src:'system/test.html'}
- {name:'Underwater Cavern', icon:'🌊', author:'Pavel', src:'dweets/underwaterCavern.dweet.js'}
- {name:'Yin Yangs', icon:'☯️', src:'toys/infiniteYinYangs.shader.txt'}
- {name:'Free Cell', icon:'♠️', src:'games/freeCell.html', width:800, height:1e3, hideWhenClosed:1}
- {src:'help.html'}

For faster iteration, the first icon in desktopLayout added opens on start
- you can also change the line desktopLayout.unshift({src:'system/test.html'});

### Programming
- All programs must run in strict mode, though for the 13k build we will disable strict
- Chrome is recommended for development
- Firefox will not work in local mode because it treats local files as cross-origin
- Programs with the extension .dweet.js or .shader.txt will automatically load as dweets or shadertoys
- To force a page to refresh you can add ?<version> to the src link... {src:'help.html?1'}
- You do not need charset=utf-8, it will be applied automatically
- Prefix local storage keys with OS13k(program name) to prevent collisions
- Make use of the built in features of OS13k to save space in your code

### System Calls
- The function OS13kInit is called on child frames when opened
- To acces OS13k features, use the OS13k object
- ZzFx sounds can played by calling zzfx, volume is controlled by the system
- OS13k.CreateShader(canvas, shaderCode) - Create a shadertoy compatible webgl shader
- OS13k.RenderShader(canvas, shaderProgram, time=0) - Render a shader
- OS13k.Medal(gameName, medalName='', difficulty=0) - Register a medal for your game as complete
- OS13k.KeyDirection(key) - Get position from a key code
- OS13k.PlaySamples(samples, sampleRate=44100) - Play audio samples
- OS13k.PlaySeedSound(seed, lengthScale=1, volume=1, randomness=.05) - Play a zzfx sound from seed
- OS13k.Speak(text) - Play speech of the text

### Math Library
- OS13k.Random(max=1, min=0) - Get a seeded random value, OS13k.randomSeed to set the seed
- OS13k.Clamp(a, min=0, max=1) - Clamp value between min and max
- OS13k.Percent(v, a, b) - Get clamped percent between a and b
- OS13k.Lerp(p, a, b) - Lerp clamped percent between a and b

### Icon settings
- width and height of window
- author - Name of creator
- hideWhenClosed - Hides the window instead of closing it
- allowMultiple - Allows multiple copies of the window to open
- showReload - Shows the reload page icon that will reload your program

### Shadertoy Shaders
 - Supports iTime, iMouse, iResolution, and iChannel0
 - iChannel0 is an image of the previous frame
 - pi and e are also exposed as constants
