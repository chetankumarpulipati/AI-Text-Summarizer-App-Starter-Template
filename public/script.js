document.addEventListener("DOMContentLoaded", function() {
  const textArea = document.getElementById("text_to_summarize");
  const submitButton = document.getElementById("submit-button");
  const summarizedTextArea = document.getElementById("summary");
  const pdfdownload = document.getElementById("download-pdf-button");

  submitButton.disabled = true;
  textArea.addEventListener("input", verifyTextLength);
  submitButton.addEventListener("click", submitData);

  function verifyTextLength(e) {
    const textarea = e.target;

    if (textarea.value.length > 200 && textarea.value.length < 100000) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }

  function submitData(e) {
    submitButton.classList.add("submit-button--loading");
    const text_to_summarize = textArea.value;

    fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: text_to_summarize })
    })
      .then(response => response.json())
      .then(data => {
        const summary = data.summary;
        summarizedTextArea.value = summary;
        submitButton.classList.remove("submit-button--loading");
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  function generatePDF() {
    var text = summarizedTextArea.value;
    var pdf = new jspdf.jsPDF();
    var maxWidth = 180;
    var x = 10;
    var y = 20;
    var lineHeight = 7;
    var lines = pdf.splitTextToSize(text, maxWidth);
    lines.forEach(function(line) {
      pdf.text(x, y, line);
      y += lineHeight;
    });
    pdf.save('summarized.pdf');
  }

  pdfdownload.addEventListener('click', generatePDF);

});