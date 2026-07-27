// ============================================================
// writeups.ts — Source of truth for writeup listing entries
// ============================================================

export interface WriteupEntry {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;        // MM-DD or full date display string
  readTime: string;
  tags: string[];
  href: string;        // link to the writeup page
  external?: boolean;  // if true, opens in new tab
}

export const writeups: WriteupEntry[] = [
  {
    id: "fam-ctf-2026",
    slug: "fam-ctf-2026",
    title: "FAM CTF 2026: Full Challenge Writeup",
    description:
      "Complete technical writeup of all six FAM CTF challenges covering Android static analysis, Firebase authentication and App Check, native reverse engineering, API request signing, JWT privilege escalation, SSRF, and cloud exploitation.",
    date: "07-08",
    readTime: "25 min read",
    tags: ["CTF", "ANDROID", "REVERSE ENGINEERING", "FIREBASE", "WEB SECURITY", "CLOUD"],
    href: "/writeups/fam-ctf-2026.html",
  },
];

