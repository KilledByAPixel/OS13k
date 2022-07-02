'use strict'

///////////////////////////////////////////////////////////////////////////////
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

        // create code/help display
        this.codeText = this.codeDisplay.appendChild(document.createElement('textarea'));
        this.codeText.id = 'codeText';
          
        // use custom code  
        program.userProgram ? this.codeText.value = program.info.code : this.codeText.readOnly = 1;
        this.codeText.spellcheck = 0;

        // init custom code options
        this.codeOptions = this.codeDisplay.appendChild(document.createElement('div'));
        this.codeOptions.id = 'codeOptions';
        this.codeOptions.style.display =  program.userProgram ? '' : 'none';
        this.codeOptions.style.paddingLeft = 9;

        // build the code options
        const CodeOption = (text, tagName, innerHTML='', style, type)=>
        {
            text && this.codeOptions.appendChild(document.createTextNode(text));
            let e = this.codeOptions.appendChild(document.createElement(tagName));
            e.innerHTML = innerHTML;
            e.style = style;
            e.type = type;
            return e;
        }

        // create each element for code options
        let
        screenshotButton = this.screenshot = CodeOption('', 'button', '📷'),
        iconInput = CodeOption(' Icon ', 'input', '', 'width:50'),
        nameInput = CodeOption(' Name ', 'input'),
        folderInput = CodeOption(' Folder ', 'input'),
        nextLine = CodeOption('', 'br'),
        widthInput = CodeOption(' Size ', 'input', '', 'width:50', 'number'),
        heightInput = CodeOption('x', 'input', '', 'width:50', 'number'),
        sleepInput = this.allowSleep = CodeOption(' Sleep ', 'input', '', '', 'checkbox'),
        liveEditInput = this.liveEdit = CodeOption(' Live Edit ', 'input', '', '', 'checkbox'),
        saveButton = CodeOption('', 'button', 'Save'),
        copyButton = CodeOption('', 'button', 'Copy'),
        deleteButton = CodeOption('', 'button', 'Delete'),
        byteSizeSpan = this.codeSize = CodeOption('', 'span', program.info.code && program.info.code.length),
        link = CodeOption(' Bytes', 'a'),
        canvas = CodeOption('', 'canvas', '', 'display:none'),
        canvasContext = canvas.getContext('2d');

        // set checkboxes
        sleepInput.checked = program.info.allowSleep != false;
        liveEditInput.checked = program.info.liveEdit != false;
        
        // error text
        this.errorText = this.codeDisplay.appendChild(document.createElement('textarea'));
        this.errorText.id = 'errorText';
        this.errorText.readOnly = true;
        
        // save button
        saveButton.onmousedown = ()=>
            link.click(SystemSound(soundSave),
            link.href = URL.createObjectURL(new Blob([this.codeText.value])),
            link.download = 'OS13k_' + program.name);
        
        // copy button
        copyButton.onmousedown = (e)=> { program.programMenu.NewUserProgram(program); e.stopPropagation();}

        // delete button
        deleteButton.onmousedown = ()=>
        {
            // close, remove, and rebuild (must close first)
            this.Close();
            RebuildMenu(OS13k.Save(programInfos = programInfos.filter(info=> info.id != program.id)));
        }

        // screenshot button
        screenshotButton.onmousedown = ()=>
        {
            // wrap in try block in case canvas doesnt exist
            try {
                link.click(
                    // copy to a white canvas before saving
                    SystemSound(soundSave),
                    canvasContext.fillRect(0, 0, 
                        canvas.width  = this.iframeContent.c.width, 
                        canvas.height = this.iframeContent.c.height,
                        canvasContext.fillStyle = '#fff'),
                        canvasContext.drawImage(this.iframeContent.c, 0, 0),
                    link.href = canvas.toDataURL('image/png'),
                    link.download = 'OS13k_Image_' + program.name);
            } catch(e) {} // ignore screenshot errors
        }

        // get elements by id
        iconInput.value   = program.icon;
        nameInput.value   = program.name;
        widthInput.value  = program.width;
        heightInput.value = program.height;
        program.userFolder != undefined && (folderInput.value = program.userFolder);

        // set new icon and name when changed
        iconInput.oninput = nameInput.oninput =
        liveEditInput.oninput = e=>
        program.Save(
            SetName(this.taskbarIcon.
            SetName(program.
            SetName(OS13k.StripHTML(iconInput.value), nameInput.value))));

        folderInput.oninput = e=>
            RebuildMenu(program.Save(program.userFolder = OS13k.StripHTML(folderInput.value.trim())));

        // size options
        widthInput.onchange =
        heightInput.onchange = e=>
        {
            program.width = widthInput.value = OS13k.Clamp(widthInput.value, defaultWidth, 99);
            program.height = heightInput.value = OS13k.Clamp(heightInput.value, program.width*2, 99);

            // update to new size and clamp to desktop
            this.Resize(1);
            this.SetActive(1, 1);
        }

        // allow sleep button
        sleepInput.oninput = e=> this.Reload(1, program.Save());

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
            this.CreateFrame(loading += !finishedStartup);
        }
    }

    SetErrorText(message, source, line, col, e)
    {
        this.errorText.value = e ? e + (e && e.stack ? ` (${(line-1) + ':' + col})` : '') : message;
        this.errorText.style.display = this.errorText.value ? '' : 'none';
        console.log(this.errorText.value);
        return true;
    }
    
    CreateFrame()
    {
        let LoadFrame = ()=>
        {
            // check if code is safe to execute
            let codeIsSafe = !this.program.userProgram | allCodeIsSafe,

                // only dweets and shadertoys can do screenshots
                hasExtension = program.isDweet | program.isShader,

                // get iframe content and document (will fail if cross site)       
                iframeDocument = iframeContent.document,
                iframeText = program.userProgram ? program.info.code :
                hasExtension ? iframeDocument.body.innerText : iframeDocument.body.innerHTML;
            
            this.screenshot.disabled = !hasExtension | !codeIsSafe;

            // set code/help display if not user program
            program.userProgram || (this.codeText.value = program.help || iframeText);

            // pass OS13k constants to iframe
            iframeContent.OS13k = OS13k;
            iframeContent.OS13kWindow = this;
            iframeContent.zzfx = zzfx;

            // check for extensions
            if (!codeIsSafe)
            {
                iframeDocument.body.style.background = '#111';  
                iframeDocument.body.innerHTML = '';
            }
            else if (hasExtension) 
            {
                // create canvas
                iframeDocument.body.innerHTML = 
                    `<style>canvas{width:100%;background:${ 
                        program.isShader ? '#000' : '#fff' }}</style><canvas id=c width=1920 height=1080>`;

                // set body style
                iframeDocument.body.style =
                    'background:#111;' +
                    'overflow:hidden;' +
                    'margin:0;' +
                    'display:flex;' +
                    'align-items:center';
                    
                // loop protection for user dweets
                let code = program.userProgram && !program.isShader? 
                    iframeText.replace(
                        /(for\s*\([^;]*;[^;]*;|while\s*\()\s*(\S)/g, (a, b, c)=> 
                            b && c && !b.match(/\sof\s|\sin\s/g) ? 
                                b + '++OS13kL>1e5&&(e=>{throw"Timed out!"})()' +
                                (c == ')' ? '' : ',') + c : a ) : iframeText;
                try
                {
                    // create dweet or shader program
                    iframeContent.eval(
                        `OS13k=parent.OS13k;x=c.getContext` +
                        (program.isShader ? // preserve buffer for user programs for screenshot
                            `('webgl2'${program.userProgram ? ',{preserveDrawingBuffer:true}' : ''});` +
                            `X=Y=Z=W=0;` +
                            `onmousemove=e=>e.buttons&&(X=e.x,Y=c.height-e.y);` +
                            `onmousedown=e=>(X=Z=e.x,Y=W=c.height-e.y);` +
                            `onmouseup=e=>Z=W=0;` +
                            `s=OS13k.CreateShader(c,\`${ code }\`);` +
                            `OS13kU=t=>` +
                            `OS13k.RenderShader(c,s,t/1e3,frame++,X,Y,Z,W,c.width=innerWidth,c.height=innerHeight)`
                            :
                            `('2d');` +
                            `zzfx=parent.zzfx;` +
                            `S=Math.sin;C=Math.cos;T=Math.tan;` +
                            `R=(r,g,b,a=1)=>\`rgba(\${0|r},\${0|g},\${0|b},\${a})\`;` +
                            `u=t=>{\n${ code }\n};` +
                            `OS13kU=t=>t>OS13kF-2&&` + 
                                `u(((t=frame++/60)*60|0==frame-1)&&t>0?t+1e-6:t,` +
                                `OS13kL=0,` +
                                `OS13kF=Math.max(OS13kF+100/6,t))`) +
                            `;(OS13kA=t=>(requestAnimationFrame(OS13kA),` +
                                (program.flags & awake || program.info.allowSleep == 0 ? '' : 
                                    `t<1e3|parent.document.activeElement==OS13kWindow&&`) +
                                    `OS13kU(t)))` +
                            `(frame=OS13kF=0)`);
                } catch (e) { this.SetErrorText(e); }
            }
            
            // mouse down on iframe to load unsafe code, and call normal mousedown
            codeIsSafe || (iframeContent.onmousedown = e=> (this.Reload(allCodeIsSafe = 1), onmousedown(e)));
            
            // prevent iframes context menu and drop events
            iframeContent.ondrop = iframeContent.ondragover = iframeContent.oncontextmenu = ()=> false;

            // make visible
            this.iframe.style.visibility = 'visible';
            
            // update loading
            loading && --loading;

            // listen for reload from iframe, prevent infnite recursion
            program.userProgram && (this.iframe.onload = ()=> reloadCount++ && this.Reload(1, 0));

            // release grab window since this one will be in front
            grabWindow && onmouseup();
        }
        
        // remove old iframe if it exists
        this.iframe && this.iframeWrapper.removeChild(this.iframe);

        // create iframe
        this.iframe = this.iframeWrapper.appendChild(document.createElement('iframe')); 
        let iframeContent = this.iframeContent = this.iframe.contentWindow,
            program = this.program,
            reloadCount = 0;
        this.iframe.id = 'frame';
        
        // load src and force pages to be refreshed
        if (program.userProgram)
        {
            // clear error text
            this.errorText.style.display = 'none';

            // allow code editing, check for alt+enter to reload
            this.codeText.onkeydown = e=> !e.altKey || e.keyCode == 13 && this.SetCode(this.codeText.value);
            this.codeText.oninput = e=> this.liveEdit.checked && this.SetCode(this.codeText.value);

            // set on error now to catch errors on load
            iframeContent.onerror = (...parameters)=>this.SetErrorText(...parameters);

            // set code
            iframeContent.document.open();
            allCodeIsSafe && iframeContent.document.write(program.info.code);
            iframeContent.document.close();
           
            // get type of user code, html, shadertoy, or dweet
            program.info.code.trim()[0] != '<' ?
                program.isDweet = !(program.isShader = program.info.code.search(/void\s+mainImage/) >= 0) :
                program.isDweet = program.isShader = 0;

            // show error messages from user code
            iframeContent.onerror = (...parameters)=>this.SetErrorText(...parameters);

            // load the iframe
            LoadFrame();
        }
        else if (program.isExternal)
        {
            // if external url
            this.iframe.src = program.src;
        
            // prevent iframes context menu and drop events
            iframeContent.ondrop = iframeContent.ondragover = iframeContent.oncontextmenu = ()=> false;

            // make visible
            this.iframe.style.visibility = 'visible';
            
            // update loading
            loading && --loading;

            // release grab window since this one will be in front
            grabWindow && onmouseup();
        }
        else
        {
            // load source
            this.iframe.onload = ()=> LoadFrame();
            this.iframe.src = program.src + '?' + Date.now();
        }
    }
        
    SetCode(code, setText)
    {
        // set code when changed
        setText && (this.codeText.value = code);
        this.program.info.code = code;
        this.codeSize.innerHTML = code.length;
        this.program.Save();

        // mark code as safe and reset iframe
        this.CreateFrame(allCodeIsSafe = 1);
    }
    
    Open(target, x, y)
    {
        if (target.Open && target != this)
        {
            target.Open(target, x, y);
            return;
        }

        // set active if not copy button
        target.id != 'C' && this.SetActive();
        
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
            (this.program.flags & sticky ? 'Sticky' : this.program.userProgram ? 'User' : '');
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
        if (focus && !loading)
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
        // reload code if it wasnt safe yet and set it is safe and play sound
        (!this.program.userProgram | allCodeIsSafe) || this.Reload(allCodeIsSafe = 1);
        SystemSound(soundFullScreen);
        
        // set full screen
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
        // update program info and play sound
        this.program.userProgram && (this.program.info.code = this.codeText.value);
        this.program.Save();
        silent || SystemSound(soundReload);
        
        // reload program or reload iframe and set invisible
        !this.program.isExternal && this.iframeContent &&
            this.iframeContent.OS13kReload ?
            this.iframeContent.OS13kReload() :
            this.program.userProgram ?
                this.SetCode(this.program.info.code) :
            this.CreateFrame(this.iframe.style.visibility = '');
    }
    
    Close(silent)
    {
        // remove start program if closed and play sound
        this.program.id == startProgramId && (startProgramId = '');
        silent || SystemSound(soundClose);
            
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