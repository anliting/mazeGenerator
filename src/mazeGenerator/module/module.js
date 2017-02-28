module={}
module.import=function(path){
    module=Object.create(module)
    importScripts(path)
    let result=module.export
    module=Object.getPrototypeOf(module)
    return result
}
