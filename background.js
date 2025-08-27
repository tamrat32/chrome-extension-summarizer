function summarizeText(text, sentenceCount = 3) {
  if (!text) return "";
  text = text.replace(/\s+/g, " ").trim();
  const sentences = text.match(/[^.!?]+[.!?]+|\S+$/g) || [text];
  if (sentences.length <= sentenceCount) return text;

  const stopwords = new Set(["the","is","in","at","of","a","and","to","it","for","on","as","with","that","this","by","an","be","are","or","from","was","were","but","we","they","you","he","she","his","her","their","our","not"]);
  const words = text.toLowerCase().match(/[a-zA-Z']+/g) || [];
  const freq = {};
  for (const w of words) {
    if (w.length < 3 || stopwords.has(w)) continue;
    freq[w] = (freq[w] || 0) + 1;
  }

  const scored = sentences.map((s, idx) => {
    const tokens = (s.toLowerCase().match(/[a-zA-Z']+/g) || []);
    let score = 0;
    for (const t of tokens) score += (freq[t] || 0);
    const lengthPenalty = Math.log(tokens.length + 2);
    score = score / lengthPenalty;
    return { idx, s: s.trim(), score };
  });

  const top = scored.sort((a,b)=>b.score - a.score).slice(0, sentenceCount).sort((a,b)=>a.idx-b.idx);
  return top.map(x=>x.s).join(" ");
}

async function getSummaryLength() {
  return new Promise(resolve => {
    chrome.storage.sync.get({ summarySentences: 3 }, (data) => resolve(data.summarySentences));
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "qs-summarize",
    title: "Summarize selection",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "qs-summarize") {
    const sentenceCount = await getSummaryLength();
    const summary = summarizeText(info.selectionText || "", sentenceCount);
    if (summary) {
      try {
        await chrome.tabs.sendMessage(tab.id, { type: "SHOW_SUMMARY", payload: { summary } });
      } catch (e) {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icons/icon128.png",
          title: "Quick Summary",
          message: summary.slice(0, 250)
        });
      }
    }
  }
});

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg?.type === "SUMMARIZE_TEXT") {
    const sentenceCount = await getSummaryLength();
    const summary = summarizeText(msg.payload?.text || "", sentenceCount);
    sendResponse({ summary });
  }
  return true;
});
