// by KilledByAPixel based on https://www.dwitter.net/d/21963

I=OS13k.Input(window)
x.fillRect(0,0,c.width=300,300)
for(F=T,t&&!I.keypress[82]?T+=P:P=Y=V=T=Q=1,i=9;i--?H=R:0;x.fillRect(j*47-T,R=99-C(j*j)*15,44,1e3))j=i+T/47|0,x.fillStyle=`hsl(${j*10},90%,50%)`
x[f='fillText'](j,3,9)
Q+=V?P/29:P/6
Y-=V-=.06
Y>H?Y+(V=0)>H+3?(P&&OS13k.PlaySeed(100,2),P=0,OS13k.Trophy('🏃','Marathon','High Score',j)):(Y=H,V+=I.mousepress[0]?(OS13k.PlaySeed(19,.1),2*P):0):0
for(j=4,l=(r,a)=>x.lineTo(X+=r*C(a),y+=r*S(a));j--;x.strokeStyle=`hsl(${j*30+t*500},99%,80%)`,x.beginPath(x.stroke()))i=j%4,q=i<2,y=Y-30,n=Q,l(X=27,7),l(q?3:7,2),l(r=4-q,a=C(n+=3*i)-5+q),l(r,a-(2*q-1)*(C(n-2)+1))
j>99&&OS13k.Trophy('🎖️','Marathon','100!')
if((F/47|0)-(T/47|0))OS13k.PlaySeed(3,0)