x.fillRect(0,0,2e3,2e3)
x.lineWidth=20
for(i=32;i--;)
x.strokeStyle='#fff',///`hsl(${i*30} 99%50%)`,
x.beginPath(),
i ||console.log(OS13k.GetAnalyzer().getContext`2d`.getImageData(i,31,1,1).data[0]),
x.arc(960,540,OS13k.GetAnalyzer().getContext`2d`.getImageData(i,31,1,1).data[0],0,7),
x.stroke()

x.fillStyle=R(255)
x.fillRect(0,0,20,20);