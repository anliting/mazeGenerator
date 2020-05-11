import EventEmitter from'../../lib/EventEmitter/main/EventEmitter.mjs'
import doe from'../../lib/doe/main/doe.mjs'
function generator(width,height,scaleFactor){
    let
        canvas=doe.canvas({
            width:scaleFactor*(2*width+1),
            height:scaleFactor*(2*height+1),
        }),
        context=canvas.getContext('2d'),
        countOfVertices=width*height,
        res=new EventEmitter,
        worker=new Worker('../../mazeGenerator/generateAStyleMaze.mjs',{type:'module'})
    worker.postMessage([width,height])
    context.scale(scaleFactor,scaleFactor)
    context.fillStyle='black'
    context.fillRect(0,0,2*width+1,2*height+1)
    context.fillStyle='white'
    for(let i=0;i<width;i++)
        for(let j=0;j<height;j++)
            context.fillRect(2*i+1,2*j+1,1,1)
    worker.onmessage=e=>{
        let doc=e.data
        if(doc.function=='chunk')
            for(let e of doc.chunk){
                let a=vertexIdToXy(e.v),b=vertexIdToXy(e.w)
                context.fillRect(a.x+b.x+1,a.y+b.y+1,1,1)
            }
        if(doc.function=='end'){
            worker.terminate()
            res.emit('end')
        }
    }
    res.canvas=canvas
    return res
    function vertexIdToXy(v){
        return{
            x:v%width,
            y:~~(v/width),
        }
    }
}
export default generator
