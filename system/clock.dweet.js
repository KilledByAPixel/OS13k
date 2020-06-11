c.width|=c.style.filter='sepia()invert('
x.translate(99,99)
z=Math.PI*3
x.arc(0,0,90,-z/360,7)
x.setLineDash([z/5,z*4/5])
x.lineWidth=5
x.stroke()
z=Math.PI*15
x.setLineDash([z/9,z*8/9])
x.lineWidth=9
x.stroke()
L=(P,W,L)=>x.rotate(A=Math.PI*(1-2*P),x.fillRect(-W/2,-6,W,L,x.rotate(-A)))
c.title=D=new Date()
L(D.getSeconds()/60,2,99)
L(D.getMinutes()/60,3,85)
L(D.getHours()%12/12,6,59)