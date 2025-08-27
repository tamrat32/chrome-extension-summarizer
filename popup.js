function sendToBackground(text) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: "SUMMARIZE_TEXT", payload: { text } }, (resp) => {
      resolve(resp?.summary || "");
    });
  });
}

document.getElementById("summarize").addEventListener("click", async () => {
  const input = document.getElementById("input").value.trim();
  const out = document.getElementById("output");
  out.textContent = "Summarizing...";
  const summary = await sendToBackground(input);
  out.textContent = summary || "No summary produced. Try adding more text.";
});

document.getElementById("copy").addEventListener("click", async () => {
  const out = document.getElementById("output").textContent;
  try {
    await navigator.clipboard.writeText(out);
    alert("Summary copied.");
  } catch (e) {
    alert("Copy failed: " + e.message);
  }
});
