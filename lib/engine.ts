// Bobot Rill dari Output WEKA CostSensitive Anda
const MODEL_CS = {
  bias: -0.8471,
  weights: [1.2105, 1.3747, -0.8873, -1.0569],
};

// Bobot Rill dari Output WEKA RBF Biasa Anda
const MODEL_STD = {
  bias: 0.9523,
  weights: [0.873, 0.8969, -1.2863, -1.328],
};

// Titik Pusat Klaster (Centers) - Representasi koordinat multidimensi 0-1
const CENTERS = [
  [0.15, 0.1, 0.9], // Cluster 0_0 (Sangat Aman)
  [0.35, 0.25, 0.75], // Cluster 0_1 (Aman)
  [0.65, 0.6, 0.35], // Cluster 1_0 (Berisiko)
  [0.85, 0.85, 0.15], // Cluster 1_1 (Sangat Berisiko)
];

export interface SimulationInput {
  duration: number;
  amount: number;
  age: number;
  // Tambahkan atribut lain jika ingin lebih kompleks,
  // sementara kita fokus pada 3 numerik utama untuk normalisasi
}

export function runSimulation(input: SimulationInput) {
  // 1. Normalisasi (Min-Max Scaling)
  const normDuration = (input.duration - 4) / (72 - 4);
  const normAmount = (input.amount - 2500000) / (185000000 - 2500000);
  const normAge = (input.age - 19) / (75 - 19);

  const x = [normDuration, normAmount, normAge];

  // 2. Hitung Aktivasi RBF (Gaussian) untuk tiap Cluster
  const phi = CENTERS.map((center) => {
    // Euclidean Distance Squared
    const distSq = center.reduce(
      (sum, cVal, i) => sum + Math.pow(x[i] - cVal, 2),
      0
    );
    return Math.exp(-distSq); // phi = e^(-d^2)
  });

  // 3. Kalkulasi Skor Akhir
  const calculate = (model: typeof MODEL_CS) => {
    const weightedSum = phi.reduce(
      (sum, pVal, i) => sum + pVal * model.weights[i],
      0
    );
    return weightedSum + model.bias;
  };

  const scoreStd = calculate(MODEL_STD);
  const scoreCS = calculate(MODEL_CS);

  // Threshold keputusan (0.2 sebagai ambang batas aman)
  const THRESHOLD = 0.2;

  return {
    standard: {
      score: scoreStd.toFixed(4),
      status: scoreStd > THRESHOLD ? "APPROVED" : "REJECTED",
      color: scoreStd > THRESHOLD ? "text-green-600" : "text-red-600",
    },
    costSensitive: {
      score: scoreCS.toFixed(4),
      status: scoreCS > THRESHOLD ? "APPROVED" : "REJECTED",
      color: scoreCS > THRESHOLD ? "text-green-600" : "text-red-600",
    },
  };
}
