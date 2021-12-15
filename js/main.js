'use strict'
var gCanvas;
var gCtx;
var gCurrAction = 'text'


function onInit() {
    // gCanvas = document.querySelector('#canvas');
    // gCtx = gCanvas.getContext('2d');

    console.log('i am connected to js');

    renderGallery()
}
// renderEditor(gMeme)




function onChangeText(ev) {
    let elText = document.querySelector('input').value
    drawText(elText, 40, 40)
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
                <button onClick="onClearCanvas()">Clear</button>

                <button onClick="onChangeTextColor">text color</button>
                <button onClick="onChangeStrokeColor">stroke color</button>
                <button onClick="onChangeTextLineUp">to upper line</button>
                <button onClick="onChangeTextLineDown">to bottom line</button>
                <button onClick="onAddNewTextLine">add another line</button>
                <button style="color:green"> <a href="#" onclick="onDownloadImg(this)" download="my-img.jpg">Download</a></button>
                <button  onClick="onInit()">RESTART</button>
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
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    drawImgFromLocal(imageId)
}




function drawText(txt, x, y) {
    // gCtx.font = '48px serif';
    // gCtx.fillText(txt, x, y);
    gCtx.textBaseline = 'start';
    gCtx.textAlign = 'start';
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'white';
    gCtx.font = '50px monospace';
    gCtx.fillStyle = 'red';
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function createMeme(imageId) {
    var meme =
    {
        selectedImgId: imageId,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'I sometimes eat Falafel',
                txtSize: 20,
                font: 'IMPACT',
                align: 'left',
                color: 'white',
                stroke: 'black'
            }
        ]
    }
}
console.log('I sometimes eat Falafel'.length);
// chooses the image and shows it in gallery - need to create a new meme
function onImageClicked(ev, imageId) {
    renderEditor(imageId)
    createMeme(imageId)
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
//draws an image on the canvas 
function drawImgFromLocal(imageId) {
    var img = new Image()
    // var source = `img/meme-imgs-square/${imageId}.jpg`
    var source = `img/meme-imgs-square/${imageId + 1}.jpg`
    console.log('source: ', source)
    img.src = source
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
    }
}
// downloads the meme
function onDownloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}
//clears the canvas
function onClearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}