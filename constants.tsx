
import React from 'react';
import { LayoutDashboard, ShieldCheck, Leaf, Cpu, FileCheck, Mic, Award, Settings, Search } from 'lucide-react';
import { AppTab, NewsItem } from './types';

export const NAVIGATION = [
  { id: AppTab.DASHBOARD, label: 'Executive Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: AppTab.GOVERNANCE, label: 'Corp Governance', icon: <ShieldCheck className="w-5 h-5" /> },
  { id: AppTab.ESG, label: 'ESG Strategy', icon: <Leaf className="w-5 h-5" /> },
  { id: AppTab.TECH, label: 'Tech & AI Trends', icon: <Cpu className="w-5 h-5" /> },
  { id: AppTab.RESOLVER, label: 'Resolution Resolver', icon: <FileCheck className="w-5 h-5" /> },
  { id: AppTab.CURATOR, label: 'Minutes Curator', icon: <Mic className="w-5 h-5" /> },
  { id: AppTab.TRACK_RECORD, label: 'My Track Record', icon: <Award className="w-5 h-5" /> },
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'New SEBI Disclosure Norms for Related Party Transactions',
    source: 'Financial Express',
    date: '2023-10-24',
    category: 'CG',
    summary: 'SEBI has tightened the norms for material RPTs, requiring prior approval from the audit committee.',
    impact: 'Directors must ensure rigorous scrutiny of all RPTs above threshold limits during the next board cycle.'
  },
  {
    id: '2',
    title: 'Global Trends in Scope 3 Emission Reporting',
    source: 'ESG Today',
    date: '2023-10-22',
    category: 'ESG',
    summary: 'Major institutional investors are now demanding full Scope 3 transparency across global supply chains.',
    impact: 'The board should inquire about current supply chain data capabilities and the cost of compliance.'
  },
  {
    id: '3',
    title: 'Cybersecurity Liability for Board Members',
    source: 'Tech Insights',
    date: '2023-10-20',
    category: 'TECH',
    summary: 'A new wave of litigation targets directors for failure of oversight in high-profile data breaches.',
    impact: 'Recommend a deep-dive session on the company\'s cyber resilience and insurance coverage.'
  }
];
