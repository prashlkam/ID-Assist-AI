
export enum AppTab {
  DASHBOARD = 'DASHBOARD',
  GOVERNANCE = 'GOVERNANCE',
  ESG = 'ESG',
  TECH = 'TECH',
  RESOLVER = 'RESOLVER',
  CURATOR = 'CURATOR',
  TRACK_RECORD = 'TRACK_RECORD'
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  category: 'CG' | 'ESG' | 'TECH';
  summary: string;
  impact: string;
}

export interface TrackRecordItem {
  id: string;
  date: string;
  company: string;
  impact: string;
  category: string;
}

export interface ResolutionAnalysis {
  title: string;
  pros: string[];
  cons: string[];
  inquiries: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
  complianceNotes: string;
}

export interface MeetingSnippet {
  speaker: string;
  text: string;
  timestamp: string;
}
