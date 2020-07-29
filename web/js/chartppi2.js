$(document).ready(function() {
  getNilai()
});

var quad = 1;

function getNilai(){
  //var url = 'http://localhost:3000/nilai'
  //sementara kalo belum bisa akses node.js
  var url = 'https://raw.githubusercontent.com/zulmeika/PPI-_Radar/master/ppi.json'
  //console.log('Data diambil dari '+url)

  $.ajax({
    type: "GET",
    url: url,
    dataType: "json",
    success: function(response) {
      response = response.values;
      createChart(response)
    },
    error: function(error) {
      alert("Error encountered");
      console.log(error);
    },
  });
}

function createChart(data){
  let dataPPI = [[],[]]; //index (from 1), value
  let maxPPI = [0,0];
  let km = "";
  let lastIdx = 19531;
  let rangeKm = 25;
  for (var i = 0; i < lastIdx; i++) {
    dataPPI[0].push(i+1);
    if (i == 0) {
      dataPPI[1].push(0); //do not show first data
    } else {
      dataPPI[1].push(data[i]['nilai_ppi']);
      if ((i>=5000) && (data[i]['nilai_ppi']> maxPPI[1])) {
        maxPPI[0] = i+1;
        maxPPI[1] = data[i]['nilai_ppi'];
      }
    }
  }
  km = (maxPPI[0] * rangeKm / lastIdx).toFixed(2);
  console.log('max idx', maxPPI[0], 'val', maxPPI[1]);
  console.log('···',maxPPI[0],'/',lastIdx,'*',rangeKm,'=',km);

  document.getElementById("Jarak").defaultValue = km + " km";
  document.getElementById("Grafik").style.display = "none";
  drawChartPPI(dataPPI);
  document.getElementById("Plot").style.display = "none";
  prepRadPPI(km);
  //var myVar = setInterval(function(){prepRadPPI(km)}, 3000);
}

function drawChartPPI(data){
  var ctx = document.getElementById("chart-ppi").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data[0],
      datasets: [{
        label: 'Data PPI',
        data: data[1],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(55, 58, 130, 0.5)',
        borderWidth: 1,
        pointRadius: 0,
      }]
    },
    options: {
      chartArea: {
        //backgroundColor: 'rgba(251, 85, 85, 0.4)'
      },
      scales: {
        xAxes: [{
          ticks: {
            stepSize:500,
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero:true,
          }
        }],
      },
      legend: {
        display: false,
      },
    }
  });
}

function prepRadPPI(data){
  let dataGPPI = [[],[]];
  let acc = 60;
  let step = 10;
  let randIdx = (Math.floor(Math.random() * Math.floor(acc/step+1))*step) + (quad-1)*90;
  let time = new Date()
  for (var i = 0; i < 360/step; i++) {
    dataGPPI[0].push(i*step);
    if (dataGPPI[0][i]==randIdx) {
      dataGPPI[1].push(data)
      console.log(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(), i, dataGPPI[0][i], dataGPPI[1][i])
    } else {
      dataGPPI[1].push(0)
    }
  }
  drawRadPPI(dataGPPI)
}

Chart.pluginService.register({
    beforeDraw: function (chart, easing) {
        if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
            var helpers = Chart.helpers;
            var ctx = chart.chart.ctx;
            var chartArea = chart.chartArea;

            ctx.save();
            ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
            ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
            ctx.restore();
        }
    }
});

function drawRadPPI(data){
  var ctx = document.getElementById("rad-ppi").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: data[0],
      datasets: [{
        label: 'PPI',
        data: data[1],
        //backgroundColor: 'red',
        backgroundColor: 'rgba(55, 58, 130, 1)',
        borderColor: 'rgba(0, 0, 0, 0)',
        pointBorderColor: 'rgba(55, 58, 130, 1)',
        borderWidth: 1,
        pointRadius: 4,
      /*},{
        label: 'PPI2',
        data: [25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25],
        //backgroundColor: 'red',
        backgroundColor: 'rgba(0, 255, 0, 1)',
        borderColor: 'rgba(0, 255, 0, 0)',
        pointBorderColor: 'rgba(0, 255, 0, 1)',
        borderWidth: 1,
        pointRadius: 0,*/
      }]
    },
    options: {
      chartArea: {
        //backgroundColor: 'rgba(251, 85, 85, 0.4)'
      },
      animation: {
        duration: 0
      },
      scale: {
        angleLines: {
          //display: false
        },
        ticks: {
          backdropColor: 'rgba(0, 0, 0, 0)',
          suggestedMin: 0,
          suggestedMax: 25,
          lineHeight: 5,
        },
      },
      legend: {
        display: false,
      },
    },
  });
}