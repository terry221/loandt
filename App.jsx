import React, { useState } from "react";
import "./app.css";

const sampleLoanData = {
  applid: "1000088",
  customername: "Sample Customer",
  address: "DLF Downtown, Gurugram, Haryana 122002",
  mortgaged_property_address: "Sector 65, Gurugram, Haryana 122018",
  sanctioned_tenure: 180,
  current_tenure: 24,
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
  co_applicant_names: "Co
