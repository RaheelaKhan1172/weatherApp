var weather = {
  currTemp:[],
  currTime:[],
  currDes:"",
  nextTemp:[],
  days: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
}


weather.fixTemp = function() {
  var temp = weather.currTemp.map(function(a) {
    return Math.round((9/5)*(a-273) +32);
  }); 
  for (var i = 0; i < temp.length; i++) {
    document.getElementById('day-'+i).textContent = temp[i]+String.fromCharCode(176);
  };
  $("#currWeat").text(temp.shift());
  $(".weatherDes").text(weather.currDes);
}

weather.fixTime = function() {
  var time = weather.currTime.map(function(a) {
    return a.split(' ')[1];
  }).map(function(b) {
    b = b.split(':')[0];
    if (b > 12) {
      return (Number(b)%12)-8;
    } else if (b === "00") {
      return 1+":00 PM";
    } else if(b === "12") {
      return b+":00 AM";
    } else {
      return b+":00 PM";
    }
    });
  
  for (var i = 0; i < time.length; i++) {
    document.getElementById("time-"+i).textContent = time[i];
  };
}
//this will take care of rendering the response into usable data
weather.renderResponse = function(data) {
  var currD = new Date();
  var toCompare = currD.getDate();
  var next = currD.getDate();
  for (var prop in data ) {
    console.log(data,prop); //curr date
    for (var i = 0; i < 5; i++) {
        if(weather.currTemp.indexOf(data.list[i].main.temp) === -1) {
          weather.currTemp.push(data.list[i].main.temp);
          weather.currTime.push(data.list[i].dt_txt);
          weather.currDes = (data.list[i].weather[0].description); 
       }
    }
    for (var i = 8; i < 20; i++){ 
      var date = data.list[i].dt_txt;
      date = date.split('-')[2].slice(0,2);
      console.log(date,'date',next);
      if (toCompare+2 === Number(date)&& next !== Number(date) && weather.nextTemp.indexOf(data.list[i].main.temp_max) === -1) {
        weather.nextTemp.push(data.list[i].main.temp_max);
        next = Number(date);
        toCompare++;
      }
     }
    console.log(weather.nextTemp);
    }
    weather.fixTime();
    weather.fixTemp();
}


weather.getWeather = function() {
  $.getJSON("http://api.openweathermap.org/data/2.5/forecast/weather?q="+weather.currCity+','+weather.currCountry+"&APPID=065e2a4e3458919fab77ce9a708f4c8b", weather.renderResponse);    
}

weather.getCity = function() {
  console.log('ji', weather.currCity);
  $("#city").text(weather.currCity + ','+ weather.currState);
  weather.getWeather();
}

$(document).ready(function() {
  $.get("http://ipinfo.io", function(response){
   weather.currCity = response.city;
   weather.currState = response.region;
   weather.currCountry = response.country;
   weather.getCity();
   }, "jsonp");
});

