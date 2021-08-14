I=OS13k.Input(window);
(I.keypress[82]||!t)&&(T=U=V=F=0,W=[],Y=700,X=-Y)
if(X>0)return
x.fillStyle='#ccc8'
x.fillRect(0,0,2e3,2e3)
x.font='9em"'
x.textAlign='center'
x.textBaseline='middle'
x.scale(-1,1)
F=Math.min(F+.2,Math.min(20+T/5e4,30))
Z=U>1
W.push((t*60|0)%Math.max(9,Z?30:20-T/1e4|0)?{t:'●',x:X,y:Y,c:`hsl(${T} 99%${Z?50:100}%)`}:{t:[...'🌲🌳⭐'][Math.random()*2+(Math.random()<.05)|0],x:-2200,y:79+Math.random()*900})
W=W.filter(w=>(z=w.t=='⭐',x.fillStyle=w.c||R(),x.fillText(w.t=='●'||U<1||z?w.t:'🌮',w.x+=F*(z?.7:1),w.y),w.x<99&&(w.t=='●'||(Math.hypot(X-w.x,Y-w.y)>99?1:(OS13k.PlaySeed(z?169:Z?22:121),z?U=4:Z?(U=U>2?U:2):(F=9,U=-3),0)))))
Y+=(V=V*.95+.5-I.mousedown*1.5)
x.fillText(U>1.5&&t*4%1<.5?'':'🏂🏻',X=Math.max(X-(U*=.99),-960),Y>1e3?(V=0,Y=1e3):Y<99?(V=0,Y=99):Y)
x.scale(-1,1);
x.textAlign='left'
x.fillStyle=R()
x.fillText(s=(T+=F)/500|0,9,99)
x.textAlign='right'
x.fillStyle=R(255,0,0,9-t)
x.fillText(d=OS13k.GetTrophy('Bogus Slopes','High Score'),c.width-9,99)
s>99&&OS13k.Trophy('⭐','Bogus Slopes','100!')
X>0&&(OS13k.PlaySeed(370,5),s>d&&OS13k.Trophy('🏂🏻','Bogus Slopes','High Score',s))
Z&&frame%(U>2?10:20)==0&&OS13k.PlaySeed(53,1,1,.01,OS13k.Note(10-Y/100|0))
// by KilledByAPixel