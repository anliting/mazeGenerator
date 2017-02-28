function generateBStyleMaze(width,height,scaleFactor){
    var
        canvas=document.createElement('canvas'),
        context=canvas.getContext('2d')
    canvas.width=scaleFactor*(width+2)
    canvas.height=scaleFactor*(height+2)
    context.scale(scaleFactor,scaleFactor)
    context.fillStyle='black'
    context.fillRect(0,0,width+2,height+2)
    context.fillStyle='white'
    let worker=
        new Worker(`${module.pathPrefix}module/generateBStyleMaze.js`)
    worker.postMessage([width,height])
    worker.onmessage=e=>{
        for(let i=0;i<width;i++)
            for(let j=0;j<height;j++)
                if(e.data[i][j]==0)
                    context.fillRect(
                        i+1,
                        j+1,
                        1,
                        1
                    )
        worker.terminate()
    }
    return canvas
}
generateBStyleMaze
