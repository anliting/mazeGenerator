export default(size,iterator,flush,end)=>{
    let buffer=[]
    for(let v of iterator){
        buffer.push(v)
        if(buffer.length==size){
            flush(buffer)
            buffer=[]
        }
    }
    flush(buffer)
    end()
}
