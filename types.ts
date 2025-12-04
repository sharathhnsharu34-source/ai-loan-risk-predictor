export interface FarmData {
  crop: string;
  landSize: number;
  location: string;
  loanAmount: number;
  soilType: string;
  season: string;
}

export interface AnalysisResult {
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  maxLoanSuggestion: number;
  projectedProfit: number;
  estimatedCost: number; // Added for Graph
  breakevenPoint: string;
  marketTrend: 'Bullish' | 'Bearish' | 'Stable';
  climateForecast: string;
  climateRisk: 'Safe' | 'Moderate' | 'High Risk'; // Added for Risk Level display
  soilSuitability: number; // 0-100
  alternatives: string[];
  explanation: string;
}

export interface NavItem {
  label: string;
  id: string;
}

export enum FeatureMode {
  LOAN_RISK = 'loan_risk',
  CROP_ADVISORY = 'crop_advisory',
  MARKET_PREDICTION = 'market_prediction'
}