import React, { useState } from "react";
import "./app.css";

const sampleLoanData = {
  applid: "1000088",
  customername: "Sample Customer",
  address: "DLF Downtown, Gurugram, Haryana 122002",
  mortgaged_property_address: "Sector 65, Gurugram, Haryana 122018",
  sanctioned_tenure: 180,
  prime_lending_rate: 12.5,
  spread_at_loan_sanction: -3.75,
  first_disbursal_date: "2024-07-12",
  last_disbursal_date: "2024-08-05",
  co_applicant_names: "Sample Co-applicant",
  guarantor_names: "Sample Guarantor",
  pemi_period: "2 M",
  roi_at_loan_sanction: 8.75,
  instalment_start_date: "2024-09-05",
  instalment_end_date: "2039-08-05",
  pemi_amt: 24500,
  gstin: "06ABCDE1234F1Z5",
  gst_state_code: "06",
  emi_due_day: 5,
  loan_classification: "STANDARD",
  moratorium_period_in_months: "0 M",
  repayment_frequency: "MONTHLY",
  current_prime_lending_rate_on_loan: 12.5,
  current_spread: -3.25,
  loan_status: "ACTIVE",
  loan_type: "HOME LOAN",
  advance_emi_collected_from_customer: 0,
  gst_branch_address: "Gurugram Branch, Haryana 122002",
  loan_purpose: "Purchase of residential property",
  boarding_interest_type: "FIXED",
  current_interest_type: "FLOATING"
};

const labels = {
  customername: "Customer name",
  address: "Mailing address",
  mortgaged_property_address: "Mortgaged property address",
  co_applicant_names: "Co-applicant",
  guarantor_names: "Guarantor",
  loan_purpose: "Loan purpose",

  sanctioned_tenure: "Sanctioned tenure",
  current_tenure: "Current tenure",
  pemi_period: "PEMI period",
  moratorium_period_in_months: "Moratorium period",

  first_disbursal_date: "First disbursal",
  last_disbursal_date: "Last disbursal",
  instalment_start_date: "Instalment start",
  instalment_end_date: "Instalment end",

  prime_lending_rate: "Boarding PLR",
  spread_at_loan_sanction: "Boarding spread",
  roi_at_loan_sanction: "Boarding ROI",
  current_prime_lending_rate_on_loan: "Current PLR",
  current_spread: "Current spread",
  boarding_interest_type: "Boarding interest type",
  current_interest_type: "Current interest type",

  emi_due_day: "EMI due day",
  loan_classification: "Classification",
  repayment_frequency: "Repayment frequency",
  loan_status: "Loan status",
  loan_type: "Loan type",

  pemi_amt: "PEMI amount",
  advance_emi_collected_from_customer: "Advance EMI",

  gstin: "GSTIN",
  gst_state_code: "GST state code",
  gst_branch_address: "GST branch address"
};

const groups = [
  {
    title: "Customer & Property",
    icon: "👤",
    color: "blue",
    description: "Customer and secured property information",
    keys: [
      "customername",
      "address",
      "co_applicant_names",
      "guarantor_names",
      "mortgaged_property_address",
      "loan_purpose"
    ]
  },
  {
    title: "Tenure & Dates",
    icon: "▣",
    color: "purple",
    description: "Loan schedule and important dates",
    keys: [
      "sanctioned_tenure",
      "current_tenure",
      "pemi_period",
      "moratorium_period_in_months",
      "first_disbursal_date",
      "last_disbursal_date",
      "instalment_start_date",
      "instalment_end_date"
    ]
  },
  {
    title: "Interest Details",
    icon: "%",
    color: "cyan",
    description: "Boarding and current interest information",
    keys: [
      "boarding_interest_type",
      "current_interest_type",
      "prime_lending_rate",
      "spread_at_loan_sanction",
      "roi_at_loan_sanction",
      "current_prime_lending_rate_on_loan",
      "current_spread"
    ]
  },
  {
    title: "Repayment & Status",
    icon: "↻",
    color: "orange",
    description: "Repayment configuration and loan status",
    keys: [
      "emi_due_day",
      "loan_classification",
      "repayment_frequency",
      "loan_status",
      "loan_type"
    ]
  },
  {
    title: "Amounts",
    icon: "₹",
    color: "green",
    description: "Loan payment information",
    keys: [
      "pemi_amt",
      "advance_emi_collected_from_customer"
    ]
  },
  {
    title: "GST Details",
    icon: "▦",
    color: "pink",
    description: "GST registration and branch details",
    keys: [
      "gstin",
      "gst_state_code",
      "gst_branch_address"
    ]
  }
];

const moneyKeys = new Set([
  "pemi_amt",
  "advance_emi_collected_from_customer"
]);

const percentageKeys = new Set([
  "prime_lending_rate",
  "spread_at_loan_sanction",
  "roi_at_loan_sanction",
  "current_prime_lending_rate_on_loan",
  "current_spread"
]);

const tenureKeys = new Set([
  "sanctioned_tenure",
  "current_tenure"
]);

function formatValue(key, value) {
  if (value === null || value === undefined || value === "") {
    return "Not available";
  }

  if (moneyKeys.has(key)) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(value);
  }

  if (percentageKeys.has(key)) {
    return `${value}%`;
  }

  if (tenureKeys.has(key)) {
    return `${value} M`;
  }

  return String(value);
}

function InformationCard({ group, data }) {
  return (
    <article className={`information-card card-${group.color}`}>
      <header className="information-card-header">
        <div className={`section-icon icon-${group.color}`}>
          {group.icon}
        </div>

        <div>
          <h2>{group.title}</h2>
          <p>{group.description}</p>
        </div>
      </header>

      <div className="fields-grid">
        {group.keys.map((key) => {
          const value = formatValue(key, data[key]);

          const isWide =
            key.includes("address") ||
            key === "loan_purpose";

          return (
            <div
              className={`field-item ${isWide ? "field-wide" : ""}`}
              key={key}
            >
              <p className="field-label">
                {labels[key]}
              </p>

              <p
                className={`field-value ${
                  value === "Not available" ? "not-available" : ""
                }`}
              >
                {value}
              </p>
            </div>
          );
        })}
      </div>
    </article>
  );
}

export default function App() {
  const [applicationId, setApplicationId] = useState("1000088");
  const [data, setData] = useState(sampleLoanData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    "Displaying sample data. Connect the button to your backend API for live Oracle data."
  );

  async function loadLoanDetails() {
    const trimmedApplicationId = applicationId.trim();

    if (!trimmedApplicationId) {
      setMessage("Please enter a valid application or proposal ID.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      /*
      Replace the sample-data block below with your backend API call:

      const response = await fetch(
        `/api/agreements/${encodeURIComponent(trimmedApplicationId)}`
      );

      if (!response.ok) {
        throw new Error("Loan information not found");
      }

      const result = await response.json();
      setData(result);
      */

      await new Promise((resolve) => setTimeout(resolve, 700));

      setData({
        ...sampleLoanData,
        applid: trimmedApplicationId
      });

      setMessage(
        `Loan details for application ID ${trimmedApplicationId} loaded successfully using sample data.`
      );
    } catch (error) {
      setMessage(
        error.message ||
          "Unable to retrieve the loan information."
      );
    } finally {
      setLoading(false);
    }
  }

  function downloadJson() {
    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      {
        type: "application/json"
      }
    );

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `loan-details-${data.applid}.json`;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);
  }

  return (
    <main className="app">
      <div className="page-container">
        <section className="hero">
          <div className="hero-circle hero-circle-one" />
          <div className="hero-circle hero-circle-two" />

          <div className="hero-content">
            <div className="hero-copy">
              <div className="hero-label">
                <span className="hero-label-icon">◆</span>
                Loan Details
              </div>

              <h1>Loan Overview</h1>

              <p>
                A consolidated view of customer, property,
                tenure, interest, repayment, amount and GST
                information.
              </p>
            </div>

            <div className="search-card">
              <label htmlFor="applicationId">
                Application or proposal ID
              </label>

              <div className="search-row">
                <div className="input-wrapper">
                  <span className="search-icon">⌕</span>

                  <input
                    id="applicationId"
                    value={applicationId}
                    onChange={(event) =>
                      setApplicationId(
                        event.target.value.replace(/[^0-9]/g, "")
                      )
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        loadLoanDetails();
                      }
                    }}
                    placeholder="Enter ID"
                    inputMode="numeric"
                  />
                </div>

                <button
                  type="button"
                  className="load-button"
                  onClick={loadLoanDetails}
                  disabled={loading || !applicationId.trim()}
                >
                  {loading ? (
                    <>
                      <span className="spinner" />
                      Loading
                    </>
                  ) : (
                    <>
                      <span>⌕</span>
                      Load report
                    </>
                  )}
                </button>
              </div>

              {message && (
                <p className="search-message">
                  {message}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="report-actions">
          <div className="report-heading">
            <p className="summary-label">
              Application ID
            </p>

            <h2>{data.applid}</h2>

            <p>{data.customername}</p>
          </div>

          <button
            type="button"
            className="export-button"
            onClick={downloadJson}
          >
            <span className="download-symbol">⇩</span>
            Export JSON
          </button>
        </section>

        <section className="report-grid">
          {groups.map((group) => (
            <InformationCard
              key={group.title}
              group={group}
              data={data}
            />
          ))}
        </section>

        <footer className="page-footer">
          <p>Loan Information Dashboard</p>

          <span>
            Report generated for application ID {data.applid}
          </span>
        </footer>
      </div>
    </main>
  );
}
