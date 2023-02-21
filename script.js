const select = document.querySelectorAll('select');
const input = document.querySelectorAll('input');
const icons = document.querySelector('.fi fi-af');


const API_URL = 'https://api.freecurrencyapi.com/v1/latest?apikey=J6e4atuaW0NwEQIkh1eMkOAGzdwc1pkZDsDFha5W'
let html= '';


async function currency(url){

    const res = await fetch(url);
    if(!res.ok){
        throw new Error(`HTTP error!`);
    }
    const dataCurrency = await res.json()
    const{data} = dataCurrency;
    console.log(data);
    const arrKeys = Object.keys(data);
    [arrKeys[0],arrKeys[30]]= [arrKeys[30],arrKeys[0]];  /*ı choose USD as initial element */
    console.log(arrKeys)
   
    // console.log(arrKeys);
    arrKeys.map(item=>{
        return html += `<option value="${item}" placeholder="0">${item}</option>`;
    });
    
    for(let i =0; i<select.length; i++){
        select[i].innerHTML =html;
    }
    console.log(select[0]);

    input[0].addEventListener('keyup', ()=>{
        input[1].value = input[0].value * data[select[1].value] / data[select[0].value];
    });

    input[1].addEventListener('keyup', ()=>{
        input[0].value = input[1].value * data[select[0].value] / data[select[1].value]
    });

    select[0].addEventListener('change', ()=>{
        input[1].value = input[0].value * data[select[1].value] / data[select[0].value];
    });

    select[1].addEventListener('change', ()=>{
        input[0].value = input[1].value * data[select[0].value] / data[select[1].value]
    });



}
async function main() {

    try{
      await currency(API_URL);
      
    }catch(error){
      console.log(error)
    }
  }

window.addEventListener('load', main);

