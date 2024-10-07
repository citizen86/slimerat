/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */

const lightboxBG = document.createElement('div');
lightboxBG.id = "lightboxBG";
document.body.appendChild(lightboxBG);

const images = document.querySelectorAll('.image2, .image3, .image4, .image6, .image33, .image66');
images.forEach(image => {
    image.addEventListener('click', e => {
        lightboxBG.classList.add('active');
        const lightboxIMG = document.createElement('img');
        lightboxIMG.src = image.src;
        lightboxIMG.id = "lightboxIMG";
        while (lightboxBG.firstChild){
            lightboxBG.removeChild(lightboxBG.firstChild)
        }
        lightboxBG.appendChild(lightboxIMG);
    })
})

lightboxBG.addEventListener('click', e => {
    lightboxBG.classList.remove('active');
})
