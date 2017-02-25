function generateAStyleMaze(width,height,scaleFactor){
    var
        canvas=document.createElement('canvas'),
        context=canvas.getContext('2d'),
        countOfVertices=width*height,
        mazeData=generateAStyleMazeData(width,height),
        i,
        j
    canvas.width=scaleFactor*(2*width+1)
    canvas.height=scaleFactor*(2*height+1)
    context.scale(scaleFactor,scaleFactor)
    context.fillStyle='black'
    context.fillRect(0,0,2*width+1,2*height+1)
    context.fillStyle='white'
    for(i=0;i<width;i++)
        for(j=0;j<height;j++)
            context.fillRect(2*i+1,2*j+1,1,1)
    for(i=0;i<countOfVertices-1;i++)
        context.fillRect(
            vertexIdToXy(mazeData[i].v).x+
                vertexIdToXy(mazeData[i].w).x+1,
            vertexIdToXy(mazeData[i].v).y+
                vertexIdToXy(mazeData[i].w).y+1,
            1,
            1
        )
    return{
        mazeData,
        canvas
    }
    function vertexIdToXy(v){
        return{
            x:v%width,
            y:Math.floor(v/width),
        }
    }
}
function generateAStyleMazeData(width,height){
    var
        countOfVertices=width*height,
        countOfEdges=2*width*height-width-height,
        result=[],
        sorting=new Array(countOfEdges),
        nodes=new Array(countOfVertices),
        i
    for(i=0;i<countOfVertices;i++)
        nodes[i]=new UnionFindNode
    for(i=0;i<countOfEdges;i++)
        sorting[i]=i
    anliting.cpp.algorithm.random_shuffle(sorting)
    sorting.forEach(function(e){
        var
            v,
            w
        if(e<(width-1)*height){
            v=width*Math.floor(e/(width-1))+e%(width-1)
            w=v+1
        }else{
            e-=(width-1)*height
            v=width*Math.floor(e/width)+e%width
            w=v+width
        }
        if(nodes[v].find()!=nodes[w].find()){
            nodes[v].union(nodes[w])
            result.push({
                v,
                w
            })
        }
    })
    return result
}
