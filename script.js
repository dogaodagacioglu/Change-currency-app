import { chart } from "./chart.js";
import { dateFrom } from "./chart.js";
import { dateTo } from "./chart.js";

const currencyEl_one= document.getElementById('currency-one');
const currencyEl_two= document.getElementById('currency-two');
const amountEl_one= document.getElementById('amount-one');
const amountEl_two= document.getElementById('amount-two');

const swap = document.getElementById('swap');
const ctx = document.getElementById('myChart');

const API_URL = 'https://api.freecurrencyapi.com/v1/latest?apikey=J6e4atuaW0NwEQIkh1eMkOAGzdwc1pkZDsDFha5W'
const url_chart =`https://api.freecurrencyapi.com/v1/historical?apikey=J6e4atuaW0NwEQIkh1eMkOAGzdwc1pkZDsDFha5W&date_from=${dateFrom}&date_to=${dateTo}`

let html= '';
let html_two ='';


async function currency(url){

    const res = await fetch(url);
    if(!res.ok){
        throw new Error(`HTTP error!`);
    }
    const dataCurrency = await res.json()
    const{data} = dataCurrency;
    

    return data
}

async function renderCurrency(data){
  
   
    const arrKeys = Object.keys(data);
    [arrKeys[0],arrKeys[30]]= [arrKeys[30],arrKeys[0]];  /*ı choose USD as initial element */
    arrKeys.map(item=>{
        return html += `<option value="${item}" placeholder="0">${item}</option>`;
    })
    currencyEl_one.innerHTML = html;

    [arrKeys[0],arrKeys[8]]= [arrKeys[8],arrKeys[0]];
    arrKeys.map(item=>{
         return html_two +=`<option value="${item}" placeholder="0">${item}</option>`;
    });

    currencyEl_two.innerHTML = html_two;
    amountEl_two.value = (amountEl_one.value * data[currencyEl_two.value] / data[currencyEl_one.value]).toFixed(5);
    return calculate(data)
}

    function calculate(data){
        
        amountEl_one.addEventListener('keyup', ()=>{
            amountEl_two.value = (amountEl_one.value * data[currencyEl_two.value] / data[currencyEl_one.value]).toFixed(5);
           
        });
        amountEl_two.addEventListener('keyup', ()=>{
            amountEl_one.value = (amountEl_two.value * data[currencyEl_one.value] / data[currencyEl_two.value]).toFixed(5);
        });
         currencyEl_one.addEventListener('change', ()=>{
        amountEl_two.value = (amountEl_one.value * data[currencyEl_two.value] / data[currencyEl_one.value]).toFixed(5);
        chart(url_chart,currencyEl_one,currencyEl_two);
        });
        currencyEl_two.addEventListener('change', ()=>{
            if(amountEl_two.value !== null){
                amountEl_two.value = (data[currencyEl_two.value] / data[currencyEl_one.value]).toFixed(5);;
            }
            amountEl_one.value = (amountEl_two.value * data[currencyEl_one.value] / data[currencyEl_two.value]).toFixed(5);
            chart(url_chart,currencyEl_one,currencyEl_two);
        });
        swap.addEventListener('click', ()=>{
            const temp = currencyEl_one.value;
            currencyEl_one.value=currencyEl_two.value;
            currencyEl_two.value=temp;
            amountEl_two.value = ((amountEl_one.value * data[currencyEl_two.value])/ data[currencyEl_one.value]).toFixed(5);
            amountEl_one.value = ((amountEl_two.value * data[currencyEl_one.value]) / data[currencyEl_two.value]).toFixed(5);
           
        })
    }
    

async function main() {

    try{
     const data= await currency(API_URL);
     const currencyDeploy = await renderCurrency(data)
      
    }catch(error){
      console.log(error)
    }
  }

window.addEventListener('load', main);

