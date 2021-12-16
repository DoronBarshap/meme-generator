'use strict'

// renders the editor only
function renderEditor() {
    // let imageId = gMeme.selectedImgId
    let strHTML = `
    <section class="edit-screen">
                <nav>
                <button>text size</button>
                <button>text color</button>
                <button>blah blah</button>
                </nav>
                <canvas id="canvas" height="350" width="350" style="border: 1px solid black">>
                </canvas>
                <section class="control-panel">              
                <input class="textInput" placeholder="Add cool text here" onchange="onAddText(event)" type="text">
                <button onClick="onResizeFont(1)">A+</button>
                <button onClick="onResizeFont(-1)">A-</button>
                <button onClick="onClearCanvas()">Clear</button>
                <button onClick="onChangeTextAlign('right')">right</button>
                <button onClick="onChangeTextAlign('center')">center</button>
                <button onClick="onChangeTextAlign('left')">left</button>
                <input type="color" value="#ffffff" onChange="onChangeTxtColor(event)">textColor</input>
                <input type="color" onChange="onChangeStrokeColor(event)">strokeColor</input>
                <button onClick="onChangeTextLine(-1)">to upper line</button>
                <button onClick="onChangeTextLine(1)">to bottom line</button>
                <button onClick="onAddNewTextLine()">add another line</button>
                <button onClick="onDeleteLine()">Delete line</button>
                <button> <a href="#" onclick="onDownloadImg(this)" download="my-img.jpg">Download</a></button>
                <button  onClick="onInit()">RESTART</button>
                <select onChange="onChangeFont(event)"  class="font">
                <option value="impact">IMPACT</option>
                <option value="font2">font 2</option>
                <option value="font3">font 3</option>
                <option value="font4">font 4</option>
                </select>              
            </section>
            </section>
    `
    document.querySelector('.main-container').innerHTML = strHTML  
}


