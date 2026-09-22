import { z } from "zod";

/**
 * Careers page content.
 *
 * Descriptions of the working environment, what Lerriley looks for when
 * hiring, and how the hiring process runs. No team sizes, no names, no
 * open roles invented here - open roles come from content/careers/*.mdx.
 */

export const CareersPageSchema = z.object({
  eyebrow: z.string().min(2).max(40),
  heading: z.string().min(10).max(120),
  lead: z.string().min(60).max(400),

  workingHeading: z.string().min(4).max(80),
  working: z.array(z.string().min(60).max(400)).min(2).max(4),

  lookingHeading: z.string().min(4).max(80),
  looking: z.array(z.string().min(40).max(240)).min(3).max(6),

  hiringHeading: z.string().min(4).max(80),
  hiring: z.array(z.string().min(30).max(280)).min(3).max(6),

  openHeading: z.string().min(4).max(80),
  emptyState: z.string().min(60).max(400),
});

export type CareersPage = z.infer<typeof CareersPageSchema>;

export const careersPage: CareersPage = CareersPageSchema.parse({
  eyebrow: "Careers",
  heading: "Working at Lerriley",
  lead: "We are an engineering company. The people here build systems that organizations use every day, and they care about whether those systems actually work. This page describes what that looks like in practice.",

  workingHeading: "What the work is like",
  working: [
    "The work is real. Systems we build are used by people who notice when they are wrong. That is a higher standard than a demo, and it is the standard we hold.",
    "The work is deliberate. We spend more time understanding a problem than a typical agency does, because the alternative is building the wrong thing quickly. Small decisions compound, and we make them carefully.",
    "The work is transparent. Code, decisions, and trade-offs are documented. A new engineer can read the reasoning behind what exists, not just the code that exists.",
  ],

  lookingHeading: "What we look for",
  looking: [
    "Engineers who start with the problem, not the stack. The best solution is often simpler than the first idea, and finding it requires understanding why the problem exists.",
    "People who write and read carefully. Documentation, code comments, and commit messages are part of the work, not overhead.",
    "People who value maintenance. A system is not done when it ships; it is done when it can be understood and changed by whoever maintains it next.",
    "People who ask before they assume. Ambiguity in requirements is solved by conversation, not by guessing and hoping.",
    "People who can say no. To a feature, to a shortcut, to a deadline that would require compromising something important.",
  ],

  hiringHeading: "How hiring works",
  hiring: [
    "A conversation. We talk about the work you have done and the problems you have solved, in whatever depth you are comfortable with.",
    "A small paid project or a discussion of real code you have written. We do not ask for unpaid work. If we ask for a demonstration of your skill, we pay for it.",
    "A conversation with the team. You will meet the people you would work with, and they will meet you.",
    "A decision. We tell you either way, in writing, and we explain our reasoning.",
  ],

  openHeading: "Open roles",
  emptyState:
    "We do not have open roles posted at the moment. If you are an engineer whose approach matches what is described above, send us a note and a link to something you have built. We keep in touch with engineers we would want to work with when the right problem arrives.",
});
