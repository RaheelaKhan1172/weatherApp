var weather = {
  currTemp:[],
  currTime:[],
  currDes:"",
  nextTemp:[],
  currIcon:[], 
  days: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
}
weather.fixIcon = function() {
  var i = 0;
    console.log(weather.currIcon.length);
  while (i < weather.currIcon.length) {
    switch(weather.currIcon[i]) {
      case "Clear":
        var end = document.getElementById("time-"+i).textContent;
        if (end.includes('PM') && Number(end[0,1]) >= 6 || end.includes('AM') && Number(end[0,1]) < 4 || Number(end[0,1]) === 12) {
          document.getElementById("icon-"+i).src="clearnight.jpg";
        } else {
          document.getElementById("icon-"+i).src ="Untitled.jpg";
        }


    }
  
  i++;
  }


}
weather.fixDisplay = function() {
  var currD = new Date();
  $(".weatherDes").text(weather.currDes);
  $("#date").text(weather.days[currD.getDay()]);
  if (currD.getDay()+1 >= 7 || currD.getDay()+2 >= 7) {
    console.log('hi');
   var num = currD.getDay()+1 % weather.days.length;
   var num2 = (currD.getDay()+2) % weather.days.length;
   $("#nextday").text(weather.days[num]);
   $("#dayafter").text(weather.days[num2]);
    console.log(num2);
  } else {
    console.log('well');
   $("#nextday").text(weather.days[currD.getDay()+1]);
   $("#dayafter").text(weather.days[currD.getDay()+2]);
  }
}

weather.fixTemp = function() {
  var temp = weather.currTemp.map(function(a) {
    return Math.round((9/5)*(a-273) +32);
  }); 
  for (var i = 0; i < temp.length; i++) {
    document.getElementById('day-'+i).textContent = temp[i]+String.fromCharCode(176);
  };
  var nextDay = weather.nextTemp.map(function(a) {
    return Math.round((9/5)*(a-273)+32);
  });
    console.log(weather.nextTemp);
  for (var i = 0; i < nextDay.length; i++) {
    document.getElementById('next-day-'+i).textContent = nextDay[i] + String.fromCharCode(176);
  }
    $("#currWeat").text(temp.shift());
  weather.fixDisplay();
  
}

weather.fixTime = function() {
  var time = weather.currTime.map(function(a) {
    return a.split(' ')[1];
  }).map(function(b) {
    b = b.split(':')[0];
    if (b > 12) {
      console.log(b);
      return ("0"+Number(b)%12+":00 AM");
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
          weather.currIcon.push(data.list[i].weather[0].main);
          weather.currDes = (data.list[i].weather[0].description); 
      }
    }
    console.log(weather.currIcon);
    for (var i = 8; i < 20; i++){ 
      var date = data.list[i].dt_txt;
      date = date.split('-')[2].slice(0,2);
      console.log(date,'date',next);
      if (toCompare+2 === Number(date)&& next !== Number(date) && weather.nextTemp.indexOf(data.list[i].main.temp_max) === -1) {
        weather.nextTemp.push(data.list[i].main.temp_max);
                console.log(toCompare,'hi',next,date);
        weather.currIcon.push(data.list[i].weather[0].main);
        next = Number(date);
        console.log(toCompare,'hi',next,date);
        toCompare++;
      }
     }
    }
    weather.fixTime();
    weather.fixTemp();
    weather.fixIcon();
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

