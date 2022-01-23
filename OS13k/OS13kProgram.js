'use strict'

// program flags
const              // change to const for final build
sticky   = 2**0, // always save position and if open
reload   = 2**1, // show reload button
awake    = 2**2, // prevent sleep and dim when not active
full     = 2**3, // show full screen button
resize   = 2**4, // show resize buttons (apect ratio maintained)
code     = 2**5, // show code button (cant show code if help is set)
shortcut = 2**6, // show shortcut icon on the desktop

// system flags
closeAll   = 2**7,         // close all open windows
newUserProgram = 2**8,     // create new user program
deleteUserPrograms = 2**9, // remove all user programs

// defaults
defaultFlags = full|reload|resize,
defaultWidth = 720, defaultHeight = 405; // 16:9 aspect

///////////////////////////////////////////////////////////////////////////////
// OS13kProgram - stores program info and handles loading from folders
    
class OS13kProgram extends HTMLElement
{
	constructor(icon='💠', src='', width=defaultWidth, height=defaultHeight, flags, name='', help='', folder, userProgramId, userFolder)
    {
        super();

        // split source by . to get extension
        let srcParts = src.split('.');
        
        // split source by / to get filename to convert camel case to nice name
        let srcCleanName = srcParts[0].split('/').pop().replace(/([a-z](?=[A-Z]))/g, '$1 ');
        name = name || srcCleanName && (srcCleanName[0].toUpperCase() + srcCleanName.slice(1));
        
        // check for special extensions
        this.isDweet =  srcParts[1] == 'dweet';
        this.isShader = srcParts[1] == 'shader';
        this.isExternal = src.startsWith('http');

        // set code only if help not shown or if has extension and not disabled
        this.code = !(this.help = help) && (flags & code || ((this.isDweet | this.isShader) && flags == undefined));

        // set all folders to be resizable
        flags |= folder && resize;

        // set icon data
        this.className  = 'program';
        this.src        = src;
        this.width      = width;
        this.height     = height;
        this.folder     = folder;
        this.id         = userProgramId || name;
        this.userFolder = userFolder;
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
                this.name = OS13k.StripHTML(name) || 'User Program ' + this.id
            }</div>` + (this.folder? '▶' : '');
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
        // hack: prevent user folders from opening in window
        if (this.folder && this.folder[0] && this.folder[0][4] & newUserProgram)
            return;
            
        if (this.window)
        {        
            // set window to be active and clamp
            this.window.SetActive(1, 1);
        }
        else if (this.flags & newUserProgram)
        {
            // create user program with default code
            this.programMenu.NewUserProgram(undefined, this.userFolder);
        }
        else if (this.flags & deleteUserPrograms && confirm(this.name + '?'))
        {
            // close windows with matching folder
            [...desktop.children].map(child=> child.Close && (this.userFolder ?
                child.program.info.userFolder == this.userFolder : child.program.info.code != undefined) && child.Close());
            
            // remove user program infos
            programInfos = programInfos.filter(info=> info.code == undefined || this.userFolder && info.userFolder != this.userFolder);
            
            // rebuild menu and play sound
            RebuildMenu(OS13k.Save(SystemSound(soundClose, 4)));
        }
        else if (this.flags & closeAll)
        {
            // close all windows if no src or folder and play sound
            [...desktop.children].map(child=> child.Close && child.Close(1));
            SystemSound(soundClose);

            // reset window open position
            windowOpenX = startOpenOffset;
            windowOpenY = startOpenOffset + taskbarHeight;

            OS13k.Trophy('☕','OS13k','Coffee Is For Closers','Closed All');
        }
        else if (this.src || this.userProgram || this.folder)
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
        if (this.folder)
            this.info = {};
        else
        {
            // load saved program info from local storage
            let i = programInfos.findIndex(e=> e.id == this.id);
            this.info = i < 0 ? {} : programInfos[i];

            // check for user code
            this.userProgram = this.info.code != undefined;
        }
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
            scale: open | this.flags & sticky ? this.window.scale : 1,

            // user program info
            name: this.name,
            icon: this.icon,
            width: this.width,
            height: this.height,
            code: this.info.code,
            allowSleep: this.userProgram? this.window.allowSleep.checked : 1,
            liveEdit: this.window.liveEdit.checked,
            userFolder: this.userFolder
        }
        
        // add to programs info and save
        let i = programInfos.findIndex(e=> e.id == this.id);
        OS13k.Save(i < 0 ? programInfos.push(this.info) : programInfos[i] = this.info);
    }
    
} // OS13kProgram
customElements.define('p-', OS13kProgram);