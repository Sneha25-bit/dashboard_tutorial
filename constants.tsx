
import React from 'react';

export const COLORS = {
  primary: '#3b82f6',
  secondary: '#6366f1',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  background: '#f8fafc',
  card: '#ffffff',
};

export const MOCK_SUBJECTS = [
  { id: '1', name: 'Digital Logic Design', code: 'CS201', attendance: 82, totalClasses: 30, attendedClasses: 25, marks: 85, classAverage: 72, professor: 'Dr. S. K. Pathak' },
  { id: '2', name: 'Data Structures', code: 'CS202', attendance: 74, totalClasses: 28, attendedClasses: 21, marks: 68, classAverage: 75, professor: 'Prof. R. Mehta' },
  { id: '3', name: 'Microprocessors', code: 'CS203', attendance: 88, totalClasses: 25, attendedClasses: 22, marks: 78, classAverage: 70, professor: 'Dr. A. Jadav' },
  { id: '4', name: 'Mathematics-III', code: 'MA201', attendance: 65, totalClasses: 32, attendedClasses: 21, marks: 55, classAverage: 65, professor: 'Prof. V. Sharma' },
];

export const MOCK_REMARKS = [
  { id: '1', subject: 'Data Structures', professor: 'Prof. R. Mehta', text: 'Consistent performance in lab sessions.', date: '2024-03-10', type: 'positive' },
  { id: '2', subject: 'Mathematics-III', professor: 'Prof. V. Sharma', text: 'Low attendance is affecting test performance.', date: '2024-03-08', type: 'warning' },
  { id: '3', subject: 'Digital Logic Design', professor: 'Dr. S. K. Pathak', text: 'Active participation in discussions.', date: '2024-03-05', type: 'positive' },
];

export const MOCK_ASSIGNMENTS = [
  { id: '1', title: 'Binary Tree Implementation', subject: 'Data Structures', deadline: '2024-03-20', status: 'pending', weightage: 10 },
  { id: '2', title: 'Assembly Quiz 1', subject: 'Microprocessors', deadline: '2024-03-15', status: 'submitted', weightage: 5 },
  { id: '3', title: 'VHDL Counter Design', subject: 'Digital Logic Design', deadline: '2024-03-18', status: 'pending', weightage: 15 },
];

export const MOCK_PERFORMANCE = [
  { semester: 'Sem 1', sgpa: 8.2, cgpa: 8.2 },
  { semester: 'Sem 2', sgpa: 7.9, cgpa: 8.05 },
  { semester: 'Sem 3', sgpa: 8.5, cgpa: 8.2 },
  { semester: 'Sem 4', sgpa: 8.1, cgpa: 8.18 },
];
