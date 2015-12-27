var weather = {
  currTemp:[],
  currTime:[],
  currDes:"",
  nextTemp:[],
  currIcon:[],
  currUnit:"F",
  days: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
}
weather.fixBG = function() {
  switch(weather.currIcon[0]) {
    case "Clouds":
      var end = document.getElementById("time-0").textContent;
      if (end.includes("PM") && Number(end[0,1]) >= 6 || end.includes('AM') && Number(end[0,1]) < 4 || Number(end[0,1]) === 12) {
        document.body.style.backgroundImage = "url('2013-08-20-Blue-moon-cloudy-night.jpg')";
      } else {
        document.body.style.backgroundImage = "url('cloud21.jpg')";
      }
    break;
    
    case "Rain": 
      document.body.style.backgroundImage = "url('rainydayswallpapercollectionseriesone09.jpg')";
    break;
    case "Clear": 
      var end = document.getElementById("time-0").textContent;
      if (end.includes("PM") && Number(end[0,1]) >= 6 || end.includes('AM') && Number(end[0,1]) < 4 || Number(end[0,1]) === 12) {
        document.body.style.backgroundImage = "url('darkclearnight.jpg')";
      } else {
        document.body.style.backgroundImage = "url('Clear-sky-1363594685_18.jpg')";
      }
    break;
  }

}
weather.fixIcon = function() {
  var i = 0;
    console.log(weather.currIcon.length,weather.currIcon);
  while (i < weather.currIcon.length) {
    switch(weather.currIcon[i]) {
      case "Clear":
        console.log(end);
        if (document.getElementById("time-"+i) !== null) {
          var end = document.getElementById("time-"+i).textContent 
        } else {
          var end = "";
        }

        if (end.includes('PM') && Number(end[0,1]) >= 6 || end.includes('AM') && Number(end[0,1]) < 4 || Number(end[0,1]) === 12) {
          console.log('icon',document.getElementById("icon-"+i),'iconloop',end,document.getElementById("time-"+i));
          document.getElementById("icon-"+i).src="6iyoXBjAT.svg";
        } else {
                    console.log('icon2loop',end,document.getElementById("time-"+i));

          document.getElementById("icon-"+i).src = "Nuvola_weather_sunny.svg"; 
        }
      break;
      case "Rain":
        document.getElementById("icon-"+i).src="Nuvola_weather_showers.svg";
      break;
      case "Clouds":
        if (document.getElementById("time-"+i) !== null) {
          var end = document.getElementById("time-"+i).textContent
                    console.log('iconloopindese',end,document.getElementById("time-"+i));

          } else {
            var end = "";
          }
        if (end.includes('PM') && Number(end[0,1]) >= 6 || end.includes('AM') && Number(end[0,1]) < 4 || Number(end[0,1]) === 12) {
                    console.log('iconloop',end,document.getElementById("time-"+i));

          document.getElementById("icon-"+i).src="moon-and-clouds.svg";
        } else {
          console.log('ji',document.getElementById("icon-"+i),weather.currIcon[i-1]);
          document.getElementById("icon-"+i).src = "Nuvola_weather_light_cloud.svg.png";
        } 
        break;
    }
  
  i++;
  }
}

weather.fToC = function() {
  weather.currUnit = "C";
  var temp = weather.currTemp.map(function(a) {
    return (a > 273.15) ? Math.round(a - 273.15) : Math.round(273.15-a);
  });
  for (var i = 0; i < temp.length; i++) {
    document.getElementById('day-'+i).textContent = temp[i]+String.fromCharCode(176);
  };
  var nextDay = weather.nextTemp.map(function(a) {
    return (a > 273.15) ? Math.round(a-273.15) : Math.round(273.15-a);
  });
    console.log(weather.nextTemp);
  for (var i = 0; i < nextDay.length; i++) {

    document.getElementById('next-day-'+i).textContent = nextDay[i] + String.fromCharCode(176);
  }
      $("#currWeat").text(temp.shift() + String.fromCharCode(176)+weather.currUnit);


}
weather.fixDisplay = function() {
  var currD = new Date(); 
  weather.currDes = weather.currDes.split(' ').map(function(a) {
    return a.slice(0,1).toUpperCase() + a.slice(1,a.length);
  }).join(' ');

  $(".weatherDes").text(weather.currDes)
  $("#date").text(weather.days[currD.getDay()]);
  if (currD.getDay()+1 >= 7 || currD.getDay()+2 >= 7) {
    console.log('hi',currD.getDay());
   var num = (currD.getDay()+1) % weather.days.length;
   var num2 = (currD.getDay()+2) % weather.days.length;
   $("#nextday").text(weather.days[num]);
   $("#dayafter").text(weather.days[num2]);
    console.log(num,num2,weather.days[num],weather.days[num2]);
    console.log(num2);
  } else {
    console.log('well');
   $("#nextday").text(weather.days[currD.getDay()+1]);
   $("#dayafter").text(weather.days[currD.getDay()+2]);
  }
}

weather.fixTemp = function() {
  weather.currUnit = "F";
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

  
    $("#currWeat").text(temp.shift() + String.fromCharCode(176)+weather.currUnit);
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
  console.log(data)
  var currD = new Date();
  var toCompare = currD.getDate();
  var next = currD.getDate();
  for (var prop in data ) {
    for (var i = 0; i < 5; i++) {
        if (weather.currTemp.indexOf(data.list[i].main.temp) === -1) {
          weather.currTemp.push(data.list[i].main.temp);
          weather.currTime.push(data.list[i].dt_txt);
          weather.currIcon.push(data.list[i].weather[0].main);
          weather.currDes = (data.list[i].weather[0].description); 
      }
    }
    console.log('cuurent',toCompare,'next',next);
    for (var i = 8; i < 20; i++){
      console.log(data,'the data'); 
      var date = data.list[i].dt_txt;
      console.log('the date',date);
      date = date.split('-')[2].slice(0,2);
      console.log('next day',next,'date',date);
      if (toCompare+2 === Number(date)&& next !== Number(date) && weather.nextTemp.indexOf(data.list[i].main.temp_max) === -1) {
        weather.nextTemp.push(data.list[i].main.temp_max);
        weather.currIcon.push(data.list[i].weather[0].main);
        next = Number(date);
        toCompare++;
      }
     }
    }
    weather.fixTime();
    weather.fixBG();
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
   weather.lat = response.loc.split(',')[0];
   weather.lon = response.loc.split(',')[1];
  console.log(weather.lat,'wo',weather.lon);
   weather.getCity();
   }, "jsonp");
  
   $("#currWeat").on('click',function() {
      if (weather.currUnit === "F") {
        weather.fToC();
      } else {
        weather.fixTemp();
      }
  });
});

