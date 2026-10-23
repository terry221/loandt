import React, { useMemo, useState } from "react";
import "./app.css";

const sampleAgreement = {
  applid: "1000088",
  agreementno: "HL/2026/1000088",
  customername: "Sample Customer",
  address: "DLF Downtown, Gurugram, Haryana 122002",
  mortgaged_property_address: "Sector 65, Gurugram, Haryana 122018",
  sanctioned_tenure: 180,
  current_tenure: 24,
  balance_loan_tenure: 156,
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
  days_past_due: 0,
  loan_classification: "STANDARD",
  moratorium_period_in_months: "0 M",
  repayment_frequency: "MONTHLY",
  current_prime_lending_rate_on_loan: 12.5,
  current_spread: -3.25,
  current_roi: 9.25,
  loan_status: "ACTIVE",
  loan_type: "HOME LOAN",
  advance_emi_collected_from_customer: 0,
  gst_branch_address: "Gurugram Branch, Haryana 122002",
  dsra_account: 250000,
  dsra_receivable: 10000,
  dsra_payable: 5000,
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
  balance_loan_tenure: "Balance tenure",
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
  current_roi: "Current ROI",
  boarding_interest_type: "Boarding interest type",
  current_interest_type: "Current interest type",
  emi_due_day: "EMI due day",
  days_past_due: "Days past due",
  loan_classification: "Classification",
  repayment_frequency: "Repayment frequency",
  loan_status: "Loan status",
  loan_type: "Loan type",
  pemi_amt: "PEMI amount",
  dsra_account: "DSRA account",
  dsra_receivable: "DSRA receivable",
  dsra_payable: "DSRA payable",
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
      "balance_loan_tenure",
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
      "current_spread",
      "current_roi"
    ]
  },
  {
    title: "Repayment & Status",
    icon: "↻",
    color: "orange",
    description: "Repayment configuration and loan status",
    keys: [
      "emi_due_day",
      "days_past_due",
      "loan_classification",
      "repayment_frequency",
      "loan_status",
      "loan_type"
    ]
  },
  {
    title: "Amounts & DSRA",
    icon: "₹",
    color: "green",
    description: "Payment and reserve account values",
    keys: [
      "pemi_amt",
      "dsra_account",
      "dsra_receivable",
      "dsra_payable",
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
  "dsra_account",
  "dsra_receivable",
  "dsra_payable",
  "advance_emi_collected_from_customer"
]);

const percentageKeys = new Set([
  "prime_lending_rate",
  "spread_at_loan_sanction",
  "roi_at_loan_sanction",
  "current_prime_lending_rate_on_loan",
  "current_spread",
  "current_roi"
]);

const tenureKeys = new Set([
  "sanctioned_tenure",
  "current_tenure",
  "balance_loan_tenure"
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

function getInitials(name) {
  if (!name) return "NA";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((item) => item.charAt(0))
    .join("")
    .toUpperCase();
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
              <p className="field-label">{labels[key]}</p>

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
  const [agreementId, setAgreementId] = useState("1000088");
  const [data, setData] = useState(sampleAgreement);
  const [loading, setLoading] = useState(false);
  
  /*
  const [message, setMessage] = useState(
    "Displaying sample data. Connect the button to your backend API for live Oracle data."
  );
  */

  const classificationClass = useMemo(() => {
    if (data.loan_classification === "STANDARD") {
      return "badge-success";
    }

    if (data.loan_classification === "SMA") {
      return "badge-warning";
    }

    return "badge-danger";
  }, [data.loan_classification]);

  async function loadAgreement() {
    if (!agreementId.trim()) return;

    setLoading(true);
    setMessage("");

    try {
      /*
      Replace the demo block below with:

      const response = await fetch(
        `/api/agreements/${encodeURIComponent(agreementId)}`
      );

      if (!response.ok) {
        throw new Error("Agreement not found");
      }

      const result = await response.json();
      setData(result);
      */

      await new Promise((resolve) => setTimeout(resolve, 700));

      setData({
        ...sampleAgreement,
        applid: agreementId,
        agreementno: `HL/2026/${agreementId}`
      });

      setMessage(
        `Agreement ${agreementId} loaded successfully using sample data.`
      );
    } catch (error) {
      setMessage(
        error.message || "Unable to retrieve the agreement information."
      );
    } finally {
      setLoading(false);
    }
  }

  function downloadJson() {
    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `agreement-${data.applid}.json`;
    anchor.click();

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
                Loan  Details
              </div>

              <h1>Agreement Overview</h1>

              <p>
                A consolidated view of customer, property, tenure, interest,
                repayment, DSRA and GST information.
              </p>
            </div>

            <div className="search-card">
              <label htmlFor="agreementId">
                Agreement or proposal ID
              </label>

              <div className="search-row">
                <div className="input-wrapper">
                  <span className="search-icon">⌕</span>

                  <input
                    id="agreementId"
                    value={agreementId}
                    onChange={(event) =>
                      setAgreementId(
                        event.target.value.replace(/[^0-9]/g, "")
                      )
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        loadAgreement();
                      }
                    }}
                    placeholder="Enter ID"
                  />
                </div>

                <button
                  className="load-button"
                  onClick={loadAgreement}
                  disabled={loading || !agreementId}
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
            </div>
          </div>
        </section>

       

        <section className="agreement-summary">
          <div className="agreement-identity">
            <div className="customer-avatar">
              {getInitials(data.customername)}
            </div>

            <div className="agreement-main-details">
              <p className="summary-label">Agreement</p>
              <h2>{data.agreementno}</h2>

              <div className="agreement-meta">
                <span>Application ID</span>
                <strong>{data.applid}</strong>
                <span className="meta-separator" />
                <span>{data.customername}</span>
              </div>

              <div className="badge-row">
                <span className={`status-badge ${classificationClass}`}>
                  <span className="status-dot" />
                  {data.loan_classification}
                </span>

                <span className="status-badge badge-active">
                  {data.loan_status}
                </span>

                <span className="status-badge badge-interest">
                  {data.current_interest_type}
                </span>
              </div>
            </div>
          </div>

          <button className="export-button" onClick={downloadJson}>
            <span className="download-symbol">⇩</span>
            Export JSON
          </button>
        </section>

                <section className="dashboard-stats">
          <div className="stat-card stat-roi">
            <div className="stat-icon">%</div>

            <div>
              <p>Current ROI</p>
              <h3>{formatValue("current_roi", data.current_roi)}</h3>
              <span>{data.current_interest_type} interest</span>
            </div>
          </div>

          <div className="stat-card stat-tenure">
            <div className="stat-icon">◷</div>

            <div>
              <p>Balance tenure</p>
              <h3>
                {formatValue(
                  "balance_loan_tenure",
                  data.balance_loan_tenure
                )}
              </h3>
              <span>
                Out of{" "}
                {formatValue(
                  "sanctioned_tenure",
                  data.sanctioned_tenure
                )}
              </span>
            </div>
          </div>

          <div className="stat-card stat-dpd">
            <div className="stat-icon">!</div>

            <div>
              <p>Days past due</p>
              <h3>{data.days_past_due}</h3>
              <span>{data.loan_classification}</span>
            </div>
          </div>

          <div className="stat-card stat-dsra">
            <div className="stat-icon">₹</div>

            <div>
              <p>DSRA account</p>
              <h3>{formatValue("dsra_account", data.dsra_account)}</h3>
              <span>Available reserve</span>
            </div>
          </div>
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
          <p>Loan Agreement Information Dashboard</p>
          <span>
            Report generated for application ID {data.applid}
          </span>
        </footer>
      </div>
    </main>
  );
}
 
