module.repository.UnionFindNode=module.shareImport('UnionFindNode.js')
module.repository.anlitingCppAlgorithm=
    module.shareImport('anlitingCppAlgorithm.js')
;(async()=>{
    let[
        generateAStyleMaze,
        generateBStyleMaze,
    ]=await Promise.all([
        module.shareImport('generateAStyleMaze.js'),
        module.shareImport('generateBStyleMaze.js'),
    ])
    return[
        generateAStyleMaze,
        generateBStyleMaze,
    ]
})()
