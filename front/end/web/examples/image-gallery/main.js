const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

/* Declaring the alternative text for each image file */
const alts = {
    pic1: 'An eye',
    pic2: 'Acrylic',
    pic3: 'Flowers',
    pic4: 'Cave art',
    pic5: 'Butterfly'
}

/* Looping through images */
for (let i = 0; i < images.length; i++) {
    /* Setting attributes */
    const newImage = document.createElement('img');
    newImage.setAttribute('src', 'images/' + images[i]);
    newImage.setAttribute('alt', alts[images[i].slice(0, images[i].indexOf('.'))]);
    thumbBar.appendChild(newImage);
    /* Clickability */
    newImage.onclick = (e) => {
        displayedImage.src = e.target.src;
        displayedImage.alt = e.target.alt;
    }
}

/* Wiring up the Darken/Lighten button */
btn.onclick = (e) => {
    if (e.target.getAttribute('class') === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = "Lighten";
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else {
        btn.setAttribute('class', 'dark');
        btn.textContent = "Darken";
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
}
