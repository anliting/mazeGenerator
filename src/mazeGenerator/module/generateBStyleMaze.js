importScripts('module.js')
let
    UnionFindNode=module.import('UnionFindNode.js'),
    anlitingCppAlgorithm=module.import('anlitingCppAlgorithm.js')
onmessage=e=>{
    let[width,height]=e.data
    postMessage(Array.from(generateBStyleMazeData(width,height)))
}
function generateBStyleMazeData(width,height){
    var
        result=[],
        vertices=[],
        sorting=[],
        i,
        j
    for(i=0;i<width;i++){
        vertices.push([])
        for(j=0;j<height;j++)
            vertices[i].push(new Vertex(i,j))
    }
    for(i=0;i<width;i++)
        for(j=0;j<height;j++)
            sorting.push(vertices[i][j])
    anlitingCppAlgorithm.random_shuffle(sorting)
    sorting.forEach(function(e){
        var
            checklist=[]
        if(0<e.x&&vertices[e.x-1][e.y].value==0)
            checklist.push(vertices[e.x-1][e.y])
        if(e.x<width-1&&vertices[e.x+1][e.y].value==0)
            checklist.push(vertices[e.x+1][e.y])
        if(0<e.y&&vertices[e.x][e.y-1].value==0)
            checklist.push(vertices[e.x][e.y-1])
        if(e.y<height-1&&vertices[e.x][e.y+1].value==0)
            checklist.push(vertices[e.x][e.y+1])
        okToZero()&&zero()
        function okToZero(){
            var i,j
            for(i=0;i<checklist.length;i++)
                for(j=i+1;j<checklist.length;j++)
                    if(checklist[i].unionFindNode.find()==checklist[j].unionFindNode.find())
                        return false
            return true
        }
        function zero(){
            var i
            e.value=0
            for(i=0;i<checklist.length;i++)
                e.unionFindNode.union(checklist[i].unionFindNode)
        }
    })
    vertices[0][0].value=0
    for(i=0;i<width;i++){
        result.push([])
        for(j=0;j<height;j++)
            result[i].push(vertices[i][j].value)
    }
    return result
    function Vertex(x,y){
        this.x=x
        this.y=y
        this.value=1
        this.unionFindNode=new UnionFindNode
    }
}
