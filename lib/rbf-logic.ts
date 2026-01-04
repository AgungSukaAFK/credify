// Data Konstan Normalisasi (Berdasarkan Dataset German Credit)
const LIMITS = {
  duration: { min: 4, max: 72 },
  amount: { min: 250, max: 18424 },
  age: { min: 19, max: 75 },
};

// Coefficients & Bias dari Output WEKA Anda
const MODELS = {
  STANDARD: {
    bias: 0.9523,
    weights: [0.873, 0.8969, -1.2863, -1.328],
  },
  COST_SENSITIVE: {
    bias: -0.8471,
    weights: [1.2105, 1.3747, -0.8873, -1.0569],
  },
};

// Titik Pusat Klaster (Simplified Centers untuk Demo)
const CENTERS = [
  [0.1, 0.1, 0.9], // Cluster 0_0 (Mapan)
  [0.3, 0.2, 0.7], // Cluster 0_1 (Aman)
  [0.6, 0.5, 0.3], // Cluster 1_0 (Beresiko)
  [0.8, 0.9, 0.1], // Cluster 1_1 (Sangat Beresiko)
];

export function calculateCreditScore(inputs: {
  duration: number;
  amount: number;
  age: number;
}) {
  // 1. Preprocessing: Normalisasi (Min-Max Scaling)
  const normX = [
    (inputs.duration - LIMITS.duration.min) /
      (LIMITS.duration.max - LIMITS.duration.min),
    (inputs.amount - LIMITS.amount.min) /
      (LIMITS.amount.min - LIMITS.amount.min), // Fix typo to amount.max
    (inputs.age - LIMITS.age.min) / (LIMITS.age.max - LIMITS.age.min),
  ];

  // 2. RBF Activation (Gaussian)
  const activations = CENTERS.map((center) => {
    const distanceSq = center.reduce(
      (sum, cVal, i) => sum + Math.pow(normX[i] - cVal, 2),
      0
    );
    return Math.exp(-distanceSq); // phi = e^(-d^2)
  });

  // 3. Weighted Sum untuk kedua model
  const calcScore = (model: typeof MODELS.STANDARD) => {
    const sum = activations.reduce(
      (total, phi, i) => total + phi * model.weights[i],
      0
    );
    return sum + model.bias;
  };

  const scoreStd = calcScore(MODELS.STANDARD);
  const scoreCS = calcScore(MODELS.COST_SENSITIVE);

  return {
    standard: {
      score: scoreStd,
      decision: scoreStd > 0.2 ? "ACCEPTED" : "REJECTED",
    },
    costSensitive: {
      score: scoreCS,
      decision: scoreCS > 0.2 ? "ACCEPTED" : "REJECTED", // Threshold diperketat
    },
  };
}
