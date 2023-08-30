document.getElementById('fetchBalanceSheet').addEventListener('click', async () => {
    const accountingProvider = document.getElementById('accountingProvider').value;
    try {
      const response = await fetch(`/fetchBalanceSheet?provider=${accountingProvider}`);
      const balanceSheet = await response.json();
      displayBalanceSheet(balanceSheet);
    } catch (error) {
      console.error(error);
    }
  });
  
  document.getElementById('submitApplication').addEventListener('click', async () => {
    const businessName = document.getElementById('businessName').value;
    const yearEstablished = document.getElementById('yearEstablished').value;
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const accountingProvider = document.getElementById('accountingProvider').value;
  
    try {
      const balanceSheetResponse = await fetch(`/fetchBalanceSheet?provider=${accountingProvider}`);
      const balanceSheet = await balanceSheetResponse.json();
  
      const applicationData = {
        businessName,
        yearEstablished,
        balanceSheet,
        loanAmount
      };
  
      const response = await fetch('/processApplication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(applicationData)
      });
  
      const applicationResult = await response.json();
      displayApplicationResult(applicationResult);
    } catch (error) {
      console.error(error);
    }
  });
  
  function displayBalanceSheet(balanceSheet) {
    const balanceSheetDiv = document.getElementById('transaction-history');
    balanceSheet.forEach(entry => {
      balanceSheetDiv.innerHTML +=`<tr>
      <td>
                                                 
      ${entry.year}
      </td>
      <td>${entry.month}</td>
      <td>${entry.profitOrLoss}</td>
      <td>
                ${entry.assetsValue}
      </td>
  </tr>`
     // balanceSheetDiv.innerHTML += `<p>Year: ${entry.year}, Month: ${entry.month}, Profit/Loss: ${entry.profitOrLoss}, Assets Value: ${entry.assetsValue}</p>`;
    });
  }
  
  function displayApplicationResult(result) {
    console.log(result);
    const applicationResultDiv = document.getElementById('applicationResult');
    
    applicationResultDiv.innerHTML += `<p>Business Name: ${result.businessName}</p>`;
    applicationResultDiv.innerHTML += `<p>Year Established: ${result.yearEstablished}</p>`;
   
    applicationResultDiv.innerHTML += '<p>Profit/Loss Summary by Year:-</p>';
    for (const year in result.profitLossSummary) {
      applicationResultDiv.innerHTML += `<p>Year: ${year}, Profit/Loss: ${result.profitLossSummary[year]}</p>`;
    }
    applicationResultDiv.innerHTML += `<p>Pre-Assessment: ${result.preAssessment}</p>`;
  }
  