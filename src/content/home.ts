/**
 * Homepage copy and structured content.
 * House style: Canadian spelling (colour, centre, practise as a verb), no em dashes,
 * no invented numbers, results, ratings or testimonials.
 */
import { site } from '../config/site.ts';

export const seo = {
  title: 'Online Tutoring in Toronto, Grades 1 to 12 | Ekolearn',
  description:
    '1-on-1 online tutoring for Grades 1 to 12, aligned to the Ontario curriculum. Start with a free diagnostic assessment and a gap map of every strand.',
};

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Subjects', href: '#subjects' },
  { label: 'Pricing', href: '#pricing' },
  ...(site.features.tutors ? [{ label: 'Tutors', href: '#tutors' }] : []),
  { label: 'FAQ', href: '#faq' },
];

export const primaryCta = { label: 'Book a free assessment', href: '#book' };

export const hero = {
  subline:
    'Every student starts with a diagnostic assessment mapped to the Ontario curriculum for their grade. You see which strands are secure, developing or a gap, and a tutor teaches 1-on-1 to exactly what the map shows.',
  secondaryCta: { label: 'See a sample report', href: '#sample-report' },
};

export const facts = [
  'Grades 1 to 12',
  'Ontario curriculum',
  'Live 1-on-1 online',
  'Toronto-based',
  'No contracts',
];

export const positioning = {
  eyebrow: 'A different starting point',
  title: 'Most tutoring starts with tonight’s homework. Ours starts with a map.',
  lede: 'Homework help fixes the problem in front of you. A map shows the ones underneath it, so the time you pay for goes where it counts.',
  columns: { typical: 'Typical tutoring', ekolearn: 'Ekolearn' },
  rows: [
    {
      label: 'Starts with',
      typical: 'Tonight’s homework or the next test.',
      ekolearn: 'A diagnostic assessment against the Ontario curriculum expectations for your child’s grade.',
    },
    {
      label: 'What the tutor knows',
      typical: 'Whatever comes up in the session.',
      ekolearn: 'Which strands are secure, developing or a gap, before the first lesson.',
    },
    {
      label: 'The practice',
      typical: 'Generic worksheets, or none at all.',
      ekolearn: 'Worksheets generated from your child’s gap map, aimed at the strands that need work.',
    },
    {
      label: 'How progress is measured',
      typical: 'Report card marks, a term later.',
      ekolearn: 'A re-assessment against the same map, so you can see what moved.',
    },
  ],
};

export const steps = [
  {
    title: 'Assess',
    body: 'Your child takes a diagnostic assessment built from the Ontario curriculum expectations for their grade. It is free, online and low-pressure.',
  },
  {
    title: 'Map',
    body: 'You get a gap map: every strand marked secure, developing or gap, with a review call to walk you through it.',
  },
  {
    title: 'Teach',
    body: 'A tutor teaches 1-on-1, live online, working through the gaps in order instead of chasing whatever is due next.',
  },
  {
    title: 'Practise and re-check',
    body: 'Practice worksheets generated from the map reinforce each gap between sessions. Then your child is re-assessed against the same map.',
  },
];

export interface Subject {
  id: string;
  name: string;
  summary: string;
  groups: { label: string; items: { code?: string; name: string }[] }[];
}

export const subjects: Subject[] = [
  {
    id: 'subject-math',
    name: 'Math',
    summary: 'Grades 1 to 12, from number sense to calculus.',
    groups: [
      {
        label: 'Grades 1 to 8, by strand',
        items: [
          { code: 'B', name: 'Number' },
          { code: 'C', name: 'Algebra' },
          { code: 'D', name: 'Data' },
          { code: 'E', name: 'Spatial Sense' },
          { code: 'F', name: 'Financial Literacy' },
        ],
      },
      {
        label: 'Grades 9 to 12',
        items: [
          { code: 'MTH1W', name: 'Mathematics, Grade 9' },
          { code: 'MCR3U', name: 'Functions, Grade 11' },
          { code: 'MHF4U', name: 'Advanced Functions, Grade 12' },
          { code: 'MCV4U', name: 'Calculus and Vectors, Grade 12' },
          { code: 'MDM4U', name: 'Mathematics of Data Management, Grade 12' },
        ],
      },
    ],
  },
  {
    id: 'subject-science',
    name: 'Science',
    summary: 'Grade 9 science, then biology, chemistry and physics.',
    groups: [
      {
        label: 'Grades 9 to 12',
        items: [
          { code: 'SNC1W', name: 'Science, Grade 9' },
          { code: 'SBI3U / SBI4U', name: 'Biology, Grades 11 and 12' },
          { code: 'SCH3U / SCH4U', name: 'Chemistry, Grades 11 and 12' },
          { code: 'SPH3U / SPH4U', name: 'Physics, Grades 11 and 12' },
        ],
      },
    ],
  },
  {
    id: 'subject-english',
    name: 'English and Literacy',
    summary: 'Reading, writing and comprehension, Grades 1 to 12.',
    groups: [
      {
        label: 'What we cover',
        items: [
          { name: 'Reading comprehension and fluency' },
          { name: 'Writing: structure, grammar and editing' },
          { name: 'Preparing for the Grade 10 literacy test (OSSLT)' },
        ],
      },
    ],
  },
  {
    id: 'subject-french',
    name: 'French Immersion Support',
    summary: 'For students in French Immersion programs.',
    groups: [
      {
        label: 'What we cover',
        items: [
          { name: 'Reading and vocabulary in French' },
          { name: 'Written French: grammar and verb forms' },
          { name: 'Keeping up with schoolwork taught in French' },
        ],
      },
    ],
  },
];

export const pricingNote = 'No contracts. Bundle discounts. Money-back satisfaction guarantee.';

export const faqs = [
  {
    question: 'What is the diagnostic assessment?',
    answer:
      'It is an online assessment built from the Ontario curriculum expectations for your child’s grade in the subject you choose. It shows which strands your child has secured, which are still developing and where the gaps are. You get the results as a gap map, with a review call to go through them.',
  },
  {
    question: 'Is the assessment really free?',
    answer:
      'Yes. The assessment, the gap map and the review call are free, and there is no obligation to book tutoring afterwards. The map is yours to keep either way.',
  },
  {
    question: 'How do online sessions work?',
    answer:
      'Sessions are live and 1-on-1 over video, at times that suit your family. Your child needs a computer or tablet with a camera, a microphone and a steady internet connection. Each lesson is planned from the gap map, so the tutor arrives knowing what to work on.',
  },
  {
    question: 'Do I have to sign a contract?',
    answer:
      'No. You can pay per class, or buy a bundle of sessions at a discount. There are no long-term commitments, and we offer a money-back satisfaction guarantee.',
  },
  {
    question: 'What are the practice worksheets?',
    answer: `They are AI-generated practice worksheets built from your child’s gap map, aimed at the strands marked developing or gap. They work alongside tutoring or on their own, for $${site.pricing.worksheetsMonthly} a month. Worksheets are in early access now.`,
  },
  {
    question: 'Which grades and subjects do you cover?',
    answer:
      'Grades 1 to 12: math, science, English and literacy, and support for French Immersion students. High school courses follow their Ontario course codes, such as MTH1W, MCR3U, MHF4U, MCV4U, MDM4U, SNC1W, and Grade 11 and 12 biology, chemistry and physics.',
  },
];

export const finalCta = {
  title: 'Start with the map.',
  body: 'Book a free diagnostic assessment. You will get your child’s gap map and a review call with a tutor, with no contract and no obligation.',
};
