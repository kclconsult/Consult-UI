var callAPISubmitFeedback = (feedbackInput,userName)=>{
    if (feedbackInput.length>0){
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



var callAPIGetFeedbackText = (userName)=>{
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
    var APIlink = "https://hlufzfqexd.execute-api.eu-west-2.amazonaws.com/dev"+"?userName=" + userName; //TODO: This is not solved yet -- how to pass the username to API
    // make API call with parameters and use promises to get response
    fetch(APIlink, requestOptions)
    .then(response => {return response.json()})
    .then(data => {console.log(data);
      alert(JSON.stringify(data));
      let text = "";
      for (let i = 0; i < data.length; i++) {
        text += JSON.stringify(data[i].Time) + ": " + JSON.stringify(data[i].Feedback) + "<br>";
      }
      document.getElementById("feedback-data-from-db").innerHTML = text;
    })
    .catch((error) => console.log("error:", error));
    // Need to change format of output, line by line.
    
}

// https://html.form.guide/action/html-form-action-javascript-example/
// Submit data EXAMPLE, for test. FEEL FREE TO DELETE
function submitFormPHQ2(e) {
    e.preventDefault();   
    var myform = document.getElementById("wf-form-phq2-form-block");   
    var formData = new FormData(myform);
  
    fetch("https://show.ratufa.io/json", {
      method: "POST",
      body: formData,
    })
      .then(response => {
      if (!response.ok) {
        throw new Error('network returns error');
      }
      return response.json();
    })
      .then((resp) => {
        let respdiv = document.createElement("pre");
        respdiv.innerHTML = JSON.stringify(resp, null, 2);
        myform.replaceWith(respdiv);
        console.log("resp from server ", resp);
      })
      .catch((error) => {
        // Handle error
        console.log("error ", error);
      });
}
  
// var phq2FormSubmit = document.getElementById("submit-phq2-form");
// phq2FormSubmit.addEventListener("submit", submitFormPHQ2);
