// Don't Fall - by Tomxor

t||(A=B=P=8,a=b=p=0);
i=OS13k.Input(window);
a=-i.x/2;
k=i.y;

b-=6e-3;
A-=a;B-=b;
r=.2-B/240;
P-=r;B+=r;

for(c.width=512,i=3e3;i--;x.fillRect(X*8,Y*8,8,8))
X=i&63,
Y=i>>6,
y=Y/3+B+P,
z=X/3+(y>>4)*4,
G=T(y+z^z-y),
M=G>5,

A^X|B^Y|!M||(
	OS13k.PlaySeed(G*96,p+k*k,.3),
	b=k?p/3:.2,
	p=k?0:p>1?1:p+G%2/12
),

y-=P/2,
z+=A/3,
g=T(y+z^z-y),
m=t<32?12+g%8+Y-B:(G^g)+Y-B&31,

x.fillStyle=`hsl(${M*G*30+m}deg 99%${M*50+m*(1-S(t/16)**3)/2}%`;

x.font=16+p*16+'px a';
x.fillText(k?'🙉':'🐵',A*8-8-p*8,B*8);

B<48&&OS13k.Trophy([...'🐢🦒🦉🦇🦜🕊🐒🦅'][y=32-y>>5],"Dont Fall",y*16+'ft');