'use strict'
var gMeme = null
var gCanvas;
var gCtx;
// var gCurrAction = 'text'
var gImages = [
    { id: 1, url: './img/meme-imgs-square/1.jpg', keywords: ['funny', 'tramp'] },
    { id: 2, url: './img/meme-imgs-square/2.jpg', keywords: ['funny', 'tramp'] },
    { id: 3, url: './img/meme-imgs-square/3.jpg', keywords: ['funny', 'tramp'] },
    { id: 4, url: './img/meme-imgs-square/4.jpg', keywords: ['funny', 'tramp'] },
    { id: 5, url: './img/meme-imgs-square/5.jpg', keywords: ['funny', 'tramp'] },
    { id: 6, url: './img/meme-imgs-square/6.jpg', keywords: ['funny', 'tramp'] },
    { id: 7, url: './img/meme-imgs-square/7.jpg', keywords: ['funny', 'tramp'] },
    { id: 8, url: './img/meme-imgs-square/8.jpg', keywords: ['romantic', 'dogs'] }
]
var gCurrSettings = {
    imageId : null,
    fontFamily: 'impact',
    txtSize: 20,
    txtColor: 'white',
    txtStrokeColor: 'black',
    currLineIdx: 0,
    txtAlign: 'left'
}

//TODO :
// replace font size with a slider
// add 3 more fonts
// add align right-center-left support
// clear - to clear drawings, and leave the image
// add text input on canvas
// making it rtl ???
// save to an array.
// add meme.service, mime.storage, use the meme controller, 



function onInit() {
    renderGallery()
    
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

// chooses the image and shows it in the editor and creates the gMeme variable
function onImageClicked(ev, imageId) {
    gCurrSettings.imageId = imageId
    gMeme = createMeme(gCurrSettings)
    renderMeme(gMeme)
    console.log('gMeme: ', gMeme)

}

function createMeme(gCurrSettings) {
    var meme =
    {
        selectedImgId: gCurrSettings.imageId,
        selectedLineIdx: gCurrSettings.currLineIdx,
        lines: [
            {
                txt: '',
                txtSize: gCurrSettings.txtSize,
                font: gCurrSettings.fontFamily,
                align: gCurrSettings.txtAlign,
                txtColor: gCurrSettings.txtColor,
                stroke: gCurrSettings.txtStrokeColor
            }
        ]
    }
    return meme
}

function renderMeme(gmeme) {
    let imageId = gMeme.selectedImgId
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
               
                <input placeholder="Add cool text here" onchange="onAddText(event)" type="text">
                <button onClick="onResizeFont(1)">text +</button>
                <button onClick="onResizeFont(-1)">text -</button>
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
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    drawImgFromLocal(imageId)
    gMeme.lines.forEach(line=>{
        
    })
}

function onAddText(ev) {
    let elText = document.querySelector('input').value
    gMeme.lines[gCurrSettings.currLineIdx].txt = elText

    addMemeNewLine()
    // renderMeme()
    drawText(elText, gCurrSettings)
}

function addMemeNewLine(){
    gMeme.lines.push( {
        txt: '',
        txtSize: gCurrSettings.txtSize,
        font: gCurrSettings.fontFamily,
        align: gCurrSettings.txtAlign,
        txtColor: gCurrSettings.txtColor,
        stroke: gCurrSettings.txtStrokeColor
    })
    gCurrSettings.currLineIdx++
    console.log('gMeme: ',gMeme)
    
}




function onAddNewTextLine() {
    if (gCurrSettings.currLineIdx === 0) return
    gCurrSettings.currLineIdx++
}

function drawText(txt, gCurrSettings) {

    let txtAlign = gCurrSettings.txtAlign

    gCtx.textBaseline = 'start'; // WHAT DOES IT DO EXACTLY ????
    let x, y
    switch (txtAlign) {
        case 'left':
            x = 20
            gCtx.textAlign = 'left'
            break
        case 'center':
            x = gCanvas.width / 2
            gCtx.textAlign = 'center'
            break
        case 'right':
            x = gCanvas.width - 20
            gCtx.textAlign = 'right'
            break
    }
    let currLineIdx = gCurrSettings.currLineIdx
    switch (currLineIdx) {
        case 0: //top line
            y = 40
            break
        case 1:  // bottom line
            y = gCanvas.height - 40
            break
        default: //center line
            y = (gCanvas.height / 2)
            break
    }

    gCtx.font = `${gCurrSettings.txtSize}px ${gCurrSettings.fontFamily}`
    gCtx.lineWidth = 3;
    gCtx.strokeStyle = gCurrSettings.txtStrokeColor
    gCtx.strokeText(txt, x, y);


    gCtx.lineWidth = 20;
    gCtx.fillStyle = gCurrSettings.txtColor
    gCtx.fillText(txt, x, y);
}









// function onUpdateSettings(event) {
//     event.preventDefault()
//     console.log('onUpdateSettings(event): ', onUpdateSettings(event))
//     console.log('event: ', event)

//     // gCurrSettings.txtSize += diff
//     // gCurrSettings.txtAlign = direction
//     // gCurrSettings.txtAlign = direction
//     // gCurrSettings.txtColor = ev.path[0].value
//     // gCurrSettings.txtStrokeColor = ev.path[0].value
//     // gCurrSettings.currLineIdx += diff
//     // gCurrSettings.fontFamily = ev.path[0].value
// }
function onDeleteLine(){
    let currLineIdx = gCurrSettings.currLineIdx
    gMeme.lines.splice(currLineIdx,1)
    renderMeme()
}


// gets the change from the DOM and updates the model (gMeme)
function onResizeFont(diff) {
    gCurrSettings.txtSize += diff
}
// recieves 'left', 'right', 'center' and updates the gCurrSettings variable
function onChangeTextAlign(direction) {
    gCurrSettings.txtAlign = direction
}
function onChangeTxtColor(ev) {
    gCurrSettings.txtColor = ev.path[0].value
}

function onChangeStrokeColor(ev) {
    gCurrSettings.txtStrokeColor = ev.path[0].value
}

function onChangeTextLine(diff) {
    gCurrSettings.currLineIdx += diff
}
function onChangeFont(ev) {
    gCurrSettings.fontFamily = ev.path[0].value
}


//draws an image on the canvas 
function drawImgFromLocal(imageId) {
    var img = new Image()
    var source = `img/meme-imgs-square/${imageId + 1}.jpg`
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
    drawImgFromLocal(gCurrSettings.imageId)
    // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gMeme = createMeme()
}


