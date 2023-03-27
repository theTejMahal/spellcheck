function highlightText() {
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var text = range.toString();
  
    if (range.startContainer.nodeType === Node.TEXT_NODE && range.endContainer.nodeType === Node.TEXT_NODE) {
      var span = document.createElement("span");
      span.style.backgroundColor = "yellow";
      span.textContent = text;
  
      range.deleteContents();
      range.insertNode(span);
  
      chrome.runtime.sendMessage({action: "fixGrammar", text: text}, function(response) {
        span.textContent = response.fixedText;
      });
    }
  }
  
  function isInsideContentEditable(selection) {
    var currentNode = selection.anchorNode;
    while (currentNode) {
      if (currentNode.contentEditable === 'true') {
        return true;
      }
      currentNode = currentNode.parentNode;
    }
    return false;
  }
  
  document.addEventListener("mouseup", function() {
    var selection = window.getSelection();
    if (selection.toString().length > 0 && !isInsideContentEditable(selection)) {
      highlightText();
    }
  });
  