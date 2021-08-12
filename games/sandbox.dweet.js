// Tiny Sandbox ⛱️ - Select with mouse wheel
// Left click to place - Right click to remove

for(w=c.width=128,i=9216;--i;v==2|v&3*!T[S=i+(i*t^i)%3-1+(v>1|S&1?v&2?-w:w:0)]?T[i]=(T[S]=v)&2?v-2:0:0)x.fillRect(i%w,i>>7,1,(v=T[i])/5)

// os13k input
I = OS13k.Input(window)
P = t ? I.wheel ? (P+(I.wheel<0?1:6))%7 : P : 4
if (I.mousedown[0] || I.mousedown[2])
    T[w*(I.mousey*innerHeight*(w/=innerWidth)|0)+I.mousex*innerWidth*w|0] = I.mousedown[0] ? P+1 : 0

x.fillText([
'🌊 Water',
'⚡️ Lightning Eraser',
'⛈️ Rain Storm',
'🧱 Wall',
'⌛️ Sand',
'🌱 Vines',
'🌪️ Sand Storm'
][P],0,10)

// by KilledByAPixel https://www.dwitter.net/d/12312313344