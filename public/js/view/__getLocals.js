// TODO kill me!
let _LOCALS;

(async function(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/whoami', true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            _LOCALS = JSON.parse(this.responseText);
        }
    }
}());