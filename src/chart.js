const today = new Date();
let endDay = String(today.getDate() - 1).padStart(2, "0");
let endMonth = String(today.getMonth() + 1).padStart(2, "0");
let startDay = String(today.getDate() - 16).padStart(2, "0");
let startMonth = String(today.getMonth() + 1).padStart(2, "0");
const year = today.getFullYear();

if (today.getDate() <= 16) {
  startDay = String(today.getDate() + 14).padStart(2, "0");
  startMonth = String(today.getMonth()).padStart(2, "0");
}

if (today.getDate() === 1) {
  const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  endDay = String(lastDayOfLastMonth.getDate()).padStart(2, "0");
  endMonth = String(lastDayOfLastMonth.getMonth() + 1).padStart(2, "0");
}

export const dateTo = year + "-" + endMonth + "-" + endDay;
export const dateFrom = year + "-" + startMonth + "-" + startDay;

const ctx = document.getElementById("currency-chart-one");
const ctx2 = document.getElementById("currency-chart-two");

let myChart;
let myChart2;

export const chart = async (url, valueOne, valueTwo) => {
  const res = await fetch(url);
  if (!res.ok) {
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

  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labelDate,
      datasets: [
        {
          label: `${valueOne.value}/USD`,
          backgroundColor: "#ffb6c1",
          borderColor: "#f08080",
          data: valueData,
          tension: 0.4,
          yAxisID: "percentage",
        },
      ],
    },

    options: {
      scales: {
        x: {
          ticks: {
            maxTicksLimit: 3,
          },
        },
      },
    },
  });

  myChart2 = new Chart(ctx2, {
    type: "line",
    data: {
      labels: labelDate,
      datasets: [
        {
          label: `${valueTwo.value}/USD`,
          backgroundColor: "#f0f8ff",
          borderColor: "#00ced1",
          data: valueData2,
          tension: 0.4,
          yAxisID: "percentage",
        },
      ],
    },

    options: {
      scales: {
        x: {
          ticks: {
            maxTicksLimit: 3,
          },
        },
      },
    },
  });
};
