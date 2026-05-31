function calculateGSM() {
    const weight = parseFloat(document.getElementById("fabricWeight").value);
    const area = parseFloat(document.getElementById("fabricArea").value);
    const result = document.getElementById("gsmResult");
  
    if (isNaN(weight) || isNaN(area) || area === 0) {
      result.textContent = "Please enter valid values.";
      return;
    }
  
    const gsm = (weight / area).toFixed(2);
    result.textContent = `GSM: ${gsm} g/m²`;
  }
  
  function convert() {
    const value = parseFloat(document.getElementById("inputValue").value);
    const type = document.getElementById("conversionType").value;
    const result = document.getElementById("conversionResult");
  
    if (isNaN(value)) {
      result.textContent = "Please enter a valid number.";
      return;
    }
  
    let converted;
    if (type === "denierToTex") {
      converted = (value / 9).toFixed(2);
      result.textContent = `${value} denier = ${converted} tex`;
    } else {
      converted = (value * 9).toFixed(2);
      result.textContent = `${value} tex = ${converted} denier`;
    }
  }
  
  function calculateThreadCount() {
    const warp = parseFloat(document.getElementById("warpDensity").value);
    const weft = parseFloat(document.getElementById("weftDensity").value);
    const result = document.getElementById("threadCountResult");
  
    if (isNaN(warp) || isNaN(weft)) {
      result.textContent = "Enter valid warp and weft densities.";
      return;
    }
  
    const threadCount = warp + weft;
    result.textContent = `Thread Count: ${threadCount} threads/inch`;
  }
  
  function calculateCost() {
    const gsm = parseFloat(document.getElementById("gsmCost").value);
    const area = parseFloat(document.getElementById("costArea").value);
    const price = parseFloat(document.getElementById("costPerGram").value);
    const result = document.getElementById("costResult");
  
    if (isNaN(gsm) || isNaN(area) || isNaN(price)) {
      result.textContent = "Enter valid GSM, area, and cost per gram.";
      return;
    }
  
    const totalGrams = gsm * area;
    const totalCost = (totalGrams * price).toFixed(2);
    result.textContent = `Estimated Cost: $${totalCost}`;
  }
  
  function convertYarn() {
    const value = parseFloat(document.getElementById("yarnInput").value);
    const type = document.getElementById("yarnType").value;
    const result = document.getElementById("yarnResult");
  
    if (isNaN(value)) {
      result.textContent = "Enter a valid yarn count.";
      return;
    }
  
    let converted;
    if (type === "neToNm") {
      converted = (value * 1.693).toFixed(2);
      result.textContent = `${value} Ne = ${converted} Nm`;
    } else {
      converted = (value / 1.693).toFixed(2);
      result.textContent = `${value} Nm = ${converted} Ne`;
    }
  }
  
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      calculateGSM();
      convert();
      calculateThreadCount();
      calculateCost();
      convertYarn();
    }
  });
  