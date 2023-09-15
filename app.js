const inputText = document.querySelector('#input-text');
const resultText = document.querySelector('#output-text');
const copyBtn = document.querySelector('.beteen');

inputText.addEventListener('input', something => {
    rot13(something.target.value);
    resultText.innerText = rot13(something.target.value);
})

function rot13(message){
    let res = '';
    let arr = [];
    let rot = [];
    res = message.split('').map(char => {
       return char.charCodeAt(0);
    }).join(' ');
 
     arr = res.split(' ').map(el => +el);
    // +- 13 for Eng && +- 16 for Ru
     for(let i = 0; i < arr.length; i++){
       if(arr[i] > 77 && arr[i] <= 90){
          arr[i] -= 13
        } else if(arr[i] <= 77 && arr[i] >= 65){
          arr[i] += 13
        } else if(arr[i] > 109 && arr[i] <= 122){
          arr[i] -= 13
        } else if(arr[i] <= 109 && arr[i] >=97) {
          arr[i] += 13
        } else if(arr[i] >= 1040 && arr[i] <= 1055){
            arr[i] += 16
        } else if(arr[i] >= 1056 && arr[i] <= 1071){
            arr[i] -=16
        } else if(arr[i] >= 1072 && arr[i] <= 1087){
            arr[i] += 16
        } else if(arr[i] >= 1088 && arr[i] <= 1103 ){
            arr[i] -= 16
        }
      
     }
   
    rot = arr.map(elem => elem == 0 ? "" : String.fromCharCode(elem));
     return rot.join("");
  
    }


    // Copy to clipboard

    copyBtn.addEventListener('click', addToClipBoard);

async function addToClipBoard(e){
    try {
      await  navigator.clipboard.writeText(resultText.textContent);
      
      console.log(("Copied -> " + resultText.textContent));
      copyClip(e);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
    
}

let tooltipElem;

 

function copyClip(event){
    let target = event.target;

    let tooltipHtml = target.dataset.tooltip;
    // if (!tooltipHtml) return;

    tooltipElem = document.createElement('div');
      tooltipElem.className = 'tooltip';
      tooltipElem.innerText = 'Copied to clipboard!';
      document.body.append(tooltipElem);

      let coords = target.getBoundingClientRect();

      let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
      if (left < 0) left = 0;

      let top = coords.top - tooltipElem.offsetHeight - 5;
      if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
        top = coords.top + target.offsetHeight + 5;
      }

      tooltipElem.style.left = left + 'px';
      tooltipElem.style.top = top + 'px';
    //   setTimeout(() => {
    //     tooltipElem.remove();
    //   }, 300);

      if(tooltipElem){
        setTimeout(() => {
            tooltipElem.remove();
          }, 100);
    }
}