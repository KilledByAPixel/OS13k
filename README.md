# Welcome to OS13k!
OS13k is a tiny pseudo operating system designed for a JS13k community project. It includes native support for shadertoys, dweets, zzfx sounds, music, trophies, fullscreen, touch control, and more. The OS is only around 6k zipped and much if that is shared code.

## Please keep this project confidential!

# [Live Demo](https://killedbyapixel.github.io/OS13k)
# [Discord](https://discord.gg/n8vxUcZ)
# [Trello Board](https://trello.com/b/1PNeOZfM/os13k) (ask for an invite)

## The Plan
- The idea is to build a tiny OS to host a variety of games, music, and apps that fits in 13 kilobytes
- OS13k is around 6k zipped, so by sharing code with dweets, shaders, and zzfx we can pack a lot into 13k
- I'd like to see as many people as possible contribute tiny games and apps
- Programs should be in the 100-1000 byte range, what matters most is how well it compresses
- We hope to fit on the order of 20 programs in total, [(maybe even 27 😅)](http://js13kgames.com/entries/26-games-in-1)
- We could easily pack 1k with just like 10 or more cool tiny dweets and shaders
- **A very important rule to the contest is that all content must be new, so no old stuff!
- You can start with an old project but polish it up a lot, minify it and make it work with OS13k
- We will need to curate the best and perhaps smallest content for what actualy lands in the JS13k build
- Anything left out of the JS13k build will still be available in the full GitHub version
- We make this repo public on day 1 of JS13k and open source everything, I haven't decided on license yet

### [You can learn more about JS13k here](https://js13kgames.com/) (I won 2nd place last year) 

## Programming Info
- OS13k stores it's list of programs in programs.js
- For fast iteration when developing, the first program in the list opens automatically

Add an icon config to programs.js to register your program, and send me pull request, examples...
- {name:'Hello!', icon:'✌️😄', src:'system/test.html', reload:1, code:1, sticky:1}
- {icon:'🌊', author:'Pavel', src:'dweets/UnderwaterCavern.dweet.js'}
- {icon:'☯', src:'toys/InfiniteYinYangs.shader.txt'}
- {src:'Help.html'}

### Programs
- OS13k can open any html file and it will work the same as if opened directly
- Chrome is recommended for development, but Firefox is also supported
- [Some browsers like Firefox may not work localy because it treats local files as cross-origin](https://discourse.mozilla.org/t/firefox-68-local-files-now-treated-as-cross-origin-1558299/42493/9)
- Strict mode is recommended to prevent bugs and make minification easier with Google Closure
- To force a page to refresh you can add ?(version) to the src link... {src:'Help.html?1'}
- Try to keep your program paused or light on cpu when it does not have focus, !document.hasFocus()
- Dweets and Shadertoys are automatically paused when not focused (unless sleep:0 is set)
- We must prefix all local storage keys with OS13kYourProgramName to prevent collisions during JS13k
- OS13k works well on mobile devices, so we can have a separate entry for the JS13k mobile category

### Minification Tips
- The goal is to fit as much as we can into 13 kilobytes so everything must be small
- For now don't worry about submitting fully minified versions of your code, just keep it clean
- Soon we will set up a separate branch with only minified programs
- For the OS13k core system I am using [Google Closer](https://closure-compiler.appspot.com/home] and [Terser](https://xem.github.io/terser-online)
- *Always remember, this will be zipped!
- Don't over golf code, there is very little overhead for common functions calls and strings
- For example it's better to use Math.PI then some approximation
- Don't compress your code in any way, let zip do the work for us
- Dweets and shadertoys are good for making programs with no setup cost
- You do not need charset=utf-8, it will be applied automatically
- We plan to pack everything together into one giant html file before zipping to save space

### Games
- *JS13k is a game development competition, so we need to focus on games and fun apps
- Don't put music in your games, music will be handled by music specific programs
- Use JS13k features like trophies and seeded sound effects to enrich your games
- Use local storage to save your game's data (prefix keys with OS13kYourProgramName)

### Apps
- We will incude some non-game apps that are small and fun to use
- Use local storage to save your app's data
- *Apps can play sounds and have trophies too

### Music
- We are working on a music system to play tracker songs with ZzFX sound effects [(WIP DEMO)](https://github.com/keithclark/ZzFXM)
- There will be music generators, synth instruments, and even mini albums
- The idea is that players can listen to music while playing with games and apps
- The music tools can even work in conjunction with each other (step sequencer drum kit + piano)

### Shadertoys and Dweets
- Programs with the extension .shader.js or .dweet.js will automatically load as dweets or shadertoys!
- Shadertoys and dweets are automatically paused when they don't have focus
- They also automatically have reload and show code options applied
- Dweets do not need to be under 140 characers, there is no size limit
- Dweets can do anything that other programs can do including access OS13k and ZzFX
- Shaders support iTime, iFrame, iMouse, iResolution, and iChannel0
- iChannel0 is a saved image of the previous frame, this can be used to store game logic or make effects

### System Calls
- The function OS13kStart() is called on child frames immediatly after load
- To acces OS13k features, use the OS13k object
- OS13k.CreateShader(canvas, shaderCode) - Create a shadertoy compatible webgl shader
- OS13k.RenderShader(canvas, shaderProgram, time=0, frame=0) - Render a shader
- OS13k.KeyDirection(key) - Get {x, y} position from a key code for WASD and arrow keys
- OS13k.PlaySamples(samples, sampleRate=44100) - Play audio samples
- OS13k.PlaySeed(seed, lengthScale=1, volume=1, randomness=.05) - Play a zzfx sound from seed
- OS13k.Speak(text) - Play speech of the text

### Math Library
- OS13k.Random(max=1, min=0) - Get a seeded random value, OS13k.randomSeed to set the seed
- OS13k.Clamp(a, min=0, max=1) - Clamp value between min and max
- OS13k.Percent(v, a, b) - Get clamped percent between a and b
- OS13k.Lerp(p, a, b) - Lerp clamped percent between a and b
- Let me know if there is anything else you think should be included

### ZzFX
- ZzFX is my super tiny sound synth which is also on GitHub, but don't let it's size fool you
- Here is the sound desinger for ZzFX with a link to the public repo https://zzfx.3d2k.com/
- ZzFx sounds can played directly by calling zzfx, volume is controlled by the system
- A seeded ZzFX sound player is available to save space with much smaller sound calls
- Example OS13k.PlaySeed(1006)
- *I will create a tool for browsing sound seeds soon

### Program Settings and Defaults
- name - Display name (if absent will infer name from camel case src filename)
- src - Source filename
- icon - Can contain html tags, fits about 2 emojis (you don't need to close tags)
- width (720) and height (405) - Size of window (default is 16:9 aspect)
- author - Name of creator (optional)
- reload (0) - Shows the reload option, always true for dweets/shaders
- code (0) - Shows code option, always true for dweets/shaders
- full (1) - Enables fullscreen option
- sleep (1) - Dims window and pauses dweets/shaders when not focused
- sticky (0) - Enable auto open of program on restart
 
 ### Trophies
 - Apps can register trophies for their games, the OS tracks which are unlocked
 - A function is provided for apps to unlock trophies, OS13k.Trophy(gameName, trophyName, icon, message)
 - Only gameName is necessary, the rest are optional
 - "OS13kTrophy,gameName,trophyName,icon" together form the unique id for the trophy
 - When a new trophy is unlocked or the message is changed a popup will appear
 - Total trophy count is shown in the taskbar and the trophy case shows all unlocked trophies
 - Trophies can be tested with the System/Test tool
 
 ### Any JS13k game can use trophies, even if not part of OS13k!
 - To add a trophies to any JS13k game, just save a special key to localStorage
 - The simplest way to add a single trophies is save localStorage["OS13kTrophy,GameName"]=""
 - For more control use localStorage["OS13kTrophy,GameName,TrophyName,Icon"] = Message
 - You can change the message to update the trophy, like a highscore for example
 - When OS13k is next run, it will search localStorage and display popups for new trophies
 - This is possible because all JS13k games share the same local storage! Pretty cool right?

 ### Resources
 - [Dwitter](https://www.dwitter.net/) - The source of so much amazing tiny code
 - [The Dweetabase](http://dweetabase.3d2k.com/), and offline searable database of every dweet
 - [Shadertoy](https://www.shadertoy.com/) - There are many amazing tweet and 2 tweet sized shaders
 - [JS1k](https://js1k.com/) - I imagine with so much shared code and zip we could fit many of these size
 - [JS13k](https://js13kgames.com/) - This is our goal
