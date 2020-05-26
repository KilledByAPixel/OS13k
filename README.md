# OS13k
A tiny pseudo operating system in only 13 kilobytes

## Please keep this project confidential!

# [Live Demo](https://3d2k.com/js/os13k)
# [Trello Board](https://trello.com/b/1PNeOZfM/os13k)

## Programming Info

Add an icon config to desktopLayout to create a new program
- example {name:'Test', icon:'✌️', src:'test.html'}

Top level icons will open on start if they have the flag 'open' (for faster iteration)
- example {src:'test.html', open:1}

More icon settings
- width and height of window
- hideWhenClosed - hides the window instead of closing it
- allowMultiple - allows multiple copies of the window to open

OS13k System Calls
- The function OS13kInit is called on child frames when opened
- To acces OS13k features, use the OS13k object
- ZzFx sounds can played by calling zzfx, volume is controlled by the system
- OS13k.CreateShader(canvas, code) to create a shadertoy compatible webgl shader
- OS13k.RenderShader(canvas, shaderProgram, time=0) to render a shader
- OS13k.Medal will register a medal for your game as complete
- OS13k.GetKeyDirection(key) handles getting and {x, y} position from a keyCode
- OS13k.PlaySamples(samples) can play an audio sample buffer directly
- OS13k.Random(max=1, min=0) to get a seeded rand, OS13k.randomSeed to set the seed
