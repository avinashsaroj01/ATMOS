setInterval(getDateAndGreeting, 1000);

function getDateAndGreeting() {
  const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function getFullDay(x) {
    switch (x) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
    }
    return day;
  }

  const d = new Date();
  let day = d.getDay();
  let month = d.getMonth();
  let date = d.getDate();
  let greeting = getGreeting();
  document.querySelector(".greetings-day").innerHTML = getFullDay(day);
  document.querySelector(".greetings-month").innerHTML = monthArray[month];
  document.querySelector(".greetings-date").innerHTML = date;
  document.querySelector(".greetings-phrase").innerHTML = greeting;

  function getGreeting() {
    let completeDate = new Date();
    let hour = completeDate.getHours();
    greets = ["Good Morning", "Good Afternoon", "Good Evening", "Time to Sleep It Off"]
    let greeting = "";

    if (hour >= 5 && hour < 12) {
      greeting = greets[0];
    }
    else if (hour >= 12 && hour < 17) {
      greeting = greets[1];
    }
    else if (hour >= 17 && hour <= 23) {
      greeting = greets[2];
    }
    else if (hour >= 0 && hour < 5) {
      greeting = greets[3];
    }
    console.log(greeting);
    return greeting;
    

  }


}
