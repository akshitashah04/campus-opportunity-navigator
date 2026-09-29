# Product brief · V0

## Opportunity

Students may miss relevant university opportunities when listings are scattered across portals, department pages, newsletters, and personal networks. This statement is an **unvalidated hypothesis**.

## Who and what

| Decision | V0 choice | Why |
| --- | --- | --- |
| User | Graduate students actively looking for campus opportunities | Narrow enough to interview and observe |
| Job to be done (draft) | “When I look for a campus opportunity, help me find options I can consider and keep track of my progress.” | Needs validation in the user’s own words |
| Prototype goal | Demonstrate discovery and tracking in one flow | A focused first slice |
| Data | Six fictional listings | Prevent confusion with unverified real openings |

## Assumptions to test

1. Students search more than one channel per search session.
2. They have missed or nearly missed a deadline.
3. Eligibility ambiguity deters some applications.
4. Students currently use ad hoc tracking methods.
5. A unified browse and tracking flow would remove a meaningful pain point.

The prototype does not prove any of these. Interview evidence may invalidate the idea or point toward a different problem.

## V0 scope

Search, type filtering, details, saving, and a simple application stage are implemented. There is no account, live aggregation, real eligibility verdict, ranking algorithm, reminder, or application submission.

## What to measure in a future pilot

| Question | Possible metric | Guardrail |
| --- | --- | --- |
| Can students find a relevant role? | Share of test participants who identify one within 3 minutes | Confirm that the role is truly relevant, not just clicked |
| Can they keep track of it? | Share who save and update a role without help | Observe confusion and accidental changes |
| Does it improve the existing process? | Reported time and steps for a comparable task, before and after | Small usability tests cannot prove long term impact |

These are proposed measures, **not results**. No analytics events are collected in V0.

## Risks and decisions

- **Data quality:** A live product needs authoritative source links, verified eligibility, and a process for expired roles. Do not scrape or imply freshness without a maintenance plan.
- **Trust:** Matching language can mislead applicants. Show the source and reasoning if eligibility guidance is ever added.
- **Privacy:** Saved status currently stays only in the user’s browser. Any account system would need a separate privacy design.
- **Research bias:** Interview people who found jobs easily as well as those who struggled.

## Next decision gate

After five interviews, synthesize observed search journeys. If fragmentation is a repeated, consequential pain point, test the current prototype with three students. If another pain point dominates, revise the project direction before adding features.
