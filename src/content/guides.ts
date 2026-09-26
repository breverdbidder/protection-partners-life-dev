// Guide articles as typed content objects — dependency-light for the scaffold.
// Migrate to MDX or a CMS when the article count grows.

import type { SchemaFaq } from "@/lib/schema";

export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  readMinutes: number;
  topic: string;
  intro: string[];
  sections: GuideSection[];
  faqs: SchemaFaq[];
};

export const guides: Guide[] = [
  {
    slug: "what-is-final-expense-insurance",
    title: "What Is Final Expense Insurance?",
    description:
      "Final expense insurance is a small whole life policy that covers funeral costs and end-of-life bills. Learn how it works, what it costs, and who it's for.",
    datePublished: "2026-09-26",
    readMinutes: 6,
    topic: "Final Expense",
    intro: [
      "Final expense insurance — also called burial insurance or funeral insurance — is a small whole life insurance policy designed to cover the costs your family faces when you pass away: the funeral, medical bills, and any lingering debts.",
      "The average funeral in the United States now costs between $8,000 and $12,000, and most families don't have that set aside. A final expense policy makes sure that bill never lands on the people you love.",
      "This guide explains how these policies work, who they're designed for, what they realistically cost, and the one distinction — simplified issue versus guaranteed acceptance — that makes the biggest difference in both price and protection.",
    ],
    sections: [
      {
        heading: "How final expense insurance works",
        paragraphs: [
          "Final expense insurance is simplified-issue whole life insurance. That means there is no medical exam — approval is based on a short set of health questions — and the coverage is permanent. As long as you pay the premium, the policy never expires and your rate never increases.",
          "Coverage amounts are intentionally modest, typically between $2,000 and $50,000. That keeps premiums affordable on a fixed income while still covering a funeral, burial or cremation, and final bills.",
        ],
        bullets: [
          "No medical exam — just health questions on the application",
          "Rates are locked in for life and can never go up",
          "Coverage never expires as long as premiums are paid",
          "Benefits are paid to your beneficiary in cash, usually within days",
        ],
      },
      {
        heading: "Who should consider it",
        paragraphs: [
          "Final expense insurance is built for people between 45 and 85 who want to make sure their funeral costs are covered without burdening family. It's especially useful if you've been declined for traditional life insurance because of health issues — the simplified underwriting accepts many conditions that regular policies won't.",
          "If you're younger and healthy, a larger term or whole life policy usually offers far more coverage per dollar. Final expense shines when age or health makes those policies expensive or unavailable.",
        ],
      },
      {
        heading: "What it costs",
        paragraphs: [
          "Premiums depend on your age, gender, state, health, and coverage amount. As a rough guide, a healthy 65-year-old woman might pay $40–$60 per month for $10,000 of coverage; a 75-year-old man might pay $90–$130 for the same amount. Tobacco use raises rates significantly.",
          "Because prices vary widely between carriers for the exact same coverage, comparing quotes from multiple companies is the single most effective way to save — often 30% or more for identical protection.",
        ],
      },
      {
        heading: "Guaranteed acceptance vs. simplified issue",
        paragraphs: [
          "Most final expense policies ask health questions and pay the full benefit from day one. Guaranteed-acceptance policies ask no questions at all, but nearly all of them impose a two-year waiting period before the full death benefit applies — and they cost more.",
          "If you can qualify for a simplified-issue policy with immediate coverage, you should. An independent agent who works with many carriers can usually find immediate coverage even with serious health conditions.",
        ],
      },
      {
        heading: "How to buy it — and the mistakes to avoid",
        paragraphs: [
          "Start by deciding what the policy actually needs to cover: a cremation with a simple service is a very different number than a traditional funeral with burial, a plot, and a headstone. Price that honestly, add a cushion for medical bills and small debts, and you have your coverage target. Buying a round number without doing that math is how people end up over-insured on a tight budget or under-insured when it matters.",
          "Then compare carriers — not just prices, but underwriting. The most common mistake in this market is answering a TV or mail advertisement for a guaranteed-acceptance policy without checking whether you'd qualify for a cheaper, immediate-coverage policy with health questions. The second most common is buying from the first agent who calls: captive agents can only sell their own company's product, whatever it costs.",
          "Finally, be accurate on the health questions. Answers are verified against prescription databases and, in a claim, against medical records. An honest application with the right carrier beats an optimistic application with the wrong one every time — and an independent agent can usually find a carrier whose questions your history genuinely passes.",
        ],
      },
      {
        heading: "The bottom line",
        paragraphs: [
          "Final expense insurance does one job and does it well: it puts cash in your family's hands within days, at the moment the funeral home is asking for payment. If you're between 45 and 85 and want that certainty, prioritize a simplified-issue policy with first-day coverage, size it against real funeral costs rather than a round number, and compare at least three carriers before signing — the same coverage routinely varies in price by a third or more. Get those three things right and this is one of the most reliable, least complicated financial products you can own.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does final expense insurance require a medical exam?",
        a: "No. Final expense policies use simplified underwriting — a short list of health questions on the application. Some guaranteed-acceptance versions ask no health questions at all.",
      },
      {
        q: "How quickly does final expense insurance pay out?",
        a: "Most carriers pay the death benefit within 24–48 hours of receiving the claim paperwork, so funds are available when your family needs them.",
      },
      {
        q: "Can my rate increase as I get older?",
        a: "No. Final expense insurance is whole life insurance: your premium is fixed at the age you buy and is locked in for life.",
      },
      {
        q: "Is there a waiting period?",
        a: "Policies approved through health questions usually cover you fully from day one. Guaranteed-acceptance policies typically have a two-year waiting period for the full benefit.",
      },
    ],
  },
  {
    slug: "term-vs-whole-life-insurance",
    title: "Term vs. Whole Life: Which Is Right for You?",
    description:
      "Term life is cheap, temporary protection; whole life is permanent coverage with cash value. Here's how to decide which fits your family and budget.",
    datePublished: "2026-09-26",
    readMinutes: 7,
    topic: "Life Insurance Basics",
    intro: [
      "Almost every life insurance decision starts with the same question: term or whole life? They solve different problems, and choosing well comes down to what you need the coverage to do and for how long.",
      "The short version: term life buys the most protection per dollar for a set window of years, while whole life costs more but never expires and builds cash value.",
      "Below we walk through how each one actually works, a decision framework that matches the policy to the obligation it protects, the conversion option most buyers overlook, and the three mistakes that cost families the most money in practice.",
    ],
    sections: [
      {
        heading: "How term life works",
        paragraphs: [
          "Term life covers you for a fixed period — usually 10, 15, 20, or 30 years — with a level premium the whole time. If you die during the term, your beneficiary receives the full death benefit tax-free. If you outlive the term, coverage ends (or renews at much higher annual rates).",
          "Because the insurer is only on the hook for a limited window, term life is dramatically cheaper. A healthy 35-year-old can often buy $500,000 of 20-year term coverage for $25–$35 per month.",
        ],
      },
      {
        heading: "How whole life works",
        paragraphs: [
          "Whole life covers you for your entire life with a premium that never changes. Part of each payment builds cash value that grows tax-deferred and can be borrowed against or withdrawn later.",
          "That permanence and savings component costs real money: whole life premiums typically run 8–12 times higher than term for the same death benefit. The trade is guaranteed lifelong coverage and a forced-savings vehicle.",
        ],
      },
      {
        heading: "A simple decision framework",
        paragraphs: [
          "Match the coverage to the obligation. Most financial obligations are temporary — a mortgage, raising children, replacing income until retirement. Term life is built for exactly those: big coverage that lasts as long as the obligation does.",
          "Whole life fits needs that never expire: final expenses, estate planning, a special-needs dependent, or a desire to leave a guaranteed inheritance. Many families combine both — a large term policy through the working years plus a smaller permanent policy for final costs.",
        ],
        bullets: [
          "Choose term for income replacement, a mortgage, or your kids' younger years",
          "Choose whole life for needs that last a lifetime, like final expenses or estate planning",
          "A blend of both often covers everything at the lowest total cost",
        ],
      },
      {
        heading: "What about converting term to permanent?",
        paragraphs: [
          "Most quality term policies include a conversion privilege: you can swap some or all of the coverage into a permanent policy later without new medical underwriting. If your health changes during the term, that option becomes extremely valuable — ask about conversion rules before you buy.",
        ],
      },
      {
        heading: "The mistakes that cost people the most",
        paragraphs: [
          "The first is buying whole life when the budget only supports a fraction of the needed coverage. A $100,000 whole life policy that fits your monthly budget protects your family far less than the $500,000 term policy the same premium would buy during the years they depend on you. Coverage amount protects your family; the policy type is just the vehicle.",
          "The second is waiting. Term rates rise roughly 8–10% for every year of age, and a health event — even a minor one — can move you into a more expensive underwriting class permanently. The rate you qualify for today is the cheapest it will ever be.",
          "The third is letting a term policy quietly expire without a plan. Set a reminder for two years before the term ends: that's when to either convert remaining coverage, re-shop a new term, or confirm you've genuinely outgrown the need. Doing it early, while you're still insurable at standard rates, keeps every option open.",
        ],
      },
      {
        heading: "The bottom line",
        paragraphs: [
          "Buy coverage for the obligation, not the product. If people depend on your income today, a level term policy sized at 10–12 times your income — bought at your current age, with a conversion privilege — protects them for less than most people expect. If the need is permanent, like final expenses or an inheritance you want guaranteed, whole life earns its higher premium. And if both are true, combine them: a large term policy for the working years plus a modest permanent one is usually the cheapest way to cover everything that actually needs covering.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is term life insurance a waste of money if I outlive it?",
        a: "No more than car insurance is wasted if you never crash. You're paying for protection during the years your family depends on your income — and the low cost is what makes adequate coverage affordable.",
      },
      {
        q: "How much life insurance do I need?",
        a: "A common starting point is 10–12 times your annual income, adjusted for your mortgage balance, debts, and the years remaining until your children are independent.",
      },
      {
        q: "Can I have both term and whole life policies?",
        a: "Yes, and it's often the smartest structure: a large term policy for your working years plus a smaller whole life policy that covers final expenses permanently.",
      },
      {
        q: "Does whole life cash value go to my beneficiary too?",
        a: "In a standard whole life policy the beneficiary receives the death benefit; the cash value is what you can use while alive via withdrawals or loans.",
      },
    ],
  },
  {
    slug: "how-much-does-burial-insurance-cost",
    title: "How Much Does Burial Insurance Cost?",
    description:
      "Burial insurance typically costs $30–$150 per month depending on age, health, gender, and coverage. See sample rates and what drives your price.",
    datePublished: "2026-09-26",
    readMinutes: 6,
    topic: "Cost",
    intro: [
      "Burial insurance premiums depend on five things: your age, gender, health, tobacco use, and the amount of coverage you choose. Most buyers pay somewhere between $30 and $150 per month.",
      "Because every carrier prices those factors differently, two companies can quote the same person prices that differ by 40% or more for identical coverage. Knowing the ranges below helps you spot a fair offer.",
      "This guide covers what actually moves your premium, realistic rate ranges by age and gender, how underwriting classes are assigned behind the scenes, and the practical levers that lower your price without shrinking your protection.",
    ],
    sections: [
      {
        heading: "What drives your premium",
        paragraphs: [
          "Age matters most: each year you wait raises the price, because whole life rates are locked at the age you buy. Gender is second — women pay less at every age due to longer life expectancy. Tobacco use commonly adds 30–80% to the premium.",
          "Health conditions affect which underwriting class you qualify for. Well-managed conditions like controlled blood pressure or diabetes often still qualify for immediate, first-day coverage; more serious recent events (a heart attack in the past year, active cancer treatment) may route you to a graded or guaranteed-issue policy at a higher price.",
        ],
      },
      {
        heading: "Illustrative monthly rates for $10,000 of coverage",
        paragraphs: [
          "The figures below are illustrative, non-tobacco ranges for a $10,000 simplified-issue whole life policy, to show how age and gender move the price. Your actual quotes will vary by carrier, state, and health.",
        ],
        bullets: [
          "Age 50: women ~$25–$32, men ~$29–$39",
          "Age 60: women ~$32–$42, men ~$41–$54",
          "Age 70: women ~$48–$63, men ~$65–$85",
          "Age 80: women ~$85–$115, men ~$115–$150",
        ],
      },
      {
        heading: "How to pay less for the same coverage",
        paragraphs: [
          "Buy sooner rather than later — the rate you lock today is the rate you keep for life. Answer health questions accurately but shop carriers whose underwriting is friendliest to your specific conditions; this is where an independent agent earns their keep, since they can match your health profile to the carrier that prices it best.",
          "Avoid guaranteed-acceptance policies unless you truly can't qualify elsewhere: they cost more and delay the full benefit for two years. And right-size the coverage — the goal is covering your actual final expenses, not a round number.",
        ],
      },
      {
        heading: "What funerals actually cost",
        paragraphs: [
          "The national median funeral with viewing and burial runs roughly $8,000–$10,000 before cemetery costs; cremation with a service typically runs $6,000–$7,000. Add cemetery plot, headstone, and outstanding medical bills, and $10,000–$20,000 of coverage fits most situations.",
        ],
      },
      {
        heading: "How carriers decide what you pay",
        paragraphs: [
          "Every application lands in one of a handful of underwriting classes, and the class — not the sticker rate — determines your price. Level (or preferred) class means full first-day coverage at the best price, and it's available to more people than the advertising suggests: controlled blood pressure, cholesterol medication, well-managed diabetes, and even a heart attack more than a couple of years back often still qualify with the right carrier.",
          "Graded class adds a modified benefit schedule for the first two years at a higher premium, and it's where applications with recent serious conditions usually land. Guaranteed issue asks nothing and takes everyone in the age range, but it's the most expensive coverage per dollar and always carries the waiting period.",
          "Here's the practical takeaway: the same person frequently qualifies for level coverage at one carrier and only graded at another, because each company writes its own health questions. That's why comparing carriers matters more in this market than in almost any other kind of insurance — and why quoted prices for identical coverage can differ by 40% or more.",
        ],
      },
      {
        heading: "The bottom line",
        paragraphs: [
          "Expect to pay somewhere between $30 and $150 a month depending on your age, gender, health, and coverage amount — and treat any quote outside the ranges in this guide as a prompt to shop harder, not a fact of life. The three levers that reliably lower your price are buying at your current age instead of waiting, qualifying for a health-questions policy instead of guaranteed acceptance, and comparing several carriers whose underwriting fits your specific history. A licensed independent agent can pull all three levers for you in a single phone call, at no cost.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the cheapest way to get burial insurance?",
        a: "Qualify for a simplified-issue policy with health questions (rather than guaranteed acceptance), buy at your current age rather than waiting, and compare quotes from multiple carriers before choosing.",
      },
      {
        q: "Do burial insurance premiums ever increase?",
        a: "No — burial insurance is whole life insurance, so the premium is fixed for life once the policy is issued.",
      },
      {
        q: "Can I get burial insurance with pre-existing conditions?",
        a: "Usually yes. Many carriers accept controlled conditions like high blood pressure, diabetes, and past (non-recent) heart events with immediate full coverage; more serious conditions may qualify through graded-benefit policies.",
      },
      {
        q: "Is $10,000 enough burial insurance?",
        a: "It covers a median cremation or basic burial. If you want a traditional funeral with burial, cemetery costs, and a headstone, $15,000–$20,000 is a safer target.",
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
