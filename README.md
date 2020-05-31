# Welcome to OS13k!
OS13k is a tiny pseudo operating system designed for a JS13k community project. It includes native support for shadertoys, dweets,  zzfx sounds, medals, fullscreen, mobile support, and more. The OS (incuding zzfx, shadertoy, and dwitter support) is under 6k when zipped.

## Please keep this project confidential!

# [Live Demo](https://killedbyapixel.github.io/OS13k)
# [Discord](https://discord.gg/apuXeT)
# [Trello Board](https://trello.com/b/1PNeOZfM/os13k) (ask for an invite)


## The Plan
- My crazy idea is to make this tiny OS to host a variety of games and utilities
- By sharing code like shader setup, dweets, and zzfx we can pack a lot into 13k
- Also another big part of this (not yet implemented) is the achievement system
- I'd like to see as many people as possible contribute tiny games and apps
- I will curate the content for what actualy lands in the JS13k build
- Anything left out of the JS13k build will still be available in the full GitHub version

## Programming Info

Add an icon config to desktop.js to register your program, and send me pull request

Make sure to put your program in the proper subfolder
- The first icon in desktopLayout opens on start
- {name:'Test', icon:'✌️', src:'system/test.html', multiple:1, reload:1, code:1}
- {name:'Underwater Cavern', icon:'🌊', author:'Pavel', src:'dweets/underwaterCavern.dweet.js'}
- {name:'Yin Yangs', icon:'☯️', src:'toys/infiniteYinYangs.shader.txt'}
- {src:'help.html'}

### Programming

- OS13k can open any html file with javascript and it will work the same as if opened directly
- Chrome is recommended for development
- Firefox will not work in local mode because it treats local files as cross-origin
- Strict mode is not enforced but recommended to make minification easier
- Programs with the extension .dweet.js or .shader.txt will automatically load as dweets or shadertoys
- To force a page to refresh you can add ?<version> to the src link... {src:'help.html?1'}
- Your program should be paused or light on cpu when it does not have focus, !document.hasFocus() 
- You do not need charset=utf-8, it will be applied automatically
- Prefix local storage keys with OS13k(program name) to prevent collisions
- OS13k works well on mobile devices, so we plan to have a separate entry for the JS13k mobile category
- Make use of the built in features of OS13k to save space in your code

### System Calls
- The function OS13kStart(icon) is called on child frames when opened
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
- width and height - Size of window
- author - Name of creator
- multiple - Allows multiple copies of the window to open
- reload - Shows the reload page icon to reload your program
- code - Option to show the code for your program
- dweets and shadertoys always show reload and code options

### Shadertoy Shaders
 - Supports iTime, iMouse, iResolution, and iChannel0
 - iChannel0 is an image of the previous frame
 - More can be added if there is a need
 
 ### Medals (not yet implemented)
 - Apps can register medals for their games, the os tracks which are unlocked
 - A function is provided for apps to unlock medals, OS13k.Medal
 - Players can view their medals and total points will be shown on the taskbar
 - Any JS13k game can use medals, even if not part of OS13k!
 - To add a medal to any JS13k game, just save a special key to localStorage
 - The simplest way to add a medal is save localStorage.OS13kMedals_GAMENAME=1 when the player wins
 - For more control use localStorage.OS13kMedals_GAMENAME = [{"medalName":name,"difficulty":difficultyl}...]
 - Both medal name and difficulty are optional
 - When OS13k is next run, it will search locaStorage and display medals unlocked by other games
