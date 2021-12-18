'use strict'

var gMeme = null
var gCanvas;
var gCtx;
var gCurrSettings = {
    imageId : null,
    fontFamily: 'impact',
    txtSize: 40,
    txtColor: 'white',
    txtStrokeColor: 'black',
    currLineIdx: 0,
    txtAlign: 'center'
}




function addMemeEmptyLine(){
    gMeme.lines.push( {
        txt: '',
        txtSize: gCurrSettings.txtSize,
        font: gCurrSettings.fontFamily,
        align: gCurrSettings.txtAlign,
        txtColor: gCurrSettings.txtColor,
        stroke: gCurrSettings.txtStrokeColor
    })
    // gCurrSettings.currLineIdx++
    console.log('gMeme: ',gMeme)
    
}

function createMeme(gCurrSettings) {
    var meme =
    {
        selectedImgId: gCurrSettings.imageId,
        selectedLineIdx: gCurrSettings.currLineIdx,
        lines: [
            {
                line: gCurrSettings.currLineIdx,
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



// resets the current settings
function resetCurrentSettings(){
    gCurrSettings = {
        imageId : null,
        fontFamily: 'impact',
        txtSize: 40,
        txtColor: 'white',
        txtStrokeColor: 'black',
        currLineIdx: 0,
        txtAlign: 'center'
    }
}
//clears the canvas
function onClearCanvas() {
    resetCurrentSettings()
    resetGMeme()
    renderMemeImage(gMeme)  
}
// resets gMeme to have only first empty line
function resetGMeme(){
    gMeme.selectedLineIdx = 0
    gMeme.lines =  [
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


// util functions

//draws an image on the canvas 
function drawImgFromLocal(imageId) {
    var img = new Image()
    var source = `img/meme-imgs-square/${imageId + 1}.jpg`
    img.src = source
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
    }
}
