"use client";

import { useState } from "react";

const BmiCalculator = () => {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("");

  const calculateBmi = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;

    if (w > 0 && h > 0) {
      const bmiValue = w / (h * h);
      setBmi(parseFloat(bmiValue.toFixed(1)));

      if (bmiValue < 18.5) {
        setStatus("Underweight");
      } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        setStatus("Normal weight");
      } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        setStatus("Overweight");
      } else {
        setStatus("Obese");
      }
    }
  };

  return (
    <div className="w-9/10 mx-auto py-10 text-black max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-10 text-black">
        BMI <span className="text-primary-01">Calculator</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-black">Calculate Your BMI</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-secondary-01">
                Weight (kg)
              </label>
              <input
                type="number"
                placeholder="e.g. 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-01 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-secondary-01">
                Height (cm)
              </label>
              <input
                type="number"
                placeholder="e.g. 175"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-01 transition-colors"
              />
            </div>

            <button
              onClick={calculateBmi}
              className="w-full bg-primary-01 text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              Calculate BMI
            </button>
          </div>

          {bmi !== null && (
            <div className="mt-8 p-5 bg-gray-50 rounded-xl border border-gray-100 text-center animate-fade-in">
              <p className="text-secondary-01 text-sm font-medium uppercase tracking-wider">
                Your BMI Result
              </p>
              <p className="text-5xl font-black text-black my-2">{bmi}</p>
              <p className="text-lg font-semibold text-primary-01">{status}</p>
            </div>
          )}
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-black">BMI Weight Status Chart</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3.5 rounded-xl bg-gray-50 border-l-4 border-amber-400">
              <div>
                <p className="font-semibold text-black">Underweight</p>
                <p className="text-xs text-secondary-01">Below 18.5</p>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">
                Low Risk
              </span>
            </div>

            <div className="flex justify-between items-center p-3.5 rounded-xl bg-gray-50 border-l-4 border-emerald-500">
              <div>
                <p className="font-semibold text-black">Normal Weight</p>
                <p className="text-xs text-secondary-01">18.5 – 24.9</p>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                Healthy
              </span>
            </div>

            <div className="flex justify-between items-center p-3.5 rounded-xl bg-gray-50 border-l-4 border-orange-400">
              <div>
                <p className="font-semibold text-black">Overweight</p>
                <p className="text-xs text-secondary-01">25.0 – 29.9</p>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-50 text-orange-700">
                Increased Risk
              </span>
            </div>

            <div className="flex justify-between items-center p-3.5 rounded-xl bg-gray-50 border-l-4 border-primary-01">
              <div>
                <p className="font-semibold text-black">Obese</p>
                <p className="text-xs text-secondary-01">30.0 or Higher</p>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-red-50 text-primary-01">
                High Risk
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BmiCalculator;