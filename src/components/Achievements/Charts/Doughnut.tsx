import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import Chart from 'chart.js/auto'

const DoughnutChart = (
  data: Chart.ChartData | ((canvas: HTMLCanvasElement) => Chart.ChartData)
) => <Doughnut data={data} type={'doughnut'} />

const data = {
  labels: ['Ваши', 'До минимума', 'До оптимы'],
  datasets: [
    {
      label: 'чеков',
      data: [8, 2, 5],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
}


const dailyReceipts = {
  labels: ['Ваши', 'До минимума', 'До оптимы'],
  datasets: [
    {
      label: 'чеков',
      data: [8, 2, 5],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
}

const yourVsShop = {
  labels: ['Ваши', 'Коллеги', 'До плана'],
  datasets: [
    {
      label: 'чеков',
      data: [8, 36, 6],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}

export const DoughnutDone = () => <Doughnut data={data} type={'doughnut'} />

export const DoughnutDaily = () => <Doughnut data={dailyReceipts} type={'doughnut'} />

export const DoughnutReceipts = () => <Doughnut data={yourVsShop} type={'doughnut'} />

export default DoughnutChart
