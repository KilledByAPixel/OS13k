'use strict'

///////////////////////////////////////////////////////////////////////////////
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

    NewUserProgram(copyProgram, userFolder)
    {
        // create new program
        let stub = copyProgram ? 
            [copyProgram.icon,, copyProgram.width, copyProgram.height, defaultFlags|code, 
                copyProgram.name + '+', , ,++nextUserProgramId, copyProgram.userFolder] :
            ['✋',,,,defaultFlags|code,,,,++nextUserProgramId, userFolder],
            program = stub[-1] = new OS13kProgram(...stub);
        
        // add to menu program infos
        this.programStubs.push(stub);

        // set code, copy if passed in, use default if none found
        program.info.code = copyProgram ? (
            program.info.scale = copyProgram.info.scale,
            windowOpenX = copyProgram.info.x,
            windowOpenY = copyProgram.info.y + titlebarHeight,
            copyProgram.info.code)
            :
            '// Auto detects HTML, Dweet, or Shadertoy! You can drop files here too. ✌️😄\n' +
            'for(x.fillRect(0,0,i=s=2e3,s);i--;x.globalAlpha=.1)\n' +
            'x.clearRect((S(i)*1e9-t*i/9)%s,i*9%s,i%9,i%9)';

        // mark code as safe, open, and show code, prevent iframe focus so code can be focused
        program.Open(program.userProgram = allCodeIsSafe = 1);
        program.window.ShowCode(1);
        program.window.codeText.focus();
        
        // set menu and rebuild menus
        RebuildMenu(program.programMenu = this);
        return program;
    }

} // OS13kProgramMenu
customElements.define('m-', OS13kProgramMenu);