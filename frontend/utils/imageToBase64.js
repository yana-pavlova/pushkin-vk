export default function getBase64Image(img) {  
    // создаем канвас элемент  
    var canvas = document.createElement("canvas");  
    canvas.width = img.width;  
    canvas.height = img.height;  
  
    // Копируем изображение на канвас  
    var ctx = canvas.getContext("2d");  
    ctx.drawImage(img, 0, 0);  
  
    // Получаем data-URL отформатированную строку  
    // Firefox поддерживает PNG и JPEG.   
    var dataURL = canvas.toDataURL("image/png");  
  
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");  
}