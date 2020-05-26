# OS13k
A tiny pseudo operating system in only 13 kilobytes

## Please keep this project confidential!

# [Live Demo](https://3d2k.com/js/os13k)
# [Trello Board](https://trello.com/b/1PNeOZfM/os13k)

OS13k Icons

Add an icon config to desktopLayout to create a new program
- example {name:'Test', icon:'✌️', src:'test.html'}

Top level icons will open on start if they have the flag 'open' (for faster iteration)
- example {name:'Test', icon:'✌️', src:'test.html', open}

More icon settings
- width and height of window
- hideWhenClosed - hides the program window instead of closing it
- allowMultiple - allows multiple copies of the program to open

OS13k System Calls
- The function OS13kInit is called on child frames when opened
- To acces OS13k features, use the OS13k object
- ZzFx sounds can played by calling zzfx, no need to include anything
- OS13k.CreateShader and OS13k.RenderShader handle shadertoy compatible webgl shader code
- OS13k.Medal will register a medal for your game as complete
- OS13k.GetKeyDirection handles getting and {x, y} position from a keyCode
- OS13k.PlaySamples can play an audio sample buffer directly
