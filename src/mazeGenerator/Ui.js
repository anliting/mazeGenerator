function Ui(){
    this.node=document.createElement('div')
    this.widthInput=createSizeInput()
    this.heightInput=createSizeInput()
    this.scaleFactorInput=createScaleFactorInput()
    this.outputDiv=createOutputDiv()
    this.node.appendChild(document.createTextNode('Width: '))
    this.node.appendChild(this.widthInput)
    this.node.appendChild(document.createTextNode('Height: '))
    this.node.appendChild(this.heightInput)
    this.node.appendChild(document.createTextNode('Scale factor: '))
    this.node.appendChild(this.scaleFactorInput)
    this.node.appendChild(createButton(this))
    this.node.appendChild(this.outputDiv)
}
function createSizeInput(){
    let n=document.createElement('input')
    n.value=16
    n.style.width='64px'
    return n
}
function createScaleFactorInput(){
    let n=document.createElement('input')
    n.value=8
    n.style.width='64px'
    return n
}
function createOutputDiv(){
    let n=document.createElement('div')
    return n
}
function createButton(ui){
    let n=document.createElement('button')
    n.textContent='Generate'
    n.onclick=e=>{
        module.shareImport('generators.js').then(generators=>{
            var
                width=parseInt(ui.widthInput.value,10),
                height=parseInt(ui.heightInput.value,10),
                scaleFactor=parseInt(ui.scaleFactorInput.value,10)
            ui.outputDiv.innerHTML=''
            ui.outputDiv.appendChild(
                generators[0](width,height,scaleFactor)
            )
        })
    }
    return n
}
Ui
