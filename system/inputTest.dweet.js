i = OS13k.Input(window)
c.width |= 0
x.font = '4em"'
x.fillText('x: ' + i.x + ' y: ' + i.y, X=h=79, Y=h)
x.fillText('keypress:'   + i.keypress.map((k,i)=>k?i:'').filter(k=>k).join`,`,X,Y+=h)
x.fillText('keydown:'    + i.keydown.map((k,i)=>k?i:'').filter(k=>k).join`,`,X,Y+=h)
x.fillText('mousex: '    + i.mousex + ' mousey: ' + i.mousey,X,Y+=h)
x.fillText('mousepress:' + i.mousepress.map((k,i)=>k>0?i:'').filter(k=>k!=='').join`,`,X,Y+=h)
x.fillText('mousedown:'  + i.mousedown.map((k,i)=>k>0?i:'').filter(k=>k!=='').join`,`,X,Y+=h)