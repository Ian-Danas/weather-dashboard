var search = $('#search')
var searchBtn = $('#searchBtn')
var GeoURL = 'http://api.openweathermap.org/geo/1.0/direct?'
var apiKey = 'appid=5eb1683a4381f8f5d69e894d1120f7a0'


searchBtn.on('click',function(){
    var searchVal = $('#search').val()
    coords = getApi(searchVal)

  })


  function getApi(cityName) {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+cityName+'&limit=1&appid=5eb1683a4381f8f5d69e894d1120f7a0')
      .then(function (response) {
        return response.json()
    })
    .then(function(data){
        var lat = data[0].lat
        var lon = data[0].lon
        fetch('http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&units=imperial&appid=5eb1683a4381f8f5d69e894d1120f7a0')
        .then(function (response) {
          return response.json()
      })
      .then(function(data){
          console.log(data)
          var todayEl = $('#today')
          var todayLi = todayEl.children('#dataList').children('#temp')
          var todayTemp = data.list[0].main.temp
          todayLi.text('Temp: ' + todayTemp + ' F' + '\u00B0')     
                
        
})
  })
}