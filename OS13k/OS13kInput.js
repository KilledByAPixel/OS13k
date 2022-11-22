'use strict'

///////////////////////////////////////////////////////////////////////////////
// Mouse Input

const OS13k_onMouseDown = e=>
{
    if (e.button == 1)
    {
        e.preventDefault(); // prevent middle mouse zoom
        return true;
    }

    // get orignal target
    const originalTarget = e && e.composedPath ? e.composedPath()[0] : e.target;

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
        //e.target.Open ? e.target.Open(originalTarget, e.x, e.y) : activeWindow && activeWindow.SetActive();
        e.target.Open ? e.target.Open(originalTarget, e.x, e.y) : activeWindow && activeWindow.SetActive();
        
        // allow event to contiue only if input
        return !e.cancelable || e.target == loadIcon || /input|textarea/.test(originalTarget.localName);
    }
}

const OS13k_onMouseUp = e=>
{
    const originalTarget = e && e.composedPath ? e.composedPath()[0] : e.target;
    originalTarget.parentElement == popups && originalTarget.remove(SystemSound(soundClose));

    // set grab window active, no clamp, and set cursor to default, unset grab
    grabWindow && (grabWindow.program.Save(),
    SystemSound(soundGrabEnd),
    grabWindow.SetActive(1, 0),
        document.body.style.cursor = desktop.style.pointerEvents = grabWindow = '');
}

const OS13k_onMouseMove = e=>
{
    // update grab position
    grabWindow ? grabWindow.style.left = e.x - grabOffsetX : 0;
    grabWindow ? grabWindow.style.top  = e.y - grabOffsetY : 0;
    
    // handle mouse move
    e.target.Move && e.target.Move();
}

onmouseup = e=> OS13k_onMouseUp(e);
onmousedown = e=> OS13k_onMouseDown(e);
onmousemove = e=> OS13k_onMouseMove(e);

// prevent default right click context menu
oncontextmenu = e=> false;

///////////////////////////////////////////////////////////////////////////////
// Drag and Drop

// allow drag and drop code into editor
ondrop = e=>
{
    let reader = new FileReader();
    reader.onload = f=> e.target.SetActive(1, 0, e.target.SetCode(f.target.result, 1));

    // read file, set code, and set active
    e.dataTransfer.files.length && e.target.program && e.target.program.userProgram &&
        reader.readAsText(e.dataTransfer.files[0]); 
    return false;
}

// prevent default drop events
ondragover = ()=> false;

///////////////////////////////////////////////////////////////////////////////
// Mobile Support OPTIONAL

// save if user was touching
let wasTouching;

if (window.ontouchstart !== undefined)
{
    // remove hovers, they get stuck on mobile
    let RemoveHovers = e=>
    {
        [...e.styleSheets].map(sheet=> {
        for(let i = sheet.rules.length; i--; )
            sheet.rules[i].selectorText &&
            sheet.rules[i].selectorText.match('hover') &&
            sheet.deleteRule(i)});
    }
    RemoveHovers(document);
    
    // set touch events
    ontouchstart = e =>
    {
        if (e.touches[0])
        {
            e.x = e.touches[0].clientX;
            e.y = e.touches[0].clientY;
        }

        OS13k_onMouseMove(e);
        !e.target.folder &&    // allow browsing in folder list
            OS13k_onMouseDown(e);
        
        // remove hovers from active window
        activeWindow && RemoveHovers(activeWindow.shadowRoot);
        
        // prevent default if not edit area
        let originalTarget = e.originalTarget || e.path[0];

        // allow event to contiue only if input
        return !e.cancelable || /button/.test(originalTarget.localName);

    }
    ontouchmove = e =>
    {
        if (e.touches[0])
        {
            e.x = e.touches[0].clientX;
            e.y = e.touches[0].clientY;
        }
        return OS13k_onMouseMove(e);
    }
    
    ontouchend = ontouchcancel = e =>
    {
        // pass event to mouse down
        if (e.touches[0])
        {
            e.x = e.touches[0].clientX;
            e.y = e.touches[0].clientY;
        }
        OS13k_onMouseUp(e);
    }

    onmousedown = e=>{}
    onmouseup = e=>{}
    onmousemove = e=>{}
}