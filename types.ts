
export interface Employee {
  id: string;
  name: string;
}

export interface CardData {
  employeeId: string;
  name: string;
  quote: string;
}

export type TemplateType = 'royal-gold' | 'midnight-aurora' | 'classic-festive' | 'minty-fresh' | 'sky-high' | 'solar-spark';

export interface AppState {
  logo: string | null;
  referencePhoto: string | null;
  employees: Employee[];
  cards: CardData[];
  isGenerating: boolean;
  companyName: string;
  selectedTemplate: TemplateType;
}
