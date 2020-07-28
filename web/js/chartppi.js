$(document).ready(function() {
  getNilai()
});

function getNilai(){
  //var url = 'http://localhost:3000/nilai'
  //sementara kalo belum bisa akses node.js
  var url = 'https://raw.githubusercontent.com/zulmeika/PPI-_Radar/master/ppi.json'
  console.log('Data diambil dari '+url)

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

var dataPPI = [[],[]] //index (from 1), value
var maxPPI = [0,0]
var km = ""
var lastIdx = 19531
var rangeKm = 25
function createChart(data){
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
  km = (maxPPI[0] * rangeKm / lastIdx)
  console.log('max idx', maxPPI[0], 'val', maxPPI[1])
  console.log('···',maxPPI[0],'/',lastIdx,'*',rangeKm,'=',km)

  document.getElementById("Jarak").defaultValue = km.toFixed(2) + " km"
  document.getElementById("Grafik").style.display = "none"
  drawChartPPI(dataPPI)
  drawDiagPPI(XXX)
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
      }
    }
  });
}

function drawDiagPPI(XXX){
  var ctx = document.getElementById("diag-ppi").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: XXX,
      datasets: [{
        label: 'PPI',
        data: XXX,
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
      }
    }
  });
}