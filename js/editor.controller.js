'use strict'

// renders the editor only
function renderEditor() {
    
    // let imageId = gMeme.selectedImgId
    let strHTML = `
    <section class="edit-screen">
                <nav>
                <button>button 1</button>
                <button>button 2</button>
                <button>button 3</button>
                </nav>
                <canvas id="canvas" height="350" width="350" style="border: 1px solid black">>
                </canvas>
                <section class="control-panel">  
                <div>          
                <input class="textInput" placeholder="Add cool text here" onchange="onAddText(event)" type="text">
                </div>
                <div>
                <button onClick="onResizeFont(1)">A+</button>
                <span class="font-size">${gCurrSettings.txtSize}</span>
                <button onClick="onResizeFont(-1)">A-</button>
                </div>  
                <div>         
                <button onClick="onChangeTextAlign('left')">left</button>
                <button onClick="onChangeTextAlign('center')">center</button>
                <button onClick="onChangeTextAlign('right')">right</button>
                </div>
                <div>
                <input type="color" value="#ffffff" onChange="onChangeTxtColor(event)">textColor</input>
                </div>
                <div>
                <input type="color" onChange="onChangeStrokeColor(event)">strokeColor</input>
                </div>
                <div>
                <button class="go-line-up">line up</button>
                <button class="add-another-text-line">add line</button>
                <button class="go-line-down">line down</button>
                </div>
                <div>
                <button class="delete-last-line">Delete last line</button>
                <button> <a href="#" onclick="onDownloadImg(this)" download="my-img.jpg">Download</a></button>
                <button onClick="onClearCanvas()">Clear</button>
                </div>
                <div>
                <button class="restart">RESTART</button>
                <select class="font">
                <option value="impact">IMPACT</option>
                <option value="Verdana">Verdana</option>
                <option value="Cursive">Cursive</option>
                <option value="Trebuchet MS">Trebuchet MS</option>
                </select>  
                </div>           
            </section>
            </section>
    `
    document.querySelector('.main-container').innerHTML = strHTML  
    addListeners()
}

function addListeners(){
    
    document.querySelector('.go-line-down').addEventListener('click',()=>{
        onChangeTextLine('down')
    })
    document.querySelector('.go-line-up').addEventListener('click',()=>{
        onChangeTextLine('up')
    })
    document.querySelector('select').addEventListener('change',(ev)=>{
        onChangeFont(ev.target.value)
    })
    document.querySelector('.restart').addEventListener('click',()=>{
        onInit()
    })
    document.querySelector('.delete-last-line').addEventListener('click',()=>{
        onDeleteLastLine(this)
    })
    document.querySelector('.add-another-text-line').addEventListener('click',()=>{
       console.log('on add text line');
        onAddNewTextLine()
    })

}

