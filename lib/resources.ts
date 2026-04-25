export type Curriculum = "AU" | "UK" | "both";
export type ResourceState = "default" | "free" | "locked" | "purchased";

export type Resource = {
  id: number;
  title: string;
  subject: string;
  type: string;
  yearGroup: string;
  price: number;
  rating: number;
  reviewCount: number;
  state: ResourceState;
  pageCount: number;
  isNew: boolean;
  curriculum: Curriculum;
};

export const RESOURCES: Resource[] = [
  { id:1,  title: "Year 3 Multiplication Worksheets",               subject: "Mathematics", type: "Worksheets",     yearGroup: "Year 3",      price: 4.50, rating: 4.9, reviewCount: 31, state: "default",    pageCount: 20, isNew: false, curriculum: "both" },
  { id:2,  title: "Phonics Flashcard Set — Phase 3",                subject: "English",     type: "Flashcards",     yearGroup: "Year 1",      price: 0,    rating: 4.6, reviewCount: 18, state: "free",       pageCount: 36, isNew: true,  curriculum: "both" },
  { id:3,  title: "Living Things Unit — Full Pack",                  subject: "Science",     type: "Activity Pack",  yearGroup: "Year 2",      price: 7.00, rating: 5.0, reviewCount: 7,  state: "locked",     pageCount: 28, isNew: false, curriculum: "AU"   },
  { id:4,  title: "Visual Arts Lesson Plans Years 4–6",              subject: "The Arts",    type: "Lesson Plans",   yearGroup: "Year 4–6",    price: 5.00, rating: 4.8, reviewCount: 12, state: "purchased",  pageCount: 18, isNew: false, curriculum: "both" },
  { id:5,  title: "Reading Comprehension — NAPLAN Style",            subject: "English",     type: "Assessments",    yearGroup: "Year 5–6",    price: 6.00, rating: 4.7, reviewCount: 22, state: "default",    pageCount: 16, isNew: true,  curriculum: "AU"   },
  { id:6,  title: "Australian Communities — HASS Unit",              subject: "HASS",        type: "Activity Pack",  yearGroup: "Year 3–4",    price: 5.50, rating: 4.5, reviewCount: 9,  state: "default",    pageCount: 24, isNew: false, curriculum: "AU"   },
  { id:7,  title: "Fractions & Decimals — Digital Slides",           subject: "Mathematics", type: "Digital Slides", yearGroup: "Year 4",      price: 4.00, rating: 4.8, reviewCount: 14, state: "locked",     pageCount: 32, isNew: false, curriculum: "both" },
  { id:8,  title: "Persuasive Writing Scaffold Pack",                subject: "English",     type: "Worksheets",     yearGroup: "Year 5–6",    price: 3.50, rating: 4.9, reviewCount: 27, state: "default",    pageCount: 12, isNew: false, curriculum: "both" },
  { id:9,  title: "Plants & Growth Science Journal",                 subject: "Science",     type: "Worksheets",     yearGroup: "Year 1–2",    price: 0,    rating: 4.4, reviewCount: 11, state: "free",       pageCount: 14, isNew: true,  curriculum: "both" },
  { id:10, title: "Wellbeing & Resilience Activities",               subject: "HPE",         type: "Activity Pack",  yearGroup: "Year 1–3",    price: 4.00, rating: 4.6, reviewCount: 8,  state: "default",    pageCount: 20, isNew: false, curriculum: "AU"   },
  { id:11, title: "Addition & Subtraction Fact Fluency Cards",       subject: "Mathematics", type: "Flashcards",     yearGroup: "Year 1–2",    price: 2.50, rating: 4.7, reviewCount: 33, state: "default",    pageCount: 48, isNew: false, curriculum: "both" },
  { id:12, title: "Design Thinking — Technologies Unit",             subject: "Technologies",type: "Lesson Plans",   yearGroup: "Year 3–4",    price: 5.00, rating: 4.5, reviewCount: 6,  state: "default",    pageCount: 22, isNew: true,  curriculum: "AU"   },
  { id:13, title: "Foundation Literacy — Letter Formation Pack",     subject: "English",     type: "Worksheets",     yearGroup: "Foundation",  price: 0,    rating: 4.8, reviewCount: 41, state: "free",       pageCount: 30, isNew: false, curriculum: "both" },
  { id:14, title: "Geography of Australia — Year 5–6 HASS",          subject: "HASS",        type: "Activity Pack",  yearGroup: "Year 5–6",    price: 6.50, rating: 4.6, reviewCount: 15, state: "default",    pageCount: 26, isNew: false, curriculum: "AU"   },
  { id:15, title: "Movement & Body Awareness — Foundation HPE",      subject: "HPE",         type: "Lesson Plans",   yearGroup: "Foundation",  price: 3.00, rating: 4.7, reviewCount: 10, state: "default",    pageCount: 16, isNew: true,  curriculum: "AU"   },
  { id:16, title: "KS2 Fractions & Percentages Pack",                subject: "Mathematics", type: "Worksheets",     yearGroup: "Year 5–6",    price: 4.50, rating: 4.8, reviewCount: 19, state: "default",    pageCount: 18, isNew: false, curriculum: "UK"   },
  { id:17, title: "SPaG Booster — KS2 Grammar & Punctuation",        subject: "English",     type: "Worksheets",     yearGroup: "Year 5–6",    price: 3.50, rating: 4.7, reviewCount: 24, state: "default",    pageCount: 20, isNew: true,  curriculum: "UK"   },
  { id:18, title: "KS1 Number & Place Value Activities",             subject: "Mathematics", type: "Activity Pack",  yearGroup: "Year 1–2",    price: 0,    rating: 4.6, reviewCount: 16, state: "free",       pageCount: 24, isNew: false, curriculum: "UK"   },
  { id:19, title: "UK History — Castles & Invaders KS2",             subject: "HASS",        type: "Activity Pack",  yearGroup: "Year 3–4",    price: 5.50, rating: 4.5, reviewCount: 11, state: "default",    pageCount: 22, isNew: false, curriculum: "UK"   },
  { id:20, title: "PSHE — Feelings & Relationships Year 2",          subject: "HPE",         type: "Worksheets",     yearGroup: "Year 2",      price: 3.00, rating: 4.7, reviewCount: 8,  state: "default",    pageCount: 16, isNew: true,  curriculum: "UK"   },
];

export const SUBJECT_COLORS: Record<string, { bg: string; color: string; thumb: string; icon: string }> = {
  "Mathematics":  { bg: "#EEF1FD", color: "#4361EE", thumb: "linear-gradient(135deg,#EEF1FD,#C8D0FA)", icon: "📐" },
  "English":      { bg: "#FDECEE", color: "#E63946", thumb: "linear-gradient(135deg,#FDECEE,#FAC8CB)", icon: "📖" },
  "Science":      { bg: "#E8F5F3", color: "#2A9D8F", thumb: "linear-gradient(135deg,#E8F5F3,#8FD1CA)", icon: "🔬" },
  "HASS":         { bg: "#FEF0EC", color: "#E76F51", thumb: "linear-gradient(135deg,#FEF0EC,#FAC8B0)", icon: "🌏" },
  "The Arts":     { bg: "#F4EFFE", color: "#9B5DE5", thumb: "linear-gradient(135deg,#F4EFFE,#DCC8FA)", icon: "🎨" },
  "HPE":          { bg: "#EDF7F2", color: "#3D9A6A", thumb: "linear-gradient(135deg,#EDF7F2,#B5E0CB)", icon: "🏃" },
  "Technologies": { bg: "#FEF4EC", color: "#C47330", thumb: "linear-gradient(135deg,#FEF4EC,#FAD8B0)", icon: "💻" },
};

export function getResource(id: number): Resource | undefined {
  return RESOURCES.find((r) => r.id === id);
}

export const ALL_SUBJECTS = ["Mathematics", "English", "Science", "HASS", "The Arts", "HPE", "Technologies"];
export const ALL_YEARS = ["Foundation", "Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"];
export const ALL_TYPES = ["Worksheets", "Lesson Plans", "Flashcards", "Activity Pack", "Assessments", "Digital Slides"];
