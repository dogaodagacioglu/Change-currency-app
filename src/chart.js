
export const today = new Date();
export const endDay = String(today.getDate()-1).padStart(2, '0');
export const startDay = String(today.getDate()-16).padStart(2, '0');
export const mont = String(today.getMonth() + 1).padStart(2, '0');
export const year = today.getFullYear();

export const dateTo = year + '-' + mont + '-' + endDay;
export const dateFrom = year + '-' + mont + '-' + startDay;

const ctx = document.getElementById('currency-chart-one');
const ctx2 = document.getElementById('currency-chart-two');


let myChart;
let myChart2;

  export const chart =  async (url,valueOne,valueTwo) =>{
    try{
    const res = await fetch(url);
    if(!res.ok){
      throw new Error(`HTTP error!`);
    } 
    const dateHistory = await res.json();
    const { data } = dateHistory;

    const labelDate = Object.keys(data);
  
    if (myChart) {
      myChart.destroy();
    }

    if (myChart2) {
      myChart2.destroy();
    }
  
    const valueData = [];
    for (const date in data) {
      if (data.hasOwnProperty(date)) {
        valueData.push(data[date][valueOne.value]);
      }
    }

    const valueData2 = []; 
    for (const date in data) {
      if (data.hasOwnProperty(date)) {
        valueData2.push(data[date][valueTwo.value]);
      }
    }
  
     myChart= new Chart(ctx, {
      type: 'line',
      data: {
        labels: labelDate,
        datasets: [
          {
            label: `${valueOne.value}/USD`,
            backgroundColor:'#ffb6c1',
            borderColor:'#f08080',
            data: valueData,
            tension:0.4,
            yAxisID: 'percentage'
          },
        ],
      },
  
      options: {
        scales: {
          x: {
            ticks : {
              maxTicksLimit: 3,
            }
          }
        },
      },
    });
    
    myChart2 = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: labelDate,
        datasets: [
          {
            label: `${valueTwo.value}/USD`,
            backgroundColor:'#f0f8ff',
            borderColor:'#00ced1',
            data: valueData2,
            tension: 0.4,
            yAxisID:'percentage',
          },
        ],
      },
  
      options: {
        scales: {
          x: {
            ticks : {
              maxTicksLimit: 3,
            }
          }
        },
      },
    });
    }catch{
      console.log(error);
      alert('Unable to load charts')
    }
  }
   