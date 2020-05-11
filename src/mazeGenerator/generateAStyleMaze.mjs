import UnionFindNode from'./generateAStyleMaze/UnionFindNode.mjs'
import cppAlgorithm from'./generateAStyleMaze/cppAlgorithm.mjs'
import stream from'./generateAStyleMaze/stream.mjs'
onmessage=e=>{
console.log(e.data)
    stream(
        1e3,
        generateAStyleMazeData(...e.data),
        c=>postMessage({function:'chunk',chunk:c}),
        _=>postMessage({function:'end'})
    )
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
