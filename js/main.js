'use strict'
var gCanvas;
var gCtx;
var gCurrAction = 'text'


function onInit() {
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    
    console.log('i am connected to js');

}
// renderGallery()
// renderEditor(gMeme)

function onImageClicked(ev, imageId) {
    console.log('ev: ', ev)
    console.log('imageId: ', imageId)
    renderEditor(imageId)

}
//uploads images from gImages and add them with a forEach method
function renderGallery() {
    let strHTML = `
    <div class="gallery-container">
    <h1>Pick an image</h1>
    <section class="images-container">`
    gImages.forEach((img, idx) => {
        let imageId = idx
        strHTML += `<img onclick="onImageClicked(event,${imageId})" src="./img/meme-imgs-square/${idx + 1}.jpg" alt="">`
    })
    strHTML += `</section></div>`
    document.querySelector('.main-container').innerHTML = strHTML
}

function onChangeText(ev) {
    let elText = document.querySelector('input').value
    
    drawText(elText, 50, 50)
}


function renderEditor(imageId) {
    
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
                <input placeholder="Add cool text here" onchange="onChangeText(event)" type="text">
                <button onClick="onFontBigger">text +</button>
                <button onClick="onFontSmaller">text -</button>

                <button onClick="onChangeTextColor">text color</button>
                <button onClick="onChangeStrokeColor">stroke color</button>
                <button onClick="onChangeTextLineUp">to upper line</button>
                <button onClick="onChangeTextLineDown">to bottom line</button>
                <button onClick="onAddNewTextLine">add another line</button>
                <button onClick="onClearCanvas">Clear</button>
                <select class="font">
                <option value="impact">IMPACT</option>
                <option value="font2">font 2</option>
                <option value="font3">font 3</option>
                <option value="font4">font 4</option>
                </select>

            </section>

            </section>
    `
    document.querySelector('.main-container').innerHTML = strHTML
    drawImgFromLocal(imageId)
}

//draws an image on the canvas // still does'nt work when i send an image..weird!!!
function drawImgFromLocal(imageId) {
    var img = new Image()
    // var source = `img/meme-imgs-square/${imageId}.jpg`
    var source = `img/meme-imgs-square/1.jpg`
    console.log('source: ',source)  
    img.src = source
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
    }
}




function draw(ev) {
    // const offsetX = ev.offsetX;
    // const offsetY = ev.offsetY;
    const { offsetX, offsetY } = ev
    switch (gCurrAction) {
        case 'emogi':
            //add emogi
            break;
        case 'text':
            //add text line
            drawText('שלום', offsetX, offsetY);
            break;
    }
}

function drawText(txt, x, y) {
    // gCtx.font = '48px serif';
    // gCtx.fillText(txt, x, y);
    gCtx.textBaseline = 'start';
    gCtx.textAlign = 'center';
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'white';
    gCtx.font = '50px monospace';
    gCtx.fillStyle = 'red';
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}