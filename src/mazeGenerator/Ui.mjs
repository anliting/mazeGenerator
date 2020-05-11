import doe from'../../lib/doe/main/doe.mjs'
import generator from'./generator.mjs'
function Ui(){
    this.widthInput=createSizeInput()
    this.widthInput.value=32
    this.heightInput=createSizeInput()
    this.heightInput.value=24
    this.scaleFactorInput=createScaleFactorInput()
    this.scaleFactorInput.value=8
    this.outputDiv=createOutputDiv()
    doe(this.node=doe.div(),
        'Width: ',          this.widthInput,
        ' Height: ',        this.heightInput,
        ' Scale factor: ',  this.scaleFactorInput,
        ' ',
        createButton(this),
        this.outputDiv,
    )
}
function createSizeInput(){
    return doe.input(n=>{n.style.width='64px'})
}
function createScaleFactorInput(){
    return doe.input(n=>{n.style.width='64px'})
}
function createOutputDiv(){
    return doe.div(n=>{n.style.marginTop='8px'})
}
function createButton(ui){
    return doe.button({textContent:'Generate',async onclick(e){
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
        this.disabled=true
        let res=generator(width,height,scaleFactor)
        doe(ui.outputDiv,{innerHTML:''},res.canvas)
        res.once('end',()=>this.disabled=false)
    }})
}
export default Ui
