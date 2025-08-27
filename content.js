function createOrGetBubble() {
  let bubble = document.getElementById("qs-summary-bubble");
  if (bubble) return bubble;
  bubble = document.createElement("div");
  bubble.id = "qs-summary-bubble";
  bubble.style.position = "fixed";
  bubble.style.right = "16px";
  bubble.style.bottom = "16px";
  bubble.style.maxWidth = "360px";
  bubble.style.zIndex = "2147483647";
  bubble.style.background = "white";
  bubble.style.border = "1px solid rgba(0,0,0,0.15)";
  bubble.style.borderRadius = "12px";
  bubble.style.padding = "12px 14px";
  bubble.style.boxShadow = "0 6px 24px rgba(0,0,0,0.12)";
  bubble.style.fontFamily = "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif";
  bubble.style.fontSize = "14px";
  bubble.style.lineHeight = "1.4";
  bubble.style.color = "#111";
  bubble.style.display = "grid";
  bubble.style.gridTemplateColumns = "1fr auto";
  bubble.style.gap = "8px";
  bubble.style.alignItems = "start";

  const title = document.createElement("div");
  title.textContent = "Quick Summary";
  title.style.fontWeight = "600";
  title.style.marginBottom = "4px";
  title.style.gridColumn = "1 / span 2";

  const content = document.createElement("div");
  content.id = "qs-summary-text";
  content.style.whiteSpace = "pre-wrap";

  const copyBtn = document.createElement("button");
  copyBtn.textContent = "Copy";
  copyBtn.style.cursor = "pointer";

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "×";
  closeBtn.style.cursor = "pointer";
  closeBtn.ariaLabel = "Close";

  copyBtn.onclick = () => {
    const text = content.textContent || "";
    navigator.clipboard.writeText(text);
    copyBtn.textContent = "Copied!";
    setTimeout(()=> copyBtn.textContent = "Copy", 1200);
  };
  closeBtn.onclick = () => bubble.remove();

  bubble.appendChild(title);
  bubble.appendChild(content);
  bubble.appendChild(copyBtn);
  bubble.appendChild(closeBtn);
  document.body.appendChild(bubble);
  return bubble;
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg?.type === "SHOW_SUMMARY") {
    const bubble = createOrGetBubble();
    const area = bubble.querySelector("#qs-summary-text");
    area.textContent = msg.payload?.summary || "";
  }
});
