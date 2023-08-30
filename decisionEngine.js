exports.processApplication = async (applicationData) => {
    const { businessName, yearEstablished, balanceSheet, loanAmount } = applicationData;
  
    // Calculate the summary of profit/loss by year
    const profitLossSummary = calculateProfitLossSummary(balanceSheet);
  
    // Calculate the pre-assessment based on your rules
    let preAssessment = 20;
    const averageAssets = balanceSheet.reduce((sum, entry) => sum + entry.assetsValue, 0) / balanceSheet.length;
    const lastYearProfit = balanceSheet[0].profitOrLoss;
  
    if (lastYearProfit > 0) {
      preAssessment = 60;
    } else if (averageAssets > loanAmount) {
      preAssessment = 100;
    }
  
    const applicationResult = {
      businessName,
      yearEstablished,
      balanceSheet,
      profitLossSummary, // Add the profit/loss summary here
      preAssessment
    };
    return applicationResult;
  };
  
  // Function to calculate profit/loss summary by year
  function calculateProfitLossSummary(balanceSheet) {
    const summary = {};
  
    balanceSheet.forEach(entry => {
      const year = entry.year;
      const profitOrLoss = entry.profitOrLoss;
  
      if (!summary[year]) {
        summary[year] = 0;
      }
  
      summary[year] += profitOrLoss;
    });
  
    return summary;
  }
  