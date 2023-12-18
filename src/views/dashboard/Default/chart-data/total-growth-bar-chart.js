// ===========================|| DASHBOARD - TOTAL GROWTH BAR CHART ||=========================== //

const chartData = {
  height: 350,
  type: 'bar',
  options: {
    chart: {
      id: 'bar-chart',
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      },
      colors: ['red', 'yellow']
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '20%',
        borderRadiusApplication: 'end',
        borderRadius: 10
      }
    },
    xaxis: {
      type: 'category',
      categories: ['Person 1', 'Person 2', 'Person 3']
    },
    legend: {
      show: true,
      fontSize: '14px',
      fontFamily: `'Roboto', sans-serif`,
      position: 'bottom',
      offsetX: 20,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8
      }
    },
    fill: {
      type: 'solid'
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: true
    }
  },
  series: [
    {
      name: 'Count',
      data: [35, 125, 35]
    },
    {
      name: 'Amount',
      data: [35, 15, 15]
    }
  ]
};
export default chartData;
