'use strict'

///////////////////////////////////////////////////////////////////////////////
// OS13k Client Interface

class _OS13k
{

/////////////////////////////////////////////////////////////////////////////
// OS13k Math

    Clamp   (a, max=1, min=0) { return a < min ? min : a > max ? max : a; }
    Percent (v, a, b)         { return b-a ? OS13k.Clamp((v-a)/(b-a)) : 0; }
    Lerp    (p, a, b)         { return a + OS13k.Clamp(p) * (b-a); }

    // convert string to hash value like Java's hashCode()
    Hash    (s)               { return [...s].reduce((a,c)=> c.charCodeAt()+a*31|0, 0); }
    
    // seeded random numbers - Xorshift
    Random(max=1, min=0)
    {
        OS13k.randomSeed ^= OS13k.randomSeed << 13;
        OS13k.randomSeed ^= OS13k.randomSeed >> 17; // note: >>> would use the full 32 bit range
        return OS13k.Lerp(Math.abs(OS13k.randomSeed ^= OS13k.randomSeed << 5) % 1e9 / 1e9, min, max);
    }

/////////////////////////////////////////////////////////////////////////////
// OS13k Trophies
    
    // award player with trophy
    Trophy(icon, game, name, message)
    {
        // replace commas and apostrophes
        let key, Clean = string=> OS13k.StripHTML(string||'', maxWordLength).replace(/[,`]/g, ''),
        
            // init trophy data
            trophyData = 
            [
                icon = Clean(icon), 
                game = Clean(game), 
                name = Clean(name),
                message = Clean(message),
                key = icon + ',' + game + ',' + name
            ],

            // find in trophy list
            i = trophies.findIndex(e=> e[4] == key);

        // skip if same message
        if (i >=0 && trophies[i][3] == message) return;
        
        // add or update trophy list
        i < 0 ? trophies.unshift( trophyData ) : trophies[i] = trophyData;

        // save trophy
        localStorage['OS13kTrophy,' + key] = message;

        // use game as name if there is no name
        name || (name = game, game = '');

        // add trophy popup
        OS13k.Popup(`<div class=trophyIcon>${   // popup html
                icon || '🏆' }</div><div><b>${ // icon
                name }</b><br><i>${            // name
                game }</i></div>` +            // game
                message,                       // message
            name + '. ' + game,                // speak
            'ja');                             // language 

        // save and reload trophy window
        OS13k.Save(trophyTrayIcon.program.window && trophyTrayIcon.program.window.Reload());
    }
    
    // get message, 0 if no trophy
    GetTrophy(game, name) 
    { 
        let trophy = trophies.find(e=> e[1]==game & e[2]==name); 
        return trophy ? trophy[3] : 0; 
    }
    
    // get trophy list
    Trophies() { return trophies; }
    
/////////////////////////////////////////////////////////////////////////////
// OS13k Audio

    // play seed sound
    PlaySeed(seed, lengthScale=1, volume=1, randomness=.05, frequency, isMusic)
    { return OS13k.PlaySamples(OS13k.SeedSamples(...arguments), isMusic); }
    
    // get seed samples
    SeedSamples(...parameters)
    { return zzfxG(...OS13k.SeedParameters(...parameters)); }
    
    // get zzfx sound parameters from seed
    SeedParameters(seed, lengthScale=1, volume=1, randomness=.05, frequency)
    {
        // use default params if no seed
        if (!seed)
            return [volume, randomness, frequency || OS13k.Note(-21), 0, lengthScale];

        // check if seed is a number
        if (parseFloat(seed = (seed+'').trim()) != seed)
        {
            // seed is not number, check if zzfx string and apply overrides
            if (seed.slice(0,9) == 'zzfx(...[')
                return seed.slice(9).split(',').map((p,i)=>
                    !i ? volume :
                    i==1 ? randomness :
                    i==2 && frequency ? frequency :
                    p.length ? parseFloat(p) : undefined);
            
            // use hash string as seed 
            seed = OS13k.Hash(seed);
        }

        // set seed
        OS13k.randomSeed = seed;
     
        // helper functions
        let R=()=>OS13k.Random(), C=()=>R()<.5?R():0, S=e=>C()?e:-e,
        
            // randomize sound length
            attack  = R()**3/4*lengthScale,
            decay   = R()**3/4*lengthScale,
            sustain = R()**3/4*lengthScale,
            release = R()**3/4*lengthScale,
            length  = attack + decay + sustain + release,
            f = R()**2*2e3;
        
        // generate random sound
        return [
           volume,           // volume
           randomness,       // randomness
           frequency || f,   // frequency
           attack,           // attack
           sustain,          // sustain
           release,          // release
           R()*5|0,          // shape
           R()**2*3,         // shapeCurve
           C()**3*S(99),     // slide
           C()**3*S(99),     // deltaSlide
           C()**2*S(1e3),    // pitchJump
           R()**2 * length,  // pitchJumpTime
           C() * length,     // repeatTime
           C()**4,           // noise
           C()**3*S(9),      // modulation
           C()**4,           // bitCrush
           C()**3/2,         // delay
           1 - C(),          // sustain volume
           decay,            // decay
           C()**4            // tremolo
        ];
    }
    
    // play audio sample data
    PlaySamples(samples, isMusic, sampleRate=defaultSampleRate)
    { return OS13k.PlaySamplesArray([samples], isMusic, sampleRate); }
    
    // play array of audio sample data, connect analyser to gain if isMusic > 1 for instruments
    PlaySamplesArray(samplesArray, isMusic, sampleRate=defaultSampleRate)
    {
        // create buffer and source
        let buffer = audioContext.createBuffer(samplesArray.length, samplesArray[0].length, sampleRate),
            source = audioContext.createBufferSource();

        // copy samples to buffer and play
        samplesArray.map((d,i)=> buffer.getChannelData(i).set(d));
        source.buffer = buffer;

        // create custom gain node
        let sourceOut = source;
        source.gain || source.connect(sourceOut = source.gain = audioContext.createGain());
        sourceOut.connect(isMusic ? gainMusic : gain);
        
        // connect analyser and start
        isMusic && (isMusic > 1 ? sourceOut : source).connect(musicAnalyser);
        source.start();
        return source;
    }
    
    PlayMusic(song) 
    { 
        // catch errors when playing music
        try { return OS13k.PlaySamplesArray(zzfxM(...song), 1); }
        catch(e) { console.log(e); }
    }
    
    GetAnalyser() { return analyserCanvas; }
    GetAnalyserData(e) { return analyserData[e] ? analyserData[e] : 0; }
    
    // convert a string to a music data array, will throw error if invalid
    StringToMusic(string, validate)
    {
        // get rid of metadata
        string = string.replace(/{[^}]+}/g, '');

        // check if safe to eval and get music data
        let music = string.replace(/null|[[\],\de\. -]/g, '') || eval(string.replace(/null/g, undefined)); 

        // try to generate music to check if valid
        validate && zzfxM(...music, 1);
        return music;
    }
    
    // get frequency of a note on a musical scale
    Note(semitoneOffset=0, rootNoteFrequency=440)
    { return rootNoteFrequency * 2**(semitoneOffset/12); }

    PianoKey(event)
    {
        let k = 'ZSXDCVGBHNJM,L.;/Q2W3ER5T6Y7UI9O0P[=]'      // map key to note
            .indexOf(event.key && event.key.toUpperCase());  // find the key and check for invalid key
        return k - 5 * (k > 16);                             // offset second row of keys
    }

    // speak text
    Speak(text, language='en', stopSpeech, volume=1, rate=1, pitch=1)
    {
        // common languages (not supported by all browsers)
        // it - italian,  fr - french, de - german,  es - spanish, pl - polish
        // ja - japanese, hi - hindi,  ru - russian, zh - chinese, ko - korean
    
        // set utterance parameters
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.volume = volume * gain.gain.value * 2;
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.lang = language;

        // stop speech if set
        stopSpeech && StopSpeech();

        // play speech if allowed
        settings.s & finishedStartup && speechSynthesis && speechSynthesis.speak(utterance);
    }

/////////////////////////////////////////////////////////////////////////////
// OS13k Shaders

    // create pixel shader
    CreateShader(canvas, code)
    {
        // get webgl context
        const x = canvas.getContext('webgl2'),
        
            // use hardcoded glsl constants to save space
            xVERTEX_SHADER       = 35633,
            xARRAY_BUFFER        = 34962,
            xSTATIC_DRAW         = 35044,
            xBYTE                = 5120,
            xFRAGMENT_SHADER     = 35632,
            xCOMPILE_STATUS      = 35713,
            xTEXTURE_2D          = 3553,
            xUNPACK_FLIP_Y_WEBGL = 37440,
            xTEXTURE_MIN_FILTER  = 10241,
            xLINEAR              = 9729;

        if (!x)
            return;

        // create a simple pass through vertex shader
        let vertexShader = x.createShader(xVERTEX_SHADER);
        x.shaderSource(vertexShader, '#version 300 es\nin vec4 c;void main(){gl_Position=c;}');
        x.compileShader(vertexShader);
        
        // check vertex shader for errors
        //if (!x.getShaderParameter(vertexShader, x.COMPILE_STATUS))
        //    throw x.getShaderInfoLog(vertexShader);
        
        // create shadertoy compatible pixel shader
        let pixelShader = x.createShader(xFRAGMENT_SHADER);
        let shaderProgramCode = 
            `#version 300 es\n` +
            `precision mediump float;` +
            `uniform float iTime;` +
            `uniform int iFrame;` +
            `uniform vec4 iMouse;` +
            `uniform vec3 iResolution;` +
            `uniform sampler2D iChannel0;` +
            `out vec4 OS13kcolor;\n` +
            `${code}` +
            `\nvoid main()` +
            `{mainImage(OS13kcolor,gl_FragCoord.xy);` +
            `OS13kcolor.a=1.;}`;
        x.shaderSource(pixelShader, shaderProgramCode);
        x.compileShader(pixelShader);

        // check pixel shader for errors
        if (!x.getShaderParameter(pixelShader, xCOMPILE_STATUS))
            throw x.getShaderInfoLog(pixelShader);
        
        // create vertex buffer that is a big triangle
        x.bindBuffer(xARRAY_BUFFER, x.createBuffer());
        x.bufferData(xARRAY_BUFFER, new Int8Array([-3,1,1,-3,1,1]), xSTATIC_DRAW);
        x.enableVertexAttribArray(0);
        x.vertexAttribPointer(0, 2, xBYTE, 0, 0, 0);

        // create texture
        x.bindTexture(xTEXTURE_2D, x.createTexture());
        x.texParameteri(xTEXTURE_2D, xTEXTURE_MIN_FILTER, xLINEAR);
        x.pixelStorei(xUNPACK_FLIP_Y_WEBGL, 1);
        
        // create shader program
        let shaderProgram = x.createProgram();
        x.attachShader(shaderProgram, vertexShader);
        x.attachShader(shaderProgram, pixelShader);
        x.linkProgram(shaderProgram);
        return shaderProgram;
    }
    
    // render a pixel shader
    RenderShader(canvas, shaderProgram, time, frame, X, Y, Z, W)
    {
        // get webgl context
        const x = canvas.getContext('webgl2'),
        
            // use hardcoded glsl constants to save space
            xRGBA          = 6408,
            xUNSIGNED_BYTE = 5121,
            xTRIANGLE_FAN  = 6,
            xTEXTURE_2D    = 3553;
        
        if (!x)
            return;

        // set uniforms
        x.useProgram(shaderProgram);
        x.uniform3f(x.getUniformLocation(shaderProgram, 'iResolution'), canvas.width, canvas.height, 1);
        x.uniform1f(x.getUniformLocation(shaderProgram, 'iTime'), time);
        x.uniform1f(x.getUniformLocation(shaderProgram, 'iFrame'), frame);
        x.uniform1i(x.getUniformLocation(shaderProgram, 'iChannel0'), 0);
        x.uniform4f(x.getUniformLocation(shaderProgram, 'iMouse'), X, Y, Z, W);
        
        // set vieport and render shader
        x.viewport(0, 0, canvas.width, canvas.height);
        x.drawArrays(xTRIANGLE_FAN, 0, 3);
        
        // set texture to newly rendered image
        x.texImage2D(xTEXTURE_2D, 0, xRGBA, xRGBA, xUNSIGNED_BYTE, canvas);
    }
    
/////////////////////////////////////////////////////////////////////////////
// OS13k Text
    
    // remove html tags from a string and clamp length
    StripHTML(string, maxLength)
    { return (string+'').substring(0, maxLength || string.length).replace(/<.*>/g, ''); }

    Popup(html, speak, language)
    {
        // create popup
        let popup = popups.appendChild(document.createElement('div'));
        popup.className = 'popup';
        popup.innerHTML = '<div style=pointer-events:none>' + html;
        popup.speak = speak;
        popup.speakLanguage = language;
        popup.style.visibility = 'hidden';
    }

/////////////////////////////////////////////////////////////////////////////
// OS13k Input

    // create and update an input object for keyboard and mouse control
    Input(inputWindow)
    {
        let inputCopy, Pressed = (k)=> inputCopy.keydown[k] || inputCopy.keypress[k];
        if (inputWindow.document.OS13kInput)
        {
            // make copy of last frame input
            inputCopy = {...inputWindow.document.OS13kInput};

            // get direction from wasd or arrow keys
            inputCopy.x = inputCopy.y = 0;
            Pressed(87) | Pressed(38) && ++inputCopy.y; // up
            Pressed(83) | Pressed(40) && --inputCopy.y; // down
            Pressed(68) | Pressed(39) && ++inputCopy.x; // right
            Pressed(65) | Pressed(37) && --inputCopy.x; // left
        }

        // create or clear input object
        let input = inputWindow.document.OS13kInput =
        {
            x: 0, y: 0,
            keypress: [], mousepress: [],
            keydown:   inputWindow.document.OS13kInput ? inputWindow.document.OS13kInput.keydown : [],
            mousedown: inputWindow.document.OS13kInput ? inputWindow.document.OS13kInput.mousedown : [],
            mousex:    inputWindow.document.OS13kInput ? inputWindow.document.OS13kInput.mousex : 0,
            mousey:    inputWindow.document.OS13kInput ? inputWindow.document.OS13kInput.mousey : 0,
            wheel : 0
        };

        // input functions
        inputWindow.onkeydown   = e=> e.repeat || (input.keydown[e.keyCode] = input.keypress[e.keyCode] = 1);
        inputWindow.onkeyup     = e=> input.keydown[e.keyCode] = 0;
        inputWindow.onmousedown = e=> (input.mousedown[e.button] = input.mousepress[e.button] = 1, e.button != 1);
        inputWindow.onmouseup   = e=> input.mousedown[e.button] = 0;
        inputWindow.onmousemove = e=> (input.mousex = OS13k.Clamp(e.x/inputWindow.innerWidth), input.mousey = OS13k.Clamp(e.y/inputWindow.innerHeight));
        inputWindow.onblur      = e=> (input.keydown = [], input.mousedown = []);
        inputWindow.onwheel     = e=> input.wheel = e.deltaY;

        // return last frame input
        return inputCopy || input;
    }
    
/////////////////////////////////////////////////////////////////////////////
// OS13k Seralization
    
    Save()
    {
        // save data if finished startup
        finishedStartup && (localStorage.OS13k = JSON.stringify
        ([
            trophies,
            settings,
            programInfos,
            startProgramId,
            nextUserProgramId
        ]));
        
        // volume
        gain.gain.value = settings.v;
        gainMusic.gain.value = settings.m;
           
        // stop speech if not enabled or sound muted
        settings.s && settings.v || StopSpeech();
        
        // background
        background.style.background = `linear-gradient(${settings.c},${settings.d})`;
        background.innerText = settings.t;
        
        // filter
        background.style.filter = desktop.style.filter = settings.f;
    }
    
    SaveSettings(volume, musicVolume, speech, popups, systemSounds, color1, color2, text, filter)
    {
        // set settings and save
        OS13k.Save(settings = {
            v:gain.gain.value = volume,
            m:gainMusic.gain.value = musicVolume,
            s:speech,
            p:popups,
            o:systemSounds,
            c:color1,
            d:color2,
            t:text,
            f:filter
        });
    }
    
    Settings() { return settings; }
}; // _OS13k
var OS13k = new _OS13k;

///////////////////////////////////////////////////////////////////////////////
// OS13k System Functions and Consts - handles non client facing features of OS13k

const taskbarHeight = 44, titlebarHeight = 37, programHeight = 26, 
      startOpenOffset = 99, popupTime = 3, defaultVolume = .3, 
      maxWordLength = 32, defaultSampleRate = 44100, analyserWaitTime = 1e4,

    // system sounds
    soundOpen       = 87,
    soundClose      = 92,
    soundGrabStart  = 45,
    soundGrabEnd    = 66,
    soundMenu       = -9,
    soundActive     = 66,
    soundShrink     = 75,
    soundGrow       = 61,
    soundFullScreen = -9,
    soundHelp       = 22,
    soundCode       = 16,
    soundReload     = -5,
    soundProgram    = 6,
    soundSave       = 6;

///////////////////////////////////////////////////////////////////////////////
// Global Variables

let grabWindow, grabOffsetX, grabOffsetY, finishedStartup, nextUserProgramId = 0,
    activeWindow, activeProgram, activeTaskbarIcon, loadIcon, allCodeIsSafe,
    analyserCanvas = document.createElement('canvas'), analyserData = [], lastMusicTime = -analyserWaitTime,
    lastActiveFrame, topZ = 0, loading = 0, hadInput = 0,
    windowOpenX = startOpenOffset, windowOpenY = startOpenOffset + taskbarHeight,
    startProgram, startProgramId, programInfos = [], trophies = [],
    trophyTrayIcon, settingsTrayIcon, clockTrayIcon, musicTrayIcon, stickyNoteTrayIcon,

    // volume, music, speech, popups, color1, color2, text, filter
    settings = {v:.2, m:.2, s:1, p:1, o:1, c:'#222233', d:'#332222', t:'OS13k', f:''},

    // init web audio
    audioContext = new (window.AudioContext||webkitAudioContext),
    gain = audioContext.createGain(), 
    gainMusic = audioContext.createGain(), 
    musicAnalyser = audioContext.createAnalyser(),


// main update loop
Update = time=>
{
    // request new animation frame
    requestAnimationFrame(Update);
    
    // update startup routine
    loading | finishedStartup || OS13k.Save(

        // create analyser canvas
        musicTrayIcon.prepend(analyserCanvas),
        analyserCanvas.style = 'width:16;height:16;margin:2;pointer-events:none;display:none',

        // load start program
        self == top && startProgram && startProgram.Open(), finishedStartup = 1);
        
    // check if iframe became new active element
    let activeElement = document.activeElement,
        activeFrame = activeElement.shadowRoot && activeElement.shadowRoot.activeElement == activeElement.iframe ? 
        activeElement.iframe : 0;
            
    // if a new frame took focus, set window active and that we had input
    activeFrame && lastActiveFrame != activeFrame && activeElement.SetActive(hadInput = 1);
        
    // set last active frame
    lastActiveFrame = activeFrame;

    // fade in desktop after loading
    background.style.opacity = document.body.style.opacity = OS13k.Clamp(!loading*.02 + document.body.style.opacity*1);

    // update trophy count
    let trophyString = trophies.length + '🏆';
    trophyString != trophyTrayIcon.innerHTML && (trophyTrayIcon.innerHTML = trophyString);
    
    // update time
    clockTrayIcon.title = Date();
    let timeString = clockTrayIcon.title.replace(/.* (\d+):(\d+).*/, (a,b,c)=> (b%12||12)+':'+c);
    timeString != clockTrayIcon.innerHTML && (clockTrayIcon.innerHTML = timeString);
    
    // show popups after startup is finished and there was input
    if (!finishedStartup | !hadInput) return;
    
    // get analyser data
    let frequencyData = new Uint8Array(musicAnalyser.fftSize = 256),
        context = analyserCanvas.getContext('2d');
    musicAnalyser.getByteFrequencyData(frequencyData);
    analyserCanvas.width = analyserCanvas.height = 32;

    // render analyser
    for(let i = 0; i < 32; )
    {
        // get frequency band volume and adjust for loudness
        let volume = (frequencyData[i*2+3] / 255)**3 * (1 + Math.log10((i*2+3) * defaultSampleRate / 1024 ));

        // draw loudness bar
        context.fillStyle = `hsl(${-99-59*volume} 99%50%)`;
        context.fillRect(i, 31, 1, -7*volume);
        
        // set anaylzer data, normalize between 0-1
        analyserData[i++] = OS13k.Clamp(volume / 5);

        // save how long there has been no music
        lastMusicTime = volume ? time : lastMusicTime;
    }
    
    // set analyser visibility
    analyserCanvas.style.display = time - lastMusicTime < analyserWaitTime ? '' : 'none';
    
    // update popups, use copy to prevent skipping if removed
    let offsetY = 0;
    [...popups.children].map((popup,i)=>
    {
        // speak popup
        popup.speak && OS13k.Speak(popup.speak, popup.speakLanguage);
        popup.speak = 0;
        
        if (!settings.p)
            popups.removeChild(popup);
        else if (!document.fullscreenElement)
        {
            // move popup up, set to bottom if it was invisible
            let y = popup.style.visibility ? innerHeight : parseInt(popup.style.top) + offsetY - 9;
            popup.style.visibility = '';
            
            if (y < taskbarHeight)
            {
                // stop popup below taskbar
                y = taskbarHeight;

                // fade out popup if at top
                if (!i && (popup.style.opacity = (popup.style.opacity || popupTime) - .01) < 0)
                {
                    // remove when invisible and adjust for height
                    offsetY += popup.getBoundingClientRect().height;
                    popups.removeChild(popup);
                }
            }

            // set popup position
            popup.style.top = y;
        }
    });
},

RebuildMenu = ()=>
{
    // combine old stubs for reference to flat array
    let oldStubs = [],
        getOldStubs = stubs => stubs.map( stub => stub[7] ? getOldStubs(stub[7]) : oldStubs.push(stub));
    getOldStubs(programStubs);

    // remove user folder if it exists
    loadIcon && loadIcon.windowOrMenu.lastChild && (
      loadIcon.windowOrMenu.removeChild(loadIcon.windowOrMenu.lastChild), 
      programStubs.pop());

    CreateUserFolder(programStubs, ['😀',,,,,'User Programs'], '', oldStubs);
    loadIcon.windowOrMenu.Rebuild();
},

CreateUserFolder = (parentStubs, stub, userFolderName, oldStubs)=>
{
    // create folder
    let folderStubs = 
    [
        ['📌',,,,newUserProgram,'New User Program',,,,userFolderName],
        ['⚠️',,,,deleteUserPrograms, userFolderName ? `Delete User Folder ${userFolderName}` : 'Delete User Programs',,,,userFolderName]
    ];
    
    // add subfolders
    let folderNames = [];
    userFolderName || programInfos.map(i=> i.code != undefined && i.userFolder && 
        !folderNames.includes(i.userFolder) && 
            CreateUserFolder(folderStubs,['📁',,,,,i.userFolder], i.userFolder, oldStubs, folderNames.push(i.userFolder)));
       
    // add stubs for programs in this folder
   programInfos.map(i=> i.code != undefined && i.userFolder == userFolderName &&

        // add stubs to folder, check if it already existed first
        folderStubs.push(oldStubs.find(stub => stub[8] == i.id) ||
            [i.icon,,i.width,i.height,defaultFlags|code,i.name,,,i.id,i.userFolder])
        );

    // set folder stubs and add to parent stubs
    stub[7] = folderStubs;
    parentStubs.push(stub);
},

// close all menus
CloseMenus = ()=>
{
    // hide all menus
    [...programsMenu.children].map(e=>e.style.visibility = menu.style.visibility = '');
    
    // unselect active program
    activeProgram && (activeProgram.className = 'program');
},

// try to give trophy if key is valid
CheckForTrophy = (key, keyParts = key ? key.split(',') : [])=>
    keyParts.shift() == 'OS13kTrophy' &&
        (keyParts.length = 3, OS13k.Trophy(...keyParts, localStorage[key])),

// stop any current or queued speech
StopSpeech = ()=> speechSynthesis && speechSynthesis.cancel(),

// play system sound if enabled
SystemSound = (...parameters)=> finishedStartup & hadInput & settings.o && OS13k.PlaySeed(...parameters);

///////////////////////////////////////////////////////////////////////////////
// Start OS13k!

// load save data
if (localStorage.OS13k)
    [trophies, settings, programInfos, startProgramId, nextUserProgramId] = JSON.parse(localStorage.OS13k);

// save and update settings
OS13k.Save();

// setup audio
gain.connect(audioContext.destination);
gainMusic.connect(audioContext.destination);

// create tray icons
trophyTrayIcon     = new OS13kTrayIcon();
musicTrayIcon      = new OS13kTrayIcon();
settingsTrayIcon   = new OS13kTrayIcon();
stickyNoteTrayIcon = new OS13kTrayIcon();
clockTrayIcon      = new OS13kTrayIcon();

// create load program taskbar icon and add folders/programs
RebuildMenu(loadIcon = new OS13kTaskbarIcon({icon:'💾', name:'Load'}, new OS13kProgramMenu(programStubs)));

// welcome message
OS13k.Trophy('👋','','Welcome to OS13k!');

// search local storage for new trophies (from other JS13k games)1
for (let key in localStorage) CheckForTrophy(key);

// listen for trophies from other windows
onstorage = e=> CheckForTrophy(e.key);

// stop spech if page is unloaded
onunload = e=> StopSpeech();

// try to update startup and kick off first update
Update();