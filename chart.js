
export const today = new Date();
export const endDay = String(today.getDate()-1).padStart(2, '0');
export const startDay = String(today.getDate()-7).padStart(2, '0');
export const mont = String(today.getMonth() + 1).padStart(2, '0');
export const year = today.getFullYear();

export const dateTo = year + '-' + mont + '-' + endDay;
export const dateFrom = year + '-' + mont + '-' + startDay;

let myChart;
const url_chart =`https://api.freecurrencyapi.com/v1/historical?apikey=J6e4atuaW0NwEQIkh1eMkOAGzdwc1pkZDsDFha5W&date_from=${dateFrom}&date_to=${dateTo}`

  export const chart =  async (url,valueOne,valueTwo) =>{
    const res = await fetch(url);
    const dateHistory = await res.json();
    const { data } = dateHistory;
    console.log(data)

    if (myChart) {
      myChart.destroy();
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
  
     myChart= new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [
          {
            label: `${valueOne.value}`,
            data: audData,
            borderWidth: 1,
          },
          {
            label: `${valueTwo.value}`,
            data: audData2,
            borderWidth: 1,
          },
        ],
      },
  
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  
  }

   // // const audExchangeRateNov15 = data['2021-11-15']['AUD'];
   