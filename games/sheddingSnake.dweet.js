// original 1k demo by Niklas Berg https://js1024.fun/demos/2020#24
// OS13k remaster by KilledByAPixel

if(!t) // init
{
  T = []   // tail
  S = []   // skin
  W = 32   // screen width
  H = 24   // screen height
  X = W>>1 // head X pos
  Y = H>>1 // head Y pos
  Z = 50   // render scale
  G =      // game over
  Q =      // tail sheed sound
  D = 0    // direction
  
  F=(T,X,Y,C,D)=> // fill text
  {
  	x.save()
    x.translate((X+.5)*Z,(Y+.5)*Z)
    D && x.rotate(D*Math.PI/2)
    C && x.fillRect((-.5)*Z,(-.5)*Z,Z,Z,x.fillStyle=C)
  	x.restore(x.fillText(T,0,0))
  }

  C = (X,Y)=> // check if a place is unsafe
  {
	b = 0
    S.map((S,i)=> b |= X==i%W && Y==(i/W|0)) // check skin
    T.map(T=> b |= X==T[0] && Y==T[1])       // check tail
    return b
  }

  P = e=> // spawn apple
  {
  	while(C(A=Math.random()*W|0, B=Math.random()*H|0)  // prevent apple on tail or skin
        || (!t.length && A == X));                     // prevent first apple on same X
  }
  
  P() // spawn first apple
}

s = T.length // get score
h = OS13k.GetTrophy('Shedding Snake','High Score') // get high score
s-20 || OS13k.Trophy('🍎','Shedding Snake','20 Apples!')

if (C(X,Y))
{
  G || (OS13k.PlaySeed(G=178,3),  // game over sound
    s>h && OS13k.Trophy('🐍','Shedding Snake','High Score',s)) // new high score
}
else 
{
    // clear
    x.fillRect(0, 0, c.width=W*Z, c.height=H*Z);

    if (frame%7==0) // update movement
    {
        // update input
        i = OS13k.Input(window); // get input
        (i.x||i.y) && (d=i.x>0?3:i.x<0?1:i.y>0?2:0)%2 != D%2 && (D=d)

        Q && (Q--,OS13k.PlaySeed(128,.1))
        T.push([X,Y])                   // add to tail
        X-A || B-Y ||                   // get apple
        P(OS13k.PlaySeed(169),          // pickup sound
        T.push([X,Y]),                  // add to tail
        T.map(T=>S[T[0]+T[1]*W] = 1),   // add skin
        Q = T.length)                   // set skin drop sound count
        T.shift()                       // remove end of tail
        D%2 ?                           // check direction
        X = (X+(D-1?1:-1)+W)%W          // x move
        : Y = (Y+(D?-1:1)+H)%H          // y move
    }

    // draw everything
    x.textAlign = 'center'
    x.textBaseline = 'middle'
    x.font = Z + 'px"' 
    x.fillStyle = '#fff'
    S.map((S,i)=>F('✖️', i%W, i/W|0, '#ddd')) // skin
    T.map(T=>F('✖️', T[0], T[1], '#693'))     // tail
    F('🍎', A, B)                             // apple
    F('🐸', X, Y, 0, D)                       // head

    // header text
    x.font = '90px"'
    x.lineWidth = 9
    x.strokeText(a = T.length? 'Score: ' + s : '🐍 High Score: ' + h, c.width/2, 80)
    x.fillText(a, c.width/2, 80)
}