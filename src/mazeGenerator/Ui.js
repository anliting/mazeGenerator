var generator=module.shareImport('generator.js')
function Ui(){
    this.node=document.createElement('div')
    this.widthInput=createSizeInput()
    this.widthInput.value=32
    this.heightInput=createSizeInput()
    this.heightInput.value=24
    this.scaleFactorInput=createScaleFactorInput()
    this.scaleFactorInput.value=8
    this.outputDiv=createOutputDiv()
    this.node.appendChild(document.createTextNode('Width: '))
    this.node.appendChild(this.widthInput)
    this.node.appendChild(document.createTextNode(' Height: '))
    this.node.appendChild(this.heightInput)
    this.node.appendChild(document.createTextNode(' Scale factor: '))
    this.node.appendChild(this.scaleFactorInput)
    this.node.appendChild(document.createTextNode(' '))
    this.node.appendChild(createButton(this))
    this.node.appendChild(this.outputDiv)
}
function createSizeInput(){
    let n=document.createElement('input')
    n.style.width='64px'
    return n
}
function createScaleFactorInput(){
    let n=document.createElement('input')
    n.style.width='64px'
    return n
}
function createOutputDiv(){
    let n=document.createElement('div')
    n.style.marginTop='8px'
    return n
}
function createButton(ui){
    let n=document.createElement('button')
    n.textContent='Generate'
    n.onclick=async e=>{
        let
            width=+ui.widthInput.value,
            height=+ui.heightInput.value,
            scaleFactor=+ui.scaleFactorInput.value
        if(!(
            0<width&&width==~~width&&
            0<height&&height==~~height&&
            0<scaleFactor
        ))
            return
        n.disabled=true
        generator=await generator
        let res=generator(width,height,scaleFactor)
        ui.outputDiv.innerHTML=''
        ui.outputDiv.appendChild(res.canvas)
        res.once('end',()=>n.disabled=false)
    }
    return n
}
Ui
