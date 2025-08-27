const input = document.getElementById("summarySentences");
const saveBtn = document.getElementById("saveBtn");

chrome.storage.sync.get({ summarySentences: 3 }, (data) => {
  input.value = data.summarySentences;
});

saveBtn.addEventListener("click", () => {
  const value = parseInt(input.value) || 3;
  chrome.storage.sync.set({ summarySentences: value }, () => {
    alert("Saved!");
  });
});
