'use strict'

///////////////////////////////////////////////////////////////////////////////
// OS13k - 13k Build Edition

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
    ['👁️',,,awake|full|resize|dweet,'Visualizer'],
    ['🎹',350,99,reload|shortcut,'Ziano','Keyboard = Play Piano Notes\nSeed = Change Sound'],
    ['🦈',320,89,reload|shortcut,'Byte Beat Player','Enter a funtion and length in seconds to generate music.'],
]],
['🎮',,,shortcut,'Games',,
[
    ['🙉',,,defaultFlags|dweet,'Don\'t Fall'],
    ['🏂🏻',,,defaultFlags|dweet,'Bogus Slopes'],
    ['🐍',800,600,defaultFlags|dweet,'Shedding Snake'],
    ['🛣️',,,defaultFlags|dweet,'Bogus Roads Mini'],
]]
],

///////////////////////////////////////////////////////////////////////////////
// Add code for programs here, format... 'name:'code'

programs = 
{
'Help':'<h2><i>Welcome to OS13k!</i></h2><p>OS13k is a tiny operating system designed for JS13k.<p>Play JS13k games to earn trophies and unlock music.<p>✌️😄❤️ OS13k Team',
'Settings':'<style>body{background:#111;color:#fff;user-select:none;text-align:center}</style>Volume <input type=range id=V oninput=s() style=width:99> Music <input type=range id=M oninput=s() style=width:99><p>System Sounds <input type=checkbox id=Y oninput=s()> Speech <input type=checkbox id=S oninput=s()> Popups <input type=checkbox id=P oninput=s()> <p>Background <input id=C type=color oninput=s()> <input id=D type=color oninput=s()> <input id=T oninput=s()><script>s=e=>parent.OS13k.SaveSettings(V.value/100,M.value/100,S.checked,P.checked,Y.checked,D.value,C.value,T.value),s(i=parent.OS13k.Settings(),V.value=100*i.v,M.value=100*i.m,S.checked=i.s,P.checked=i.p,Y.checked=i.o,C.value=i.d,D.value=i.c,T.value=i.t)</script>',
'Trophy Case':'<style>body{background:#232}</style><body><script>OS13kReload=()=>{for(t of(this.document.body.innerHTML="",parent.OS13k.Trophies()))this.document.body.innerHTML+=`<div style="display:inline-block;font-family:arial;padding:9;overflow:hidden;text-align:center;background:linear-gradient(#eee,#888);width:120;height:120;margin:9;font-size:18;box-shadow:5px 5px 9px;border:2px solid;border-radius:29px"title="${i=t[0]||`🏆`} ${n=t[2]}\n${g=t[1]}\n${m=t[3]}" \nonclick=parent.OS13k.Speak("${n}")>\n<div style="padding:3;white-space:nowrap;font-size:28;text-shadow:2px 2px 4px">${i}</div><div><b>${n}</b><br><i>${g}</i><br><div style=font-size:14>`+m},OS13kReload()</script>',
'Sticky Note':'<body style=background:#ff8;font-family:cursive;font-size:23 id=b contenteditable=true spellcheck=false><script>b.focus();b.innerHTML=localStorage.OS13kN||"";b.oninput=e=>localStorage.OS13kN=b.innerHTML;OS13kReload=e=>b.innerHTML=localStorage.OS13kN="";</script>',
'Clock':'D=Date(L=(t,e,l,o=-6)=>x.fillRect(-e/2,o,e,l,x.rotate(-a+(a=Math.PI*(2*t-1)))));if(c.title!=D){document.hasFocus()&&OS13k.PlaySeed(6,.1,1,.01);c.title=D;c.style.background="#111";c.width=198;x.translate(99,99);D=D.slice(16,24).split`:`;for(a=i=0;61>i++;L(i/60,2,i%5?3:8,88))x.fillStyle="#fff";L(D[0]%12/12+D[1]/720,6,59);L(D[1]/60,3,85);x.fillStyle="#f00";L(D[2]/60,2,99)}',
'Music Player':'<style>body{background:#111;color:#fff;user-select:none;text-align:center;overflow-x:hidden;white-space:nowrap}</style><div id=N style=font-size:27;font-family:arial>&nbsp;</div><div id=F style=height:9></div><br><button onmousedown=P()>Play</button> <button onmousedown=X&&X.stop(X=0)>Stop</button> <button onmousedown=A()>Load</button> <button onmousedown=R()>Delete</button><br><br>Volume <input type=range id=V> Loop <input type=checkbox id=O checked><br><canvas id=C style=width:350;height:29></canvas><br><select id=S size=9 style=width:350;background:#000;color:#fff><script>OS13k=parent.OS13k,X=E=D=T=0,Y=Q=-1,U=e=>{requestAnimationFrame(U),!--Y&&Q>=0?(l=L[Q],T=0,Q=-1,(X=OS13k.PlayMusic(l.d))?X.gain.gain.value=V.value/99:alert`⚠️ Error!`):Y<-1&&(C.getContext`2d`.drawImage(OS13k.GetAnalyser(),0,0,C.width=32,C.height=32),F.innerText=X?(X.gain.gain.value=V.value/99,d=X.buffer.duration,T+=(e-D)/1e3,X.loop=O.checked?1:T>d?X=0:0,W(T%d)+"/"+W(d)):(N.innerText="ZzFXM Player","")),D=e},B=e=>{for(e in i=S.selectedIndex,S.innerHTML="",Z=0,L=[],localStorage)I(e);L.sort((e,n)=>e.n.localeCompare(n.n)).map(e=>S.innerHTML+="<option>"+e.n),S.selectedIndex=OS13k.Clamp(E?L.findIndex(e=>e.k==E):i,S.length-1,E=0),localStorage.OS13kM=JSON.stringify(K)},I=e=>{if(p=e.split`,`,f=p.shift(),"OS13kMusic"==f.substring(0,10)){n=p[0]?p[0]:"Untitled","U"==f[10]?Z=Math.max(Z,f.substring(11)):K.indexOf(e)<0&&(OS13k.Popup("🎵 New Music<br><b>"+n,n),K.push(e));try{(d=OS13k.StringToMusic(localStorage[e]))&&L.push({d:d,k:e,n:n})}catch(e){}}},P=e=>{X&&X.stop(),Y=2,(Q=S.selectedIndex)<0||(N.innerText=L[Q].n,F.innerText="Loading...")},A=e=>{try{OS13k.StringToMusic(d=prompt`ZzFXM Data`,1),B(localStorage[E=`OS13kMusicU${Z+1},`+prompt`Name`.replace(/,/g,"")]=d)}catch(e){alert`⚠️ Error!`}},R=e=>confirm(`⚠️ Delete ${L[S.selectedIndex].n}?`)&&B(localStorage[L[S.selectedIndex].k]=0),W=e=>(e/60|0)+((e=e%60|0)<=9?":0":":")+e,localStorage["OS13kMusic,OS13k - Depp Loop"]=JSON.stringify([[[,0,77,,,.7,2,.41,,,,,,,,.06],[,0,43,.01,,.3,2,,,,,,,,,.02,.01],[,0,170,.003,,.008,,.97,-35,53,,,,,,.1],[.8,0,270,,,.12,3,1.65,-2,,,,,4.5,,.02],[,0,86,,,,,.7,,,,.5,,6.7,1,.05],[,0,2200,,,.04,3,2,,,800,.02,,4.8,,.01,.1]],[[[1,-1,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33],[3,1,24,,,,,,,,27,,,,,,,,,,,,,,,,27,,,,24,,,,24,,,,,,,,27,,,,,,,,,,,,,,,,24,,24,,24,,,,],[1,-1,21,,,,,,,,,,,,,,,,,,,,,,,,,,,,24,,,,23,,,,,,,,,,,,,,,,,,,,,,,,24,,23,,21,,,,],[,1,21,,,,,,,,,,,,,,,,,,,,,,,,,,,,24,,,,23,,,,,,,,,,,,,,,,,,,,,,,,24,,23,,21,,,,],[5,1,,,34,34,34,,,,,,34,34,,,,,34,,,,34,34,,,,,34,,,,34,,,,34,34,34,,,,,,34,,,,,,34,34,,,34,34,,,,,,,,,34,34],[4,1,,,,,,,24,,,,,,24,,24,,,,24,,,,24,,,,,,,,,,,,,,,,24,,,,,,24,,24,,,,24,,,,24,,,,,,,,,,]]],[0]]),K=localStorage.OS13kM?JSON.parse(localStorage.OS13kM):[],U(B(onunload=e=>X&&X.stop()))</script>',
'Visualizer':'for(x.fillRect(0,0,2e3,2e3),x.fillStyle="#0003",t?x.lineWidth=9:h=[],x.strokeStyle="#fff",i=32;i--;x.beginPath(x.strokeStyle=`hsl(${-99-i*360/32} 99%${9+m/2}%)`,x.stroke()))for(m=199*OS13k.GetAnalyserData(i),j=5;j--;)x.arc(960,540,256+(j+1&2?1:-1)*m,a=2*((2&j)/2-8.5+i)*Math.PI/32,a);x.drawImage(c,-40,-20,2e3,1120)',
'Ziano':'<style>body{background:#111;color:#fff;user-select:none;text-align:center}</style><span id=B></span>🌱 <input oninput=P(0,R()) style=width:240 id=S><p>🔊 <input onchange=R() style=width:99 type=range id=V> 🐇 <input onchange=R() style=width:99 type=range id=L> 🐢<script>OS13k=parent.OS13k,R=e=>{for(onblur(D=[]),i=5;--i;D[i]=OS13k.SeedSamples(S.value,.1+L.value/9,1,0,OS13k.Note(12*i-33)));},P=e=>e<0||A[e]||((A[e]=OS13k.PlaySamples(D[2+e/12|0],2)).detune.value=e%12*100,A[e].gain.gain.value=V.value/50),X=e=>A[e]&&(A[e].gain.gain.linearRampToValueAtTime(V.value/50,t=A[e].context.currentTime+.02),A[e].gain.gain.linearRampToValueAtTime(A[e]=0,t+.1)),onunload=onblur=e=>A.map((e,a)=>X(a)),R(A=[]),onkeydown=e=>document.activeElement==S||P(OS13k.PianoKey(e)),onkeyup=e=>X(OS13k.PianoKey(e))</script>',
'Byte Beat Player':'<style>body{background:#111;color:#fff;user-select:none;text-align:center}</style>ƒ(t) <input id=I value="t&t>>7" title=Function><p>Seconds <input style=width:99 id=L type=number value=30 min=1 max=120> <button onmousedown=P()>►</button> <button onmousedown=A&&A.stop()>◼</button><script>A=0;P=e=>{A&&A.stop();l=(L.value=OS13k.Clamp(L.value,120))* 44100;s=[];try {eval("f=t=>"+ I.value);for(i=0;i<l;s[i]=OS13k.Clamp(f(i++))- .5);A=OS13k.PlaySamples(s,1);} catch(e){}};onunload=e=>A&&A.stop()</script>',
'Bogus Roads Mini':'t?T+=2:T=X=0;c.width=99;X=OS13k.Input(window).mousex*99;for(i=5;i--;(Y>50&&(X-q)**2<30)?(F>OS13k.GetTrophy("Bogus Roads Mini","High Score")&&OS13k.Trophy("🛣️","Bogus Roads Mini","High Score",F),T=0):x.fillRect(X=X<1?1:X>89?89:X,50,6,9))x.fillText(F=5*((j=T-i*14)/70|0)+i,q=45+45*C(F**3),Y=j%70-7,7)',
"Don't Fall":'for(t||(A=B=P=8,a=b=p=0),i=OS13k.Input(window),a=-i.x/2,k=i.y,b-=.006,A-=a,B-=b,r=.2-B/240,P-=r,B+=r,c.width=512,i=3e3;X=63&i,Y=i>>6,i--;x.fillRect(8*X,8*Y,8,8))y=Y/3+B+P,z=X/3+4*(y>>4),G=T(y+z^z-y),M=G>5,A^X|B^Y|!M||(OS13k.PlaySeed(96*G,p+k*k,.3),b=k?p/3:.2,p=k?0:p>1?1:p+G%2/12),y-=P/2,z+=A/3,g=T(y+z^z-y),m=t<32?12+g%8+Y-B:(G^g)+Y-B&31,x.fillStyle=`hsl(${M*G*30+m}deg 99%${50*M+m*(1-S(t/16)**3)/2}%`;x.font=16+16*p+"px a",x.fillText(k?"🙉":"🐵",8*A-8-8*p,8*B),B<48&&OS13k.Trophy([..."🐢🦒🦉🦇🦜🕊🐒🦅"][y=32-y>>5],"Don\'t Fall",16*y+"ft")',
'Bogus Slopes':'i=OS13k.Input(window),t||(T=U=V=F=0,W=[],Y=700,X=-Y),X>0||(x.fillStyle="#ccc8",x.fillRect(0,0,2e3,2e3),x.font="9em\'",x.textAlign="center",x.textBaseline="middle",x.scale(-1,1),F=Math.min(F+.2,Math.min(20+T/5e4,30)),Z=U>1,W.push((60*t|0)%Math.max(9,Z?30:20-T/1e4|0)?{t:"●",x:X,y:Y,c:`hsl(${T} 99%${Z?50:100}%)`}:{t:[..."🌲🌳⭐"][2*Math.random()+(Math.random()<.05)|0],x:-2200,y:79+900*Math.random()}),W=W.filter(t=>(z="⭐"==t.t,x.fillStyle=t.c||R(),x.fillText("●"==t.t||U<1||z?t.t:"🌮",t.x+=F*(z?.7:1),t.y),t.x<99&&("●"==t.t||(Math.hypot(X-t.x,Y-t.y)>99?1:(OS13k.PlaySeed(z?169:Z?22:121),z?U=4:Z?U=U>2?U:2:(F=9,U=-3),0))))),Y+=V=.95*V+.5-1.5*i.mousedown,x.fillText(U>1.5&&4*t%1<.5?"":"🏂🏻",X=Math.max(X-(U*=.99),-960),Y>1e3?(V=0,Y=1e3):Y<99?(V=0,Y=99):Y),x.scale(-1,1),x.textAlign="left",x.fillStyle=R(),x.fillText(s=(T+=F)/500|0,9,99),x.textAlign="right",x.fillStyle=R(255,0,0,9-t),x.fillText(d=OS13k.GetTrophy("Bogus Slopes","High Score"),c.width-9,99),s>99&&OS13k.Trophy("⭐","Bogus Slopes","100!"),X>0&&(OS13k.PlaySeed(370,5),s>d&&OS13k.Trophy("🏂🏻","Bogus Slopes","High Score",s)),Z&&frame%(U>2?10:20)==0&&OS13k.PlaySeed(53,1,1,.01,OS13k.Note(10-Y/100|0)))',
'Shedding Snake':'t||(T=[],S=[],W=32,H=24,X=W>>1,Y=H>>1,Z=50,G=Q=D=0,F=(e,t,i,h,l)=>{x.save(),x.translate((t+.5)*Z,(i+.5)*Z),l&&x.rotate(l*Math.PI/2),h&&x.fillRect(-.5*Z,-.5*Z,Z,Z,x.fillStyle=h),x.restore(x.fillText(e,0,0))},C=(e,t)=>(b=0,S.map((i,h)=>b|=e==h%W&&t==(h/W|0)),T.map(i=>b|=e==i[0]&&t==i[1]),b),P=e=>{for(;C(A=Math.random()*W|0,B=Math.random()*H|0)||!t.length&&A==X;);},P()),s=T.length,h=OS13k.GetTrophy("Shedding Snake","High Score"),s-20||OS13k.Trophy("🍎","Shedding Snake","20 Apples!"),C(X,Y)?G||(OS13k.PlaySeed(G=178,3),s>h&&OS13k.Trophy("🐍","Shedding Snake","High Score",s)):(x.fillRect(0,0,c.width=W*Z,c.height=H*Z),frame%7==0&&(i=OS13k.Input(window),(i.x||i.y)&&(d=i.x>0?3:i.x<0?1:i.y>0?2:0)%2!=D%2&&(D=d),Q&&(Q--,OS13k.PlaySeed(128,.1)),T.push([X,Y]),X-A||B-Y||P(OS13k.PlaySeed(169),T.push([X,Y]),T.map(e=>S[e[0]+e[1]*W]=1),Q=T.length),T.shift(),D%2?X=(X+(D-1?1:-1)+W)%W:Y=(Y+(D?-1:1)+H)%H),x.textAlign="center",x.textBaseline="middle",x.font=Z+"px\'",x.fillStyle="#fff",S.map((e,t)=>F("✖️",t%W,t/W|0,"#ddd")),T.map(e=>F("✖️",e[0],e[1],"#693")),F("🍎",A,B),F("🐸",X,Y,0,D),x.font="90px\'",x.lineWidth=9,x.strokeText(a=T.length?"Score: "+s:"🐍 High Score: "+h,c.width/2,80),x.fillText(a,c.width/2,80))',
};

///////////////////////////////////////////////////////////////////////////////
// html here so it can be compressed better
document.write(`<style>body{opacity:0;margin:0;overflow:hidden;font-family:arial;font-size:22;user-select:none;white-space:nowrap;background:#000;}#menu{display:flex;flex-direction:column;background:#000;}.programMenu{background:linear-gradient(#fff,#888);}#menu, .programMenu{visibility:hidden;position:absolute;z-index:20000;box-shadow:5px 5px 9px;border:2px solid;}.program{font-size:18;height:18;padding:4;}.activeWindow{border:3px solid#aaa;}.desktopIcon{width:99;height:99;padding:9;font-size:15;color:#fff;text-shadow:1px 1px 3px#000; overflow:hidden;text-align:center;white-space:normal;}.desktopIcon:hover{background:linear-gradient(#ff8,#fff);}.desktopIconIcon{color:#000; font-size:36; margin:4; pointer-events:none;}#taskbar{position:absolute;z-index:10000;width:100%;background:linear-gradient(#888,#333);box-shadow:0px 1px 9px;border:2px solid;left:-2;}.taskbarIcon{width:50; height:40; text-shadow:1px 1px 3px#000; overflow:hidden;}.programActive,.taskbarIconActive{background:linear-gradient(#ff8,#fff);}.taskbarIcon:hover{background:linear-gradient(#fff,#44f);}#tray{margin:2;padding-left:9;padding-right:9;color:#fff;background:linear-gradient(#000,#333);border:1px solid;border-radius:6px;text-shadow:1px 1px 3px#000;}.trayIcon{padding:2;}.trayIcon:hover{background:#fff3;}.popup{position:relative;z-index:10000;width:200;padding:8;white-space:normal;text-align:center;background:linear-gradient(#eee,#888);box-shadow:9px 9px 19px;border:2px solid;border-radius:9px;}.trophyIcon{padding:9;font-size:40;text-shadow:2px 2px 4px;white-space:nowrap;}#background{position:absolute;width:100%;height:100%;color:#0003;font-family:impact;font-size:28vw;font-weight:900;position:absolute;}.program, #taskbar, .taskbarIcon, #background, #tray{display:flex;align-items:center;justify-content:center;}</style><div id=background></div><div id=desktop><div id=taskbar><div id=taskbarSpace style=flex:1></div><div id=tray></div></div><div id=popups style=float:right></div><div id=programsMenu style=position:absolute></div><div id=menu></div><div id=desktopIcons style=position:absolute;top:60;display:flex;flex-wrap:wrap><iframe id=windowTemplate style=display:none><style>:host{position:absolute;background:#000;box-shadow:5px 5px 9px;border:3px solid#222;border-radius:6px;overflow:hidden;}.desktopIcon{width:99;height:99;padding:9;font-size:15;color:#fff;text-shadow:1px 1px 3px#000; overflow:hidden;text-align:center;white-space:normal;}.desktopIcon:hover{background:linear-gradient(#ff8,#fff);}.desktopIconIcon{color:#000; font-size:36; margin:4; pointer-events:none;}input, button, span{margin:4;}textarea{padding:9;}span{white-space:nowrap;}.titlebar{height:34;font-size:24;display:flex;align-items:center;white-space:nowrap;background:linear-gradient(#ccc,#444);border-bottom:3px solid;}.titlebarActive{background:linear-gradient(#eee,#88f);}.titlebarActiveSticky{background:linear-gradient(#eee,#f88);}.titlebarSticky{background:linear-gradient(#ccc,#844);}.folder{background:linear-gradient(#888,#333);display:flex;flex-wrap:wrap;align-content:flex-start;overflow-y:auto;}#name{width:100%; overflow:hidden; cursor:grab;}#icon{display:inline;text-shadow:1px 1px 3px#000;margin-left:9;margin-right:9;pointer-events:none;}#frame{width:100%;height:100%;background:#fff;border:none;visibility:hidden;}#codeText{height:199;background:#000;color:#fff;width:100%;resize:none;outline:0;border-top:2px solid;}</style></iframe>`);

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
            iframeCode = programs[program.name],
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