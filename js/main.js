'use strict'
var gMeme=null
var gCanvas;
var gCtx;
var gCurrAction = 'text'
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
    fontSize: 20,
    fontColor: 'white',
    fontStrokeColor: 'black',
    currLineIdx: 0
}


function onInit() {
    // gCanvas = document.querySelector('#canvas');
    // gCtx = gCanvas.getContext('2d');

    console.log('i am connected to js');

    renderGallery()
}
// renderEditor(gMeme)


function createMeme(imageId) {
    var meme =
    {
        selectedImgId: imageId,
        selectedLineIdx: 0,
        lines: [
            {
                txt: '',
                txtSize: 20,
                font: 'IMPACT',
                align: 'left',
                color: 'white',
                stroke: 'black'
            }
        ]
    }
    return meme
}

function onChangeText(ev) {
    let elText = document.querySelector('input').value
    drawText(elText, 40, 40, gCurrSettings)
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
                <button onClick="onResizeFont(1)">text +</button>
                <button onClick="onResizeFont(-1)">text -</button>
                <button onClick="onClearCanvas()">Clear</button>

                <input type="color" onChange="onChangeFontColor(event)">textColor</input>
                <input type="color" onChange="onChangeStrokeColor(event)">strokeColor</input>
                <button onClick="onChangeTextLine(-1)">to upper line</button>
                <button onClick="onChangeTextLine(1)">to bottom line</button>
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


// var gCurrSettings = {
//     fontSize: 20,
//     fontColor: 'white',
//     fontStrokeColor: 'black',
//     currLineIdx: 0
// }

function drawText(txt, x, y, gCurrSettings) {
    // gCtx.font = '48px serif';
    // gCtx.fillText(txt, x, y);
    gCtx.textBaseline = 'start';
    gCtx.textAlign = 'start';
    gCtx.lineWidth = 5;

    // gCtx.strokeStyle = 'black';
    gCtx.strokeStyle = gCurrSettings.strokeColor
    gCtx.font = '50px monospace';
    gCtx.fillStyle = gCurrSettings.fontColor
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}



// chooses the image and shows it in gallery - need to create a new meme
function onImageClicked(ev, imageId) {
    renderEditor(imageId)
    gMeme = createMeme(imageId)
    console.log('gMeme: ',gMeme)
    
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






// gets the change from the DOM and updates the model (gMeme)
function onResizeFont(diff){
    gCurrSettings.fontSize += diff
    console.log('gCurrSettings: ',gCurrSettings)
  }

  function onChangeFontColor(ev){
      gCurrSettings.color = ev.path[0].value
      console.log('gCurrSettings: ',gCurrSettings)
  }

  function onChangeStrokeColor(ev){
      gCurrSettings.strokeColor = ev.path[0].value
      console.log('gCurrSettings: ',gCurrSettings)
  }

  function onChangeTextLine(diff){
    gCurrSettings.selectedLineIdx += diff
    console.log('gCurrSettings: ',gCurrSettings)
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


