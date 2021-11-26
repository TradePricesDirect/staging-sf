import { useState } from "react";
import _ from "lodash";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPoundSign } from "@fortawesome/pro-regular-svg-icons";
import InputRange from "react-input-range";
import DropdownSelect from "components/atoms/DropdownSelect";
import { useAPRCalculator } from "./utils";

import styles from "./Calculator.module.scss";

const options = [
  { value: 6, label: "6 Months deferred at 14.9% APR" },
  { value: 12, label: "12 Months at 0% APR" },
  { value: 24, label: "24 Months at 0% APR" },
  { value: 36, label: "36 Months at 0% APR" },
  { value: 60, label: "60 Months at 11.9% APR" },
  { value: 120, label: "120 Months at 11.9% APR" },
];

const Calculator = () => {
  const [state, setState] = useState({
    amount: 10000,
    months: 120,
    depositPercent: 10,
  });

  const data = useAPRCalculator(state);

  const onPriceChange = (amount) => {
    setState({ ...state, amount: amount > 25000 ? 25000 : amount });
  };

  const onChange = (name, value) => {
    setState({ ...state, [name]: value });
  };

  return (
    <div className={styles.wrap}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className={styles.content}>
              <h2 className={styles.title}>How much does it cost?</h2>

              <p>
                Enter the amount you require and choose one of our finance plans
                to see a representative example.
              </p>

              <div className={styles.input}>
                <div className={styles.icon}>
                  <FontAwesomeIcon icon={faPoundSign} />
                </div>
                <input
                  className="form-control form-control-sm mb-4"
                  type="number"
                  max={25000}
                  step={100}
                  placeholder="1,000 - 25,000"
                  value={state.amount}
                  onChange={(e) => onPriceChange(e.target.value)}
                />
              </div>

              <DropdownSelect
                className="mb-6"
                options={options}
                value={state.months}
                onChange={({ value }) => onChange("months", value)}
              />

              <h4>Start with a £0 Deposit</h4>
              <p className={styles.small}>
                You don’t need a deposit to get finance, but it can lower your
                repayments should you wish to add one.
              </p>

              <div className={styles.range}>
                <div className={styles.amount}>{data.deposit}</div>
                <InputRange
                  maxValue={50}
                  minValue={0}
                  formatLabel={(value) => `${value}%`}
                  value={state.depositPercent}
                  onChange={(value) => onChange("depositPercent", value)}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className={styles.results}>
              <h3>Representative Example</h3>

              <div className={styles.tableWrap}>
                <table
                  className={clsx(
                    "table table-sm table-borderless",
                    styles.table
                  )}
                >
                  <tbody>
                    <tr>
                      <th>Purchase Price</th>
                      <td>{data.amount}</td>
                    </tr>
                    <tr>
                      <th>Deposit</th>
                      <td>{data.deposit}</td>
                    </tr>
                    <tr>
                      <th>Amount of credit</th>
                      <td>{data.credit}</td>
                    </tr>
                    <tr>
                      <th>Total Repayable</th>
                      <td>{data.repayable}</td>
                    </tr>
                    <tr>
                      <th>Agreement Duration</th>
                      <td>{data.months} months</td>
                    </tr>
                    <tr>
                      <th>{data.months} Monthly Payments</th>
                      <td>{data.monthly}</td>
                    </tr>
                    <tr>
                      <th>Rate of Interest (fixed)</th>
                      <td>{data.apr} per annum</td>
                    </tr>
                    <tr>
                      <th>Cost of Credit</th>
                      <td>{data.cost}</td>
                    </tr>
                    <tr>
                      <th>Representative</th>
                      <td>{data.apr} APR</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
