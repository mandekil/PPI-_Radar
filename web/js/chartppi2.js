$(document).ready(function() {
  getNilai()
});

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
  let dataPPI = [[],[]] //index (from 1), value
  let maxPPI = [0,0]
  let km = ""
  let lastIdx = 19531
  let rangeKm = 25
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
  km = (maxPPI[0] * rangeKm / lastIdx).toFixed(2)
  console.log('max idx', maxPPI[0], 'val', maxPPI[1])
  console.log('···',maxPPI[0],'/',lastIdx,'*',rangeKm,'=',km)

  document.getElementById("Jarak").defaultValue = km + " km"
  document.getElementById("Grafik").style.display = "none"
  
  drawChartPPI(dataPPI);
  prepDiagPPI(km);
  //var myVar = setInterval(function(){prepDiagPPI(km)}, 3000);

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

function prepDiagPPI(data){
  let dataGPPI = [[],[]];
  let acc = 60;
  let step = 10;
  let randIdx = Math.floor(Math.random() * Math.floor(acc/step+1))*step;
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
  drawDiagPPI(dataGPPI)
}

function drawDiagPPI(data){
  var ctx = document.getElementById("diag-ppi").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: data[0],
      datasets: [{
        label: 'PPI',
        data: data[1],
        backgroundColor: 'rgba(55, 58, 130, 1)',
        borderColor: 'rgba(0, 0, 0, 0)',
        pointBorderColor: 'rgba(55, 58, 130, 1)',
        borderWidth: 1,
        pointRadius: 4,
      }]
    },
    options: {
      animation: {
        duration: 0
      },
      scale: {
        angleLines: {
          //display: false
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 25,
          lineHeight: 5,
        },
      },
      legend: {
        //display: false,
      },
    },
  });
}