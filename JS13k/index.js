'use strict'

///////////////////////////////////////////////////////////////////////////////
// OS13k

// program flags
const            // change to const for final build
sticky   = 2**0, // always save position and if open
reload   = 2**1, // show reload button
awake    = 2**2, // prevent sleep and dim when not active
full     = 2**3, // show full screen button
resize   = 2**4, // show resize buttons (apect ratio maintained)
code     = 2**5, // show code button (cant show code if help is set)
shortcut = 2**6, // show shortcut icon on the desktop
dweet    = 2**7, // is it a dweet?

// system flags
closeAll   = 2**8,         // close all open windows

// defaults
defaultFlags = full|reload|resize|shortcut,
defaultWidth = 720, defaultHeight = 405, // 16:9 aspect

///////////////////////////////////////////////////////////////////////////////
// Add programs here, format... [icon, width, height, flags, name, help, folder]

programStubs = 
[
['❌',,,closeAll,'Close All'],
['<b><span style=color:#0f0>?',300,210,resize|shortcut,'Help','Check here to see help or view code for some programs.\n\nHave fun! ✌️😄'],
['⚙️',,,shortcut,'System',,
[
    ['🏆',,,full|resize|sticky,'Trophy Case'],
    ['✏️',300,263,sticky|reload,'Sticky Note','Ctrl+B = Bold\nCtrl+I = Italic\nCtrl+U = Underline\nReload = Clear'],
    ['🕰️',198,198,sticky|awake|dweet,'Clock'],
    ['🎚️',470,130,sticky,'Settings']
]],
['🎶',,,shortcut,'Music',,
[
    ['🎵',400,330,sticky,'Music Player'],
    ['👁️',,,awake|full|resize|dweet,'Visualizer']
]],
['🎮',,,shortcut,'Games',,
[
    ['🙉',,,defaultFlags|dweet,"Don't Fall"],
    ['🏂🏻',,,defaultFlags|dweet,"Bogus Slopes"],
    ['🐍',800,600,defaultFlags|dweet,"Shedding Snake"]
]]
];

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

        // create gain node
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
            startProgramId
        ]));
        
        // volume
        gain.gain.value = settings.v;
        gainMusic.gain.value = settings.m;
           
        // stop speech if not enabled or sound muted
        settings.s && settings.v || StopSpeech();
        
        // background
        background.style.background = `linear-gradient(${settings.c},${settings.d})`;
        background.innerText = settings.t;
    }
    
    SaveSettings(volume, musicVolume, speech, popups, systemSounds, color1, color2, text)
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
            t:text
        });
    }
    
    Settings() { return settings; }
}; // _OS13k
var OS13k = new _OS13k;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OS13kProgramMenu - holds a list of programs

class OS13kProgramMenu extends HTMLElement
{
	constructor(stubs, parentMenu)
    {
		super();
        
        // add to programs menu
        this.className    = 'programMenu';
        this.parentMenu   = parentMenu;
        this.programStubs = stubs;
    }
    
    Rebuild(y = 0)
    {
        // add programs to menu
        for(let stub of this.programStubs)
        {
            // create program and menu
            let program = stub[-1] = stub[-1] || new OS13kProgram(...stub);  
            program.programMenu = program.folder ? new OS13kProgramMenu(program.folder, this) : this;
        }

        // clear programs menu
        this.innerHTML = '';
        programsMenu.appendChild(this);
  
        // add programs to menu
        this.programStubs.map(stub=> this.appendChild(stub[-1]));
        
        // set position
        this.style.top  = y;
        this.style.left = this.parentMenu && this.parentMenu.getBoundingClientRect().right;

        // add folders after programs so width is correct
        this.programStubs.map(stub=>
        {
            // rebuild child program menus
            stub[-1].programMenu != this && stub[-1].programMenu.Rebuild(y);
            
            // add program height as we move down list
            y += programHeight;
        });
    }

    SetActive()
    {
        // close menus so they can reopen with this active
        CloseMenus();
        
        // set parent active
        this.parentMenu && this.parentMenu.SetActive();
        
        // make visible
        this.style.visibility = 'visible';
    }

} // OS13kProgramMenu
customElements.define('m-', OS13kProgramMenu);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OS13kProgram - stores program info and handles loading from folders
    
class OS13kProgram extends HTMLElement
{
	constructor(icon, width=defaultWidth, height=defaultHeight, flags, name='', help='', folder)
    {
        super();

        // check for special extensions
        this.isDweet =  flags & dweet;

        // set code only if help not shown or if has extension
        this.code = !(this.help = help) && (flags & code || this.isDweet);

        // set all folders to be resizable
        flags |= folder && resize;

        // set icon data
        this.className  = 'program';
        this.width      = width;
        this.height     = height;
        this.folder     = folder;
        this.id         = name;
        this.flags      = flags = flags || defaultFlags;

        // set the program name and id
        this.SetName(icon, name);
        
        // load saved program data
        this.Load();
        
        // save special programs
        name == 'Music Player' && musicTrayIcon.SetProgram(this);
        name == 'Trophy Case'  && trophyTrayIcon.SetProgram(this);
        name == 'Settings'     && settingsTrayIcon.SetProgram(this);
        name == 'Sticky Note'  && stickyNoteTrayIcon.SetProgram(this);
        name == 'Clock'        && clockTrayIcon.SetProgram(this);
        
        // open help if it has not been opened yet
        name == 'Help' & this.info.open == undefined && (startProgram = this);
        
        // check if sticky open or start program
        this.flags & sticky ? this.info.open && this.Open() : this.id == startProgramId && (startProgram = this);
        
        // create desktop shortcut icon
        this.flags & shortcut && desktopIcons.appendChild(new OS13kDesktopIcon(this));
    }

    SetName(icon, name)
    {
        // icon
        this.icon = icon;
        this.innerHTML = '<span style="pointer-events:none;width:45;text-shadow:1px 1px 3px#000;text-align:center;overflow:hidden">' + icon;
        
        // name and folder
        this.innerHTML += `<div style=flex:1;padding-right:9;pointer-events:none>${
                this.name = OS13k.StripHTML(name) }</div>` + (this.folder? '▶' : '');
    }
    
    Move()
    {
        // set container program menu active 
        this.programMenu.SetActive();
        
        // set active
        this.className = 'program programActive';
        activeProgram !=this && SystemSound(soundProgram, 0);
        activeProgram = this;
    }
    
    Open()
    {
        if (this.window)
        {        
            // set window to be active and clamp
            this.window.SetActive(1, 1);
        }
        else if (this.flags & closeAll)
        {
            // close all windows if no src or folder and play sound
            [...desktop.children].map(child=> child.Close && child.Close());

            // reset window open position
            windowOpenX = startOpenOffset;
            windowOpenY = startOpenOffset + taskbarHeight;

            OS13k.Trophy('☕','OS13k','Coffee Is For Closers','Closed All');
        }
        else if (this.name || this.folder)
        {
            // get saved window position
            let x = this.info.x, y = this.info.y;
            
            // update window open positions if no position was set
            x || (
                x = windowOpenX,
                y = windowOpenY,
                (windowOpenX += titlebarHeight) > 400 && (windowOpenX =  windowOpenY = startOpenOffset),
                (windowOpenY += titlebarHeight) > 300 && (windowOpenY =  windowOpenY = startOpenOffset + taskbarHeight));
            
            // open window
            this.window = new OS13kWindow(this, x, y);

            // update info and save
            this.Save();
        }
    }
    
    SetActive() { this.Open(); }
    
    Toggle() { activeWindow && activeWindow == this.window ? this.window.Close() : this.Open(); }
    
    Load() 
    {
        // load saved program info from local storage
        let i = programInfos.findIndex(e=> e.id == this.id);
        this.info = i < 0 ? {} : programInfos[i];
    }

    // save program info and reset settings when closed if non sticky
    Save(open = 1)
    {
        // build save info
        this.info = 
        {
            open,
            id: this.id,
            x: open | this.flags & sticky ? parseInt(this.window.style.left) : 0,
            y: parseInt(this.window.style.top),
            scale: open | this.flags & sticky ? this.window.scale : 1
        }
        
        // add to programs info and save
        let i = programInfos.findIndex(e=> e.id == this.id);
        OS13k.Save(i < 0 ? programInfos.push(this.info) : programInfos[i] = this.info);
    }
    
} // OS13kProgram
customElements.define('p-', OS13kProgram);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OS13kWindow - window to a running program, handles program loading

class OS13kWindow extends HTMLElement
{
	constructor(program, x, y)
    {
		super();

        // add to desktop
        desktop.appendChild(this);
        
        // save settings
        this.program = program;
        this.style.left = x;
        this.style.top = y;
        this.menu = 1;
        this.activeCount = 0;
        
        // shadow root
		this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = windowTemplate.textContent;
        
        // title bar
        this.titlebar = this.shadowRoot.appendChild(document.createElement('div'));
        this.titlebar.id = 'titlebar';

        // create title bar buttons
        let AddTitlebarIcon=(title, svg, hover, shape='path')=>
        {
            this.titlebar.innerHTML += 
            `<style>#${title.split(' ')[0]}:hover{background:#${hover}</style>` + 
            `<div id=${title.split(' ')[0]} title=${title}>` +
            `<svg viewBox='0 0 10 10'style=height:100%;width:28;pointer-events:none><${
                shape} stroke=#000 fill=none ${svg} />`;
        }
        program.flags & resize && 
            AddTitlebarIcon('Grow', 'd="M2 5L8 5M5 8L5 2"', '0f0',
            AddTitlebarIcon('Shrink', 'd="M2 5L8 5"', '0ff'));
        program.flags & full && AddTitlebarIcon('Full Screen', 'x=1 y=2 width=8 height=6', 'fff', 'rect');
        program.help && AddTitlebarIcon('Help', 'd="M5 8L8 2L2 2L5 8L8 2"', '0ff');
        program.code && AddTitlebarIcon('Code', 'd="M5 2L8 8L2 8L5 2L8 8"', 'f0f');
        program.flags & reload && AddTitlebarIcon('Reload', 'cx=5 cy=5 r=3', 'ff0', 'circle');
            AddTitlebarIcon('Close', 'd="M2 2L8 8M8 2L2 8"', 'f00');

        // title bar name
        this.titlebar.prepend(this.name = document.createElement('div'));
        this.name.id = 'name';
        let SetName = ()=>
        {
            // icon and name
            this.name.innerHTML = `<span id=icon>${program.icon}`;
            this.name.innerHTML += program.name;
        }
        SetName();

        // create content wrapper
        this.iframeWrapper = this.shadowRoot.appendChild(document.createElement('div'));

        // create code/help display
        this.codeDisplay = this.shadowRoot.appendChild(document.createElement('div'));
        this.codeDisplay.style.display = 'none';

        // setup code display
        this.codeText = this.codeDisplay.appendChild(document.createElement('textarea'));
        this.codeText.id = 'codeText';
        this.codeText.readOnly = 1;
        this.codeText.spellcheck = 0;

        // resize window size to fit inner width while preserving aspect
        let width = program.flags & resize ? 
            Math.min(program.width*(program.info.scale||1), innerWidth-6) :
            program.width;
            
        // set window width, height, and scale while preserving aspect ratio
        this.style.width = width;
        this.iframeWrapper.style.height = width * program.height / program.width;
        this.scale = width / program.width;
        
        // announce program when first opened
        OS13k.Speak(program.name);
    
        // add taskbar icon if it doesnt exist and set active
        this.taskbarIcon || (this.taskbarIcon = new OS13kTaskbarIcon(program, this)).SetActive();

        // create folder or iframe
        if (program.folder)
        {
            // set class name
            this.iframeWrapper.className = 'folder';

            // add icons to folder
            program.folder.map( stub=>
            {
                this.iframeWrapper.appendChild(new OS13kDesktopIcon(stub[-1], this));
            });
        }
        else 
        {
            // set background color to black
            this.iframeWrapper.style.background = '#000';

            // update loading and create iframe
            this.CreateFrame();
        }
    }
    
    CreateFrame()
    {
        // remove old iframe if it exists
        this.iframe && this.iframeWrapper.removeChild(this.iframe);

        // create iframe
        this.iframe = this.iframeWrapper.appendChild(document.createElement('iframe')); 
        let iframeContent = this.iframeContent = this.iframe.contentWindow,
            program = this.program,

            // get iframe content and document (will fail if cross site)       
            iframeDocument = iframeContent.document,
            iframeCode = document.getElementsByName(program.name)[0].innerHTML,
            code = iframeCode;

        this.iframe.style = 'width:100%;height:100%;background:#fff;border:none';

        // pass OS13k constants to iframe
        iframeContent.OS13k = OS13k;
        iframeContent.OS13kWindow = this;
        iframeContent.zzfx = zzfx;
        
        // set code/help display
        this.codeText.value = program.help || iframeCode;

        // check if dweet
        if (program.isDweet)
            iframeCode = "<style>canvas{width:100%;background:#fff}</style><canvas id=c width=1920 height=1080>";

        // open iframe to write code
        iframeDocument.open();
        iframeDocument.write(iframeCode);
        iframeDocument.close();

        // check for extensions
        if (program.isDweet) 
        {
            // set body style
            iframeDocument.body.style =
                'background:#111;' +
                'overflow:hidden;' +
                'margin:0;' +
                'display:flex;' +
                'align-items:center';

            // create dweet program
            iframeContent.eval(
                `OS13k=parent.OS13k;x=c.getContext('2d');` +
                    `zzfx=parent.zzfx;` +
                    `S=Math.sin;C=Math.cos;T=Math.tan;` +
                    `R=(r,g,b,a=1)=>\`rgba(\${0|r},\${0|g},\${0|b},\${a})\`;` +
                    `u=t=>{\n${ code
                    }\n};` +
                    `OS13kU=t=>t>OS13kF-2&&` + 
                        `u(((t=frame++/60)*60|0==frame-1)&&t>0?t+1e-6:t,` +
                        `OS13kF=Math.max(OS13kF+100/6,t));` +
                    `(OS13kA=t=>(requestAnimationFrame(OS13kA),` +
                        (program.flags & awake || program.info.allowSleep == 0 ? '' : 
                            't<1e3|parent.document.activeElement==OS13kWindow&&') +
                            `OS13kU(t)))` +
                    `(frame=OS13kF=0)`);
        }

        // prevent iframes context menu and drop events
        iframeContent.oncontextmenu = ()=> false;

        // add taskbar icon if it doesnt exist and set active
        this.taskbarIcon || (this.taskbarIcon = new OS13kTaskbarIcon(program, this)).SetActive();
    }
    
    Open(target, x, y)
    {
        if (target.Open && target != this)
        {
            target.Open(target, x, y);
            return;
        }

        // set active if not copy button
        this.SetActive();
        
        // set grab window if name is target
        if (target == this.name)
        {
            // set grab window and play sound
            grabWindow = this;
            SystemSound(soundGrabStart)
            
            // use grabbing cursor
            document.body.style.cursor = 'grabbing';
            
            // prevent anything from getting focus white grabbing
            desktop.style.pointerEvents = 'none';

            // save grab offset
            grabOffsetX = x - parseInt(this.style.left);
            grabOffsetY = y - parseInt(this.style.top);
            return;
        }
        
        // check for title bar buttons
        target.id == 'Full'        && this.FullScreen();
        target.id == 'Reload'      && this.Reload();
        target.id == 'Close'       && this.Close();
        target.id == 'Shrink'      && this.Resize(this.scale - .2, soundShrink);
        target.id == 'Grow'        && this.Resize(this.scale + .2, soundGrow);
        (target.id == 'Help' | target.id == 'Code') && this.ShowCode();
    }
    
    Resize(scale, sound)
    {
        // get new width and fix window offset
        let wNew = OS13k.Clamp(this.program.width * scale, 1920, 170);
        this.style.left = parseInt(this.style.left) + parseInt(this.style.width) - wNew;
        
        // set new size
        this.style.width = wNew;
        this.iframeWrapper.style.height = this.program.height * (this.scale = wNew / this.program.width);
    
        // update program info and play sound
        this.program.Save();
        sound && SystemSound(sound);
    }
    
    SetActive(active=1, clamp, focus=1)
    {
        // close menus when window is set active
        CloseMenus();
        
        // set style, dim non active windows
        this.className = active? 'activeWindow' : '';
        this.titlebar.className = 'titlebar titlebar' + 
            (active? 'Active' : '') + 
            (this.program.flags & sticky ? 'Sticky' : '');
        this.iframeWrapper.style.filter = active || this.program.flags & awake ? 
            '' : 'saturate(.7)brightness(.7';

        // check if active
        if (!active) return;

        // clamp window to screen
        let rect = this.getBoundingClientRect();
        clamp && (
            this.style.left = OS13k.Clamp(rect.x, innerWidth - rect.width, 0,
            this.style.top = OS13k.Clamp(rect.y, Math.max(taskbarHeight, innerHeight - rect.height), taskbarHeight)));

        // set focus to iframe using timeout
        if (focus && finishedStartup)
            setTimeout(e=> document.activeElement != this && this.iframeContent && this.iframeContent.focus(lastActiveFrame = this.iframe));

        if (activeWindow != this)
        {
            // deactivate old window and set this one active and play sound
            activeWindow && activeWindow.SetActive(0);
            activeWindow = this;
            SystemSound(this.activeCount++ ? soundActive : soundOpen);

            // move z to top
            this.style.zIndex = ++topZ;

            // show menu buttons
            let MenuButton = (text, onmousedown)=>
            {
                let button = menu.appendChild(document.createElement('button'));
                button.innerText = text;
                button.onmousedown = onmousedown;
            }
            menu.innerHTML = '';
            this.program.flags & full &&   MenuButton('Full Screen', ()=> this.FullScreen());
            this.program.code &&           MenuButton('Code',        ()=> this.ShowCode());
            this.program.help &&           MenuButton('Help',        ()=> this.ShowCode());
            this.program.flags & resize && MenuButton('Reset Size',  ()=> this.SetActive(1, 1, this.Resize(1, soundGrow)));
            this.program.flags & reload && MenuButton('Reload',      ()=> this.Reload());
            MenuButton('Close', ()=> this.Close());

            // set taskbar icon active if it exists
            this.taskbarIcon && this.taskbarIcon.SetActive(active, clamp, focus);
            
            // save start program if finished startup and not sticky
            finishedStartup & !(this.program.flags & sticky) && OS13k.Save(startProgramId = this.program.id);
        }
    }
    
    FullScreen()
    {
        // set full screen
        SystemSound(soundFullScreen);
        this.iframeContent.focus();
        this.iframeWrapper.webkitRequestFullScreen ? this.iframeWrapper.webkitRequestFullScreen() :
            this.iframeWrapper.requestFullscreen ? this.iframeWrapper.requestFullscreen() : 0;
        
        OS13k.Trophy('🕹️','OS13k','Pro Gamer','Went Full Screen');
    }
    
    ShowCode(silent)
    {
        // toggle showing code and play sound
        this.codeDisplay.style.display = (this.showCode = !this.showCode) ? 'inline' : 'none';
        silent || SystemSound(this.program.help ? soundHelp : soundCode);

        this.program.help || OS13k.Trophy('👨‍💻','OS13k','Hacker','Viewed Code');
    }
    
    Reload(silent, clamp=1)
    {
        silent || SystemSound(soundReload);
        
        // reload program or reload iframe and set invisible
        this.iframeContent &&
            this.iframeContent.OS13kReload ?
            this.iframeContent.OS13kReload() :
            this.CreateFrame(this.iframe.style.visibility = '');
    }
    
    Close()
    {
        // remove start program if closed and play sound
        this.program.id == startProgramId && (startProgramId = '');
        SystemSound(soundClose);
            
        // save info and set closed
        this.program.Save(0);
        
        // invalidate window after info is saved
        this.program.window = 0;
        
        // remove taskbar icon and self
        this.taskbarIcon.remove();
        this.remove();
    }
} // OS13kWindow
customElements.define('w-', OS13kWindow);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OS13kTaskbarIcon - icon on taskbar for opened programs

class OS13kTaskbarIcon extends HTMLElement
{
	constructor(program, windowOrMenu)
    {
        super();
        
        // create icon
        this.className = 'taskbarIcon';
        this.menu = this.windowOrMenu = windowOrMenu;
        this.SetName(this.program = program);
        
        // add to taskbar
        taskbarSpace.before(this);
    }

    SetName()
    {
        this.innerHTML = '<div style=pointer-events:none>' + (this.program.icon || '💠');
        this.title = this.program.name;
    }
    
    Open() { this.SetActive(); }
    
    SetActive(active=1, clamp=1, focus=1)
    {
        // set window active and clamp
        active && this.windowOrMenu.SetActive(1, clamp, focus);
    
        // load icon cant be active taskbar item
        if (this == loadIcon)
            return SystemSound(soundMenu, .3);
        
        // set active style
        this.className = 'taskbarIcon ' + (active ? 'taskbarIconActive' : '');
        
        // if active, unselect old taskbar icon and set this active
        active && activeTaskbarIcon != this && (activeTaskbarIcon && activeTaskbarIcon.SetActive(0), activeTaskbarIcon = this);
    }
    
} // OS13kTaskbarIcon
customElements.define('i-', OS13kTaskbarIcon);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OS13kTrayIcon - icon on taskbar tray for OS shortcuts

class OS13kTrayIcon extends HTMLElement
{
	constructor()
    {
		super();
        
        // create tray icon and add it
        this.className = 'trayIcon';
        tray.appendChild(this);
    }
    
    SetProgram(program)
    {
        // set program, title, and icon
        this.program = program;
        this.title = program.name;
        this.innerHTML = program.icon;
    }
    
    Open() { this.program.Toggle(); }
} // OS13kTrayIcon
customElements.define('t-', OS13kTrayIcon);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OS13kDesktopIcon - a shortcut icon to appear on the desktop

class OS13kDesktopIcon extends HTMLElement
{
	constructor(program, window)
    {
		super();
        
        // create tray icon and add it
        this.program = program;
        this.window = window;
        this.className = 'desktopIcon';
        this.innerHTML = '<div class=desktopIconIcon>' + (program.folder ? '📁' : program.icon);
        this.innerHTML += this.title = program.name;
    }
    
    Open() { this.window && this.window.SetActive(); this.program.Open(); }
} // OS13kDesktopIcon
customElements.define('d-', OS13kDesktopIcon);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

let grabWindow, grabOffsetX, grabOffsetY, finishedStartup,
    activeWindow, activeProgram, activeTaskbarIcon, loadIcon,
    analyserCanvas = document.createElement('canvas'), analyserData = [], lastMusicTime = -analyserWaitTime,
    lastActiveFrame, topZ = 0, hadInput = 0,
    windowOpenX = startOpenOffset, windowOpenY = startOpenOffset + taskbarHeight,
    startProgram, startProgramId, programInfos = [], trophies = [],
    trophyTrayIcon, settingsTrayIcon, clockTrayIcon, musicTrayIcon, stickyNoteTrayIcon,

    // volume, music, speech, popups, color1, color2, text
    settings = {v:.2, m:.2, s:1, p:1, o:1, c:'#222233', d:'#332222', t:'OS13k'},

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
        
    // check if iframe became new active element
    let activeElement = document.activeElement,
        activeFrame = activeElement.shadowRoot && activeElement.shadowRoot.activeElement == activeElement.iframe ? 
        activeElement.iframe : 0;
            
    // if a new frame took focus, set window active and that we had input
    activeFrame && lastActiveFrame != activeFrame && activeElement.SetActive(hadInput = 1);
        
    // set last active frame
    lastActiveFrame = activeFrame;

    // fade in desktop after loading
    document.body.style.opacity = OS13k.Clamp( time/1e3 );
    
    // update trophy count
    let trophyString = trophies.length + '🏆';
    trophyString != trophyTrayIcon.innerHTML && (trophyTrayIcon.innerHTML = trophyString);
    
    // update time
    clockTrayIcon.title = Date();
    let timeString = clockTrayIcon.title.replace(/.* (\d+):(\d+).*/, (a,b,c)=> (b%12||12)+':'+c);
    timeString != clockTrayIcon.innerHTML && (clockTrayIcon.innerHTML = timeString);
    
    // show popups after startup is finished and there was input
    if (!hadInput) return;
    
    // get analyser data
    let frequencyData = new Uint8Array(musicAnalyser.fftSize = 256),
        context = analyserCanvas.getContext('2d');
    musicAnalyser.getByteFrequencyData(frequencyData);
    analyserCanvas.width = analyserCanvas.height = 32;

    // render analyser
    for(let i = 0; i < 32; )
    {
        // get frequency band volume and adjust for loudness
        let volume = (frequencyData[i*2] / 255)**3 * (1 + Math.log10((i*2) * defaultSampleRate / 1024 ));

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
    [trophies, settings, programInfos, startProgramId] = JSON.parse(localStorage.OS13k);

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
loadIcon = new OS13kTaskbarIcon({icon:'💾', name:'Load'}, new OS13kProgramMenu(programStubs));
loadIcon.windowOrMenu.Rebuild();

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
    
// startup routine
OS13k.Save(

    // create analyser canvas
    musicTrayIcon.prepend(analyserCanvas),
    analyserCanvas.style = 'width:16;height:16;margin:2;pointer-events:none;display:none',

    // load start program
    self == top && startProgram && startProgram.Open(), finishedStartup = 1);

///////////////////////////////////////////////////////////////////////////////
// ZzFXMicro - Zuper Zmall Zound Zynth

// play a zzfx sound
var zzfx = (...parameters)=> OS13k.PlaySamples(zzfxG(...parameters)),

// generate zzfx samples
zzfxG = (volume = 1, randomness = .05, frequency = 220, attack = 0, sustain = 0, release = .1, shape = 0, shapeCurve = 1, slide = 0, deltaSlide = 0, pitchJump = 0, pitchJumpTime = 0, repeatTime = 0, noise = 0, modulation = 0, bitCrush = 0, delay = 0, sustainVolume = 1, decay = 0, tremolo = 0, buffer = [])=>
{
    attack = 99 + attack * defaultSampleRate;
    release = release * defaultSampleRate;
    sustain *= defaultSampleRate;
    decay *= defaultSampleRate;
    delay *= defaultSampleRate;
    
    // init parameters and helper functions
    let PI2 = Math.PI*2,
    sign = v=> v>0? 1 : -1,
    length = OS13k.randomSeed = OS13k.Clamp(attack + decay + sustain + release + delay, 9*defaultSampleRate) | 0,
    startSlide = slide *= 500 * PI2 / defaultSampleRate**2,
    startFrequency = frequency *= (1 + randomness*2*Math.random() - randomness) * PI2 / defaultSampleRate,
    modPhase = sign(modulation) * PI2/4,
    t=0, tm=0, i=0, j=1, r=0, c=0, s=0, f;

    repeatTime = repeatTime * defaultSampleRate | 0;
    pitchJumpTime *= defaultSampleRate;
    pitchJump *= PI2 / defaultSampleRate;
    deltaSlide *= 500 * PI2 / defaultSampleRate**3;
    for(modulation *= PI2 / defaultSampleRate;
    
        // loop and generate waveform, combine with buffer if passed in
        i < length; buffer[i] = (buffer[i++] || 0) + s)
    {
        if (!(++c%(bitCrush*100|0)))                     // bit crush
        {
            s = shape? shape>1? shape>2? shape>3?        // wave shape
                Math.sin((t%PI2)**3) :                   // 4 noise
                Math.max(Math.min(Math.tan(t),1),-1):    // 3 tan
                1-(2*t/PI2%2+2)%2:                       // 2 saw
                1-4*Math.abs(Math.round(t/PI2)-t/PI2):   // 1 triangle
                Math.sin(t);                             // 0 sin

            s = (repeatTime ?
                    1 - tremolo + tremolo*Math.sin(2*Math.PI*i/repeatTime) // tremolo
                    : 1) *
                sign(s)*(Math.abs(s)**shapeCurve) *          // curve 0=square, 2=pointy
                volume * (                                   // envelope
                    i < attack ? i/attack :                  // attack
                    i < attack + decay ?                     // decay
                    1-((i-attack)/decay)*(1-sustainVolume) : // decay falloff
                    i < attack + decay + sustain ?           // sustain
                    sustainVolume :                          // sustain volume
                    i < length - delay ?                     // release
                    (length - i - delay)/release *           // release falloff
                    sustainVolume :                          // release volume
                0);                                          // post release

            s = delay ?                                      // delay
                s/2 + (delay > i ? 0 :
                (i<length-delay? 1 : (length-i)/delay) *     // release delay 
                buffer[i - delay|0]/2) : s;                  // sample delay
        }

        f = (frequency += slide += deltaSlide) *     // frequency
            Math.sin(tm * modulation - modPhase);    // modulation

        t += f - f*noise*(1 - (Math.sin(i)+1)*1e9%2);     // noise
        tm += f - f*noise*(1 - (Math.sin(i)**2+1)*1e9%2); // modulation noise

        if (j && ++j > pitchJumpTime)       // pitch jump
        {
            frequency += pitchJump;         // apply pitch jump
            startFrequency += pitchJump;    // also apply to start
            j = 0;                          // reset pitch jump time
        }

        if (repeatTime && !(++r % repeatTime)) // repeat
        {
            frequency = startFrequency;     // reset frequency
            slide = startSlide;             // reset slide
            j = j || 1;                     // reset pitch jump time
        }
    }
    
    return buffer;
},

///////////////////////////////////////////////////////////////////////////////
//! ZzFXM (v2.0.2) | (C) Keith Clark & Frank Force | MIT | https://github.com/keithclark/ZzFXM

zzfxM = (instruments, patterns, sequence, BPM = 125, validate) => 
{
    let instrumentParameters, i, j, k, sample, patternChannel, isSequenceEnd,
        notFirstBeat, stop, instrument, pitch, attenuation, pan = 0,
        outSampleOffset, sampleOffset, nextSampleOffset, sampleBuffer = [], 
        channelIndex = 0, hasMore = 1, channelBuffers = [[],[]], 
        sampleCache = {}, beatLength = defaultSampleRate / BPM * 60 >> 2;

    // for each channel in order until there are no more
    for(; hasMore; channelIndex++)
    {
        // reset current values
        sampleBuffer = [hasMore = notFirstBeat = outSampleOffset = 0];

        // for each pattern in sequence
        sequence.map((patternIndex, sequenceIndex) => 
        {
            // get pattern for current channel, use empty 1 note pattern if none found
            patternChannel = patterns[patternIndex][channelIndex] || [0, 0, 0];

            // check if there are more channels
            hasMore |= !!patterns[patternIndex][channelIndex];

            // get next offset, use the length of first channel
            nextSampleOffset = outSampleOffset + (patterns[patternIndex][0].length - 2 - !notFirstBeat) * beatLength;

            // for each beat in pattern, plus one extra if end of sequence
            isSequenceEnd = sequenceIndex == sequence.length - 1;
            for (i = 2, k = outSampleOffset; i < patternChannel.length + isSequenceEnd; notFirstBeat = ++i)
            {
                // stop if end, different instrument, or new note
                stop = i == patternChannel.length + isSequenceEnd - 1 && isSequenceEnd || 
                    instrument != (patternChannel[0] || 0) | patternChannel[i] | 0;

                // fill buffer with samples for previous beat, most cpu intensive part
                if (!validate)
                for(j = 0; j < beatLength && notFirstBeat; 

                    // fade off attenuation at end of beat if stopping note, prevents clicking
                    j++ > beatLength - 99 && stop ? attenuation += (attenuation < 1) / 99 : 0
                )
                {
                    // copy sample to stereo buffers with panning
                    sample = (1-attenuation) * sampleBuffer[sampleOffset++] / 2 || 0;
                    channelBuffers[0][k] = (channelBuffers[0][k]   || 0) - sample * pan + sample;
                    channelBuffers[1][k] = (channelBuffers[1][k++] || 0) + sample * pan + sample;
                }

                // set up for next note
                if (patternChannel[i])
                {
                    // set attenuation and pan
                    attenuation = patternChannel[i] % 1;
                    pan = patternChannel[1] || 0;

                    if (patternChannel[i] | 0)
                    {
                        // get cached sample
                        sampleBuffer = sampleCache
                            [[
                                instrument = patternChannel[sampleOffset = 0] || 0, 
                                pitch = patternChannel[i] | 0
                            ]] = 
                            sampleCache[[instrument, pitch]] ||
                        (
                            // add sample to cache
                            instrumentParameters = [...instruments[instrument]],
                            instrumentParameters[2] *= 2 ** ((pitch - 12) / 12),
                            pitch > 0 ? zzfxG(...instrumentParameters) : []
                        );
                    }
                }
            }

            // update the sample offset
            outSampleOffset = nextSampleOffset;
        });
    }

    return channelBuffers;
}

///////////////////////////////////////////////////////////////////////////////
// Mouse Input

onmousedown = e=>
{
    // get orignal target
    const originalTarget = e.composedPath()[0];

    // check if load icon is target while programs menu was visible
    if (e.target == loadIcon && e.target.windowOrMenu.style.visibility)
    {
        // close menus because they were open
        CloseMenus();
        
        // reactivate active window
        activeWindow && activeWindow.SetActive();
        
        // prevent main document from taking focus
        return false;
    }
    
    // close menus and reset program menu position, and set there has been input
    CloseMenus(programsMenu.style.left = 0, programsMenu.style.top = taskbarHeight, hadInput = 1);

    // prevent stuck grab (from tabbing to another window while grabbing)
    if (grabWindow) return onmouseup(e);
    
    // check if not left mouse button
    if (e.button)
    {
        // dont allow right click on buttons
        if (originalTarget.localName == 'button')
            return false;

        // check for right mouse button
        if (e.button & 2 && e.target != menu)
        {
            // set target active, use load icon if no valid target
            (e.target.SetActive ? e.target : loadIcon).SetActive(1, 1, 0);

            // get which menu to open
            let targetMenu = e.target.menu ? (SystemSound(soundMenu, .1), menu) : programsMenu;

            // show context menu
            targetMenu.style.left = e.x;
            targetMenu.style.top  = e.y;
            e.target != loadIcon && (targetMenu.style.visibility = 'visible');
        }
    }
    else
    {
        // open or reactivate window if no valid target
        e.target.Open ? e.target.Open(originalTarget, e.x, e.y) : activeWindow && activeWindow.SetActive();
        
        // allow event to contiue only if input
        return e.target == loadIcon || /input|textarea/.test(originalTarget.localName);
    }
}

onmousemove = e=>
{
    // update grab position
    grabWindow ? grabWindow.style.left = e.x - grabOffsetX : 0;
    grabWindow ? grabWindow.style.top  = e.y - grabOffsetY : 0;
    
    // handle mouse move
    e.target.Move && e.target.Move();
}

onmouseup = e=>
{
    const originalTarget = e.composedPath()[0];
    originalTarget.parentElement == popups && originalTarget.remove(SystemSound(soundClose));

    // set grab window active, no clamp, and set cursor to default, unset grab
    grabWindow && (grabWindow.program.Save(),
    SystemSound(soundGrabEnd),
    grabWindow.SetActive(1, 0),
        document.body.style.cursor = desktop.style.pointerEvents = grabWindow = '');
}

// prevent default right click context menu
oncontextmenu = e=> false;