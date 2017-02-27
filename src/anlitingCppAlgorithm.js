function random_shuffle(a){
    a.map((e,i)=>{
        let j=Math.floor((a.length-i)*Math.random())
        a[i]=swap(a[j],a[j]=a[i])
    })
}
function swap(x){
    return x
}
;({
    random_shuffle,
    swap,
})
