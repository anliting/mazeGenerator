onmessage=e=>{let module=eval(e.data)
let
    UnionFindNode=          module.import('UnionFindNode.js'),
    cppAlgorithm=           module.import('cppAlgorithm.js'),
    stream=                 module.import('stream.js')
module.onmessage=async m=>{
    [UnionFindNode,cppAlgorithm,stream]=await Promise.all([
        UnionFindNode,cppAlgorithm,stream
    ])
    stream(
        1e3,
        generateAStyleMazeData.apply(null,m),
        postMessage,
        close
    )
}
function*generateAStyleMazeData(width,height){
    var
        countOfVertices=width*height,
        countOfEdges=2*width*height-width-height,
        sorting=new Array(countOfEdges),
        nodes=new Array(countOfVertices)
    for(let i=0;i<countOfVertices;i++)
        nodes[i]=new UnionFindNode
    for(let i=0;i<countOfEdges;i++)
        sorting[i]=i
    cppAlgorithm.random_shuffle(sorting)
    for(let e of sorting){
        let v,w
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
            yield{v,w}
        }
    }
}
}
