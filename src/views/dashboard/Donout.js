import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const DonutChartsCustom = ({ donoutChartData }) => {
  useEffect(() => {
    setState({
      ...state,
      series: [donoutChartData.count, donoutChartData.projectedAmount]
    });
  }, [donoutChartData]);

  const [state, setState] = useState({
    series: [],
    options: {
      labels: ['Total Count', 'Total Amount'],
      chart: {
        width: 380,
        type: 'donut'
      },
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          expandOnClick: true,
          offsetX: 0,
          offsetY: 0,
          customScale: 1,
          dataLabels: {
            offset: 10,
            minAngleToShowLabel: 10
          },
          donut: {
            size: '60%',
            background: 'white',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '22px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                color: undefined,
                offsetY: -10,
                formatter: function (val) {
                  return val;
                }
              },
              value: {
                show: false,
                fontSize: '16px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                color: 'green',
                offsetY: 0,
                formatter: function (val) {
                  return val;
                }
              },

              total: {
                show: true,
                showAlways: true,
                label: [`Count `, '&', 'Amount'],
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                color: '#373d3f',
                formatter: function (w) {
                  return '';
                }
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          return val.toFixed(2) + '%';
        },
        style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold'
        }
      },
      colors: ['#9A7DDE', '#3763CC'],
      fill: {
        type: 'gradient'
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center'
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    }
  });

  return <ReactApexChart options={state.options} series={state.series} type="donut" width={380} />;
};

export default DonutChartsCustom;
