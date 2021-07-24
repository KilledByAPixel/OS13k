// Tiny Sandbox ⌛ Select with mouse wheel... 
// 1 🌊 Water
// 2 ⚡️ Lightning Eraser
// 3 ⛈️ Rain Storm
// 4 🧱 Wall
// 5 ⌛️ Sand
// 6 🌱 Vines
// 7 🌪️ Sand Storm
// Right Click 🧼 Erase 

for(w=c.width=128,i=9216;--i;v==2|v&3*!T[S=i+(i*t^i)%3-1+(v>1|S&1?v&2?-w:w:0)]?T[i]=(T[S]=v)&2?v-2:0:onmousemove=e=>e.buttons?T[w*(e.y*(w/=innerWidth)|0)+e.x*w|0]=e.buttons==1?P:0:0)x.fillRect(i%w,i>>7,1,(v=T[i])/5)
t?onwheel=e=>P=(P+(e.deltaY<0?1:7)-1)%8+1:P=1
x.fillText(P,0,9)
// by KilledByAPixel https://www.dwitter.net/d/12312313344