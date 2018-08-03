let body = document.querySelector('body');
let button2 = document.querySelector('.goStory2');
let button3 = document.querySelector('.goStory3');
let button4 = document.querySelector('.goStory4');
let button5 = document.querySelector('.goStory5');
let button6 = document.querySelector('.goStory6');
let button7 = document.querySelector('.goStory7');
let button8 = document.querySelector('.goStory8');
let button9 = document.querySelector('.goStory9');
let button10 = document.querySelector('.goStory10');
let button11 = document.querySelector('.goStory11');
let button12 = document.querySelector('.goStory12');
let button13 = document.querySelector('.goStory13');
let button14 = document.querySelector('.goStory14');
let button15 = document.querySelector('.goStory15');
let button16 = document.querySelector('.goStory16');
let button17 = document.querySelector('.goStory17');
let button18 = document.querySelector('.goStory18');
let button19 = document.querySelector('.goStory19');
let button20 = document.querySelector('.goStory20');

let story2 = document.querySelector('#story2');
let story3 = document.querySelector('#story3');
let story4 = document.querySelector('#story4');
let story5 = document.querySelector('#story5');
let story6 = document.querySelector('#story6');
let story7 = document.querySelector('#story7');
let story8 = document.querySelector('#story8');
let story9 = document.querySelector('#story9');
let story10 = document.querySelector('#story10');
let story11 = document.querySelector('#story11');
let story12 = document.querySelector('#story12');
let story13 = document.querySelector('#story13');
let story14 = document.querySelector('#story14');
let story15 = document.querySelector('#story15');
let story16 = document.querySelector('#story16');
let story17 = document.querySelector('#story17');
let story18 = document.querySelector('#story18');
let story19 = document.querySelector('#story19');
let story20 = document.querySelector('#story20');

button2.onclick = function() {
    story1.style.display = "none";
    story2.style.display = "block";
}

button3.onclick = function() {
    story2.style.display = "none";
    story3.style.display = "block";
}

button4.onclick = function() {
    story3.style.display = "none";
    story4.style.display = "block";
}

button5.onclick = function() {
    story4.style.display = "none";
    story5.style.display = "block";
}

button6.onclick = function() {
    story5.style.display = "none";
    story6.style.display = "block";
}

button7.onclick = function() {
    story6.style.display = "none";
    story7.style.display = "block";
}

button8.onclick = function() {
    story7.style.display = "none";
    story8.style.display = "block";
}

button9.onclick = function() {
    story8.style.display = "none";
    story9.style.display = "block";
}

button10.onclick = function() {
    story9.style.display = "none";
    story10.style.display = "block";
}

button11.onclick = function() {
    story10.style.display = "none";
    story11.style.display = "block";
}

button12.onclick = function() {
    story11.style.display = "none";
    story12.style.display = "block";
}

button13.onclick = function() {
    story12.style.display = "none";
    story13.style.display = "block";
}

button14.onclick = function() {
    story13.style.display = "none";
    story14.style.display = "block";
}

button15.onclick = function() {
    story14.style.display = "none";
    story15.style.display = "block";
}

button16.onclick = function() {
    story15.style.display = "none";
    story16.style.display = "block";
}

button17.onclick = function() {
    story16.style.display = "none";
    story17.style.display = "block";
}

button18.onclick = function() {
    story17.style.display = "none";
    story18.style.display = "block";
}

button19.onclick = function() {
    story18.style.display = "none";
    story19.style.display = "block";
}

button20.onclick = function() {
    story19.style.display = "none";
    story20.style.display = "block";
}

// button.onclick = function() {
//     body.removeChild(div);
//     newStory = document.createElement("div");
//     newStory.innerHTML = story1;
//     body.appendChild(newStory);
// }

// let storyContinious = document.querySelectorAll('.storyContinious');
// let goStory = document.querySelectorAll('.goStory');
// let numberStory = 0;

// for(let i = 0; i < goStory.length; i++) {
//     goStory[i].onclick = function() {
//         storyContinious[numberStory-1].style.display = "none";
//         storyContinious[numberStory].style.display = "block";
//         numberStory++;
//         window.location.hash=`story{$numberStory}`;
//     };
// };