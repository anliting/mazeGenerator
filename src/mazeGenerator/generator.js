{
    var moduleNode=`https://cdn.rawgit.com/anliting/module/${
        '0e94e04505484aaf3b367423b36cf426a4242006'
    }/node`
    if(!module.repository.npm)
        module.repository.npm={}
    if(!module.repository.npm.events)
        module.repository.npm.events=module.importByPath(
            `${moduleNode}/events.js`
        )
}
module.repository.npm.events.then(EventEmmiter=>{
    function generator(width,height,scaleFactor){
        let
            canvas=document.createElement('canvas'),
            context=canvas.getContext('2d'),
            countOfVertices=width*height,
            res=new EventEmmiter,
            worker=module.worker('generateAStyleMaze.js')
        worker.postMessage([width,height])
        canvas.width=scaleFactor*(2*width+1)
        canvas.height=scaleFactor*(2*height+1)
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
    return generator
})
