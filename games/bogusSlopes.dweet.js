i=OS13k.Input(window);
(!t||i.keypress[32])&&(T=U=V=F=0,W=[],Y=540,X=-700)
if(X>0)return
x.fillStyle='#ddd8'
x.fillRect(0,0,2e3,2e3)
x.font='9em"'
x.textAlign='center'
x.textBaseline='middle'
x.scale(-1,1)
F=Math.min(F+.2,19+T/1e4)
W.push((t*60|0)%Math.max(9,19-T/1e4|0)?{t:'●',x:X,y:Y,c:`hsl(${T} 99%${U<-1?50:100}%)`}:{t:[...'🌲🌳⭐'][Math.random()*2+(Math.random()<.1)|0],x:-2200,y:79+Math.random()*900})
W=W.filter(w=>(x.fillStyle=w.c||R(),x.fillText(w.t,w.x+=F*(w.t=='⭐'?.7:1),w.y),w.x<99&&(w.t=='●'||(Math.hypot(X-w.x,Y-w.y)>99?1:(OS13k.PlaySeed(w.t=='⭐'?169:121),U=w.t=='⭐'?-9:F=9,0)))))
x.fillText('🏂🏻',X=Math.max(X+(U*=.98),-1800),Y=OS13k.Clamp(Y+(V=V*.95-i.y),1e3,99))
x.scale(-1,1);
x.textAlign='left'
x.fillStyle=R()
x.fillText(s=(T+=F)/1e3|0,9,99)
x.textAlign='right'
x.fillStyle=R(255,0,0,9-t)
x.fillText(d=OS13k.GetTrophy('Bogus Slopes','High Score'),c.width-9,99)
s>99&&OS13k.Trophy('⭐','Bogus Slopes','100!')
X>0&&(OS13k.PlaySeed(370,5),s>d&&OS13k.Trophy('🏂🏻','Bogus Slopes','High Score',s))