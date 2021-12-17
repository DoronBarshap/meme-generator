'use strict'

function renderMemeImage(gMeme){
    let imageId = gMeme.selectedImgId
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
    drawImgFromLocal(gMeme.selectedImgId)
}

function renderMeme(gMeme) {
    // gMeme.lines.forEach(line => {
    //     drawText(line)
    // })
    for(var i=0; i<gMeme.lines.length-1 ; i++){
        drawText(gMeme.lines[i])
    }
}

function drawText(line) {
    console.log('line: ',line)
    let txt = line.txt
    let txtSize = line.txtSize
    let font = line.font
    let align = line.align
    let txtColor = line.txtColor
    let stroke = line.stroke
    // gCtx.textBaseline = 'start'; 
    let x, y
    switch (align) {
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
    switch (gMeme.selectedLineIdx) {
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
    gCtx.font = `${txtSize}px ${font}`
    gCtx.lineWidth = 3;
    gCtx.strokeStyle = stroke
    gCtx.strokeText(txt, x, y);
    console.log('txt: ',txt)
    
    gCtx.lineWidth = 20;
    gCtx.fillStyle = txtColor
    gCtx.fillText(txt, x, y);
}


function onAddText(ev) {
    let elText = document.querySelector('.textInput').value
    gMeme.lines[gMeme.selectedLineIdx].txt = elText
    addMemeEmptyLine()
    drawText(gMeme.lines[gMeme.selectedLineIdx])
    gCurrSettings.currLineIdx++
    gMeme.selectedLineIdx++  
}

function onAddNewTextLine() {
    if (gCurrSettings.currLineIdx === 0) return
    gCurrSettings.currLineIdx++
}

function onDeleteLine(){
    console.log('deleteline');
    // if(gCurrSettings.currLineIdx===0) return
    if(gMeme.selectedLineIdx===0) return
    gMeme.lines.pop()
    gMeme.lines.pop()
    gMeme.selectedLineIdx--
    console.log('gMeme: ',gMeme)  
    addMemeEmptyLine()
    renderMemeImage(gMeme)
    renderMeme(gMeme)
    gCurrSettings.currLineIdx--
}


// gets the change from the DOM and updates the model (gMeme)
function onResizeFont(diff) {
    gCurrSettings.txtSize += diff
    gMeme.lines[gCurrSettings.currLineIdx].txtSize += diff
}
// recieves 'left', 'right', 'center' and updates the gCurrSettings variable
function onChangeTextAlign(direction) {
    gCurrSettings.txtAlign= direction
    gMeme.lines[gCurrSettings.currLineIdx].align = direction
}

function onChangeTxtColor(ev) {
    gCurrSettings.txtColor = ev.path[0].value
    gMeme.lines[gCurrSettings.currLineIdx].txtColor = ev.path[0].value
}

function onChangeStrokeColor(ev) {
    gCurrSettings.txtStrokeColor = ev.path[0].value
    gMeme.lines[gCurrSettings.currLineIdx].stroke = ev.path[0].value
}

function onChangeTextLine(diff) {
    gCurrSettings.currLineIdx += diff
}

function onChangeFont(ev) {
    gCurrSettings.fontFamily = ev.path[0].value
    gMeme.lines[gCurrSettings.currLineIdx].font = ev.path[0].value
}

// downloads the meme
function onDownloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}










