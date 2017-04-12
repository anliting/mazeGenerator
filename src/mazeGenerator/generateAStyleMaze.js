onmessage=e=>{let module=eval(e.data)
    let[
        UnionFindNode,
        cppAlgorithm,
        stream,
    ]=[
        module.import('generateAStyleMaze/UnionFindNode.js'),
        module.import('generateAStyleMaze/cppAlgorithm.js'),
        module.import('generateAStyleMaze/stream.js'),
    ]
    module.onmessage=async m=>{
        [UnionFindNode,cppAlgorithm,stream]=await Promise.all([
            UnionFindNode,cppAlgorithm,stream
        ])
        stream(
            1e3,
            generateAStyleMazeData(...m),
            c=>postMessage({function:'chunk',chunk:c}),
            _=>postMessage({function:'end'})
        )
    }
    function*generateAStyleMazeData(width,height){
        let
            countOfVertices=    width*height,
            countOfEdges=       2*width*height-width-height,
            sorting=            Array(countOfEdges),
            nodes=              Array(countOfVertices)
        for(let i=0;i<countOfVertices;i++)
            nodes[i]=new UnionFindNode
        for(let i=0;i<countOfEdges;i++)
            sorting[i]=i
        sorting=[...cppAlgorithm.random_shuffle(sorting)]
        for(let e of sorting){
            let v,w
            if(e<(width-1)*height){
                v=width*~~(e/(width-1))+e%(width-1)
                w=v+1
            }else{
                e-=(width-1)*height
                v=width*~~(e/width)+e%width
                w=v+width
            }
            if(nodes[v].find()!=nodes[w].find()){
                nodes[v].union(nodes[w])
                yield{v,w}
            }
        }
    }
}
