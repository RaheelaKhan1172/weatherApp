var weather = {
}

weather.renderResponse = function(data) {
  console.log(data);
  weather.html = "";
  for (var prop in data ) {
    weather.html = '<p>' + data.list[0].main.humidity +' ' + data.list[0].main.temp + '</p>';
    console.log(data.list[0].weather[0].description);
  }
  $("#currWeat").text(weather.html);
}


weather.getWeather = function() {
  $.getJSON("http://api.openweathermap.org/data/2.5/forecast/weather?q="+weather.currCity+','+weather.currCountry+"&APPID=065e2a4e3458919fab77ce9a708f4c8b", weather.renderResponse);    
}
weather.getStuff = function() {
  console.log('ji', weather.currCity);
  $("#city").text(weather.currCity);
  weather.getWeather();
}



$(document).ready(function() {
  //call ipinfo to get location, send this to function that will retrieve weather
  $.get("http://ipinfo.io", function(response){
   weather.currCity = response.city;
   weather.currState = response.region;
   weather.currCountry = response.country;
   weather.getStuff();
  console.log(response.city,response.region,response.country, weather.currCity,weather.currState,weather.currCountry);
   }, "jsonp");
});

