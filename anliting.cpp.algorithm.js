anliting=window.anliting||{}
anliting.cpp=anliting.cpp||{}
anliting.cpp.algorithm={}
anliting.cpp.algorithm.random_shuffle=random_shuffle
anliting.cpp.algorithm.swap=swap
function random_shuffle(a){
    a.forEach(function(e,i){
        var j=Math.floor((a.length-i)*Math.random())
        a[i]=swap(a[j],a[j]=a[i])
    })
}
function swap(x){
    return x
}
