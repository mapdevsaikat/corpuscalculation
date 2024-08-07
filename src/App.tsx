import React, { useState } from 'react';

interface CorpusCalculationProps {}

const CorpusCalculation: React.FC<CorpusCalculationProps> = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(80);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [inflationRate, setInflationRate] = useState(6);
  const [rateOfReturnPostRetirement, setRateOfReturnPostRetirement] = useState(8);
  const [wantToLeaveAnyEstate, setWantToLeaveAnyEstate] = useState(20000000);
  const [approximateRateOfReturn, setApproximateRateOfReturn] = useState(12);

  const calculatePostRetirementMonthlyExpense = () => {
    const yearsToRetirement = retirementAge - currentAge;
    const inflationFactor = Math.pow(1 + inflationRate / 100, yearsToRetirement);
    return Math.round(monthlyExpenses * inflationFactor);
  };

  const calculateCorpusRequiredAtRetirement = () => {
    const yearsInRetirement = lifeExpectancy - retirementAge;
    const postRetirementMonthlyExpense = calculatePostRetirementMonthlyExpense();
    const monthlyRateOfReturn = rateOfReturnPostRetirement / 100 / 12;
    const corpusRequired = postRetirementMonthlyExpense * 
      ((1 - Math.pow(1 + monthlyRateOfReturn, -yearsInRetirement * 12)) / monthlyRateOfReturn) + wantToLeaveAnyEstate;
    return Math.round(corpusRequired);};


const calculateSIPRequired = () => {
  const yearsToRetirement = retirementAge - currentAge;
  const corpusRequiredAtRetirement = calculateCorpusRequiredAtRetirement();
  const monthlyRateOfReturn = approximateRateOfReturn / 100 / 12;
  const sipRequired = corpusRequiredAtRetirement / 
    ((Math.pow(1 + monthlyRateOfReturn, yearsToRetirement * 12) - 1) / monthlyRateOfReturn);
  return Math.round(sipRequired);
};


  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Corpus Calculation App</h1>
      <form>
        <div className="flex flex-col mb-4">
          <label className="text-lg font-bold mb-2" htmlFor="currentAge">
            Current Age
          </label>
          <input
            type="number"
            id="currentAge"
            value={currentAge}
            onChange={(e) => setCurrentAge(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-lg font-bold mb-2" htmlFor="retirementAge">
            Retirement Age
          </label>
          <input
            type="number"
            id="retirementAge"
            value={retirementAge}
            onChange={(e) => setRetirementAge(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-lg font-bold mb-2" htmlFor="lifeExpectancy">
            Life Expectancy
          </label>
          <input
            type="number"
            id="lifeExpectancy"
            value={lifeExpectancy}
            onChange={(e) => setLifeExpectancy(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-lg font-bold mb-2" htmlFor="monthlyExpenses">
            Monthly Expenses
          </label>
          <input
            type="number"
            id="monthlyExpenses"
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-lg font-bold mb-2" htmlFor="inflationRate">
            Inflation Rate (%)
          </label>
          <input
            type="number"
            id="inflationRate"
            value={inflationRate}
            onChange={(e) => setInflationRate(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-lg font-bold mb-2" htmlFor="rateOfReturnPostRetirement">
            Rate of Return Post Retirement (%)
          </label>
          <input
            type="number"
            id="rateOfReturnPostRetirement"
            value={rateOfReturnPostRetirement}
            onChange={(e) => setRateOfReturnPostRetirement(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-lg font-bold mb-2" htmlFor="wantToLeaveAnyEstate">
            Want to leave any estate
          </label>
          <input
            type="number"
            id="wantToLeaveAnyEstate"
            value={wantToLeaveAnyEstate}
            onChange={(e) => setWantToLeaveAnyEstate(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-lg font-bold mb-2" htmlFor="approximateRateOfReturn">
            Approximate Rate of Return (%)
          </label>
          <input
            type="number"
            id="approximateRateOfReturn"
            value={approximateRateOfReturn}
            onChange={(e) => setApproximateRateOfReturn(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </form>
      <div className="flex flex-col mb-4">
        <h2 className="text-2xl font-bold mb-2">Results</h2>
        <p className="text-lg font-bold mb-2">
          Post Retirement Monthly Expense: ₹{calculatePostRetirementMonthlyExpense()}
        </p>
        <p className="text-lg font-bold mb-2">
          Corpus Required at Retirement: ₹{calculateCorpusRequiredAtRetirement()}
        </p>
        <p className="text-lg font-bold mb-2">SIP Required: ₹{calculateSIPRequired()}</p>
      </div>
    </div>
  );
};

export default CorpusCalculation;