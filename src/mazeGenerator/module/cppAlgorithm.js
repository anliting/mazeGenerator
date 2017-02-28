(()=>{
    function random_shuffle(a){
        a.map((e,i)=>{
            let j=i+Math.floor((a.length-i)*Math.random())
            {let t=a[i];a[i]=a[j];a[j]=t}
        })
    }
    module.export={
        random_shuffle,
    }
})()
