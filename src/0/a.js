var
    select_style=document.getElementById('select_style'),
    input_width=document.getElementById('input_width'),
    input_height=document.getElementById('input_height'),
    input_scaleFactor=document.getElementById('input_scaleFactor'),
    button_generate=document.getElementById('button_generate'),
    div_output=document.getElementById('div_output')
module.shareImport('../mazeGenerator/mazeGenerator.js').then(generators=>{
    button_generate.onclick=e=>{
        var
            width=parseInt(input_width.value,10),
            height=parseInt(input_height.value,10),
            scaleFactor=parseInt(input_scaleFactor.value,10)
        let start=new Date
        div_output.innerHTML=''
        div_output.appendChild(
            generators[select_style.value](width,height,scaleFactor).canvas
        )
        console.log(new Date-start)
    }
})
