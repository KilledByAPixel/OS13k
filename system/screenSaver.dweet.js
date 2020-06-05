if(t==0){
 var win=parent.desktop.children[parent.desktop.children.length-1];

 last_frame=0;
 parent.window.setInterval( // check if window is still active (on focus)
  function(){
    if(last_frame==frame) {
      parent.document.body.style=`transform:rotate3d(0,0,0,0rad)` // reset back to default OS style (cancels rotation effect)
      win.Close();
    }
    last_frame=frame;
  },200
 );

 win.style.opacity='0'; // set as invisible dweet
}
parent.document.body.style=`transform:rotate3d(1,5,2,${t/3}rad)` // rotation effect
