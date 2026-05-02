// UI-side constants and types for resources.
// Pure data — safe to import from both client and server components.

export type Curriculum = "AU";
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
  description: string | null;
};

export const SUBJECT_COLORS: Record<string, { bg: string; color: string; thumb: string; icon: string }> = {
  "Mathematics":  { bg: "#EEF1FD", color: "#4361EE", thumb: "linear-gradient(135deg,#EEF1FD,#C8D0FA)", icon: "📐" },
  "English":      { bg: "#FDECEE", color: "#E63946", thumb: "linear-gradient(135deg,#FDECEE,#FAC8CB)", icon: "📖" },
  "Science":      { bg: "#E8F5F3", color: "#2A9D8F", thumb: "linear-gradient(135deg,#E8F5F3,#8FD1CA)", icon: "🔬" },
  "HASS":         { bg: "#FEF0EC", color: "#E76F51", thumb: "linear-gradient(135deg,#FEF0EC,#FAC8B0)", icon: "🌏" },
  "The Arts":     { bg: "#F4EFFE", color: "#9B5DE5", thumb: "linear-gradient(135deg,#F4EFFE,#DCC8FA)", icon: "🎨" },
  "HPE":          { bg: "#EDF7F2", color: "#3D9A6A", thumb: "linear-gradient(135deg,#EDF7F2,#B5E0CB)", icon: "🏃" },
  "Technologies": { bg: "#FEF4EC", color: "#C47330", thumb: "linear-gradient(135deg,#FEF4EC,#FAD8B0)", icon: "💻" },
};

export const ALL_SUBJECTS = ["Mathematics", "English", "Science", "HASS", "The Arts", "HPE", "Technologies"];
export const ALL_YEARS = ["Foundation", "Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"];
export const ALL_TYPES = ["Worksheets", "Lesson Plans", "Flashcards", "Activity Pack", "Assessments", "Digital Slides"];
