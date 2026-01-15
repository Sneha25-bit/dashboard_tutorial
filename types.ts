
export interface Subject {
  id: string;
  name: string;
  code: string;
  attendance: number;
  totalClasses: number;
  attendedClasses: number;
  marks: number;
  classAverage: number;
  professor: string;
}

export interface Remark {
  id: string;
  subject: string;
  professor: string;
  text: string;
  date: string;
  type: 'positive' | 'warning' | 'improvement';
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  deadline: string;
  status: 'pending' | 'submitted';
  weightage: number;
}

export interface PerformanceData {
  semester: string;
  sgpa: number;
  cgpa: number;
}

export interface Topic {
  id: string;
  subject: string;
  name: string;
  status: 'understood' | 'needs-revision';
  week: number;
}
