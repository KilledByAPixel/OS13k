'use strict'

///////////////////////////////////////////////////////////////////////////////
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