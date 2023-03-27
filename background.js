chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "fixGrammar") {
    var openaiApiKey = "REPLACE";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.openai.com/v1/edits", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + openaiApiKey);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        sendResponse({fixedText: response.choices[0].text});
      }
    };
    xhr.send(JSON.stringify({
      "model": "text-davinci-edit-001",
      "input": request.text,
      "instruction": "Fix the spelling and grammar mistakes.",
      "temperature": 0.5
    }));
    return true;
  }
});