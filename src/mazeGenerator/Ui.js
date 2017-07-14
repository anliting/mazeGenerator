;(async()=>{
    if(!module.repository.althea){
        let
            altheaRepoUrl='https://gitcdn.link/cdn/anliting/althea/9b7cb54f880eae43d4567909b18b17f1f4442b5c/src/AltheaServer/HttpServer/files/lib/repository.static.js',
            altheaRepo=await module.importByPath(altheaRepoUrl,{mode:1})
        module.repository.althea=altheaRepo.althea
    }
    let
        generator=module.shareImport('generator.js'),
        dom=await module.repository.althea.dom
    function Ui(){
        this.widthInput=createSizeInput()
        this.widthInput.value=32
        this.heightInput=createSizeInput()
        this.heightInput.value=24
        this.scaleFactorInput=createScaleFactorInput()
        this.scaleFactorInput.value=8
        this.outputDiv=createOutputDiv()
        dom(this.node=dom('div'),
            'Width: ',          this.widthInput,
            ' Height: ',        this.heightInput,
            ' Scale factor: ',  this.scaleFactorInput,
            ' ',
            createButton(this),
            this.outputDiv,
        )
    }
    function createSizeInput(){
        return dom('input',n=>{n.style.width='64px'})
    }
    function createScaleFactorInput(){
        return dom('input',n=>{n.style.width='64px'})
    }
    function createOutputDiv(){
        return dom('div',n=>{n.style.marginTop='8px'})
    }
    function createButton(ui){
        return dom('button',{textContent:'Generate',async onclick(e){
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
            generator=await generator
            let res=generator(width,height,scaleFactor)
            ui.outputDiv.innerHTML=''
            ui.outputDiv.appendChild(res.canvas)
            res.once('end',()=>this.disabled=false)
        }})
    }
    return Ui
})()
