# Welcome to OS13k!
OS13k is a tiny operating system that fits in a 13 kb zip file.

It includes native support for Shadertoys, Dweets, ZzFX sounds, music, trophies, touch input, and much more.

# [Live Demo](https://killedbyapixel.github.io/OS13k) -  [JS13k Submission](https://js13kgames.com/entries/os13k) - [Discord](https://discord.gg/n8vxUcZ)

## What is OS13k?
- OS13k is a tiny web based pseudo OS and game engine designed for creative coding purposes
- The core of OS13k is around 10k zipped including all the system apps
- OS13k can connect with other JS13k games via local storage to add music and trophies
- Users can extend OS13k by addinng their own programs and shaders

## Features
- ZzFX sound effects with support for sound seeds
- ZzFXM music system, player, and visualizer
- Trophy system and viewer
- Centralized input system
- Custom user programs
- Dwitter, ShaderToy, and WebGL support
- GUI with window manger, taskbar, tray and settings
- Mobile/touch support

## Programming Info
- OS13k stores it's list of programs in programs.js
- For fast iteration when developing, most recent active window is opened on startup

Add an icon config to programs.js to register your program, examples...
- [icon, src, width, height, flags, name, help, folder]
- ['?','help.html']
- ['✌️😄','system/systemTest.html',,,full|resize|code|sticky]
- ['🌊','dweets/underwaterCavern.dweet.js']
- ['☯','toys/infiniteYinYangs.shader.txt',500,500,full,'Put instructions here.']

### Programs
- OS13k can open any html file and it will work the same as if opened directly
- Chrome is recommended, but Firefox is also supported
- [Viewing OS13k locally may not work if it treats local files as cross-origin](https://discourse.mozilla.org/t/firefox-68-local-files-now-treated-as-cross-origin-1558299/42493/9)
- Prefix all local storage keys with OS13kYourProgramName to prevent collisions during JS13k (use at least 2 letters)
- When the reload button is clicked, OS13kReload is called if it exists instead of reloading the iframe
- For development we recommend [VSCode](https://code.visualstudio.com/) with the [Live Server Plugin](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- You can also create a custom program to edit code directly in OS13k

 ### Trophies
 - Trophies are perhaps the most important part of OS13k and have many uses
 - Apps can register trophies for their games, the OS tracks which are unlocked
 - To unlock trophies use OS13k.Trophy(icon, gameName, trophyName, message)
 - You can pass in a value as the message, like a high score for example
 - *HTML tags and commas can not be used in trophy data*
 - When a new trophy is unlocked or the message is changed a popup will automatically appear
 - Total trophy count is shown in the taskbar and the trophy case shows all unlocked trophies
 - *You can use tophies to store data!* Use OS13k.GetTrophy to get a trophy message

### Trophy Functions
 - OS13k.Trophy(game='', icon='', name='', message='') - Unlock a trophy
 - OS13k.GetTrophy(game, name) - Get most recent matching trophy, 0 if no trophy
 - OS13k.Trophies() - Get full list of trophy objects
 
### Sound
- ZzFx sounds are supported by default and several other audio functions are provided
- ZzFX is open source sound effect generator with an easy to use sound designer https://zzfx.3d2k.com/
- A seeded ZzFX sound player is available to save space with much smaller sound calls
- OS13k.PlaySeed(seed, lengthScale=1, volume=1, randomness=.05, frequency) - Play a zzfx sound from seed
- OS13k.PlaySamples(samples, sampleRate=44100) - Play audio samples
- OS13k.Note(semitoneOffset=0, rootNoteFrequency=440) - Get frequency of a note on a musical scale
- OS13k.Speak(text, language='en', stopSpeech, volume=1, rate=1, pitch=1) - Play speech of the text
- Seeds can also be strings (will be hashed) or full ZzFX sounds
- A custom gain node is created for every sound, use sound.gain.gain.value to change

### Music
- [ZzFXM by Keith Clark](https://github.com/keithclark/ZzFXM) is the music player
- OS13k.PlayMusic(song) - plays the song with zzfxm
- OS13k.GetAnalyser() - returns a 32x32 music analyser canvas
- OS13k.GetAnalyserData(i) - returns index into a 32 length array of frequency volumes normalized between 0-1
- OS13k.StringToMusic(string, validate) - Converts a string to a music array and checks if valid

### System Calls
- The OS13k object is set in your program after load, if you need it on load use parent.OS13k
- zzfx also becomes available after your program loads and can be called directly
- OS13k.CreateShader(canvas, shaderCode) - Create a shadertoy compatible webgl shader
- OS13k.RenderShader(canvas, shaderProgram, time=0, frame=0) - Render a shader
- OS13k.StripHTML(string) - Removes all HTML tags in a string
- OS13k.Hash(string) - Returns numeric hash code for a string
- OS13k.Popup(html, speak) - Shows a popup with html body and optional speech and sound

### Math Library
- OS13k.Random(max=1, min=0) - Get a seeded random value clamped between min and max
- OS13k.randomSeed - You must set the seed before calling OS13k.Random
- OS13k.Clamp(a, max=1, min=0) - Clamp value between max and min
- OS13k.Percent(v, a, b) - Get clamped percent between a and b
- OS13k.Lerp(p, a, b) - Lerp clamped percent between a and b

### Dweets and Shadertoys
- Programs with the extension .dweet.js or .shader.txt or will automatically load as Dweets or Shadertoys!
- Dweets and Shadertoys are automatically paused when they don't have focus (after a 1 second warmup)
- They also automatically have the show code option by default unless explictly disabled
- Dweets can do anything that other programs can do including calling OS13k functions and ZzFX
- Dweets and Shadertoys are automatically paused when not focused (unless awake is set)
- Shaders support iTime, iFrame, iMouse, iResolution, and iChannel0
- iChannel0 is an image of the previous frame, this can be used to make effects or store game logic

### Input System
- OS13k provides an easy to use input system to help eliminate redundant code
- Call OS13k.Input(window) to get the input object
- the object format is {x, y, keypress, keydown, mousex, mousey, mousepress, mousedown}
- x and y is a -1 to 1 direction from WASD or direction buttons
- mousex and mousey is the mouse position
- wheel is the mouse wheel delta
- keypress and mousepress are arrays, an element is 1 if that key is pressed
- keydown and mousedown are arrays, an element is 1 if that key is down
- *See System/Test/InputTest for an example*

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
- shortcut (0) - Shows shortcut icon on the desktop
 
### User Programs
 - You can create and access custom programs in the user programs folder
 - *User programs have the same capabilities as any other program!*
 - It auto detects HTML (starts with <), Shadertoy (has void mainImage), or Dweet
 - This can be used to iterate on dweets or small shaders, or to load a full program.
 - Drag and drop a file into the text box to load it
 - The screenshot button is available for Dweets and Shadertoys
 - User Dweets has loop protection to help prevent freeze ups, though it can still occur
 - Press Alt+Enter to reload when live edit is disabled
 - User programs will not run until clicked to prevent executing bad code

 ### Any JS13k game can add trophies and music, even if not part of OS13k!
 - *To add a trophy or music track, just save a special key to localStorage!*
 - The smallest way to add a single trophy (like for winning) is localStorage['OS13kTrophy,Icon,GameName'] = ''
 - For more control use localStorage['OS13kTrophy,Icon,Game Name,Trophy Name'] = Message
 - You can change the message to update the trophy, like a highscore for example
 - Music works the same way, use localStorage['OS13kMusic,Song Name'] = JSON.stringify(song)
 - OS13k automatically checks localStorage and display popups for new trophies and songs from other games
 - This is possible because all JS13k games share the same local storage! Pretty cool right?
 - You can test locally by pasting your trophy code into the OS13k's console app
 
## Contribuitors

Most of the OS was created by myself, but there were many other people helping out. Thank you to everyone for their efforts, I could not have done it alone!

- Keith Clark - ZzFXM
- Tomxor - Don't Fall
- Niklas Berg - Shedding Snake
- Pavel - Visualizer and 404
- Rodrigo Siqueira - Sticky Note
- Kang Seonghoon - Roadroller

Additional help by...

- Katkip, Jaburns, Xem, Rebecca König, Cantelope, DaSpider, Lionleaf, Yurume, Magna, Thomas Brierley, Nicholas Ortenzio, Yuanchuan, Jani Ylikangas, Martinn Kleppe, Erik Sombroek

![OS13k Image](/favicon.ico) 
