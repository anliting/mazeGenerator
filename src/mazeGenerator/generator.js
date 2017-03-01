function generator(width,height,scaleFactor){
    let
        canvas=document.createElement('canvas'),
        context=canvas.getContext('2d'),
        countOfVertices=width*height
    canvas.width=scaleFactor*(2*width+1)
    canvas.height=scaleFactor*(2*height+1)
    context.scale(scaleFactor,scaleFactor)
    context.fillStyle='black'
    context.fillRect(0,0,2*width+1,2*height+1)
    context.fillStyle='white'
    for(let i=0;i<width;i++)
        for(let j=0;j<height;j++)
            context.fillRect(2*i+1,2*j+1,1,1)
    let worker=module.worker('generateAStyleMaze.js')
    worker.postMessage([width,height])
    worker.onmessage=e=>{
        let data=e.data
        for(let e of data)
            context.fillRect(
                vertexIdToXy(e.v).x+vertexIdToXy(e.w).x+1,
                vertexIdToXy(e.v).y+vertexIdToXy(e.w).y+1,
                1,
                1
            )
    }
    return canvas
    function vertexIdToXy(v){
        return{
            x:v%width,
            y:Math.floor(v/width),
        }
    }
}
generator
