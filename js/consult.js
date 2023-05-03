var callAPISubmitFeedback = (feedbackInput,userName)=>{
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
    fetch("https://trtbhfsrkl.execute-api.eu-west-2.amazonaws.com/dev", requestOptions) //TODO: to changed the API
    .then(response => response.text())
    .then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('error', error));
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
  
var phq2FormSubmit = document.getElementById("submit-phq2-form");
phq2FormSubmit.addEventListener("submit", submitFormPHQ2);
