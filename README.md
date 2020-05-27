# Welcome to OS13k!

OS13k is a tiny pseudo operating system designed for a JS13k community project. It includes support for webgl shaders, zzfx, dweets, medals, fullscreen, and more. The OS (incuding zzfx and shader support) is only about 4k when zipped.


## Please keep this project confidential!

# [Live Demo](https://killedbyapixel.github.io/OS13k)
# [Trello Board](https://trello.com/b/1PNeOZfM/os13k)

## Programming Info

Add an icon config to desktopLayout to create a new program
- example {name:'Test', icon:'✌️', src:'test.html'}

Top level icons will open on start if they have the flag 'open' (for faster iteration)
- example {src:'test.html', open:1}

More icon settings
- width and height of window
- author - name of creator
- hideWhenClosed - hides the window instead of closing it
- allowMultiple - allows multiple copies of the window to open

OS13k System Calls
- The function OS13kInit is called on child frames when opened
- To acces OS13k features, use the OS13k object
- ZzFx sounds can played by calling zzfx, volume is controlled by the system
- OS13k.CreateShader(canvas, shaderCode) to create a shadertoy compatible webgl shader
- OS13k.RenderShader(canvas, shaderProgram, time=0) to render a shader
- OS13k.CreateDweet(document, dwitterCode) to set up a dwitter program
- OS13k.Medal will register a medal for your game as complete
- OS13k.GetKeyDirection(key) handles getting and {x, y} position from a keyCode
- OS13k.PlaySamples(samples) can play an audio sample buffer directly
- OS13k.Random(max=1, min=0) to get a seeded rand, OS13k.randomSeed to set the seed
