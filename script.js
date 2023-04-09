var search = $('#search')
var searchBtn = $('#searchBtn')
var GeoURL = 'http://api.openweathermap.org/geo/1.0/direct?'
var apiKey = 'appid=5eb1683a4381f8f5d69e894d1120f7a0'
var forcastCont = $('.weather')
var prevSearch = $('.prev-search')

// forcastCont.hide()
// prevSearch.hide()
var searches = []
updateSearch()
var savedBtn = $('.saved')
savedBtn.on('click',function(){
    console.log('clicked on a previous search')
    var city = ($(this).text())
    getApi(city)
    
  })



searchBtn.on('click',function(){
    var searchVal = $('#search').val()
    if (searchVal != ''){
        getApi(searchVal)
        lastSearch = JSON.parse(localStorage.getItem('history'))||[]
        if(lastSearch.includes(searchVal) == false){

            lastSearch.unshift(searchVal)
            localStorage.setItem('history',JSON.stringify(lastSearch))
            updateSearch()
            var savedBtn = $('.saved')
            savedBtn.on('click',function(){
                console.log('clicked on a previous search')
                var city = ($(this).text())
                getApi(city)
                
              })
        }
        
        
    }

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
          forcastCont.show()
          console.log(data)
          var weatherArry = data.list
          var todayEl = $('#today')
          var todayH2 = todayEl.children('#cityTime')
          var todayTempLi = todayEl.children('#dataList').children('#temp')
          var todayWindLi = todayEl.children('#dataList').children('#wind')
          var todayHumLi = todayEl.children('#dataList').children('#hum')
          var todayIconImg = todayEl.children('.icon')
          var todayTemp = weatherArry[0].main.temp
          var todayWind = weatherArry[0].wind.speed
          var todayHum = weatherArry[0].main.humidity
          var todayIcon = weatherArry[0].weather[0].icon
          var todayDate = dayjs(weatherArry[0].dt_txt).format('M/D/YYYY')
          var cityName = data.city.name
          todayTempLi.text('Temp: ' + todayTemp + ' F' + '\u00B0') 
          todayWindLi.text('Wind: ' + todayWind + ' MPH')
          todayHumLi.text('Humidity: ' + todayHum + '%')    
          todayH2.text(cityName + "(" + todayDate + ")")
          todayIconImg.attr('src','https://openweathermap.org/img/wn/'+todayIcon+'@2x.png')
          
          var dayCounter = 1
     
          for (let i = 5; i < weatherArry.length; i+=8) {
            var dayEl = $('#day-'+dayCounter).children('.card-body')
            var dayH2 = dayEl.children('.card-title')
            var dayTempLi = dayEl.children('#dataList').children('#temp')
            var dayWindLi = dayEl.children('#dataList').children('#wind')
            var dayHumLi = dayEl.children('#dataList').children('#hum')
            var dayIconImg = dayEl.children('.icon')
            var dayTemp = weatherArry[i].main.temp
            var dayWind = weatherArry[i].wind.speed
            var dayHum = weatherArry[i].main.humidity
            var dayIcon = weatherArry[i].weather[0].icon
            var dayDate = dayjs(weatherArry[i].dt_txt).format('M/D/YYYY')
            dayTempLi.text('Temp: ' + dayTemp + ' F' + '\u00B0') 
            dayWindLi.text('Wind: ' + dayWind + ' MPH')
            dayHumLi.text('Humidity: ' + dayHum + '%')  
            dayH2.text("(" + dayDate + ")")
            dayIconImg.attr('src','https://openweathermap.org/img/wn/'+dayIcon+'@2x.png')
            dayCounter++
            
           }
        
})
  })
}

function updateSearch(){
    searchArry = JSON.parse(localStorage.getItem('history'))||[]
    historyUl = $('.prev-search')
    historyUl.empty()
    for (let i = 0; i < searchArry.length; i++) {
        listEl ='<button class = saved>'+searchArry[i]+'</button>'
        historyUl.append(listEl)
    
        
    }
}

