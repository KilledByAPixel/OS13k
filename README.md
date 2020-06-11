# Welcome to OS13k!
OS13k is a tiny pseudo operating system designed for a JS13k community project. It includes native support for shadertoys, dweets, zzfx sounds, trophies, fullscreen, mobile support, and more. The OS (incuding zzfx, shadertoy, and dwitter support) is around 6k when zipped.

## Please keep this project confidential!

# [Live Demo](https://killedbyapixel.github.io/OS13k)
# [Discord](https://discord.gg/n8vxUcZ)
# [Trello Board](https://trello.com/b/1PNeOZfM/os13k) (ask for an invite)

## The Plan
- The idea is to make a tiny OS and host a variety of games, music, and apps that fit in 13k
- By sharing code with shaders, dweets, and zzfx we can pack a lot into 13k
- OS13k is around 6k by itself, but a big part of that is ZzFX, shader code, and dweet setup
- I'd like to see as many people as possible contribute tiny games and apps
- Programs should be in the 100-1000 byte range, what matters most is how well it compresses
- If apps are 500 bytes on average leveraging shared code, we can fit over 14 of them, probably more
- We could easily pack 1k of that with just like 10 or more really cool dweets and shaders
- A very important rule to the contest is that all content must be new, so no old stuff!
- You can start with an old project but polish it up a lot, minify it and make it work with OS13k
- We will need to curate the best and perhaps smallest content for what actualy lands in the JS13k build
- Anything left out of the JS13k build will still be available in the full GitHub version
- Another big part of this is the trophy system that ANY JS13k game (even non-OS13k) can opt into
- We make this repo public on day 1 of Js13k and open source everything, I haven't decided on license

You can learn more about JS13k here, I won 2nd place last year!
https://js13kgames.com/

## Programming Info
- OS13k stores it's list of programs in programs.js
- For fast iteration when deveoping, the first program in the list opens automatically

Add an icon config to programs.js to register your program, and send me pull request, examples...
- {src:'system/test.html', name:'Test', icon:'✌️', multiple:1, reload:1, code:1}
- {src:'dweets/underwaterCavern.dweet.js', name:'Underwater Cavern', icon:'🌊', author:'Pavel'}
- {src:'toys/infiniteYinYangs.shader.txt', name:'Yin Yangs', icon:'☯️'}
- {src:'help.html'}

### Programs
- OS13k can open any html file with javascript and it will work the same as if opened directly
- Chrome is recommended for development, but Firefox is also supported.
- Firefox and other bowers may not work localy because it treats local files as cross-origin
- Strict mode is not enforced but recommended to make minification easier with Google Closure
- To force a page to refresh you can add ?(version) to the src link... {src:'help.html?1'}
- Your program should be paused or light on cpu when it does not have focus, !document.hasFocus()
- Dweets and Shadertoys are automatically paused when not focued
- You do not need charset=utf-8, it will be applied automatically
- Prefix local storage keys with OS13k(program name) to prevent collisions
- OS13k works well on mobile devices, so we plan to have a separate entry for the JS13k mobile category
- Make use of the built in features of OS13k to save space in your code
- For now don't worry about submitting fully minified versions of your code, just keep it clean
- I will make a separate folder specifically for our minified build
- There is very little overhead for OS13k function call names, remember this will be zipped

### Games
- JS13k is a game development competiion, so games are one of the main things we need
- Don't put music in your games, music will be handled by music specific apps
- This way players can mix and match music with games!
- You can use dweets and shadertoys to make games too

### Shadertoys and Dweets
- Programs with the extension .shader.js or .dweet.js will automatically load as dweets or shadertoys!
- Shadertoys and dweets are automatically paused when they don't have focus
- They also automatically have reload and show code options applied
- Dweets do not need to be under 140 characers, so if you want to make a small app, maybe use a dweet
- Dweets can do anything that other programs can do including access OS13k and zzfx
- Shadertoy shaders support iTime, iFrame, iMouse, iResolution, and iChannel0
- iChannel0 is a loop back image of the previous frame, this can be used to store game logic or make effects
- Keep in mind that the entry for JS13k will be zipped, so repeated code may compress better
- Think of commonly used function calls as using only 1 byte

### System Calls
- The function OS13kStart() is called on child frames when opened
- To acces OS13k features, use the OS13k object
- OS13k.CreateShader(canvas, shaderCode) - Create a shadertoy compatible webgl shader
- OS13k.RenderShader(canvas, shaderProgram, time=0) - Render a shader
- OS13k.KeyDirection(key) - Get {x, y} position from a key code for WASD or arrow keys
- OS13k.PlaySamples(samples, sampleRate=44100) - Play audio samples
- OS13k.PlaySeed(seed, lengthScale=1, volume=1, randomness=.05) - Play a zzfx sound from seed
- OS13k.Speak(text) - Play speech of the text
- OS13k.StripHTML(string) - Removes html tags

### ZzFX
- ZzFX is my super tiny sound synth which is also on GitHub, but don't let it's size fool you
- Here is the sound desinger for ZzFX with a link to the public repo https://zzfx.3d2k.com/
- ZzFx sounds can played directly by calling zzfx, volume is controlled by the system
- A seeded ZzFX sound player is available to save space with much smaller sound calls
- Example OS13k.PlaySeed(1006), I will create a tool for looking for sound seeds soon

### Music
- Comming Soon!

### Math Library
- OS13k.Random(max=1, min=0) - Get a seeded random value, OS13k.randomSeed to set the seed
- OS13k.Clamp(a, min=0, max=1) - Clamp value between min and max
- OS13k.Percent(v, a, b) - Get clamped percent between a and b
- OS13k.Lerp(p, a, b) - Lerp clamped percent between a and b
- Let me know if anything else should be included, I am considering adding a vector class

### Program settings
- width and height - Size of window
- author - Name of creator
- multiple - Allows multiple copies of the window to open
- reload - Shows the reload page icon to reload your program
- code - Option to show the code for your program
- full - Set to 0 to disable fullscreen
- sleep - Set to 0 to disable sleeping
 
 ### Trophies
 - Apps can register trophies for their games, the os tracks which are unlocked
 - A function is provided for apps to unlock trophies, OS13k.Trophy(gameName, trophyName, icon, message)
 - Only gameName is necessary, the rest are optional
 - The gameName,trophyName,icon together form the unique id for the trophy
 - When a new trophy is unlocked or message is changed a popup will appear
 - Total trophy count is shown in the taskbar and the trophy case shows all unlocked trophies
 - Trophies can be tested with the System/Test tool
 
 ### Any JS13k game can use trophies, even if not part of OS13k!
 - To add a trophies to any JS13k game, just save a special key to localStorage
 - The simplest way to add a single trophies is save localStorage["OS13kTrophy,GameName"]=""
 - For more control use localStorage["OS13kTrophy,GameName,TrophyName,Icon"] = "Message"
 - You can change the message to update the trophy, like if it is a highscore
 - When OS13k is next run, it will search locaStorage and display popups for new trophies
 - This is possible because all JS13k games share the same local storage! Pretty cool right?
 
 ### Resources
 - [Dwitter](https://www.dwitter.net/) - The source of so much amazing tiny code
 - [The Dweetabase](http://dweetabase.3d2k.com/), and offline searable database of every dweet
 - [Shadertoy](https://www.shadertoy.com/) - There are many amazing tweet and 2 tweet sized shaders
 - [JS1k](https://js1k.com/) - I imagine with so much shared code and zip we could fit many of these size
 - [JS13k](https://js13kgames.com/) - This is our goal
