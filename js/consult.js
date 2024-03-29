// Zhuoling added

// Hide address of Dashboard
// window.history.replaceState('','','/');

/* 
* Document Object Model (DOM)
*/
$( document ).ready(function() {
    // console.log("DOM is load.");
    var pageURL = window.location.href;
    pageURL = pageURL.toString();

    // get url string
    var paramIndex = pageURL.indexOf("#"); // hosted on web uses ? localhost uses # instead;
    if (paramIndex === -1){
        return;
    }
    var parameters = pageURL.substring(paramIndex + 1);
    var idToken = getParameter(parameters, "id_token=");
    var idTokenDecoded = atob(idToken.split('.')[1]);
    var idTokenJson = JSON.parse(idTokenDecoded);
    var text = "Logged in as: " + idTokenJson.sub;
    document.getElementById("display-username").innerHTML = text;
});


function getUsername(){
    var pageURL = window.location.href;
    pageURL = pageURL.toString();

    // get url string
    var paramIndex = pageURL.indexOf("#"); //  hosted on web uses ? localhost uses # instead;
    if (paramIndex === -1){
        return;
    }
    var parameters = pageURL.substring(paramIndex + 1);
    var idToken = getParameter(parameters, "id_token=");
    var idTokenDecoded = atob(idToken.split('.')[1]);
    var idTokenJson = JSON.parse(idTokenDecoded);
    var username = idTokenJson.sub;
    return username;
}


// Split parameters in the URL;;
function getParameter(url,param){
    var urlVars = url.split('&');
    var returnValue;
    for (var i = 0; i < urlVars.length; i++){
        var urlParam = urlVars[i];
        // get up to index
        var index = urlParam.toString().indexOf("=");
        urlParam = urlParam.substring(0, index + 1);
        if (param === urlParam){
            returnValue = urlVars[i].replace(param,"");
            i = urlVars.length; //exit the loop
        }
    }
    return returnValue;
}


// Feedback Tab -- submit feedbacks to database 
var callAPISubmitFeedback = (feedbackInput,userName)=>{
    if (feedbackInput.length>0){
        userName = getUsername();
        if (userName.length==0){
            userName = "TempUserName";
        }
        // Get current date and time
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        // instantiate a headers object
        var myHeaders = new Headers();
        // add content type header to object
        myHeaders.append("Content-Type", "application/json");
        // using built in JSON utility package turn object to string and store in a variable
        var raw = JSON.stringify({"time":dateTime, "userName":userName,"feedbackInput":feedbackInput});
        // create a JSON object with parameters for API call and store in a variable
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        // make API call with parameters and use promises to get response
        fetch("https://trtbhfsrkl.execute-api.eu-west-2.amazonaws.com/dev", requestOptions) 
        .then(response => response.text())
        .then(result => alert(JSON.parse(result).body))
        .catch(error => console.log('error', error));
    }
    else{
        alert("Feedback or note must be filled out before submitting");
        // return false;
    }
}


// Feedback Tab -- download feedbacks from database 
var callAPIGetFeedbackText = (userName)=>{
    userName = getUsername();
    if (userName.length==0){
        userName = "TempUserName";
    }
    // add content type header to object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        headers: myHeaders,
        method: 'GET',
        // queryStringParameters: userName
    };
    // API + quary params
    var APIlink = "https://hlufzfqexd.execute-api.eu-west-2.amazonaws.com/dev"+"?userName=" + userName; 
    // make API call with parameters and use promises to get response
    fetch(APIlink, requestOptions)
    .then(response => {return response.json()})
    .then(data => {
      let text = "";
      for (let i = 0; i < data.length; i++) {
        text += JSON.stringify(data[i].Time) + ": " + JSON.stringify(data[i].Feedback) + "<br>";
      }
      document.getElementById("feedback-data-from-db").innerHTML = text;
    })
    .catch((error) => console.log("error:", error));
    // Need to change format of output, line by line.
    
}


// Summary Tab -- get latest mood (and the date)/HR/BP from database 
var callAPIGetMoodText = (userName)=>{
  userName = getUsername();
  if (userName.length==0){
    userName = "TempUserName";
  }
  // add content type header to object
  var myHeaders = new Headers();
  // add content type header to object
  myHeaders.append("Content-Type", "application/json");
  // create a JSON object with parameters for API call and store in a variable
  var requestOptions = {
      headers: myHeaders,
      method: 'GET',
      // queryStringParameters: userName
  };
  // API + quary params
  var APIlink = "https://pmmxjmsimi.execute-api.eu-west-2.amazonaws.com/dev"+"?userName=" + userName; //TODO: This is not solved yet -- how to pass the username to API
  // make API call with parameters and use promises to get response
  fetch(APIlink, requestOptions)
  .then(response => {return response.json()})
  .then(data => {
    //alert("Data downloaded.");
    let maxtimestamp = 0;
    let recent_index = 0;
      if (data.length > 0){
        for (let i = 0; i < data.length; i++) {
          if (data[i].time_stamp > maxtimestamp){
            maxtimestamp = data[i].time_stamp;
            recent_index = i;
          };
        }
        // Element Id NEED to be changed
        document.getElementById("tab-summary-mood-text").innerHTML = "Mood:" + " " + data[recent_index].Mood;
        document.getElementById("tab-summary-mood-date").innerHTML = "Date:" + " " + data[recent_index].Time;
        // change tab colour and picture based on results
        var resultText = data[recent_index].Mood;
        if (resultText === "afraid"||resultText === "sad"||resultText === "tense"||resultText === "frustrated"||resultText === "angry"||resultText === "miserable"||resultText === "gloomy"||resultText === "tired") {
          document.getElementById("summary-grid-mood").style.backgroundColor = "#ee6863"; 
          document.getElementById("summary-grid-mood-picture").src= "images/mood-bad.png";
        }
        else if (resultText === "excited"||resultText === "delighted"||resultText === "happy"||resultText === "glad"||resultText === "satisfied"||resultText === "calm"||resultText === "sleepy"||resultText === "serene") {
          document.getElementById("summary-grid-mood").style.backgroundColor = "#71b4e0"; 
          document.getElementById("summary-grid-mood-picture").src= "images/mood-good.png";
        } 
        else {
          document.getElementById("summary-grid-mood").style.backgroundColor = "#999";
          document.getElementById("summary-grid-mood-picture").src= "images/mood-meh.png";
        };  
        var today = new Date().getTime()/1000; // in seconds
        //If it was taken more than 7 days ago (604800), show it in gray
        if (today -  data[recent_index].time_stamp > 604800) {
          document.getElementById("summary-grid-mood").style.backgroundColor = "#777";
          document.getElementById("tab-summary-mood-date").innerHTML = "Date:" +  " " + data[recent_index].Time + "<br />" + "(more than 7 days ago)";
        };
      }
      else {
        document.getElementById("summary-grid-mood").style.backgroundColor = "#999";
        document.getElementById("summary-grid-mood-picture").src= "images/mood-meh.png";
        document.getElementById("tab-summary-mood-text").innerHTML = "Mood: -";
        document.getElementById("tab-summary-mood-date").innerHTML = "Date: -";          
      }
  })
  .catch((error) => console.log("error:", error));

  // https://qswu939wtb.execute-api.eu-west-2.amazonaws.com/dev for HR data
  var APIlink = "https://qswu939wtb.execute-api.eu-west-2.amazonaws.com/dev"+"?userName=" + 0; //Username set to 0 to make all users see the same results
  // make API call with parameters and use promises to get response
  fetch(APIlink, requestOptions)
  .then(response => {return response.json()})
  .then(data => {
    if (data.length > 0) {
        document.getElementById("summary-grid-hr-text").innerHTML = "Heart rate: " +  data[2] + "<br />" + "Heart rate (resting): " +  data[1];
        var today = new Date().getTime()/1000; // in seconds
        const hr_record_date = new Date(data[0]);
        const hr_timestamp = hr_record_date.getTime()/1000;  // in seconds
        if (today -  hr_timestamp> 604800) {
          document.getElementById("summary-grid-hr").style.backgroundColor = "#777";
          document.getElementById("summary-grid-hr-date").innerHTML = "Date: " +  data[0] + "<br />" + "(more than 7 days ago)";
        }
        else if (data[1] >= 60 && data[1] <= 100 ){
          document.getElementById("summary-grid-hr").style.backgroundColor = "#71b4e0";
          document.getElementById("summary-grid-hr-date").innerHTML = "Date: " +  data[0];
          document.getElementById("tabHR-summary").innerHTML = "Summary info: Good.";
        }
        else{
          document.getElementById("summary-grid-hr").style.backgroundColor = "#ee6863"; // Red for warning abnormal heart rate (resting)
          document.getElementById("summary-grid-hr-date").innerHTML = "Date: " +  data[0];
          document.getElementById("tabHR-summary").innerHTML = "Summary info: Abnormal data detected.";
        };
    }
    else {
        document.getElementById("summary-grid-hr-text").innerHTML = "Heart rate: -" + "<br />" + "Heart rate (resting): -";
        document.getElementById("summary-grid-hr").style.backgroundColor = "#777";
        document.getElementById("summary-grid-hr-date").innerHTML = "Date: -";
    }
  })
  .catch((error) => console.log("error:", error));

  // https://4dqbgqz6j8.execute-api.eu-west-2.amazonaws.com/dev
  var APIlink = "https://4dqbgqz6j8.execute-api.eu-west-2.amazonaws.com/dev"+"?userName=" + 0; //Username set to 0 to make all users see the same results
  // make API call with parameters and use promises to get response
  fetch(APIlink, requestOptions)
  .then(response => {return response.json()})
  .then(data => {
    if (data.length > 0) {
        document.getElementById("summary-grid-bp-text").innerHTML = "SBP/DBP:"  +  data[1] + "/" +   data[2];
        var today = new Date().getTime()/1000; // in seconds
        const hr_record_date = new Date(data[0]);
        const hr_timestamp = hr_record_date.getTime()/1000;  // in seconds
        if (today -  hr_timestamp> 604800) {
          document.getElementById("summary-grid-bp").style.backgroundColor = "#777";
          document.getElementById("summary-grid-bp-date").innerHTML = "Date: " +  data[0] + "<br />" + "(more than 7 days ago)";
        }
        else if (data[1] >= 90 && data[1] <= 120 && data[2] >= 60 && data[2] <= 80){
          document.getElementById("summary-grid-bp").style.backgroundColor = "#71b4e0";
          document.getElementById("summary-grid-bp-date").innerHTML = "Date: " +  data[0];
          document.getElementById("tabBP-summary").innerHTML = "Summary info: Good.";
        }
        else{
          document.getElementById("summary-grid-bp").style.backgroundColor = "#ee6863"; // Red for warning abnormal BP
          document.getElementById("summary-grid-bp-date").innerHTML = "Date: " +  data[0];
          document.getElementById("tabBP-summary").innerHTML = "Summary info: Abnormal data detected.";
        };
    }
    else {
        document.getElementById("summary-grid-bp-text").innerHTML = "SBP/DBP: -/-" ;
        document.getElementById("summary-grid-bp").style.backgroundColor = "#777";
        document.getElementById("summary-grid-bp-date").innerHTML = "Date: -";
    }
  })
  .catch((error) => console.log("error:", error));
// ECG:
  document.getElementById("summary-grid-ecg").style.backgroundColor = "#71b4e0";
}


// Mood Tab --Mood grid (4x4) -- submit mood to database 
var callAPISubmitMood = (moodInput,userName)=>{
  userName = getUsername();
  if (userName.length==0){
      userName = "TempUserName";
  }
  // Get current date and time
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  // instantiate a headers object
  var myHeaders = new Headers();
  // add content type header to object
  myHeaders.append("Content-Type", "application/json");
  // using built in JSON utility package turn object to string and store in a variable
  var raw = JSON.stringify({"time":dateTime, "userName":userName,"moodInput":moodInput});
  // create a JSON object with parameters for API call and store in a variable
  var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };
  // make API call with parameters and use promises to get response
  fetch("https://u1aapxk6c3.execute-api.eu-west-2.amazonaws.com/dev", requestOptions) 
  .then(response => response.text())
  .then(result => alert(JSON.parse(result).body))
  .catch(error => console.log('error', error));
}




// Mood Tab -- PHQ2 submit: 
// 1) submit PHQ2 results to database
// 2) check if both "no", if true activate Mood-grid; if false, activate PHQ9
function submitFormPHQ2(userName) {
  userName = getUsername();
  if (userName.length==0){
    userName = "TempUserName";
  }
  // e.preventDefault();   
  var myform = document.getElementById("wf-form-phq2-form-block");   
  var formData = new FormData(myform); 
  var ele = myform.getElementsByTagName('input');
  var total_score = 0;
  var questionAnsweredNumber = 0;
  for (i = 0; i < ele.length; i++) {
    if (ele[i].type = "radio") {
      if (ele[i].checked){
        total_score += Number(ele[i].value);
        questionAnsweredNumber += 1;
      }  
    }
  }
  if (questionAnsweredNumber === 2){
    if (total_score === 0) {
      // Submit form to database: https://5sdps2spl4.execute-api.eu-west-2.amazonaws.com/dev
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      // instantiate a headers object
      var myHeaders = new Headers();
      // add content type header to object
      myHeaders.append("Content-Type", "application/json");
      // using built in JSON utility package turn object to string and store in a variable
      var raw = JSON.stringify({"time":dateTime, "userName":userName,"PHQ_9_value":"0","PHQ_2_value":"0"});
      // create a JSON object with parameters for API call and store in a variable
      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
      };
      // make API call with parameters and use promises to get response
      fetch("https://5sdps2spl4.execute-api.eu-west-2.amazonaws.com/dev", requestOptions) 
      .then(response => response.text())
      .then(result => alert(JSON.parse(result).body))
      .catch(error => console.log('error', error));
      
      document.getElementById("phq2-form").style.display = "none"
      document.getElementById("mood-grid").style.display = "block"
      for(var i=0;i<ele.length;i++)
        ele[i].checked = false;
    }
    else {
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      // instantiate a headers object
      var myHeaders = new Headers();
      // add content type header to object
      myHeaders.append("Content-Type", "application/json");
      // using built in JSON utility package turn object to string and store in a variable
      var raw = JSON.stringify({"time":dateTime, "userName":userName,"PHQ_9_value":"NaN","PHQ_2_value":total_score.toString()});
      // create a JSON object with parameters for API call and store in a variable
      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
      };
      // make API call with parameters and use promises to get response
      fetch("https://5sdps2spl4.execute-api.eu-west-2.amazonaws.com/dev", requestOptions) 
      .then(response => response.text())
      .then(result => alert(JSON.parse(result).body))
      .catch(error => console.log('error', error));

      document.getElementById("phq2-form").style.display = "none"
      document.getElementById("phq9-form").style.display = "block"
      document.getElementById("phq9-q10").style.display = "none"
      for(var i=0;i<ele.length;i++)
        ele[i].checked = false;
    }
    fetch("https://show.ratufa.io/json", {
      method: "POST",
      body: formData,
    })
  }
  else{
    alert("Please answer all the questions before sbumit.");
  } 
}


// Mood Tab -- PHQ9 submit: 
// 1) submit PHQ9 results to database
// 2) activate Question 10 if necessary (scored more than 0 in Q1 to Q9)
// 3) activate Mood-grid
function submitFormPHQ9(userName) {
  userName = getUsername();
  if (userName.length==0){
    userName = "TempUserName";
  }
  // e.preventDefault(); 
  var questionNeededNumber = 9; 
  var questionAnsweredNumber = 0;    
  var myform = document.getElementById("wf-form-phq9-form-block");   
  var ele = myform.getElementsByTagName('input');
  for (i = 0; i < ele.length; i++) {
    if (ele[i].type = "radio" && ele[i].checked) {
        questionAnsweredNumber += 1; 
    }
  }
  if (document.getElementById("phq9-q10").style.display === "block")
    questionNeededNumber = 10;
  if (document.getElementById("phq9-q10").style.display === "none")
    questionNeededNumber = 9;
  var total_score = 0;
  if (questionAnsweredNumber === questionNeededNumber){
    document.getElementById("phq9-form").style.display = "none"
    document.getElementById("mood-grid").style.display = "block" 
    if (questionNeededNumber === 9){
      for (i = 0; i < ele.length; i++) {
        if (ele[i].type = "radio" && ele[i].checked) {
          total_score += Number(ele[i].value);
        }
      }
    }
    if (questionNeededNumber === 10){
      for (i = 0; i < 36; i++) {
        if (ele[i].type = "radio" && ele[i].checked) {
            total_score += Number(ele[i].value);
        }
      }
      for (i = 36; i < 40; i++) {
        if (ele[i].type = "radio" && ele[i].checked) {
            total_score = total_score + "-" + ele[i].value;
        }
      }
    }
    // Submit to AWS: https://5sdps2spl4.execute-api.eu-west-2.amazonaws.com/dev
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({"time":dateTime, "userName":userName,"PHQ_9_value":String(total_score),"PHQ_2_value":"NaN"});
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://5sdps2spl4.execute-api.eu-west-2.amazonaws.com/dev", requestOptions) 
    .then(response => response.text())
    .then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('error', error));
    alert("Your answer has been submitted.");
    for(var i = 0;i < ele.length;i++)
      ele[i].checked = false;
  }
  else {
    alert("Please answer all the questions before sbumit.");    
  } 
}


// Mood Tab -- PHQ9 -- activate Question 10
function showPhq9Q10() {
  document.getElementById("phq9-q10").style.display = "block"
}


// Mood Tab -- PHQ9 -- hide Question 10
function checkForPhq9Q10() {
  var myform = document.getElementById("phq9-form-1to9-block");    
  var ele = myform.getElementsByTagName('input');
  var total_score = 0;
  for (i = 0; i < ele.length; i++) {
    if (ele[i].type = "radio") {
      if (ele[i].checked)
        total_score += Number(ele[i].value);
    }
  }
  if (total_score === 0) {
    // Submit form to database
    document.getElementById("phq9-q10").style.display = "none"
  }
}


// Mood Tab -- PHQ2 --check when is the last time took PHQ2 (PHQ2 should appear every week)
const checkPhqDate = async (userName) => {
  userName = getUsername();
  if (userName.length==0){
    userName = "TempUserName";
  }
  var myHeaders = new Headers();
  // add content type header to object
  myHeaders.append("Content-Type", "application/json");
  // create a JSON object with parameters for API call and store in a variable
  var requestOptions = {
      headers: myHeaders,
      method: 'GET',
      // queryStringParameters: userName
  };
  var APIlink = "https://rrdz4mzx1g.execute-api.eu-west-2.amazonaws.com/dev"+"?userName=" + userName;
  let moodPhqData  = await fetch(APIlink, requestOptions)
  //use string literals
  let moodPhqDataJson = await moodPhqData.json();
  return moodPhqDataJson;
 }

const callPHQ = async (userName) => {
  document.getElementById("phq9-form").style.display = "none"
  document.getElementById("mood-grid").style.display = "none"
  document.getElementById("phq2-form").style.display = "none"
  userName = getUsername();
  if (userName.length==0){
    userName = "TempUserName";
  }
  let data = await checkPhqDate(userName);
  var last_timestamp = 0;
  if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].time_stamp > last_timestamp){
          last_timestamp = data[i].time_stamp;
        };
      }
      // console.log(maxtimestamp);
      // alert(maxtimestamp);
      if (last_timestamp === 0){
        last_timestamp = new Date().getTime();
      }
      // console.log(last_timestamp);
      // alert(new Date().getTime());
      var x = document.getElementById("phq2-form");
      var today = new Date().getTime()/1000; // in seconds
      //If it was taken more than 7 days ago (604800), display PHQ-2
      if (today - last_timestamp > 604800) {
        x.style.display = "block";
      } else {
        x.style.display = "none";
        document.getElementById("mood-grid").style.display = "block"
      }
    }
    else {
        document.getElementById("phq2-form").style.display = "block";
    }
  }



// Mood Tab -- Mood grid --Confirm choice
function confirmWindow(userName) {
  userName = getUsername();
  if (userName.length==0){
    userName = "TempUserName";
  }
  let text = "Do you want to select this image? \nPress \"Cancel\" to reselect or press \"OK\" to conform.";
  if (confirm(text) == true) {
    text = "Mood submitted.";
    var moodId = event.target.id; //event.srcElement.id
    const myArray = moodId.split("-");
    let moodInput = myArray[2];
    // alert(moodInput);
    callAPISubmitMood(moodInput,userName);
  } 
  // document.getElementById("demo").innerHTML = text;
}
