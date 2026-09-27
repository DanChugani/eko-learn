/**
 * Illustrative Grade 6 Math gap map for the hero. This is a sample, not a real student,
 * and is labelled as such everywhere it appears.
 * Strands and codes follow The Ontario Curriculum, Grades 1 to 8: Mathematics (2020).
 */

export type StrandStatus = 'secure' | 'developing' | 'gap';

export interface Strand {
  code: string;
  name: string;
  /** Bar length as a percentage of the track. */
  level: number;
  status: StrandStatus;
}

export const statusLabels: Record<StrandStatus, string> = {
  secure: 'Secure',
  developing: 'Developing',
  gap: 'Gap',
};

export const statusDescriptions: Record<StrandStatus, string> = {
  secure: 'at or above the grade-level expectation',
  developing: 'approaching the grade-level expectation',
  gap: 'well below the grade-level expectation',
};

export const sampleReport = {
  grade: 6,
  subject: 'Math',
  source: 'Ontario Curriculum, Mathematics (2020)',
  /** Where the grade-level expectation marker sits on each track, as a percentage. */
  expectation: 70,
  strands: [
    { code: 'B', name: 'Number', level: 56, status: 'developing' },
    { code: 'C', name: 'Algebra', level: 80, status: 'secure' },
    { code: 'D', name: 'Data', level: 86, status: 'secure' },
    { code: 'E', name: 'Spatial Sense', level: 32, status: 'gap' },
    { code: 'F', name: 'Financial Literacy', level: 62, status: 'developing' },
  ] satisfies Strand[],
  focus: [
    { when: 'Weeks 1 and 2', code: 'E', text: 'Spatial Sense: measurement and area, rebuilt from Grade 5 foundations' },
    { when: 'Weeks 3 and 4', code: 'B', text: 'Number: fractions, decimals and percents' },
    { when: 'Between sessions', code: 'F', text: 'Financial Literacy practice worksheets' },
  ],
  recheck: 'Re-assessed against this map after week 4.',
};
