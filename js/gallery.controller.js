'use strict'

var gImages = [
    { id: 1, url: './img/meme-imgs-square/1.jpg', keywords: ['funny', 'tramp'] },
    { id: 2, url: './img/meme-imgs-square/2.jpg', keywords: ['funny', 'tramp'] },
    { id: 3, url: './img/meme-imgs-square/3.jpg', keywords: ['funny', 'tramp'] },
    { id: 4, url: './img/meme-imgs-square/4.jpg', keywords: ['funny', 'tramp'] },
    { id: 5, url: './img/meme-imgs-square/5.jpg', keywords: ['funny', 'tramp'] },
    { id: 6, url: './img/meme-imgs-square/6.jpg', keywords: ['funny', 'tramp'] },
    { id: 7, url: './img/meme-imgs-square/7.jpg', keywords: ['funny', 'tramp'] },
    { id: 8, url: './img/meme-imgs-square/8.jpg', keywords: ['romantic', 'dogs'] },
    { id: 9, url: './img/meme-imgs-square/1.jpg', keywords: ['funny', 'tramp'] },
    { id: 10, url: './img/meme-imgs-square/2.jpg', keywords: ['funny', 'tramp'] },
    { id: 11, url: './img/meme-imgs-square/3.jpg', keywords: ['funny', 'tramp'] },
    { id: 12, url: './img/meme-imgs-square/4.jpg', keywords: ['funny', 'tramp'] },
    { id: 13, url: './img/meme-imgs-square/5.jpg', keywords: ['funny', 'tramp'] },
    { id: 14, url: './img/meme-imgs-square/6.jpg', keywords: ['funny', 'tramp'] },
    { id: 15, url: './img/meme-imgs-square/7.jpg', keywords: ['funny', 'tramp'] },
    { id: 16, url: './img/meme-imgs-square/8.jpg', keywords: ['romantic', 'dogs'] },
    { id: 17, url: './img/meme-imgs-square/7.jpg', keywords: ['funny', 'tramp'] },
    { id: 18, url: './img/meme-imgs-square/8.jpg', keywords: ['romantic', 'dogs'] }
]


function onImageClicked(ev, imageId) {
    gCurrSettings.imageId = imageId
    gMeme = createMeme(gCurrSettings)

    renderEditor() 
    renderMemeImage(gMeme)
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

//////////////////////////////

