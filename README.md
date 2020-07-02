# Welcome to OS13k!
OS13k is a tiny operating system designed for a JS13k community project. It includes native support for Shadertoys, Dweets, ZzFX sounds, music, trophies, fullscreen, touch control, and more.

![OS13k Image](/favicon.ico) 

## Please keep this project confidential!

# [Live Demo](https://killedbyapixel.github.io/OS13k)
# [Discord](https://discord.gg/n8vxUcZ)
# [Trello Board](https://trello.com/b/1PNeOZfM/os13k) (ask for an invite)

## The Plan
- The idea is to build a tiny OS to host a variety of games, music, and apps that fits in 13 kilobytes
- The core of OS13k is around 7k zipped, and by using it's shared features we can pack a lot into 13k
- Programs should be in the 100-500 byte range, what matters most is how well it zips with everything else
- We plan to fit 10-20 programs [(probably not 26!)](http://js13kgames.com/entries/26-games-in-1) 😅
- **A very important rule for JS13k is that all content must be new, so no old stuff!**
- You can start with an old project but polish it up a lot, minify it and make it work with OS13k
- We will need to curate the best and perhaps smallest content for what actually lands in the JS13k build
- Anything left out of the JS13k build will still be available in the full GitHub version

### [You can learn more about JS13k here](https://js13kgames.com/)

## Programming Info
- OS13k stores it's list of programs in programs.js
- For fast iteration when developing, most recent active window is opened on startup
- Though you can use images and other files, for JS13k we will need each program in one html file

Add an icon config to programs.js to register your program, and send me pull request, examples...
- [src, icon, width, height, flags, name, help, folder]
- ['help.html','?']
- ['system/systemTest.html','✌️😄',,,full|resize|code|sticky]
- ['dweets/underwaterCavern.dweet.js','🌊']
- ['toys/infiniteYinYangs.shader.txt','☯',500,500,full,'Put instructions here.']

### Programs
- OS13k can open any html file and it will work the same as if opened directly
- Chrome is recommended for development, but Firefox is also supported
- [Viewing OS13k locally may not work if it treats local files as cross-origin](https://discourse.mozilla.org/t/firefox-68-local-files-now-treated-as-cross-origin-1558299/42493/9)
- Prefix all local storage keys with OS13kYourProgramName to prevent collisions during JS13k (use at least 2 letters)
- When the reload button is clicked, OS13kReload is called if it exists instead of reloading the iframe
- OS13k works well on mobile devices, so we could have a separate entry for the JS13k mobile category
- For development we recommend [VSCode](https://code.visualstudio.com/) with the [Live Server Plugin](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- You can also create a custom program to edit code directly in OS13k.

### Minification Tips
- The goal is to fit as much as possible into 13 kilobytes so everything must be small and clean
- For inclusion in the JS13k build, programs need be around 100-500 bytes when minified
- *Always remember, this will be zipped! Don't over golf your code.*
- There is much less overhead for common functions calls and html tags then program logic
- Try to limit your use of non repeated text strings, those compresses the worst, try using emojis
- Don't compress your code, let zip do the work for us
- Dweets and Shadertoys can help save space by reducing setup cost
- You do not need charset=utf-8, it will be applied automatically
- For the OS13k core system we are using [Google Closer](https://closure-compiler.appspot.com/home) and [Terser](https://xem.github.io/terser-online)
- For JS13k we will pack everything together into one massive html file before zipping to save space

### Games
- *JS13k is a game development competition, so we need to focus on games and fun apps*
- Don't put music in your games, music will be handled by music specific programs
- Use local storage to save your game's data (prefix keys with OS13kProgramName)
- Use JS13k features like trophies, seeded sound effects, and speech to enrich your games
- To add sounds with little space, use seeded sounds with a tiny function call OS13k.PlaySeed(seed)
- Dweets and Shaders are the smallest way to make games, check out Lava Rush for a shader example

### Apps
- Apps that complement each other is one of the key ways we can make this interesting
- Keep text short and essential, try using emojis instead
- Apps that are creative or fun to use are are ideal
- Design your app well and let players have fun figuring out how to use it
- Think of how your app can enhance other apps and vice versa
- *Apps can play sounds and have trophies too!*

### Sound
- ZzFx sounds are supported by default and several other audio functions are provided
- ZzFX is open source sound effect generator with an easy to use sound designer https://zzfx.3d2k.com/
- A seeded ZzFX sound player is available to save space with much smaller sound calls
- OS13k.PlaySeed(seed, lengthScale=1, volume=1, randomness=.05, frequency) - Play a zzfx sound from seed
- OS13k.PlaySamples(samples, sampleRate=44100) - Play audio samples
- OS13k.Note(semitoneOffset=0, rootNoteFrequency=440) - Get frequency of a note on a musical scale
- OS13k.Speak(text, rate=1, pitch=1, volume=1, language='en', stopSpeech) - Play speech of the text
- An extra custom gain node is created for every sound, use sound.gain.gain.value to change

### Music
- [ZzFXM by Keith Clark](https://github.com/keithclark/ZzFXM) is the music player
- ZzFXM music shoud only be played by the Music Player, you can add a new songs to the library
- We can have music generators, synth instruments, and maybe even mini albums
- The idea is that players can listen to music while playing with other games and apps
- Music programs should continue playing if the frame loses focus, but reduced graphics if necessary to lower the load
- OS13k.GetAnalyser() - returns a 32x32 music analyser canvas
- OS13k.GetAnalyserData() - returns a 32 length array of frequency volumes normalized between 0-1

### Dweets and Shadertoys
- Programs with the extension .dweet.js or .shader.txt or will automatically load as Dweets or Shadertoys!
- Dweets and Shadertoys are automatically paused when they don't have focus (after a 1 second warmup)
- They also automatically have the show code option by default unless explictly disabled
- Dweets can do anything that other programs can do including calling OS13k functions and ZzFX
- Dweets and Shadertoys are automatically paused when not focused (unless awake is set)
- Shaders support iTime, iFrame, iMouse, iResolution, and iChannel0
- iChannel0 is an image of the previous frame, this can be used to make effects or store game logic

### System Calls
- The OS13k object is set in your program after load, if you need it on load use parent.OS13k
- zzfx also becomes available after your program loads and can be called directly
- OS13k.CreateShader(canvas, shaderCode) - Create a shadertoy compatible webgl shader
- OS13k.RenderShader(canvas, shaderProgram, time=0, frame=0) - Render a shader
- OS13k.StripHTML(string) - Removes all HTML tags in a string
- OS13k.Hash(string) - Returns numeric hash code for a struing
- OS13k.Popup(html, speak) - Shows a popup with html body and optional speech and sound

### Math Library
- Some basic math functions are provided to help reduce code duplication
- OS13k.Random(max=1, min=0) - Get a seeded random value clamped between min and max
- OS13k.randomSeed - You must set the seed before calling OS13k.Random
- OS13k.Clamp(a, min=0, max=1) - Clamp value between min and max
- OS13k.Percent(v, a, b) - Get clamped percent between a and b
- OS13k.Lerp(p, a, b) - Lerp clamped percent between a and b

### Program Settings and Defaults
- name - Display name (if absent will build nice name from camel case src filename)
- src - Source filename
- icon - Can contain html tags, fits about 2 emojis
- don't close html tags, they will automatically be closed
- width (720) and height (405) - Size of window (default is 16:9 aspect)
- help (optional) - Help message, shows an icon on the window's titlebar (try to keep it short)
- author (optional) - Name of creator
- sticky (0) - Will automatically open of program on restart if it was open
- reload (1) - Shows the reload option
- awake (1) - Prevents window dim and and pausing dweets/shaders when not focused
- full (1) - Enables full screen option
- code (0) - Shows code option, defaults to true for dweets/shaders, help is shown instead if it exists
- rezize (1) - Allows resizing the window
 
 # Trophies
 - Trophies are perhaps the most important part of OS13k and have many uses
 - Apps can register trophies for their games, the OS tracks which are unlocked
 - To unlock trophies use OS13k.Trophy(gameName, trophyName, icon, message)
 - You can pass in a value as the message, like a high score for example
 - "OS13kTrophy,gameName,trophyName,icon" is the unique local storage key for each trophy
 - *HTML tags and commas can not used in trophy data*
 - When a new trophy is unlocked or the message is changed a popup will automatically appear
 - Total trophy count is shown in the taskbar and the trophy case shows all unlocked trophies
 - *You can use tophies to unlock stuff!* Use OS13k.GetTrophy to check if player has a trophy
 - *Keep your trophy names and messages short, experiment with fun ideas and icons!*

 ### Trophy Functions
 - OS13k.Trophy(game='', icon='', name='', message='', language='ja') - Unlock a trophy
 - OS13k.GetTrophy(game, name) - Get most recent matching trophy, 0 if no trophy
 - OS13k.Trophies() - Get full list of trophy objects
 
 ### User Programs
 - You can create and access custom programs in user programs folder
 - *User programs have the same capabilities as any other program!*
 - It auto detects HTML (starts with <), Shadertoy (has void mainImage), or Dweet
 - This can be used to iterate on dweets or small shaders, or to load a full program.
 - Drag and drop a file into the text box to load it
 - The screenshot button is available for Dweets and Shadertoys
 - User Dweets has loop protection to help prevent freeze ups, though it can still occur
 - Press Alt+Enter to reload when not using live edit
 - User programs will not run until clicked to prevent executing bad code
 
 ### Any JS13k game can add trophies and music, even if not part of OS13k!
 - *To add a trophy or music track, just save a special key to localStorage!*
 - The smallest way to add a single trophy (like for winning) is localStorage['OS13kTrophy,GameName,Icon']=''
 - For more control use localStorage['OS13kTrophy,GameName,Icon,TrophyName'] = Message
 - You can change the message to update the trophy, like a highscore for example
 - Music works the same way, use localStorage['OS13kMusic,SongName] = JSON.stringify(song)
 - OS13k automatically checks localStorage and display popups for new trophies and songs from other games
 - This is possible because all JS13k games share the same local storage! Pretty cool right?
 - *Don't spam the trophy system, lets agree to around 5 trophies per game*

 ### Resources
 - [Dwitter](https://www.dwitter.net/) - Many ideas for tiny programs we can repurpose
 - [The Dweetabase](http://dweetabase.3d2k.com/) - An offline searable database of every dweet
 - [Shadertoy](https://www.shadertoy.com/) - There are many amazing tiny shaders [(check out the 2TC tag)](https://www.shadertoy.com/results?query=2TC)
 - [JS1k](https://js1k.com/) - A resource for tiny programs
 - [JS13k](https://js13kgames.com/) - This is the contest we are entering
-  [Emojipedia](https://emojipedia.org/) - Emoji reference
