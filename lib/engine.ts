// === CENTROIDS (Tetap) ===
const CENTROIDS = {
  c0: {
    checking: 0.9,
    savings: 0.9,
    history: 0.9,
    existing_credits: 0.8,
    employment: 0.9,
    job: 0.8,
    purpose: 0.7,
    personal_status: 0.6,
    residence_since: 0.8,
    dependents: 0.7,
    foreign: 0.9,
    property: 0.9,
    housing: 0.8,
    other_installment: 0.9,
    other_debtors: 0.7,
    duration: 0.8,
    amount: 0.7,
    age: 0.2,
  },
  c1: {
    checking: 0.1,
    savings: 0.1,
    history: 0.1,
    existing_credits: 0.2,
    employment: 0.1,
    job: 0.1,
    purpose: 0.2,
    personal_status: 0.2,
    residence_since: 0.1,
    dependents: 0.2,
    foreign: 0.1,
    property: 0.1,
    housing: 0.1,
    other_installment: 0.1,
    other_debtors: 0.1,
    duration: 0.3,
    amount: 0.2,
    age: 0.6,
  },
};

// === VALUE MAPPING (Tetap) ===
const VALUE_MAP: Record<string, number> = {
  A14: 0.15,
  A13: 0.1,
  A12: 0.5,
  A11: 0.95,
  A64: 0.05,
  A63: 0.2,
  A62: 0.5,
  A65: 0.6,
  A61: 0.95,
  A34: 0.05,
  A32: 0.2,
  A31: 0.5,
  A30: 0.7,
  A33: 1.0,
  A161: 0.4,
  A162: 0.2,
  A163: 0.3,
  A164: 0.6,
  A75: 0.1,
  A74: 0.2,
  A73: 0.4,
  A72: 0.7,
  A71: 1.0,
  A174: 0.1,
  A173: 0.3,
  A172: 0.6,
  A171: 0.9,
  A40: 0.3,
  A41: 0.5,
  A42: 0.4,
  A43: 0.2,
  A44: 0.3,
  A45: 0.2,
  A46: 0.6,
  A48: 0.5,
  A49: 0.4,
  A410: 0.5,
  A93: 0.3,
  A94: 0.2,
  A92: 0.3,
  A91: 0.6,
  A114: 0.1,
  A113: 0.3,
  A112: 0.5,
  A111: 0.8,
  A181: 0.2,
  A182: 0.5,
  A202: 0.1,
  A201: 0.9,
  A121: 0.1,
  A122: 0.3,
  A123: 0.4,
  A124: 0.9,
  A152: 0.1,
  A153: 0.2,
  A151: 0.7,
  A143: 0.1,
  A141: 0.4,
  A142: 0.8,
  A101: 0.4,
  A102: 0.2,
  A103: 0.1,
};

const SCALES = {
  durationMax: 72,
  amountMax: 1000000000,
  ageMax: 75,
  ageMin: 19,
};

export function runSimulation(input: any) {
  // --- A. NORMALISASI ---
  const normInputs: any = {
    duration: Math.min(1, input.duration / SCALES.durationMax),
    amount: Math.min(
      1,
      Math.log10(Math.max(10, input.amount)) / Math.log10(SCALES.amountMax)
    ),
    age: Math.min(
      1,
      (input.age - SCALES.ageMin) / (SCALES.ageMax - SCALES.ageMin)
    ),
  };

  const catKeys = [
    "checking_status",
    "savings",
    "credit_history",
    "existing_credits",
    "employment",
    "job",
    "purpose",
    "personal_status",
    "residence_since",
    "dependents",
    "foreign_worker",
    "property",
    "housing",
    "other_installment",
    "other_debtors",
  ];
  const keyMap: Record<string, string> = {
    checking_status: "checking",
    credit_history: "history",
    foreign_worker: "foreign",
  };

  catKeys.forEach((k) => {
    const centroidKey = keyMap[k] || k;
    normInputs[centroidKey] = VALUE_MAP[input[k]] || 0.5;
  });

  // --- B. RBF DISTANCE ---
  const details: any = {};
  let distGoodSq = 0,
    distBadSq = 0;

  const attributes = [
    "duration",
    "amount",
    "age",
    "checking",
    "savings",
    "history",
    "existing_credits",
    "employment",
    "job",
    "purpose",
    "personal_status",
    "residence_since",
    "dependents",
    "foreign",
    "property",
    "housing",
    "other_installment",
    "other_debtors",
  ];

  attributes.forEach((attr) => {
    // @ts-ignore
    const val = normInputs[attr];
    // @ts-ignore
    const c1 = CENTROIDS.c1[attr];
    // @ts-ignore
    const c0 = CENTROIDS.c0[attr];

    const dGood = Math.pow(val - c1, 2);
    const dBad = Math.pow(val - c0, 2);
    details[attr] = { val: val, dGood, dBad };
    distGoodSq += dGood;
    distBadSq += dBad;
  });

  // --- C. INTELLIGENT RISK ENGINE ---
  const redFlags = [];
  let redFlagPenalty = 0;

  // Estimasi Installment (Pokok + Bunga Flat 1% per bulan)
  const monthlyInterest = 0.01;
  const totalLoan =
    input.amount + input.amount * monthlyInterest * input.duration;
  const estimatedInstallment = Math.round(totalLoan / input.duration);

  // Estimasi Income (Sangat Kasar tapi Logis)
  let baseIncome = 4500000; // UMR
  if (input.job === "A173") baseIncome = 8000000; // Skilled
  if (input.job === "A174") baseIncome = 20000000; // Management
  if (input.employment === "A74" || input.employment === "A75")
    baseIncome *= 1.3; // Seniority bonus
  if (input.checking_status === "A13") baseIncome *= 2; // Saldo tebal = income besar
  if (input.checking_status === "A14") baseIncome *= 1.2; // Cash based often higher

  // Rasio Cicilan (Debt Service Ratio)
  const dsr = estimatedInstallment / baseIncome;

  // --- RULE 1: MICRO LOAN AMNESTY (Pinjaman Kecil, Tenor Panjang = AMAN) ---
  // Jika pinjaman < 10 Juta DAN Cicilan < 500rb -> Ini sangat aman meskipun data lain jelek.
  const isMicroSafe = input.amount < 10000000 && estimatedInstallment < 500000;

  // --- RULE 2: RED FLAGS (Bad Data) ---

  // A. Checking (Saldo)
  if (input.checking_status === "A11" && !isMicroSafe) {
    redFlagPenalty += 1.5;
    redFlags.push("Saldo Rekening Kritis");
  }

  // B. Blacklist (A33) - Veto Terberat
  if (input.credit_history === "A33") {
    // Kalau nominal kecil banget, penalti dikurangi dikit (mungkin khilaf)
    // Tapi tetap berat
    if (isMicroSafe) {
      redFlagPenalty += 1.5;
      redFlags.push("Riwayat Buruk (Toleransi Micro Loan)");
    } else {
      redFlagPenalty += 3.0;
      redFlags.push("Blacklist BI Checking/SLIK");
    }
  }

  // C. DSR Check (Kapasitas Bayar)
  if (dsr > 0.4) {
    redFlagPenalty += 2.0;
    redFlags.push(`Cicilan Overlimit (${(dsr * 100).toFixed(0)}% Pendapatan)`);
  }

  // D. Gali Lubang (Paylater + Saldo Minim)
  if (input.other_installment === "A142" && input.checking_status === "A11") {
    redFlagPenalty += 1.5;
    redFlags.push("Risiko Gali Lubang Tutup Lubang");
  }

  // --- D. SCORING & BONUS ---

  // RBF Activation
  const sigma = 5.0;
  const phiGood = Math.exp(-distGoodSq / sigma);
  const phiBad = Math.exp(-distBadSq / sigma);

  let rawScore = (phiGood - phiBad) * 5;

  let bonus = 0;
  // Bonus: Affordability Shield
  // Kalau cicilan sangat enteng (< 10% gaji), kasih bonus besar
  if (dsr < 0.1) bonus += 1.5;
  else if (dsr < 0.2) bonus += 0.8;

  // Bonus: Aset
  if (input.property === "A121") bonus += 0.8;
  if (input.savings === "A64") bonus += 1.0;

  // LOGIC PENYELAMAT FINAL:
  // Jika Micro Safe (Pinjaman kecil tenor panjang), paksa skor jadi positif dikit
  // asalkan tidak Blacklist A33
  if (isMicroSafe && input.credit_history !== "A33") {
    bonus += 2.0; // Boost besar agar lolos
  }

  const scoreStd = rawScore + bonus - redFlagPenalty * 0.4;
  const scoreCS = rawScore + bonus - redFlagPenalty - 0.5;

  return {
    standard: {
      score: scoreStd.toFixed(4),
      status: scoreStd > 0 ? "APPROVED" : "REJECTED",
    },
    costSensitive: {
      score: scoreCS.toFixed(4),
      status: scoreCS > 0 ? "APPROVED" : "REJECTED",
    },
    details: details,
    distances: {
      good: Math.sqrt(distGoodSq).toFixed(4),
      bad: Math.sqrt(distBadSq).toFixed(4),
    },
    redFlags: redFlags,
    monthlyInstallment: estimatedInstallment,
  };
}
