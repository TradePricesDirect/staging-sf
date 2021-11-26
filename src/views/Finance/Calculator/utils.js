import _ from "lodash";
import { formatMoney } from "utils/money";

export const useAPRCalculator = ({ amount, months, depositPercent }) => {
  const value = _.inRange(amount, 1000, 25001) ? amount : 0;

  let apr = 11.9;
  if (months === 6) apr = 14.9;
  else if (months < 60) apr = 0;

  const deposit = _.ceil((value / 100) * depositPercent, 2);

  const credit = _.ceil(value - deposit, 2);

  const monthly = calculateMonthlyPayment(credit, apr, months);

  const repayable = apr === 0 ? credit : monthly * months;

  const cost = repayable - credit;

  return {
    apr: `${apr}%`,
    amount: formatMoney({ amount: value, currency: "GBP" }),
    deposit: formatMoney({ amount: deposit, currency: "GBP" }),
    credit: formatMoney({ amount: credit, currency: "GBP" }),
    months,
    monthly: formatMoney({ amount: monthly, currency: "GBP" }),
    repayable: formatMoney({ amount: repayable, currency: "GBP" }),
    cost: formatMoney({ amount: cost, currency: "GBP" }),
  };
};

const calculateMonthlyPayment = (principal, apr, months) => {
  if (apr === 0) return _.ceil(principal / months, 2);

  const interest = apr / 1200;

  const x = Math.pow(1 + interest, months);

  const monthly = (principal * x * interest) / (x - 1);

  return _.ceil(monthly, 2);
};
