'use strict'

///////////////////////////////////////////////////////////////////////////////
// OS13kDesktopIcon - a shortcut icon to appear on the desktop

class OS13kDesktopIcon extends HTMLElement
{
	constructor(program)
    {
		super();
        
        // create tray icon and add it
        this.className = 'desktopIcon';
        this.program = program;
        this.innerHTML = '<div class=desktopIconIcon>' + program.icon;
        this.innerHTML += this.title = program.name;
    }
    
    Open() { this.program.Open(); }
} // OS13kDesktopIcon
customElements.define('d-', OS13kDesktopIcon);