
export const today = new Date();
export const endDay = String(today.getDate()-1).padStart(2, '0');
export const startDay = String(today.getDate()-10).padStart(2, '0');
export const mont = String(today.getMonth() + 1).padStart(2, '0');
export const year = today.getFullYear();

export const dateTo = year + '-' + mont + '-' + endDay;
export const dateFrom = year + '-' + mont + '-' + startDay;


let myChart;
let myChart2;
const url_chart =`https://api.freecurrencyapi.com/v1/historical?apikey=J6e4atuaW0NwEQIkh1eMkOAGzdwc1pkZDsDFha5W&date_from=${dateFrom}&date_to=${dateTo}`

  export const chart =  async (url,valueOne,valueTwo) =>{
    const res = await fetch(url);
    const dateHistory = await res.json();
    const { data } = dateHistory;
    console.log(data);

    const labelDate = Object.keys(data);
 
    if (myChart) {
      myChart.destroy();
    }

    if (myChart2) {
      myChart2.destroy();
    }
  

    const audData = [];
    for (const date in data) {
      if (data.hasOwnProperty(date)) {
        audData.push(data[date][valueOne.value]);
      }
    }

    const audData2 = [];
    for (const date in data) {
      if (data.hasOwnProperty(date)) {
        audData2.push(data[date][valueTwo.value]);
      }
    }

    const ctx = document.getElementById('myChart');
    const ctx2 = document.getElementById('myChart2');
  
     myChart= new Chart(ctx, {
      type: 'line',
      data: {
        labels: labelDate,
        datasets: [
          {
            label: `${valueOne.value}/USD`,
            backgroundColor:'yellow',
            data: audData,
            tension:0.4,
            yAxisID:'percentage',
          },
        ],
      },
  
      options: {
        scales: {
          y: {    
            beginAtZero:true
          },
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
            data: audData2,
            tension: 0.4,
            yAxisID:'percentage',
          },
        ],
      },
  
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            ticks : {
              maxTicksLimit: 3,
            }
          }
        },
      },
    });
  }

   // // const audExchangeRateNov15 = data['2021-11-15']['AUD'];
   