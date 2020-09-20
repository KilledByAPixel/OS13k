'use strict'

///////////////////////////////////////////////////////////////////////////////
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