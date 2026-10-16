# Complete content and SEO reference — production v2

This file contains the full effective content dataset, text rendered for all current routes and the full source text-literal catalogue, including hidden/error/admin states. It is an editorial reference, not a runtime replacement module. To change CMS-style content, use the admin editor or the corresponding named field in `lib/content.ts`; UI copy locations are recorded below. Do not assume editing this document alone changes the app.

## SEO and identity

- Root layout title: Aur Labs — Good software. For everyone.
- Shared description: An independent, non-profit software lab building useful free tools for people everywhere. Explore our work, join the team, or share a problem worth solving.
- Open Graph title: Aur Labs — Good software. For everyone.
- Open Graph description: Useful tools. Thoughtful design. Zero price tags.
- Open Graph type: website.
- Open Graph image: `/assets/aur-sculpture.png`, declared 1254 × 1254, alt “Aur Labs chrome sculpture”.
- Metadata base: `https://aur-labs.warmkid256.chatgpt.site`. This is the actual source value and a known canonical-domain mismatch to correct during migration.
- Canonical: each catch-all route's own relative path resolved against that metadata base.
- Favicon and shortcut: `/favicon.svg`.
- HTML language: `en`; no language-switch implementation.
- Admin robots metadata: index false, follow false. No explicit sitemap.xml or robots.txt source file/route exists. No structured-data JSON-LD or separate Twitter configuration is defined in the app metadata.
- No application analytics ID or analytics provider is configured. Provider-level hosting telemetry is not exported as an app integration.
- Contact email: **aur@Aurlabs.online**. Contact/volunteer forms write D1 `submissions`, not SMTP. Admin reply opens a mailto link.
- Public products are design concepts with no live download packages. Team artwork uses initials where no real portrait is supplied.

## Page titles

| Route | HTML metadata title |
| --- | --- |
| `/` | Good software. For everyone. — Aur Labs |
| `/products` | The collection — Aur Labs |
| `/about` | Our story — Aur Labs |
| `/journal` | Inside the lab — Aur Labs |
| `/research` | Research & explorations — Aur Labs |
| `/join` | Build with us — Aur Labs |
| `/support` | Support the mission — Aur Labs |
| `/contact` | Start a conversation — Aur Labs |
| `/privacy` | Privacy notice — Aur Labs |
| `/terms` | Terms of use — Aur Labs |
| `/admin` | Admin studio — Aur Labs |
| `/products/aur-notes` | Aur Notes — Aur Labs |
| `/products/aur-pocket` | Aur Pocket — Aur Labs |
| `/products/aur-cli` | Aur CLI — Aur Labs |
| `/journal/why-we-build-for-everyone` | Good tools shouldn’t be a privilege. — Aur Labs |
| `/journal/designing-with-a-little-more-care` | A little less friction. A little more care. — Aur Labs |
| `/research/making-useful-tools-more-accessible` | What makes a free tool truly accessible? — Aur Labs |

All routes inherit the shared description/Open Graph defaults unless source is changed; there are no unique per-article description overrides in this production version.

## Full effective CMS content

### settings.name

Aur Labs

### settings.email

aur@Aurlabs.online

### settings.tagline

Good software. For everyone.

### settings.heroLine1

Good software.

### settings.heroLine2

For everyone.

### settings.heroDescription

Useful tools. Thoughtful design. Zero price tags. We’re an independent, non-profit team building software that puts people first.

### settings.mission

We believe great software should open doors. Not put a price on them.

### settings.about

Aur Labs is an independent, non-profit software initiative building free software and apps for people everywhere. We bring thoughtful design and practical engineering to everyday challenges, so more people can benefit from technology.

Have a problem worth solving? Tell us about it. We’ll listen, explore what’s possible, and do our best to build a useful solution. We can’t promise to solve every challenge, but we can promise to take yours seriously.

### settings.donationIntro

Free for the people who use it. Powered by the people who believe in it. Your support can help cover hosting, development tools, accessibility testing, and the time it takes to build something useful.

### settings.donationUrl

Empty string (not configured).

### settings.donationMonthlyUrl

Empty string (not configured).

### settings.donationProvider

Support Aur Labs

### settings.donationTransparency

We are setting up our donation channels. Until then, contact us to discuss a contribution. We’ll confirm the payment method and purpose with you before you send anything. No funds are collected on this website. We do not currently claim that contributions are tax-deductible.

### settings.githubUrl

Empty string (not configured).

### settings.footerNote

Built with care. Made for everyone.

### settings.hiring

True

### products[0].id

aur-notes

### products[0].slug

aur-notes

### products[0].name

Aur Notes

### products[0].tagline

A little room for your next big idea.

### products[0].description

A concept for a calm desktop workspace that makes everyday notes feel simple. This illustrative product gives you a preview of the kind of thoughtful, approachable tools we want to build.

This is a design concept, not a released application. Features and target platforms describe the proposed direction and are not confirmed capabilities.

### products[0].category

software

### products[0].platforms[0]

Windows

### products[0].platforms[1]

macOS

### products[0].platforms[2]

Linux

### products[0].status

concept

### products[0].featured

True

### products[0].accent

lavender

### products[0].visual

notes

### products[0].features[0]

A calm, focused writing space

### products[0].features[1]

Simple notebooks and quick search

### products[0].features[2]

A free tool for everyday ideas

### products[0].screenshots

Empty list.

### products[0].repository

Empty string (not configured).

### products[0].license

To be confirmed before release

### products[0].releases

Empty list.

### products[0].published

True

### products[1].id

aur-pocket

### products[1].slug

aur-pocket

### products[1].name

Aur Pocket

### products[1].tagline

Your everyday, a little more together.

### products[1].description

An illustrative mobile app concept for keeping small tasks and useful ideas close. A thoughtful interface, a little clarity, and fewer distractions.

This is a design concept. There is no Android or iOS download yet. The proposed interface and platform targets are examples for the future catalogue.

### products[1].category

app

### products[1].platforms[0]

Android

### products[1].platforms[1]

iOS

### products[1].status

concept

### products[1].featured

True

### products[1].accent

peach

### products[1].visual

mobile

### products[1].features[0]

A clear view of the day

### products[1].features[1]

Gentle, useful reminders

### products[1].features[2]

Designed with one-handed use in mind

### products[1].screenshots

Empty list.

### products[1].repository

Empty string (not configured).

### products[1].license

To be confirmed before release

### products[1].releases

Empty list.

### products[1].published

True

### products[2].id

aur-cli

### products[2].slug

aur-cli

### products[2].name

Aur CLI

### products[2].tagline

Less busywork. More building.

### products[2].description

A concept for a friendly command-line companion, designed to make repeatable developer tasks easier to understand.

This is a catalogue concept, not a working command-line package. Commands shown in the interface are illustrative and should not be installed or run.

### products[2].category

cli

### products[2].platforms[0]

Windows

### products[2].platforms[1]

macOS

### products[2].platforms[2]

Linux

### products[2].status

concept

### products[2].featured

True

### products[2].accent

mint

### products[2].visual

terminal

### products[2].features[0]

Readable, helpful terminal output

### products[2].features[1]

Guided setup without the guesswork

### products[2].features[2]

A simpler development routine

### products[2].screenshots

Empty list.

### products[2].repository

Empty string (not configured).

### products[2].license

To be confirmed before release

### products[2].releases

Empty list.

### products[2].published

True

### journal[0].id

why-free

### journal[0].slug

why-we-build-for-everyone

### journal[0].title

Good tools shouldn’t be a privilege.

### journal[0].summary

The idea behind Aur Labs, and why access belongs at the heart of what we build.

### journal[0].tag

From the lab

### journal[0].author

Aur Labs

### journal[0].date

2026-10-11

### journal[0].cover

Empty string (not configured).

### journal[0].published

True

### journal[0].body

A useful tool can change a day. It can save someone an hour, make a complicated task understandable, or help an idea become something real. Access to those tools matters.

Aur Labs exists to build free software and apps for people everywhere. Our starting point is simple: listen to a real problem, understand who experiences it, and look for the smallest helpful solution.

Free doesn’t mean careless. We want our work to feel considered, welcoming, and easy to use. That includes clear interfaces, honest product information, and support that treats people with respect.

We’re at the beginning. The catalogue currently includes clearly marked design concepts, and we’ll share verified releases as they become available. If you have a problem, a skill, or an idea to contribute, there’s a place to start here.

### journal[1].id

design-with-care

### journal[1].slug

designing-with-a-little-more-care

### journal[1].title

A little less friction. A little more care.

### journal[1].summary

Our approach to interfaces that help people feel capable, one small decision at a time.

### journal[1].tag

Design notes

### journal[1].author

Aur Labs

### journal[1].date

2026-10-11

### journal[1].cover

Empty string (not configured).

### journal[1].published

True

### journal[1].body

A good interface answers the next question before it becomes a problem. What does this button do? Where did my work go? How can I fix this mistake?

We aim to make those answers visible. Clear labels, helpful examples, readable type, and forgiving forms are part of that commitment.

Our website companion Auri is a small expression of this idea. It offers guidance when you ask and explains form errors with an example. It doesn’t need to interrupt you to be useful.

These are design principles we intend to keep improving through feedback. Tell us where something feels confusing, and help us make it clearer.

### research[0].id

accessibility

### research[0].slug

making-useful-tools-more-accessible

### research[0].title

What makes a free tool truly accessible?

### research[0].summary

An open question about devices, connectivity, language, and the people software leaves out.

### research[0].tag

Research direction

### research[0].author

Aur Labs

### research[0].date

2026-10-11

### research[0].cover

Empty string (not configured).

### research[0].published

True

### research[0].body

Price is one barrier to access, but it isn’t the only one. A tool may be free and still be difficult to use on an older device, a slow connection, or with assistive technology.

We want to explore how simple interfaces, small downloads, clear language, and thoughtful platform support can make software more useful to more people.

This is a research direction, not a completed study. No findings, benchmarks, or participant results are claimed here.

Have a relevant experience or an idea for an experiment? Share it through our contact page. Practical examples can help shape the questions we investigate next.

### team[0].id

awab

### team[0].name

Awab Ur Rehman

### team[0].role

Founder & CEO

### team[0].bio

Leading Aur Labs with a simple mission: make useful technology available to more people.

### team[0].initials

AR

### team[0].image

Empty string (not configured).

### team[0].url

Empty string (not configured).

### team[0].published

True

### team[1].id

nafisa

### team[1].name

Nafisa

### team[1].role

UI/UX Designer

### team[1].bio

Shaping thoughtful, approachable experiences that help people feel at home with technology.

### team[1].initials

N

### team[1].image

Empty string (not configured).

### team[1].url

Empty string (not configured).

### team[1].published

True

## Full route text snapshots

Generated by React server rendering of the unchanged source and complete public content. Conditional interaction states are additionally covered by the source copy catalogue below. These are text snapshots, not native-browser screenshots.

### /

```text
Skip to content
Aur LabsINDEPENDENT SOFTWARE LAB
Products
About us
Journal
Research
Join us
Support the mission
AN INDEPENDENT, NON-PROFIT SOFTWARE LAB
Good software.
For everyone.
Useful tools. Thoughtful design. Zero price tags. We’re an independent, non-profit team building software that puts people first.
Explore our tools
Meet the lab
a
Small team. Big possibilities.
Built with care, for people everywhere.
AUR / WORKSPACE OPEN POSSIBILITIES
Aur Notes
Aur Pocket
Aur CLI
Aur Notes
My spaceAll notesIdeas & thingsLittle reminders New note
A LITTLE SPACE TO THINK
Make room
for good ideas.
Big things start with a small thought.
Capture a little inspiration Build something useful
Keep it simple. Make it matter. ✳
ILLUSTRATIVE CONCEPT
Concept preview
A little room for your next big idea.
Thoughtful by design.Free by purpose. ↗
A SMALL LOOK AT WHAT’S NEXT
Free by purpose Built for everyone Ideas into useful things People before profit
THINGS WE’RE BUILDING
A little code.
A lot of possibility.
Thoughtful tools for everyday challenges.
Explore what’s taking shape in the lab.
Explore all products
Aur Notes
My spaceAll notesIdeas & thingsLittle reminders New note
A LITTLE SPACE TO THINK
Make room
for good ideas.
Big things start with a small thought.
Capture a little inspiration Build something useful
Keep it simple. Make it matter. ✳
ILLUSTRATIVE CONCEPT
Desktop softwareConcept preview
Aur Notes
A little room for your next big idea.
WindowsmacOSLinuxPreview
9:41
A little
more clarity.
Space for what matters.
Let’s begin
9:41
GOOD MORNING
Hey, you. ☀
Let’s make a little progress.
Today’s focusMake something
you believe in.
A fresh idea  Small steps  Time to recharge
⌂☷
ILLUSTRATIVE CONCEPT
Mobile appConcept preview
Aur Pocket
Your everyday, a little more together.
AndroidiOSPreview
~ / a little less busywork
aur cli
❯ aur hello
Let’s build something useful.
✓ A clear starting point
✓ A little less friction
✓ More room to create
❯
ILLUSTRATIVE CONCEPT
Command lineConcept preview
Aur CLI
Less busywork. More building.
WindowsmacOSLinuxPreview
The lab is just getting started. Concept previews show ideas in progress, not released software.
FOR EVERY
ONE OF US.
GOOD IDEAS HAVE NO BORDERS ↗
Human at the core.
MORE THAN SOFTWARE
We believe great software should open doors. Not put a price on them.
We’re a small team turning real-world problems into useful, free tools. No big promises. Just curious people, thoughtful work, and a belief that technology can do a little more good.
The people & purpose behind Aur
01 / Purpose before profit02 / Access without barriers03 / Better, together
NOTES FROM THE LAB
Always curious.
Always making.
Inside the journal
a↗
AUR LABS / FIELD NOTES
From the labOct 11, 2026
Good tools shouldn’t be a privilege.
The idea behind Aur Labs, and why access belongs at the heart of what we build.
AUR LABS / FIELD NOTES
Design notesOct 11, 2026
A little less friction. A little more care.
Our approach to interfaces that help people feel capable, one small decision at a time.
THERE’S ROOM FOR YOU HERE
Good things start
with good people.
Bring your curiosity, your craft, or a problem worth solving.
Let’s make something that matters.
Build with us
Tell us your idea
YOUR NEXT
GOOD THING
STARTS HERE.
Free software needs a little support.
Help us keep useful things free and the lab moving forward.
Fuel the mission
Aur Labs
Independent minds.
A shared belief in better.
aur@Aurlabs.online
Explore the lab
Our products
Our story
Journal
Research
Be part of it
Join the team
Support our work
Share a problem
Get in touch
Free tools.
Bigger possibilities.
© 2026 Aur Labs. Built with care. Made for everyone.
Privacy
Terms
Admin
A little good on the internet
aAsk Auri
```

### /products

```text
Skip to content
Aur LabsINDEPENDENT SOFTWARE LAB
Products
About us
Journal
Research
Join us
Support the mission
THE AUR COLLECTION
Your next useful
little thing.
Software, apps, and command-line tools. Made with care, built around real needs, and free when released.
All tools
Desktop
Mobile
CLI
All platforms
Windows
macOS
Linux
FreeBSD
Android
iOS
Web
Other
3 tools to explore
Sort by
Featured
Name: A–Z
Available first
Aur Notes
My spaceAll notesIdeas & thingsLittle reminders New note
A LITTLE SPACE TO THINK
Make room
for good ideas.
Big things start with a small thought.
Capture a little inspiration Build something useful
Keep it simple. Make it matter. ✳
ILLUSTRATIVE CONCEPT
Desktop softwareConcept preview
Aur Notes
A little room for your next big idea.
WindowsmacOSLinuxPreview
9:41
A little
more clarity.
Space for what matters.
Let’s begin
9:41
GOOD MORNING
Hey, you. ☀
Let’s make a little progress.
Today’s focusMake something
you believe in.
A fresh idea  Small steps  Time to recharge
⌂☷
ILLUSTRATIVE CONCEPT
Mobile appConcept preview
Aur Pocket
Your everyday, a little more together.
AndroidiOSPreview
~ / a little less busywork
aur cli
❯ aur hello
Let’s build something useful.
✓ A clear starting point
✓ A little less friction
✓ More room to create
❯
ILLUSTRATIVE CONCEPT
Command lineConcept preview
Aur CLI
Less busywork. More building.
WindowsmacOSLinuxPreview
A quick note from the lab. Concept previews are illustrative ideas. Available releases will include version numbers, verified platform requirements, and real download links.
Don’t see the thing you need?
That might be where our next idea begins.
Share your problem
Aur Labs
Independent minds.
A shared belief in better.
aur@Aurlabs.online
Explore the lab
Our products
Our story
Journal
Research
Be part of it
Join the team
Support our work
Share a problem
Get in touch
Free tools.
Bigger possibilities.
© 2026 Aur Labs. Built with care. Made for everyone.
Privacy
Terms
Admin
A little good on the internet
aAsk Auri
```

### /about

```text
Skip to content
Aur LabsINDEPENDENT SOFTWARE LAB
Products
About us
Journal
Research
Join us
Support the mission
SMALL TEAM. SHARED PURPOSE.
Built by people.
For people.
A software lab with a simple belief: useful technology should be within everyone’s reach.
aAUR / A LITTLE MORE POSSIBILITY
OUR STORY
We believe great software should open doors. Not put a price on them.
Aur Labs is an independent, non-profit software initiative building free software and apps for people everywhere. We bring thoughtful design and practical engineering to everyday challenges, so more people can benefit from technology.
Have a problem worth solving? Tell us about it. We’ll listen, explore what’s possible, and do our best to build a useful solution. We can’t promise to solve every challenge, but we can promise to take yours seriously.
Tell us what you’re facing
HOW WE WANT TO BUILD
01
Purpose comes first
We build around people’s needs and keep our software free to use.
02
Thoughtfulness is a feature
Clear language, approachable design, and accessibility belong in the process.
03
Good ideas travel
We welcome perspectives from everywhere. Useful problems don’t stop at borders.
04
Progress is a team sport
We learn, share feedback, and make room for people at different stages of their craft.
THE PEOPLE BEHIND THE PURPOSE
Meet the lab.
Different strengths.
One shared direction.
ARAUR LABS / TEAM
Awab Ur Rehman
Founder & CEO
Leading Aur Labs with a simple mission: make useful technology available to more people.
NAUR LABS / TEAM
Nafisa
UI/UX Designer
Shaping thoughtful, approachable experiences that help people feel at home with technology.
Your name
could be here.
Curiosity welcome.
A little heart required.
Find your place
Aur Labs
Independent minds.
A shared belief in better.
aur@Aurlabs.online
Explore the lab
Our products
Our story
Journal
Research
Be part of it
Join the team
Support our work
Share a problem
Get in touch
Free tools.
Bigger possibilities.
© 2026 Aur Labs. Built with care. Made for everyone.
Privacy
Terms
Admin
A little good on the internet
aAsk Auri
```

### /journal

```text
Skip to content
Aur LabsINDEPENDENT SOFTWARE LAB
Products
About us
Journal
Research
Join us
Support the mission
THINKING OUT LOUD
Inside the lab.
Out in the open.
Notes on making useful things, thoughtful design, and the small decisions that shape our work.
2 stories
All topics
From the lab
Design notes
a↗
AUR LABS / FIELD NOTES
From the labOct 11, 2026
Good tools shouldn’t be a privilege.
The idea behind Aur Labs, and why access belongs at the heart of what we build.
AUR LABS / FIELD NOTES
Design notesOct 11, 2026
A little less friction. A little more care.
Our approach to interfaces that help people feel capable, one small decision at a time.
A thought worth sharing?
We’d love to hear your perspective.
Start a conversation
Aur Labs
Independent minds.
A shared belief in better.
aur@Aurlabs.online
Explore the lab
Our products
Our story
Journal
Research
Be part of it
Join the team
Support our work
Share a problem
Get in touch
Free tools.
Bigger possibilities.
© 2026 Aur Labs. Built with care. Made for everyone.
Privacy
Terms
Admin
A little good on the internet
aAsk Auri
```

### /research

```text
Skip to content
Aur LabsINDEPENDENT SOFTWARE LAB
Products
About us
Journal
Research
Join us
Support the mission
QUESTIONS WORTH ASKING
Curiosity is
where we begin.
Ideas, explorations, and research directions. A space to ask better questions before we build the answers.
1 explorations
All topics
Research direction
AUR LABS / EXPLORATIONS
Research directionOct 11, 2026
What makes a free tool truly accessible?
An open question about devices, connectivity, language, and the people software leaves out.
A question worth exploring?
We’d love to hear your perspective.
Start a conversation
Aur Labs
Independent minds.
A shared belief in better.
aur@Aurlabs.online
Explore the lab
Our products
Our story
Journal
Research
Be part of it
Join the team
Support our work
Share a problem
Get in touch
Free tools.
Bigger possibilities.
© 2026 Aur Labs. Built with care. Made for everyone.
Privacy
Terms
Admin
A little good on the internet
aAsk Auri
```

### /join

```text
Skip to content
Aur LabsINDEPENDENT SOFTWARE LAB
Products
About us
Journal
Research
Join us
Support the mission
A LITTLE OF YOUR TIME. A REAL DIFFERENCE.
Bring your craft.
Build with purpose.
Developers, designers, researchers, and curious people. Help make thoughtful software available to everyone.
A PLACE TO CONTRIBUTE
Good people.
Useful work.
We’re a non-profit team built around collaboration. Tell us what you enjoy, what you want to learn, and how you’d like to help.
From wherever you are
Share your timezone and the hours that fit your life.
A sustainable commitment
Start with a realistic amount of time. Quality matters more than busyness.
Volunteer, with purpose
This is an unpaid opportunity to contribute to free software.
WHAT HAPPENS NEXT
01 We review your application.
02 We may reach out for a conversation.
03 We explore a small, useful starting point.
A question before you apply?
Draft kept in this tab for up to 24 hours.
Remember in this tab
Clear draft
01
A little about you
02
Your craft & time
03
Your perspective
STEP 01 / 03
Let’s start with hello.
Just the essentials. No résumé required.
Your name
Email address
Timezone
Portfolio, GitHub, or work link Optional
About 5 minutes. A good place to start.
Continue
Aur Labs
Independent minds.
A shared belief in better.
aur@Aurlabs.online
Explore the lab
Our products
Our story
Journal
Research
Be part of it
Join the team
Support our work
Share a problem
Get in touch
Free tools.
Bigger possibilities.
© 2026 Aur Labs. Built with care. Made for everyone.
Privacy
Terms
Admin
A little good on the internet
aAsk Auri
```

### /support

```text
Skip to content
Aur LabsINDEPENDENT SOFTWARE LAB
Products
About us
Journal
Research
Join us
Support the mission
PEOPLE POWERED. PURPOSE LED.
Help keep good
things free.
Free for the people who use it. Powered by the people who believe in it. Your support can help cover hosting, development tools, accessibility testing, and the time it takes to build something useful.
a little
goes a long way.FOR THE TOOLS. FOR THE PEOPLE.
What your support can make possible.
Keep the lights on
Hosting, storage, domains, and the infrastructure behind free tools.
01
Make room to build
Development tools, maintenance, and practical product improvements.
02
Bring more people in
Accessibility checks, clearer documentation, and broader device testing.
03
These are intended areas of support, not an audited spending breakdown.
A LITTLE SUPPORT. A LOT OF POSSIBILITY.
Keep good things
free.
One time
Monthly
$5
$10
$25
$50
$100
Other
USD · Your suggested contribution, one time. No payment is taken here.
Arrange a contribution
Donation channels are being set up. Send us a note and we’ll discuss the details with you.
Want to contribute your skills instead?
Join the team ↗
A LITTLE CLARITY
Trust is part
of the work.
We are setting up our donation channels. Until then, contact us to discuss a contribution. We’ll confirm the payment method and purpose with you before you send anything. No funds are collected on this website. We do not currently claim that contributions are tax-deductible.
Is my donation tax-deductible?
We don’t currently claim tax-deductible status. If tax treatment matters to you, contact us for the organization’s current details before contributing.
Do I need to donate to use the software?
No. Our mission is to make our released software free to use. Supporting the lab is entirely optional.
How do monthly contributions work?
When a monthly payment channel is configured, it opens an external provider where you confirm the amount and recurring terms. Without a configured channel, the monthly option only prepares an email inquiry.
Can I contribute in another way?
Absolutely. Volunteer your skills, test future releases, share a useful problem, or help improve our documentation. Visit Join us or send the team a message.
Who do I contact about a payment?
Contact aur@Aurlabs.online with the payment date, provider, and reference. Don’t send card numbers, passwords, or other sensitive payment details.
Aur Labs
Independent minds.
A shared belief in better.
aur@Aurlabs.online
Explore the lab
Our products
Our story
Journal
Research
Be part of it
Join the team
Support our work
Share a problem
Get in touch
Free tools.
Bigger possibilities.
© 2026 Aur Labs. Built with care. Made for everyone.
Privacy
Terms
Admin
A little good on the internet
aAsk Auri
```

### /contact

```text
Skip to content
Aur LabsINDEPENDENT SOFTWARE LAB
Products
About us
Journal
Research
Join us
Support the mission
EVERY GOOD SOLUTION STARTS WITH LISTENING
A problem?
We’re all ears.
Tell us what’s getting in your way. We’ll explore what’s possible and do our best to help.
Start a conversation.
Have an idea, a bug, a partnership in mind, or a question about the lab? You’re in the right place.
aur@Aurlabs.online
A SMALL TEAM, LISTENING
We read submissions as capacity allows. We can’t promise a response time or a solution to every problem, but thoughtful details help us understand what you need.
Draft kept in this tab for up to 24 hours.
Remember in this tab
Clear draft
What’s on your mind?
A real problem is a good place to begin.
Your name
Email address
How can we help?
Choose an option
A problem to solve
Product support
Partnership
Donation question
Something else
Subject
Related product Optional
Choose an option
Aur Notes
Aur Pocket
Aur CLI
Operating system & version Optional
Tell us a little more
I agree that Aur Labs may use these details to review and respond to my submission, as described in the
privacy notice
.
Leave this empty
Send your message
Aur Labs
Independent minds.
A shared belief in better.
aur@Aurlabs.online
Explore the lab
Our products
Our story
Journal
Research
Be part of it
Join the team
Support our work
Share a problem
Get in touch
Free tools.
Bigger possibilities.
© 2026 Aur Labs. Built with care. Made for everyone.
Privacy
Terms
Admin
A little good on the internet
aAsk Auri
```

### /privacy

```text
Skip to content
Aur LabsINDEPENDENT SOFTWARE LAB
Products
About us
Journal
Research
Join us
Support the mission
CLEAR WORDS. RESPECTFUL PRACTICES.
Your privacy matters.
Website notice · Updated October 13, 2026
What you share
Contact forms collect your name, email, topic, message, and any optional product or platform details. Volunteer applications also collect your chosen role, skills, experience, availability, timezone, optional portfolio link, and written answers.
How we use it
We use submissions to review applications, understand reported problems, and respond by email. We do not sell submission data or use these forms to enroll you in marketing messages. Submission details are available only through the protected admin area.
Where information goes
Website content and submissions are stored in our hosting database. Uploaded public product images and team images are served from file storage. Hosting services may process request information for delivery, authentication, reliability, and security.
Cookies and browser storage
The site uses session storage for Auri preferences and, when enabled, form drafts in your current browser tab. Drafts expire after 24 hours and are removed after a confirmed submission. You can disable or clear them from the form. Consent must be checked again after a draft is restored. Hosting authentication may use necessary sign-in cookies. Admin access uses a short-lived unlock token in memory. No third-party analytics or advertising tracker is added by this application.
Retention and your choices
Submissions remain available to the team until deleted. To request access, correction, or deletion, email aur@Aurlabs.online from the address associated with your submission. Include the reference if available. Please avoid sharing unnecessary sensitive information.
External links and payments
Portfolio links, software downloads, and configured donation providers are external services with their own privacy practices. We do not receive or store payment card details through this website.
Questions
For any privacy question, contact aur@Aurlabs.online.
Aur Labs
Independent minds.
A shared belief in better.
aur@Aurlabs.online
Explore the lab
Our products
Our story
Journal
Research
Be part of it
Join the team
Support our work
Share a problem
Get in touch
Free tools.
Bigger possibilities.
© 2026 Aur Labs. Built with care. Made for everyone.
Privacy
Terms
Admin
A little good on the internet
aAsk Auri
```

### /terms

```text
Skip to content
Aur LabsINDEPENDENT SOFTWARE LAB
Products
About us
Journal
Research
Join us
Support the mission
CLEAR WORDS. RESPECTFUL PRACTICES.
Terms of use.
Website notice · Updated October 13, 2026
About this website
Aur Labs is a non-profit software initiative. This website introduces our work, hosts product information, and accepts applications and messages. References to non-profit purpose do not certify a particular legal registration or tax status.
Products and downloads
Concept previews are illustrative and are not available applications. Released software is subject to the license and requirements stated on its product page or accompanying release. Always verify platform compatibility. No universal support for every operating system or Linux distribution is implied.
Your submissions
Submit accurate information that you have permission to share. Do not include passwords, confidential material, or another person’s sensitive information. A volunteer application does not guarantee a role, employment, or compensation.
Donations
Contributions are optional. This site does not collect card information. Where a donation link is configured, the external provider controls checkout, currency, recurring payments, cancellations, and payment terms. Confirm all details before paying. No tax-deductible status is promised.
Availability and responsibility
We aim to keep information useful and accurate, but availability, compatibility, and response times are not guaranteed. Product previews and research directions can change. Your rights under applicable law remain unaffected.
Contact
For corrections, product questions, or concerns about these terms, email aur@Aurlabs.online.
Aur Labs
Independent minds.
A shared belief in better.
aur@Aurlabs.online
Explore the lab
Our products
Our story
Journal
Research
Be part of it
Join the team
Support our work
Share a problem
Get in touch
Free tools.
Bigger possibilities.
© 2026 Aur Labs. Built with care. Made for everyone.
Privacy
Terms
Admin
A little good on the internet
aAsk Auri
```

### /admin

```text
Aur Labs
THE AUR ADMIN STUDIO
Your lab, behind the scenes.
Set up your administrator after hosting. Your account will be bound to your signed-in ChatGPT identity.
Checking secure access…
Back to the website
Protected identity · Server-side permissions · No shared default credentials
```

### /products/aur-notes

```text
Skip to content
Aur LabsINDEPENDENT SOFTWARE LAB
Products
About us
Journal
Research
Join us
Support the mission
All products
Desktop software
Concept preview
Aur Notes
A little room for your next big idea.
An idea taking shape in the lab. Explore the concept and tell us what would make it useful to you.
WindowsmacOSLinux
Share your feedback
Aur Notes
My spaceAll notesIdeas & thingsLittle reminders New note
A LITTLE SPACE TO THINK
Make room
for good ideas.
Big things start with a small thought.
Capture a little inspiration Build something useful
Keep it simple. Make it matter. ✳
ILLUSTRATIVE CONCEPT
Overview
Releases & downloads
THE IDEA
A small tool.
A thoughtful purpose.
A concept for a calm desktop workspace that makes everyday notes feel simple. This illustrative product gives you a preview of the kind of thoughtful, approachable tools we want to build.
This is a design concept, not a released application. Features and target platforms describe the proposed direction and are not confirmed capabilities.
The proposed direction
A calm, focused writing space
Simple notebooks and quick search
A free tool for everyday ideas
License
To be confirmed before release
Aur Labs
Independent minds.
A shared belief in better.
aur@Aurlabs.online
Explore the lab
Our products
Our story
Journal
Research
Be part of it
Join the team
Support our work
Share a problem
Get in touch
Free tools.
Bigger possibilities.
© 2026 Aur Labs. Built with care. Made for everyone.
Privacy
Terms
Admin
A little good on the internet
aAsk Auri
```

### /products/aur-pocket

```text
Skip to content
Aur LabsINDEPENDENT SOFTWARE LAB
Products
About us
Journal
Research
Join us
Support the mission
All products
Mobile app
Concept preview
Aur Pocket
Your everyday, a little more together.
An idea taking shape in the lab. Explore the concept and tell us what would make it useful to you.
AndroidiOS
Share your feedback
9:41
A little
more clarity.
Space for what matters.
Let’s begin
9:41
GOOD MORNING
Hey, you. ☀
Let’s make a little progress.
Today’s focusMake something
you believe in.
A fresh idea  Small steps  Time to recharge
⌂☷
ILLUSTRATIVE CONCEPT
Overview
Releases & downloads
THE IDEA
A small tool.
A thoughtful purpose.
An illustrative mobile app concept for keeping small tasks and useful ideas close. A thoughtful interface, a little clarity, and fewer distractions.
This is a design concept. There is no Android or iOS download yet. The proposed interface and platform targets are examples for the future catalogue.
The proposed direction
A clear view of the day
Gentle, useful reminders
Designed with one-handed use in mind
License
To be confirmed before release
Aur Labs
Independent minds.
A shared belief in better.
aur@Aurlabs.online
Explore the lab
Our products
Our story
Journal
Research
Be part of it
Join the team
Support our work
Share a problem
Get in touch
Free tools.
Bigger possibilities.
© 2026 Aur Labs. Built with care. Made for everyone.
Privacy
Terms
Admin
A little good on the internet
aAsk Auri
```

### /products/aur-cli

```text
Skip to content
Aur LabsINDEPENDENT SOFTWARE LAB
Products
About us
Journal
Research
Join us
Support the mission
All products
Command line
Concept preview
Aur CLI
Less busywork. More building.
An idea taking shape in the lab. Explore the concept and tell us what would make it useful to you.
WindowsmacOSLinux
Share your feedback
~ / a little less busywork
aur cli
❯ aur hello
Let’s build something useful.
✓ A clear starting point
✓ A little less friction
✓ More room to create
❯
ILLUSTRATIVE CONCEPT
Overview
Releases & downloads
THE IDEA
A small tool.
A thoughtful purpose.
A concept for a friendly command-line companion, designed to make repeatable developer tasks easier to understand.
This is a catalogue concept, not a working command-line package. Commands shown in the interface are illustrative and should not be installed or run.
The proposed direction
Readable, helpful terminal output
Guided setup without the guesswork
A simpler development routine
License
To be confirmed before release
Aur Labs
Independent minds.
A shared belief in better.
aur@Aurlabs.online
Explore the lab
Our products
Our story
Journal
Research
Be part of it
Join the team
Support our work
Share a problem
Get in touch
Free tools.
Bigger possibilities.
© 2026 Aur Labs. Built with care. Made for everyone.
Privacy
Terms
Admin
A little good on the internet
aAsk Auri
```

### /journal/why-we-build-for-everyone

```text
Skip to content
Aur LabsINDEPENDENT SOFTWARE LAB
Products
About us
Journal
Research
Join us
Support the mission
All stories
From the lab
Good tools shouldn’t be a privilege.
The idea behind Aur Labs, and why access belongs at the heart of what we build.
Aur LabsOct 11, 2026 · 1 min read
a↗
AUR LABS / FIELD NOTES
A useful tool can change a day. It can save someone an hour, make a complicated task understandable, or help an idea become something real. Access to those tools matters.
Aur Labs exists to build free software and apps for people everywhere. Our starting point is simple: listen to a real problem, understand who experiences it, and look for the smallest helpful solution.
Free doesn’t mean careless. We want our work to feel considered, welcoming, and easy to use. That includes clear interfaces, honest product information, and support that treats people with respect.
We’re at the beginning. The catalogue currently includes clearly marked design concepts, and we’ll share verified releases as they become available. If you have a problem, a skill, or an idea to contribute, there’s a place to start here.
Have something to add?
Good conversations make good ideas better.
Share your perspective
Aur Labs
Independent minds.
A shared belief in better.
aur@Aurlabs.online
Explore the lab
Our products
Our story
Journal
Research
Be part of it
Join the team
Support our work
Share a problem
Get in touch
Free tools.
Bigger possibilities.
© 2026 Aur Labs. Built with care. Made for everyone.
Privacy
Terms
Admin
A little good on the internet
aAsk Auri
```

### /journal/designing-with-a-little-more-care

```text
Skip to content
Aur LabsINDEPENDENT SOFTWARE LAB
Products
About us
Journal
Research
Join us
Support the mission
All stories
Design notes
A little less friction. A little more care.
Our approach to interfaces that help people feel capable, one small decision at a time.
Aur LabsOct 11, 2026 · 1 min read
a↗
AUR LABS / FIELD NOTES
A good interface answers the next question before it becomes a problem. What does this button do? Where did my work go? How can I fix this mistake?
We aim to make those answers visible. Clear labels, helpful examples, readable type, and forgiving forms are part of that commitment.
Our website companion Auri is a small expression of this idea. It offers guidance when you ask and explains form errors with an example. It doesn’t need to interrupt you to be useful.
These are design principles we intend to keep improving through feedback. Tell us where something feels confusing, and help us make it clearer.
Have something to add?
Good conversations make good ideas better.
Share your perspective
Aur Labs
Independent minds.
A shared belief in better.
aur@Aurlabs.online
Explore the lab
Our products
Our story
Journal
Research
Be part of it
Join the team
Support our work
Share a problem
Get in touch
Free tools.
Bigger possibilities.
© 2026 Aur Labs. Built with care. Made for everyone.
Privacy
Terms
Admin
A little good on the internet
aAsk Auri
```

### /research/making-useful-tools-more-accessible

```text
Skip to content
Aur LabsINDEPENDENT SOFTWARE LAB
Products
About us
Journal
Research
Join us
Support the mission
All research
Research direction
What makes a free tool truly accessible?
An open question about devices, connectivity, language, and the people software leaves out.
Aur LabsOct 11, 2026 · 1 min read
AUR LABS / EXPLORATIONS
Price is one barrier to access, but it isn’t the only one. A tool may be free and still be difficult to use on an older device, a slow connection, or with assistive technology.
We want to explore how simple interfaces, small downloads, clear language, and thoughtful platform support can make software more useful to more people.
This is a research direction, not a completed study. No findings, benchmarks, or participant results are claimed here.
Have a relevant experience or an idea for an experiment? Share it through our contact page. Practical examples can help shape the questions we investigate next.
Have something to add?
Good conversations make good ideas better.
Share your perspective
Aur Labs
Independent minds.
A shared belief in better.
aur@Aurlabs.online
Explore the lab
Our products
Our story
Journal
Research
Be part of it
Join the team
Support our work
Share a problem
Get in touch
Free tools.
Bigger possibilities.
© 2026 Aur Labs. Built with care. Made for everyone.
Privacy
Terms
Admin
A little good on the internet
aAsk Auri
```

## Complete source copy catalogue

Every string/JSX-text literal from `app` and `lib` is listed with its source location. Technical identifiers and classes are retained so no conditional label, error or help string is silently dropped. Dynamic values come from the full dataset above. Escaped newlines in the JSON representation preserve exact text.

- `app/[[...slug]]/page.tsx:1` (StringLiteral): "next"
- `app/[[...slug]]/page.tsx:2` (StringLiteral): "next/navigation"
- `app/[[...slug]]/page.tsx:3` (StringLiteral): "@/lib/server"
- `app/[[...slug]]/page.tsx:4` (StringLiteral): "@/lib/content"
- `app/[[...slug]]/page.tsx:5` (StringLiteral): "../site"
- `app/[[...slug]]/page.tsx:6` (StringLiteral): "force-dynamic"
- `app/[[...slug]]/page.tsx:8` (StringLiteral): "The collection"
- `app/[[...slug]]/page.tsx:8` (StringLiteral): "Our story"
- `app/[[...slug]]/page.tsx:8` (StringLiteral): "Inside the lab"
- `app/[[...slug]]/page.tsx:8` (StringLiteral): "Research & explorations"
- `app/[[...slug]]/page.tsx:8` (StringLiteral): "Build with us"
- `app/[[...slug]]/page.tsx:8` (StringLiteral): "Support the mission"
- `app/[[...slug]]/page.tsx:8` (StringLiteral): "Start a conversation"
- `app/[[...slug]]/page.tsx:8` (StringLiteral): "Privacy notice"
- `app/[[...slug]]/page.tsx:8` (StringLiteral): "Terms of use"
- `app/[[...slug]]/page.tsx:8` (StringLiteral): "Admin studio"
- `app/[[...slug]]/page.tsx:8` (StringLiteral): "Good software. For everyone."
- `app/[[...slug]]/page.tsx:8` (StringLiteral): "products"
- `app/[[...slug]]/page.tsx:8` (StringLiteral): "journal"
- `app/[[...slug]]/page.tsx:8` (StringLiteral): "research"
- `app/[[...slug]]/page.tsx:8` (StringLiteral): "products"
- `app/[[...slug]]/page.tsx:8` (StringLiteral): "journal"
- `app/[[...slug]]/page.tsx:8` (StringLiteral): "research"
- `app/[[...slug]]/page.tsx:8` (StringLiteral): "name"
- `app/[[...slug]]/page.tsx:8` (StringLiteral): " — Aur Labs"
- `app/[[...slug]]/page.tsx:8` (StringLiteral): "admin"
- `app/[[...slug]]/page.tsx:8` (StringLiteral): "/"
- `app/[[...slug]]/page.tsx:8` (StringLiteral): "/"
- `app/[[...slug]]/page.tsx:9` (StringLiteral): "products"
- `app/[[...slug]]/page.tsx:9` (StringLiteral): "about"
- `app/[[...slug]]/page.tsx:9` (StringLiteral): "journal"
- `app/[[...slug]]/page.tsx:9` (StringLiteral): "research"
- `app/[[...slug]]/page.tsx:9` (StringLiteral): "join"
- `app/[[...slug]]/page.tsx:9` (StringLiteral): "support"
- `app/[[...slug]]/page.tsx:9` (StringLiteral): "contact"
- `app/[[...slug]]/page.tsx:9` (StringLiteral): "privacy"
- `app/[[...slug]]/page.tsx:9` (StringLiteral): "terms"
- `app/[[...slug]]/page.tsx:9` (StringLiteral): "admin"
- `app/[[...slug]]/page.tsx:9` (StringLiteral): "products"
- `app/[[...slug]]/page.tsx:9` (StringLiteral): "journal"
- `app/[[...slug]]/page.tsx:9` (StringLiteral): "research"
- `app/[[...slug]]/page.tsx:9` (StringLiteral): "products"
- `app/[[...slug]]/page.tsx:9` (StringLiteral): "journal"
- `app/[[...slug]]/page.tsx:9` (StringLiteral): "research"
- `app/[[...slug]]/page.tsx:9` (StringLiteral): "/"
- `app/[[...slug]]/page.tsx:9` (StringLiteral): "/"
- `app/admin.tsx:1` (StringLiteral): "use client"
- `app/admin.tsx:2` (StringLiteral): "react"
- `app/admin.tsx:3` (StringLiteral): "lucide-react"
- `app/admin.tsx:4` (StringLiteral): "@/lib/content"
- `app/admin.tsx:5` (StringLiteral): "@/lib/content"
- `app/admin.tsx:6` (StringLiteral): "./visuals"
- `app/admin.tsx:7` (StringLiteral): "./auri"
- `app/admin.tsx:8` (StringLiteral): "@/lib/auri-guides"
- `app/admin.tsx:9` (StringLiteral): "./content-preview"
- `app/admin.tsx:11` (StringLiteral): "overview"
- `app/admin.tsx:11` (StringLiteral): "products"
- `app/admin.tsx:11` (StringLiteral): "journal"
- `app/admin.tsx:11` (StringLiteral): "research"
- `app/admin.tsx:11` (StringLiteral): "team"
- `app/admin.tsx:11` (StringLiteral): "inbox"
- `app/admin.tsx:11` (StringLiteral): "media"
- `app/admin.tsx:11` (StringLiteral): "settings"
- `app/admin.tsx:13` (StringLiteral): "text"
- `app/admin.tsx:13` (StringLiteral): "field "
- `app/admin.tsx:13` (StringLiteral): "span-two"
- `app/admin.tsx:13` (StringLiteral): "body"
- `app/admin.tsx:13` (StringLiteral): "field-hint"
- `app/admin.tsx:14` (StringLiteral): "field"
- `app/admin.tsx:15` (StringLiteral): "check-label"
- `app/admin.tsx:15` (StringLiteral): "checkbox"
- `app/admin.tsx:17` (StringLiteral): "overview"
- `app/admin.tsx:17` (StringLiteral): "all"
- `app/admin.tsx:19` (StringLiteral): "/api/admin?view=status"
- `app/admin.tsx:19` (StringLiteral): "Couldn’t connect."
- `app/admin.tsx:21` (StringLiteral): "beforeunload"
- `app/admin.tsx:21` (StringLiteral): "beforeunload"
- `app/admin.tsx:22` (StringLiteral): "Escape"
- `app/admin.tsx:22` (StringLiteral): "keydown"
- `app/admin.tsx:22` (StringLiteral): "keydown"
- `app/admin.tsx:23` (StringLiteral): "/api/admin"
- `app/admin.tsx:23` (StringLiteral): "x-aur-unlock"
- `app/admin.tsx:24` (StringLiteral): "/api/admin"
- `app/admin.tsx:24` (StringLiteral): "POST"
- `app/admin.tsx:24` (StringLiteral): "Content-Type"
- `app/admin.tsx:24` (StringLiteral): "application/json"
- `app/admin.tsx:24` (StringLiteral): "x-aur-unlock"
- `app/admin.tsx:24` (StringLiteral): "unlock"
- `app/admin.tsx:24` (StringLiteral): "setup"
- `app/admin.tsx:24` (StringLiteral): "This action failed."
- `app/admin.tsx:25` (StringLiteral): "Something went wrong."
- `app/admin.tsx:26` (StringLiteral): "unlock"
- `app/admin.tsx:26` (StringLiteral): "setup"
- `app/admin.tsx:27` (StringLiteral): "Discard unsaved changes?"
- `app/admin.tsx:29` (StringLiteral): "products"
- `app/admin.tsx:29` (StringLiteral): "software"
- `app/admin.tsx:29` (StringLiteral): "Windows"
- `app/admin.tsx:29` (StringLiteral): "development"
- `app/admin.tsx:29` (StringLiteral): "lavender"
- `app/admin.tsx:29` (StringLiteral): "notes"
- `app/admin.tsx:29` (StringLiteral): "To be confirmed before release"
- `app/admin.tsx:29` (StringLiteral): "team"
- `app/admin.tsx:29` (StringLiteral): "research"
- `app/admin.tsx:29` (StringLiteral): "Research direction"
- `app/admin.tsx:29` (StringLiteral): "From the lab"
- `app/admin.tsx:29` (StringLiteral): "Aur Labs"
- `app/admin.tsx:30` (StringLiteral): "save"
- `app/admin.tsx:30` (StringLiteral): "Saved and published. This record is now live on the website."
- `app/admin.tsx:30` (StringLiteral): "Draft saved. This record is visible only in the studio."
- `app/admin.tsx:31` (StringLiteral): "Delete “"
- `app/admin.tsx:31` (StringLiteral): "” from the website? This also removes its public page."
- `app/admin.tsx:31` (StringLiteral): "delete"
- `app/admin.tsx:31` (StringLiteral): "Content deleted."
- `app/admin.tsx:32` (StringLiteral): "file"
- `app/admin.tsx:32` (StringLiteral): "/api/media"
- `app/admin.tsx:32` (StringLiteral): "POST"
- `app/admin.tsx:32` (StringLiteral): "x-aur-unlock"
- `app/admin.tsx:33` (StringLiteral): "screenshots"
- `app/admin.tsx:33` (StringLiteral): "Image uploaded. Save the record to publish it."
- `app/admin.tsx:34` (StringLiteral): "application/json"
- `app/admin.tsx:34` (StringLiteral): "a"
- `app/admin.tsx:34` (StringLiteral): "aur-labs-admin-export-"
- `app/admin.tsx:34` (StringLiteral): ".json"
- `app/admin.tsx:34` (StringLiteral): "Export downloaded. It contains private inbox information; keep it secure."
- `app/admin.tsx:35` (StringLiteral): "admin-image-field span-two"
- `app/admin.tsx:35` (StringLiteral): "field-label"
- `app/admin.tsx:35` (StringLiteral): "admin-image-preview"
- `app/admin.tsx:35` (StringLiteral): "Uploaded preview"
- `app/admin.tsx:35` (StringLiteral): "button"
- `app/admin.tsx:35` (StringLiteral): "icon-button"
- `app/admin.tsx:35` (StringLiteral): "Remove image from this record"
- `app/admin.tsx:35` (StringLiteral): "button light small-button"
- `app/admin.tsx:35` (JsxText): "Upload image"
- `app/admin.tsx:35` (StringLiteral): "file"
- `app/admin.tsx:35` (StringLiteral): "image/png,image/jpeg,image/webp,image/gif"
- `app/admin.tsx:35` (StringLiteral): "Image URLs (one per line)"
- `app/admin.tsx:35` (StringLiteral): "Or paste an HTTPS image URL"
- `app/admin.tsx:35` (StringLiteral): "\n"
- `app/admin.tsx:35` (StringLiteral): "\n"
- `app/admin.tsx:35` (StringLiteral): "PNG, JPEG, WebP, GIF · max 5 MB per upload. Use screenshots or images you have permission to publish."
- `app/admin.tsx:36` (StringLiteral): "overview"
- `app/admin.tsx:36` (StringLiteral): "Overview"
- `app/admin.tsx:36` (StringLiteral): "products"
- `app/admin.tsx:36` (StringLiteral): "Products"
- `app/admin.tsx:36` (StringLiteral): "journal"
- `app/admin.tsx:36` (StringLiteral): "Journal"
- `app/admin.tsx:36` (StringLiteral): "research"
- `app/admin.tsx:36` (StringLiteral): "Research"
- `app/admin.tsx:36` (StringLiteral): "team"
- `app/admin.tsx:36` (StringLiteral): "Team"
- `app/admin.tsx:36` (StringLiteral): "inbox"
- `app/admin.tsx:36` (StringLiteral): "Inbox"
- `app/admin.tsx:36` (StringLiteral): "media"
- `app/admin.tsx:36` (StringLiteral): "Media library"
- `app/admin.tsx:36` (StringLiteral): "settings"
- `app/admin.tsx:36` (StringLiteral): "Site settings"
- `app/admin.tsx:37` (StringLiteral): "admin-gate"
- `app/admin.tsx:37` (StringLiteral): "/"
- `app/admin.tsx:37` (StringLiteral): "brand"
- `app/admin.tsx:37` (JsxText): "Aur Labs"
- `app/admin.tsx:37` (StringLiteral): "admin-gate-panel"
- `app/admin.tsx:37` (StringLiteral): "admin-lock-icon"
- `app/admin.tsx:37` (StringLiteral): "eyebrow"
- `app/admin.tsx:37` (JsxText): "THE AUR ADMIN STUDIO"
- `app/admin.tsx:37` (StringLiteral): "Welcome back."
- `app/admin.tsx:37` (StringLiteral): "Your lab, behind the scenes."
- `app/admin.tsx:37` (StringLiteral): "Sign in to your registered ChatGPT account, then unlock the studio with your admin credentials."
- `app/admin.tsx:37` (StringLiteral): "Set up your administrator after hosting. Your account will be bound to your signed-in ChatGPT identity."
- `app/admin.tsx:37` (StringLiteral): "loading-line"
- `app/admin.tsx:37` (JsxText): "Checking secure access…"
- `app/admin.tsx:37` (StringLiteral): "button dark full"
- `app/admin.tsx:37` (StringLiteral): "/signin-with-chatgpt?return_to=%2Fadmin"
- `app/admin.tsx:37` (StringLiteral): "_top"
- `app/admin.tsx:37` (JsxText): "Sign in with ChatGPT"
- `app/admin.tsx:37` (StringLiteral): "setup-instructions"
- `app/admin.tsx:37` (JsxText): "One private setup step first."
- `app/admin.tsx:37` (JsxText): "Add a long, random"
- `app/admin.tsx:37` (JsxText): "AUR_ADMIN_SETUP_TOKEN"
- `app/admin.tsx:37` (JsxText): "in the hosting environment settings."
- `app/admin.tsx:37` (JsxText): "Return here while signed in to your own ChatGPT account."
- `app/admin.tsx:37` (JsxText): "Enter that token, then choose your admin username and password. Remove the token from hosting after setup."
- `app/admin.tsx:37` (JsxText): "The admin is locked until that secret is configured. No default password is shipped."
- `app/admin.tsx:37` (StringLiteral): "button light"
- `app/admin.tsx:37` (JsxText): "Check again"
- `app/admin.tsx:37` (StringLiteral): "admin-login-form"
- `app/admin.tsx:37` (StringLiteral): "Private setup token"
- `app/admin.tsx:37` (StringLiteral): "password"
- `app/admin.tsx:37` (StringLiteral): "Admin username"
- `app/admin.tsx:37` (StringLiteral): "Admin password"
- `app/admin.tsx:37` (StringLiteral): "password"
- `app/admin.tsx:37` (StringLiteral): "At least 12 characters. Use a unique password."
- `app/admin.tsx:37` (StringLiteral): "button orange full"
- `app/admin.tsx:37` (StringLiteral): "Checking…"
- `app/admin.tsx:37` (StringLiteral): "Unlock the studio"
- `app/admin.tsx:37` (StringLiteral): "Create my admin account"
- `app/admin.tsx:37` (StringLiteral): "button dark"
- `app/admin.tsx:37` (JsxText): "Try connecting again"
- `app/admin.tsx:37` (StringLiteral): "form-error"
- `app/admin.tsx:37` (StringLiteral): "alert"
- `app/admin.tsx:37` (StringLiteral): "/"
- `app/admin.tsx:37` (StringLiteral): "text-link"
- `app/admin.tsx:37` (JsxText): "Back to the website"
- `app/admin.tsx:37` (StringLiteral): "tiny muted"
- `app/admin.tsx:37` (JsxText): "Protected identity · Server-side permissions · No shared default credentials"
- `app/admin.tsx:38` (StringLiteral): "all"
- `app/admin.tsx:38` (StringLiteral): " "
- `app/admin.tsx:39` (StringLiteral): "admin-app"
- `app/admin.tsx:39` (StringLiteral): "admin-sidebar "
- `app/admin.tsx:39` (StringLiteral): "open"
- `app/admin.tsx:39` (StringLiteral): "/"
- `app/admin.tsx:39` (StringLiteral): "brand"
- `app/admin.tsx:39` (JsxText): "Aur Labs"
- `app/admin.tsx:39` (StringLiteral): "admin-studio-label"
- `app/admin.tsx:39` (JsxText): "CONTENT STUDIO / 01"
- `app/admin.tsx:39` (StringLiteral): "Admin navigation"
- `app/admin.tsx:39` (StringLiteral): "active"
- `app/admin.tsx:39` (StringLiteral): "inbox"
- `app/admin.tsx:39` (StringLiteral): "new"
- `app/admin.tsx:39` (StringLiteral): "inbox-count"
- `app/admin.tsx:39` (StringLiteral): "new"
- `app/admin.tsx:39` (StringLiteral): "admin-sidebar-bottom"
- `app/admin.tsx:39` (StringLiteral): "/"
- `app/admin.tsx:39` (StringLiteral): "_blank"
- `app/admin.tsx:39` (StringLiteral): "noopener noreferrer"
- `app/admin.tsx:39` (JsxText): "View website"
- `app/admin.tsx:39` (StringLiteral): "lock"
- `app/admin.tsx:39` (JsxText): "Lock studio"
- `app/admin.tsx:39` (JsxText): "Signed in as"
- `app/admin.tsx:39` (StringLiteral): "admin-main"
- `app/admin.tsx:39` (StringLiteral): "admin-topbar"
- `app/admin.tsx:39` (StringLiteral): "icon-button admin-menu"
- `app/admin.tsx:39` (StringLiteral): "Toggle admin menu"
- `app/admin.tsx:39` (JsxText): "AUR LABS"
- `app/admin.tsx:39` (StringLiteral): "green-dot"
- `app/admin.tsx:39` (JsxText): "Connected to live content"
- `app/admin.tsx:39` (StringLiteral): "icon-button"
- `app/admin.tsx:39` (StringLiteral): "Refresh admin data"
- `app/admin.tsx:39` (StringLiteral): "Refreshed."
- `app/admin.tsx:39` (StringLiteral): "admin-workspace"
- `app/admin.tsx:39` (StringLiteral): "form-error"
- `app/admin.tsx:39` (StringLiteral): "alert"
- `app/admin.tsx:39` (StringLiteral): "icon-button"
- `app/admin.tsx:39` (StringLiteral): "Dismiss error"
- `app/admin.tsx:39` (StringLiteral): "admin-notice"
- `app/admin.tsx:39` (StringLiteral): "status"
- `app/admin.tsx:40` (StringLiteral): "overview"
- `app/admin.tsx:40` (StringLiteral): "admin-page-title"
- `app/admin.tsx:40` (StringLiteral): "eyebrow"
- `app/admin.tsx:40` (JsxText): "A LITTLE GOOD, IN PROGRESS"
- `app/admin.tsx:40` (JsxText): "Welcome to the lab."
- `app/admin.tsx:40` (JsxText): "Give your ideas a home. Keep your community in the loop."
- `app/admin.tsx:40` (StringLiteral): "button light"
- `app/admin.tsx:40` (JsxText): "Export data"
- `app/admin.tsx:40` (StringLiteral): "admin-stats"
- `app/admin.tsx:40` (StringLiteral): "Products"
- `app/admin.tsx:40` (StringLiteral): "products"
- `app/admin.tsx:40` (StringLiteral): "Stories & research"
- `app/admin.tsx:40` (StringLiteral): "journal"
- `app/admin.tsx:40` (StringLiteral): "Team members"
- `app/admin.tsx:40` (StringLiteral): "team"
- `app/admin.tsx:40` (StringLiteral): "New messages"
- `app/admin.tsx:40` (StringLiteral): "new"
- `app/admin.tsx:40` (StringLiteral): "inbox"
- `app/admin.tsx:40` (StringLiteral): "admin-overview-grid"
- `app/admin.tsx:40` (StringLiteral): "admin-panel"
- `app/admin.tsx:40` (JsxText): "Your launch essentials."
- `app/admin.tsx:40` (StringLiteral): "muted"
- `app/admin.tsx:40` (JsxText): "Finish these as your real content becomes ready."
- `app/admin.tsx:40` (StringLiteral): "Add real products & release files"
- `app/admin.tsx:40` (StringLiteral): "Replace illustrative concepts with your published work."
- `app/admin.tsx:40` (StringLiteral): "products"
- `app/admin.tsx:40` (StringLiteral): "Upload product screenshots"
- `app/admin.tsx:40` (StringLiteral): "Make the catalogue unmistakably yours."
- `app/admin.tsx:40` (StringLiteral): "media"
- `app/admin.tsx:40` (StringLiteral): "Configure donation links"
- `app/admin.tsx:40` (StringLiteral): "Add verified HTTPS payment provider URLs."
- `app/admin.tsx:40` (StringLiteral): "settings"
- `app/admin.tsx:40` (StringLiteral): "Review your public copy"
- `app/admin.tsx:40` (StringLiteral): "Confirm your mission, team bios, and organization details."
- `app/admin.tsx:40` (StringLiteral): "settings"
- `app/admin.tsx:40` (StringLiteral): "launch-step"
- `app/admin.tsx:40` (JsxText): "0"
- `app/admin.tsx:40` (StringLiteral): "admin-panel"
- `app/admin.tsx:40` (JsxText): "Recent activity"
- `app/admin.tsx:40` (StringLiteral): "activity-row"
- `app/admin.tsx:40` (StringLiteral): "orange-dot"
- `app/admin.tsx:40` (StringLiteral): "."
- `app/admin.tsx:40` (StringLiteral): " / "
- `app/admin.tsx:40` (StringLiteral): "muted"
- `app/admin.tsx:40` (JsxText): "Your edits and inbox actions will appear here."
- `app/admin.tsx:40` (StringLiteral): "admin-tip"
- `app/admin.tsx:40` (JsxText): "Admin unlocks expire after 30 minutes and stay only in this tab’s memory. Reloading locks the studio. Save changes before you leave."
- `app/admin.tsx:41` (StringLiteral): "products"
- `app/admin.tsx:41` (StringLiteral): "journal"
- `app/admin.tsx:41` (StringLiteral): "research"
- `app/admin.tsx:41` (StringLiteral): "team"
- `app/admin.tsx:41` (StringLiteral): "admin-page-title"
- `app/admin.tsx:41` (StringLiteral): "eyebrow"
- `app/admin.tsx:41` (JsxText): "MAKE IT YOURS"
- `app/admin.tsx:41` (StringLiteral): "A new beginning."
- `app/admin.tsx:41` (StringLiteral): "team"
- `app/admin.tsx:41` (StringLiteral): "The people behind it."
- `app/admin.tsx:41` (StringLiteral): "products"
- `app/admin.tsx:41` (StringLiteral): "Your collection."
- `app/admin.tsx:41` (StringLiteral): "research"
- `app/admin.tsx:41` (StringLiteral): "Questions & discoveries."
- `app/admin.tsx:41` (StringLiteral): "Notes from the lab."
- `app/admin.tsx:41` (StringLiteral): "Save as a draft, or publish it to make it visible on the website."
- `app/admin.tsx:41` (StringLiteral): "Create, edit, and publish content. All changes are saved on the server."
- `app/admin.tsx:41` (StringLiteral): "button orange"
- `app/admin.tsx:41` (JsxText): "Add"
- `app/admin.tsx:41` (StringLiteral): "team"
- `app/admin.tsx:41` (StringLiteral): "member"
- `app/admin.tsx:41` (StringLiteral): "products"
- `app/admin.tsx:41` (StringLiteral): "product"
- `app/admin.tsx:41` (StringLiteral): "article"
- `app/admin.tsx:41` (StringLiteral): "admin-editor"
- `app/admin.tsx:41` (StringLiteral): "editor-top"
- `app/admin.tsx:41` (StringLiteral): "button"
- `app/admin.tsx:41` (StringLiteral): "text-link"
- `app/admin.tsx:41` (StringLiteral): "Discard unsaved changes?"
- `app/admin.tsx:41` (JsxText): "All"
- `app/admin.tsx:41` (StringLiteral): "admin-publish"
- `app/admin.tsx:41` (StringLiteral): "Published on the website"
- `app/admin.tsx:41` (StringLiteral): "published"
- `app/admin.tsx:41` (StringLiteral): "fields-grid"
- `app/admin.tsx:41` (StringLiteral): "products"
- `app/admin.tsx:41` (StringLiteral): "Product name"
- `app/admin.tsx:41` (StringLiteral): "name"
- `app/admin.tsx:41` (StringLiteral): "URL slug"
- `app/admin.tsx:41` (StringLiteral): "slug"
- `app/admin.tsx:41` (StringLiteral): "Lowercase letters, numbers, and hyphens. Example: aur-notes"
- `app/admin.tsx:41` (StringLiteral): "Tagline"
- `app/admin.tsx:41` (StringLiteral): "tagline"
- `app/admin.tsx:41` (StringLiteral): "Category"
- `app/admin.tsx:41` (StringLiteral): "category"
- `app/admin.tsx:41` (StringLiteral): "software"
- `app/admin.tsx:41` (StringLiteral): "app"
- `app/admin.tsx:41` (StringLiteral): "cli"
- `app/admin.tsx:41` (StringLiteral): "Description"
- `app/admin.tsx:41` (StringLiteral): "description"
- `app/admin.tsx:41` (StringLiteral): "Release status"
- `app/admin.tsx:41` (StringLiteral): "status"
- `app/admin.tsx:41` (StringLiteral): "concept"
- `app/admin.tsx:41` (StringLiteral): "development"
- `app/admin.tsx:41` (StringLiteral): "released"
- `app/admin.tsx:41` (StringLiteral): "License"
- `app/admin.tsx:41` (StringLiteral): "license"
- `app/admin.tsx:41` (StringLiteral): "span-two admin-platforms"
- `app/admin.tsx:41` (StringLiteral): "field-label"
- `app/admin.tsx:41` (JsxText): "Target / supported platforms"
- `app/admin.tsx:41` (StringLiteral): "platforms"
- `app/admin.tsx:41` (StringLiteral): "Features (one per line)"
- `app/admin.tsx:41` (StringLiteral): "\n"
- `app/admin.tsx:41` (StringLiteral): "features"
- `app/admin.tsx:41` (StringLiteral): "\n"
- `app/admin.tsx:41` (StringLiteral): "Source repository URL (optional)"
- `app/admin.tsx:41` (StringLiteral): "repository"
- `app/admin.tsx:41` (StringLiteral): "url"
- `app/admin.tsx:41` (StringLiteral): "Feature on the home page"
- `app/admin.tsx:41` (StringLiteral): "featured"
- `app/admin.tsx:41` (StringLiteral): "Preview background"
- `app/admin.tsx:41` (StringLiteral): "accent"
- `app/admin.tsx:41` (StringLiteral): "peach"
- `app/admin.tsx:41` (StringLiteral): "lavender"
- `app/admin.tsx:41` (StringLiteral): "mint"
- `app/admin.tsx:41` (StringLiteral): "Fallback concept illustration"
- `app/admin.tsx:41` (StringLiteral): "visual"
- `app/admin.tsx:41` (StringLiteral): "notes"
- `app/admin.tsx:41` (StringLiteral): "mobile"
- `app/admin.tsx:41` (StringLiteral): "terminal"
- `app/admin.tsx:41` (StringLiteral): "screenshots"
- `app/admin.tsx:41` (StringLiteral): "Product screenshots"
- `app/admin.tsx:41` (StringLiteral): "span-two releases-editor"
- `app/admin.tsx:41` (StringLiteral): "section-heading"
- `app/admin.tsx:41` (JsxText): "Releases & versions"
- `app/admin.tsx:41` (StringLiteral): "button light small-button"
- `app/admin.tsx:41` (StringLiteral): "button"
- `app/admin.tsx:41` (StringLiteral): "releases"
- `app/admin.tsx:41` (StringLiteral): "Windows"
- `app/admin.tsx:41` (StringLiteral): "x64"
- `app/admin.tsx:41` (JsxText): "Add release"
- `app/admin.tsx:41` (StringLiteral): "tiny muted"
- `app/admin.tsx:41` (JsxText): "Use real HTTPS release URLs. Specify tested Linux distributions, architecture, and requirements rather than claiming universal compatibility."
- `app/admin.tsx:41` (StringLiteral): "releases"
- `app/admin.tsx:41` (JsxText): "Release"
- `app/admin.tsx:41` (StringLiteral): "fields-grid"
- `app/admin.tsx:41` (StringLiteral): "Platform"
- `app/admin.tsx:41` (StringLiteral): "platform"
- `app/admin.tsx:41` (StringLiteral): "Version"
- `app/admin.tsx:41` (StringLiteral): "version"
- `app/admin.tsx:41` (StringLiteral): "Architecture"
- `app/admin.tsx:41` (StringLiteral): "architecture"
- `app/admin.tsx:41` (StringLiteral): "Release date"
- `app/admin.tsx:41` (StringLiteral): "date"
- `app/admin.tsx:41` (StringLiteral): "date"
- `app/admin.tsx:41` (StringLiteral): "Download URL"
- `app/admin.tsx:41` (StringLiteral): "url"
- `app/admin.tsx:41` (StringLiteral): "url"
- `app/admin.tsx:41` (StringLiteral): "SHA-256 checksum (optional)"
- `app/admin.tsx:41` (StringLiteral): "checksum"
- `app/admin.tsx:41` (StringLiteral): "Requirements / supported distributions"
- `app/admin.tsx:41` (StringLiteral): "requirements"
- `app/admin.tsx:41` (StringLiteral): "Release notes / changelog"
- `app/admin.tsx:41` (StringLiteral): "notes"
- `app/admin.tsx:41` (StringLiteral): "button"
- `app/admin.tsx:41` (StringLiteral): "danger-link"
- `app/admin.tsx:41` (StringLiteral): "releases"
- `app/admin.tsx:41` (JsxText): "Remove release"
- `app/admin.tsx:41` (StringLiteral): "team"
- `app/admin.tsx:41` (StringLiteral): "Full name"
- `app/admin.tsx:41` (StringLiteral): "name"
- `app/admin.tsx:41` (StringLiteral): "Role"
- `app/admin.tsx:41` (StringLiteral): "role"
- `app/admin.tsx:41` (StringLiteral): "Initials (1–4 characters)"
- `app/admin.tsx:41` (StringLiteral): "initials"
- `app/admin.tsx:41` (StringLiteral): "Profile link (optional)"
- `app/admin.tsx:41` (StringLiteral): "url"
- `app/admin.tsx:41` (StringLiteral): "url"
- `app/admin.tsx:41` (StringLiteral): "Biography"
- `app/admin.tsx:41` (StringLiteral): "bio"
- `app/admin.tsx:41` (StringLiteral): "image"
- `app/admin.tsx:41` (StringLiteral): "Portrait"
- `app/admin.tsx:41` (StringLiteral): "Title"
- `app/admin.tsx:41` (StringLiteral): "title"
- `app/admin.tsx:41` (StringLiteral): "URL slug"
- `app/admin.tsx:41` (StringLiteral): "slug"
- `app/admin.tsx:41` (StringLiteral): "Category / tag"
- `app/admin.tsx:41` (StringLiteral): "tag"
- `app/admin.tsx:41` (StringLiteral): "Author"
- `app/admin.tsx:41` (StringLiteral): "author"
- `app/admin.tsx:41` (StringLiteral): "Date"
- `app/admin.tsx:41` (StringLiteral): "date"
- `app/admin.tsx:41` (StringLiteral): "date"
- `app/admin.tsx:41` (StringLiteral): "Summary"
- `app/admin.tsx:41` (StringLiteral): "summary"
- `app/admin.tsx:41` (StringLiteral): "Article body"
- `app/admin.tsx:41` (StringLiteral): "body"
- `app/admin.tsx:41` (StringLiteral): "Separate paragraphs with a blank line. Start a paragraph with ## for a section heading. HTML is rendered as text for safety."
- `app/admin.tsx:41` (StringLiteral): "cover"
- `app/admin.tsx:41` (StringLiteral): "Cover image"
- `app/admin.tsx:41` (StringLiteral): "references-editor span-two"
- `app/admin.tsx:41` (JsxText): "References & further reading"
- `app/admin.tsx:41` (StringLiteral): "muted"
- `app/admin.tsx:41` (JsxText): "Add sources readers can open from the article. Up to 20 HTTPS links."
- `app/admin.tsx:41` (StringLiteral): "reference-editor-row"
- `app/admin.tsx:41` (StringLiteral): "Reference "
- `app/admin.tsx:41` (StringLiteral): " title"
- `app/admin.tsx:41` (StringLiteral): "references"
- `app/admin.tsx:41` (StringLiteral): "Source URL"
- `app/admin.tsx:41` (StringLiteral): "url"
- `app/admin.tsx:41` (StringLiteral): "references"
- `app/admin.tsx:41` (StringLiteral): "button"
- `app/admin.tsx:41` (StringLiteral): "icon-button danger"
- `app/admin.tsx:41` (StringLiteral): "Remove reference "
- `app/admin.tsx:41` (StringLiteral): "references"
- `app/admin.tsx:41` (StringLiteral): "button light small-button"
- `app/admin.tsx:41` (StringLiteral): "button"
- `app/admin.tsx:41` (StringLiteral): "references"
- `app/admin.tsx:41` (JsxText): "Add reference"
- `app/admin.tsx:41` (StringLiteral): "editor-footer"
- `app/admin.tsx:41` (StringLiteral): "tiny muted"
- `app/admin.tsx:41` (StringLiteral): "This save publishes your changes immediately."
- `app/admin.tsx:41` (StringLiteral): "This record will remain a private draft."
- `app/admin.tsx:41` (StringLiteral): "editor-buttons"
- `app/admin.tsx:41` (StringLiteral): "button light"
- `app/admin.tsx:41` (StringLiteral): "button"
- `app/admin.tsx:41` (JsxText): "Preview"
- `app/admin.tsx:41` (StringLiteral): "admin-save"
- `app/admin.tsx:41` (StringLiteral): "button orange"
- `app/admin.tsx:41` (StringLiteral): "Saving…"
- `app/admin.tsx:41` (StringLiteral): "Save "
- `app/admin.tsx:41` (StringLiteral): "& publish"
- `app/admin.tsx:41` (StringLiteral): "draft"
- `app/admin.tsx:41` (StringLiteral): "admin-panel content-list"
- `app/admin.tsx:41` (StringLiteral): "products"
- `app/admin.tsx:41` (StringLiteral): "journal"
- `app/admin.tsx:41` (StringLiteral): "research"
- `app/admin.tsx:41` (StringLiteral): "team"
- `app/admin.tsx:41` (StringLiteral): "content-row"
- `app/admin.tsx:41` (StringLiteral): "content-row-icon"
- `app/admin.tsx:41` (StringLiteral): "products"
- `app/admin.tsx:41` (StringLiteral): "team"
- `app/admin.tsx:41` (StringLiteral): "admin-badge "
- `app/admin.tsx:41` (StringLiteral): "published"
- `app/admin.tsx:41` (StringLiteral): "Published"
- `app/admin.tsx:41` (StringLiteral): "Draft"
- `app/admin.tsx:41` (StringLiteral): "button light small-button"
- `app/admin.tsx:41` (JsxText): "Edit"
- `app/admin.tsx:41` (StringLiteral): "icon-button danger"
- `app/admin.tsx:41` (StringLiteral): "Delete "
- `app/admin.tsx:41` (StringLiteral): "products"
- `app/admin.tsx:41` (StringLiteral): "journal"
- `app/admin.tsx:41` (StringLiteral): "research"
- `app/admin.tsx:41` (StringLiteral): "team"
- `app/admin.tsx:41` (StringLiteral): "empty-state"
- `app/admin.tsx:41` (JsxText): "A blank canvas."
- `app/admin.tsx:41` (JsxText): "Add your first item to get started."
- `app/admin.tsx:41` (StringLiteral): "button dark"
- `app/admin.tsx:41` (JsxText): "Create an item"
- `app/admin.tsx:42` (StringLiteral): "inbox"
- `app/admin.tsx:42` (StringLiteral): "admin-page-title"
- `app/admin.tsx:42` (StringLiteral): "eyebrow"
- `app/admin.tsx:42` (JsxText): "PEOPLE REACHING OUT"
- `app/admin.tsx:42` (JsxText): "Your inbox."
- `app/admin.tsx:42` (JsxText): "Applications, ideas, and problems worth listening to. Latest 500 submissions."
- `app/admin.tsx:42` (StringLiteral): "button light"
- `app/admin.tsx:42` (JsxText): "Export data"
- `app/admin.tsx:42` (StringLiteral): "catalogue-toolbar"
- `app/admin.tsx:42` (StringLiteral): "category-tabs"
- `app/admin.tsx:42` (StringLiteral): "all"
- `app/admin.tsx:42` (StringLiteral): "All messages"
- `app/admin.tsx:42` (StringLiteral): "join"
- `app/admin.tsx:42` (StringLiteral): "Applications"
- `app/admin.tsx:42` (StringLiteral): "contact"
- `app/admin.tsx:42` (StringLiteral): "Contact"
- `app/admin.tsx:42` (StringLiteral): "active"
- `app/admin.tsx:42` (StringLiteral): "search-box"
- `app/admin.tsx:42` (StringLiteral): "Search inbox"
- `app/admin.tsx:42` (StringLiteral): "Search name, email, or message"
- `app/admin.tsx:42` (StringLiteral): "inbox-layout"
- `app/admin.tsx:42` (StringLiteral): "admin-panel inbox-list"
- `app/admin.tsx:42` (StringLiteral): "inbox-item "
- `app/admin.tsx:42` (StringLiteral): "active"
- `app/admin.tsx:42` (StringLiteral): "inbox-avatar"
- `app/admin.tsx:42` (StringLiteral): "join"
- `app/admin.tsx:42` (StringLiteral): "Application"
- `app/admin.tsx:42` (StringLiteral): "Message"
- `app/admin.tsx:42` (JsxText): "·"
- `app/admin.tsx:42` (StringLiteral): "empty-state compact"
- `app/admin.tsx:42` (JsxText): "Room for a good conversation."
- `app/admin.tsx:42` (StringLiteral): "No matching submissions."
- `app/admin.tsx:42` (StringLiteral): "New applications and messages will appear here."
- `app/admin.tsx:42` (StringLiteral): "admin-panel inbox-detail"
- `app/admin.tsx:42` (StringLiteral): "section-heading"
- `app/admin.tsx:42` (StringLiteral): "icon-button"
- `app/admin.tsx:42` (StringLiteral): "Close message"
- `app/admin.tsx:42` (StringLiteral): "mailto:"
- `app/admin.tsx:42` (StringLiteral): "text-link"
- `app/admin.tsx:42` (StringLiteral): "inbox-status"
- `app/admin.tsx:42` (JsxText): "Status"
- `app/admin.tsx:42` (StringLiteral): "submission"
- `app/admin.tsx:42` (StringLiteral): "Message status updated."
- `app/admin.tsx:42` (StringLiteral): "new"
- `app/admin.tsx:42` (StringLiteral): "reviewing"
- `app/admin.tsx:42` (StringLiteral): "replied"
- `app/admin.tsx:42` (StringLiteral): "archived"
- `app/admin.tsx:42` (StringLiteral): "kind"
- `app/admin.tsx:42` (StringLiteral): "name"
- `app/admin.tsx:42` (StringLiteral): "email"
- `app/admin.tsx:42` (StringLiteral): " $1"
- `app/admin.tsx:42` (StringLiteral): "boolean"
- `app/admin.tsx:42` (StringLiteral): "Yes"
- `app/admin.tsx:42` (StringLiteral): "No"
- `app/admin.tsx:42` (StringLiteral): "Not provided"
- `app/admin.tsx:42` (StringLiteral): "tiny muted"
- `app/admin.tsx:42` (JsxText): "Reference:"
- `app/admin.tsx:42` (JsxText): "·"
- `app/admin.tsx:42` (StringLiteral): "form-actions"
- `app/admin.tsx:42` (StringLiteral): "button dark"
- `app/admin.tsx:42` (StringLiteral): "mailto:"
- `app/admin.tsx:42` (StringLiteral): "?subject="
- `app/admin.tsx:42` (StringLiteral): "Your Aur Labs "
- `app/admin.tsx:42` (StringLiteral): "join"
- `app/admin.tsx:42` (StringLiteral): "application"
- `app/admin.tsx:42` (StringLiteral): "message"
- `app/admin.tsx:42` (JsxText): "Reply by email"
- `app/admin.tsx:42` (StringLiteral): "danger-link"
- `app/admin.tsx:42` (StringLiteral): "Permanently delete this submission and its personal information?"
- `app/admin.tsx:42` (StringLiteral): "submission"
- `app/admin.tsx:42` (StringLiteral): "delete"
- `app/admin.tsx:42` (StringLiteral): "Submission permanently deleted."
- `app/admin.tsx:42` (JsxText): "Delete"
- `app/admin.tsx:42` (StringLiteral): "admin-panel inbox-detail empty-state"
- `app/admin.tsx:42` (JsxText): "A little context, right here."
- `app/admin.tsx:42` (JsxText): "Select a message to read its details."
- `app/admin.tsx:43` (StringLiteral): "media"
- `app/admin.tsx:43` (StringLiteral): "admin-page-title"
- `app/admin.tsx:43` (StringLiteral): "eyebrow"
- `app/admin.tsx:43` (JsxText): "SHOW, DON’T JUST TELL"
- `app/admin.tsx:43` (JsxText): "Your visual library."
- `app/admin.tsx:43` (JsxText): "Product screenshots, article covers, and team portraits. Latest 200 images."
- `app/admin.tsx:43` (StringLiteral): "button orange"
- `app/admin.tsx:43` (StringLiteral): "Uploading…"
- `app/admin.tsx:43` (StringLiteral): "Upload image"
- `app/admin.tsx:43` (StringLiteral): "file"
- `app/admin.tsx:43` (StringLiteral): "image/png,image/jpeg,image/webp,image/gif"
- `app/admin.tsx:43` (StringLiteral): "Image uploaded. Copy its URL or select it in a content editor."
- `app/admin.tsx:43` (StringLiteral): "media-grid"
- `app/admin.tsx:43` (StringLiteral): "media-card"
- `app/admin.tsx:43` (StringLiteral): "/api/media/"
- `app/admin.tsx:43` (JsxText): "KB ·"
- `app/admin.tsx:43` (StringLiteral): "button light small-button"
- `app/admin.tsx:43` (StringLiteral): "/api/media/"
- `app/admin.tsx:43` (StringLiteral): "Image URL copied."
- `app/admin.tsx:43` (JsxText): "Copy URL"
- `app/admin.tsx:43` (StringLiteral): "empty-state"
- `app/admin.tsx:43` (JsxText): "Make it unmistakably yours."
- `app/admin.tsx:43` (JsxText): "Upload PNG, JPEG, WebP, or GIF images up to 5 MB."
- `app/admin.tsx:44` (StringLiteral): "admin-page-title"
- `app/admin.tsx:44` (StringLiteral): "eyebrow"
- `app/admin.tsx:44` (JsxText): "THE WORDS & DETAILS THAT MATTER"
- `app/admin.tsx:44` (JsxText): "Make the lab yours."
- `app/admin.tsx:44` (JsxText): "Update the public identity, mission, donation channels, and account security."
- `app/admin.tsx:44` (StringLiteral): "save"
- `app/admin.tsx:44` (StringLiteral): "settings"
- `app/admin.tsx:44` (StringLiteral): "Site settings saved and published."
- `app/admin.tsx:44` (StringLiteral): "admin-panel password-panel"
- `app/admin.tsx:44` (JsxText): "Change admin password"
- `app/admin.tsx:44` (StringLiteral): "muted"
- `app/admin.tsx:44` (JsxText): "This revokes existing unlocks and keeps the current tab signed in."
- `app/admin.tsx:44` (StringLiteral): "password"
- `app/admin.tsx:44` (StringLiteral): "Password updated. Other admin unlocks were revoked."
- `app/admin.tsx:44` (StringLiteral): "fields-grid"
- `app/admin.tsx:44` (StringLiteral): "Current password"
- `app/admin.tsx:44` (StringLiteral): "password"
- `app/admin.tsx:44` (StringLiteral): "New password (12–128 characters)"
- `app/admin.tsx:44` (StringLiteral): "password"
- `app/admin.tsx:44` (StringLiteral): "button dark"
- `app/admin.tsx:44` (JsxText): "Update password"
- `app/admin.tsx:47` (StringLiteral): "text"
- `app/admin.tsx:47` (StringLiteral): "admin-editor"
- `app/admin.tsx:47` (JsxText): "Identity & home page"
- `app/admin.tsx:47` (StringLiteral): "fields-grid"
- `app/admin.tsx:47` (StringLiteral): "name"
- `app/admin.tsx:47` (StringLiteral): "Organization name"
- `app/admin.tsx:47` (StringLiteral): "email"
- `app/admin.tsx:47` (StringLiteral): "Contact email"
- `app/admin.tsx:47` (StringLiteral): "email"
- `app/admin.tsx:47` (StringLiteral): "tagline"
- `app/admin.tsx:47` (StringLiteral): "Brand tagline"
- `app/admin.tsx:47` (StringLiteral): "footerNote"
- `app/admin.tsx:47` (StringLiteral): "Footer note"
- `app/admin.tsx:47` (StringLiteral): "heroLine1"
- `app/admin.tsx:47` (StringLiteral): "Hero headline / first line"
- `app/admin.tsx:47` (StringLiteral): "heroLine2"
- `app/admin.tsx:47` (StringLiteral): "Hero headline / second line"
- `app/admin.tsx:47` (StringLiteral): "heroDescription"
- `app/admin.tsx:47` (StringLiteral): "Hero description"
- `app/admin.tsx:47` (StringLiteral): "mission"
- `app/admin.tsx:47` (StringLiteral): "Mission statement"
- `app/admin.tsx:47` (StringLiteral): "about"
- `app/admin.tsx:47` (StringLiteral): "About us (blank line between paragraphs)"
- `app/admin.tsx:47` (StringLiteral): "githubUrl"
- `app/admin.tsx:47` (StringLiteral): "GitHub organization URL (optional)"
- `app/admin.tsx:47` (StringLiteral): "url"
- `app/admin.tsx:47` (StringLiteral): "Accept volunteer applications"
- `app/admin.tsx:47` (JsxText): "Auri’s field guidance"
- `app/admin.tsx:47` (StringLiteral): "muted guide-editor-note"
- `app/admin.tsx:47` (JsxText): "These hints appear beside the matching field. Leave a hint empty to use its default. Changes go live when you save settings."
- `app/admin.tsx:47` (StringLiteral): "fields-grid"
- `app/admin.tsx:47` (JsxText): "Donations & transparency"
- `app/admin.tsx:47` (StringLiteral): "fields-grid"
- `app/admin.tsx:47` (StringLiteral): "donationIntro"
- `app/admin.tsx:47` (StringLiteral): "Support page introduction"
- `app/admin.tsx:47` (StringLiteral): "donationUrl"
- `app/admin.tsx:47` (StringLiteral): "One-time donation URL (optional)"
- `app/admin.tsx:47` (StringLiteral): "url"
- `app/admin.tsx:47` (StringLiteral): "Use a verified HTTPS checkout or donation page. Leave blank to show an email inquiry."
- `app/admin.tsx:47` (StringLiteral): "donationMonthlyUrl"
- `app/admin.tsx:47` (StringLiteral): "Monthly donation URL (optional)"
- `app/admin.tsx:47` (StringLiteral): "url"
- `app/admin.tsx:47` (StringLiteral): "Use a provider page that explicitly supports recurring contributions."
- `app/admin.tsx:47` (StringLiteral): "donationProvider"
- `app/admin.tsx:47` (StringLiteral): "Donation provider / button name"
- `app/admin.tsx:47` (StringLiteral): "donationTransparency"
- `app/admin.tsx:47` (StringLiteral): "Donation transparency statement"
- `app/admin.tsx:47` (StringLiteral): "info-banner"
- `app/admin.tsx:47` (JsxText): "Verify the recipient, payment provider, currency, tax status, and any recurring terms before publishing. Selected suggested amounts are not automatically passed to external payment providers."
- `app/admin.tsx:47` (StringLiteral): "editor-footer"
- `app/admin.tsx:47` (StringLiteral): "tiny muted"
- `app/admin.tsx:47` (JsxText): "Changes take effect after saving."
- `app/admin.tsx:47` (StringLiteral): "button orange"
- `app/admin.tsx:47` (StringLiteral): "Saving…"
- `app/admin.tsx:47` (StringLiteral): "Save site settings"
- `app/api/admin/route.ts:1` (StringLiteral): "cloudflare:workers"
- `app/api/admin/route.ts:2` (StringLiteral): "@/lib/server"
- `app/api/admin/route.ts:3` (StringLiteral): "@/lib/validation"
- `app/api/admin/route.ts:4` (StringLiteral): "force-dynamic"
- `app/api/admin/route.ts:8` (StringLiteral): "view"
- `app/api/admin/route.ts:8` (StringLiteral): "status"
- `app/api/admin/route.ts:9` (StringLiteral): "Unlock the admin area to continue."
- `app/api/admin/route.ts:10` (StringLiteral): "SELECT * FROM submissions ORDER BY created_at DESC LIMIT 500"
- `app/api/admin/route.ts:10` (StringLiteral): "SELECT * FROM media ORDER BY created_at DESC LIMIT 200"
- `app/api/admin/route.ts:10` (StringLiteral): "SELECT action,target,created_at FROM audit_log ORDER BY created_at DESC LIMIT 50"
- `app/api/admin/route.ts:12` (StringLiteral): "Admin storage is temporarily unavailable."
- `app/api/admin/route.ts:15` (StringLiteral): "This action must come from the website."
- `app/api/admin/route.ts:17` (StringLiteral): "Sign in with ChatGPT first."
- `app/api/admin/route.ts:18` (StringLiteral): "setup"
- `app/api/admin/route.ts:18` (StringLiteral): "unlock"
- `app/api/admin/route.ts:19` (StringLiteral): "admin:"
- `app/api/admin/route.ts:19` (StringLiteral): "Too many attempts. Please wait 15 minutes."
- `app/api/admin/route.ts:21` (StringLiteral): "setup"
- `app/api/admin/route.ts:23` (StringLiteral): "An administrator is already configured."
- `app/api/admin/route.ts:24` (StringLiteral): "string"
- `app/api/admin/route.ts:24` (StringLiteral): "The setup token is missing or incorrect. Configure AUR_ADMIN_SETUP_TOKEN in the hosting environment first."
- `app/api/admin/route.ts:25` (StringLiteral): "string"
- `app/api/admin/route.ts:25` (StringLiteral): "Use 3–40 letters, numbers, dots, hyphens, or underscores for your username."
- `app/api/admin/route.ts:26` (StringLiteral): "string"
- `app/api/admin/route.ts:26` (StringLiteral): "Choose a password of 12–128 characters."
- `app/api/admin/route.ts:28` (StringLiteral): "INSERT INTO administrators (id,user_id,username,password_hash,salt,created_at) VALUES ('owner',?,?,?,?,?)"
- `app/api/admin/route.ts:29` (StringLiteral): "admin.setup"
- `app/api/admin/route.ts:29` (StringLiteral): "owner"
- `app/api/admin/route.ts:31` (StringLiteral): "string"
- `app/api/admin/route.ts:31` (StringLiteral): "The username, password, or signed-in account doesn’t match."
- `app/api/admin/route.ts:32` (StringLiteral): "admin.unlock"
- `app/api/admin/route.ts:32` (StringLiteral): "owner"
- `app/api/admin/route.ts:34` (StringLiteral): "Your admin session is locked. Sign in again to continue."
- `app/api/admin/route.ts:35` (StringLiteral): "lock"
- `app/api/admin/route.ts:36` (StringLiteral): "DELETE FROM admin_unlocks WHERE token_hash = ?"
- `app/api/admin/route.ts:36` (StringLiteral): "x-aur-unlock"
- `app/api/admin/route.ts:38` (StringLiteral): "password"
- `app/api/admin/route.ts:39` (StringLiteral): "string"
- `app/api/admin/route.ts:39` (StringLiteral): "Your current password is incorrect."
- `app/api/admin/route.ts:40` (StringLiteral): "string"
- `app/api/admin/route.ts:40` (StringLiteral): "Choose a password of 12–128 characters."
- `app/api/admin/route.ts:41` (StringLiteral): "UPDATE administrators SET password_hash=?, salt=? WHERE id='owner'"
- `app/api/admin/route.ts:41` (StringLiteral): "DELETE FROM admin_unlocks"
- `app/api/admin/route.ts:41` (StringLiteral): "admin.password"
- `app/api/admin/route.ts:41` (StringLiteral): "owner"
- `app/api/admin/route.ts:43` (StringLiteral): "save"
- `app/api/admin/route.ts:45` (StringLiteral): "Unknown content type."
- `app/api/admin/route.ts:46` (StringLiteral): "."
- `app/api/admin/route.ts:46` (StringLiteral): ": "
- `app/api/admin/route.ts:46` (StringLiteral): " · "
- `app/api/admin/route.ts:47` (StringLiteral): "settings"
- `app/api/admin/route.ts:47` (StringLiteral): "site-settings"
- `app/api/admin/route.ts:48` (StringLiteral): "SELECT kind FROM content WHERE id=?"
- `app/api/admin/route.ts:49` (StringLiteral): "This ID belongs to another content type."
- `app/api/admin/route.ts:50` (StringLiteral): "products"
- `app/api/admin/route.ts:50` (StringLiteral): "journal"
- `app/api/admin/route.ts:50` (StringLiteral): "research"
- `app/api/admin/route.ts:50` (StringLiteral): "That URL slug is already in use."
- `app/api/admin/route.ts:51` (StringLiteral): "INSERT INTO content (id,kind,data,published,deleted,updated_at) VALUES (?,?,?,?,0,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data,published=excluded.published,deleted=0,updated_at=excluded.updated_at"
- `app/api/admin/route.ts:51` (StringLiteral): "settings"
- `app/api/admin/route.ts:51` (StringLiteral): "content.save"
- `app/api/admin/route.ts:51` (StringLiteral): ":"
- `app/api/admin/route.ts:53` (StringLiteral): "delete"
- `app/api/admin/route.ts:54` (StringLiteral): "products"
- `app/api/admin/route.ts:54` (StringLiteral): "journal"
- `app/api/admin/route.ts:54` (StringLiteral): "research"
- `app/api/admin/route.ts:54` (StringLiteral): "team"
- `app/api/admin/route.ts:54` (StringLiteral): "string"
- `app/api/admin/route.ts:54` (StringLiteral): "Invalid content selection."
- `app/api/admin/route.ts:55` (StringLiteral): "INSERT INTO content (id,kind,data,published,deleted,updated_at) VALUES (?,?,'{}',0,1,?) ON CONFLICT(id) DO UPDATE SET deleted=1,published=0,updated_at=excluded.updated_at"
- `app/api/admin/route.ts:55` (StringLiteral): "content.delete"
- `app/api/admin/route.ts:55` (StringLiteral): ":"
- `app/api/admin/route.ts:57` (StringLiteral): "submission"
- `app/api/admin/route.ts:58` (StringLiteral): "string"
- `app/api/admin/route.ts:58` (StringLiteral): "new"
- `app/api/admin/route.ts:58` (StringLiteral): "reviewing"
- `app/api/admin/route.ts:58` (StringLiteral): "replied"
- `app/api/admin/route.ts:58` (StringLiteral): "archived"
- `app/api/admin/route.ts:58` (StringLiteral): "delete"
- `app/api/admin/route.ts:58` (StringLiteral): "Invalid inbox action."
- `app/api/admin/route.ts:59` (StringLiteral): "delete"
- `app/api/admin/route.ts:59` (StringLiteral): "DELETE FROM submissions WHERE id=?"
- `app/api/admin/route.ts:59` (StringLiteral): "UPDATE submissions SET status=? WHERE id=?"
- `app/api/admin/route.ts:59` (StringLiteral): "inbox."
- `app/api/admin/route.ts:61` (StringLiteral): "Unknown action."
- `app/api/admin/route.ts:62` (StringLiteral): "Admin operation failed"
- `app/api/admin/route.ts:62` (StringLiteral): "unknown"
- `app/api/admin/route.ts:62` (StringLiteral): "The change wasn’t saved. Check the fields and try again."
- `app/api/content/route.ts:1` (StringLiteral): "@/lib/server"
- `app/api/content/route.ts:2` (StringLiteral): "force-dynamic"
- `app/api/content/route.ts:3` (StringLiteral): "We couldn’t load the latest content. Please try again."
- `app/api/media/[key]/route.ts:1` (StringLiteral): "cloudflare:workers"
- `app/api/media/[key]/route.ts:3` (StringLiteral): "Not found"
- `app/api/media/[key]/route.ts:4` (StringLiteral): "Not found"
- `app/api/media/[key]/route.ts:5` (StringLiteral): "Content-Type"
- `app/api/media/[key]/route.ts:5` (StringLiteral): "application/octet-stream"
- `app/api/media/[key]/route.ts:5` (StringLiteral): "Cache-Control"
- `app/api/media/[key]/route.ts:5` (StringLiteral): "public, max-age=31536000, immutable"
- `app/api/media/[key]/route.ts:5` (StringLiteral): "X-Content-Type-Options"
- `app/api/media/[key]/route.ts:5` (StringLiteral): "nosniff"
- `app/api/media/[key]/route.ts:5` (StringLiteral): "Content-Security-Policy"
- `app/api/media/[key]/route.ts:5` (StringLiteral): "default-src 'none'"
- `app/api/media/route.ts:1` (StringLiteral): "cloudflare:workers"
- `app/api/media/route.ts:2` (StringLiteral): "@/lib/server"
- `app/api/media/route.ts:4` (StringLiteral): "Unlock the admin area to upload images."
- `app/api/media/route.ts:5` (StringLiteral): "Image storage is unavailable."
- `app/api/media/route.ts:6` (StringLiteral): "content-length"
- `app/api/media/route.ts:6` (StringLiteral): "Images must be smaller than 5 MB."
- `app/api/media/route.ts:9` (StringLiteral): "Content-Type"
- `app/api/media/route.ts:9` (StringLiteral): "content-type"
- `app/api/media/route.ts:9` (StringLiteral): "file"
- `app/api/media/route.ts:10` (StringLiteral): "Choose an image under 5 MB."
- `app/api/media/route.ts:12` (StringLiteral): "png"
- `app/api/media/route.ts:12` (StringLiteral): "image/png"
- `app/api/media/route.ts:13` (StringLiteral): "jpg"
- `app/api/media/route.ts:13` (StringLiteral): "image/jpeg"
- `app/api/media/route.ts:14` (StringLiteral): "RIFF"
- `app/api/media/route.ts:14` (StringLiteral): "WEBP"
- `app/api/media/route.ts:14` (StringLiteral): "webp"
- `app/api/media/route.ts:14` (StringLiteral): "image/webp"
- `app/api/media/route.ts:15` (StringLiteral): "GIF87a"
- `app/api/media/route.ts:15` (StringLiteral): "GIF89a"
- `app/api/media/route.ts:15` (StringLiteral): "gif"
- `app/api/media/route.ts:15` (StringLiteral): "image/gif"
- `app/api/media/route.ts:16` (StringLiteral): "Use a PNG, JPEG, WebP, or GIF image."
- `app/api/media/route.ts:17` (StringLiteral): "."
- `app/api/media/route.ts:19` (StringLiteral): "INSERT INTO media (id,name,mime,size,created_at) VALUES (?,?,?,?,?)"
- `app/api/media/route.ts:19` (StringLiteral): "media.upload"
- `app/api/media/route.ts:20` (StringLiteral): "/api/media/"
- `app/api/media/route.ts:21` (StringLiteral): "The upload failed. Please try again."
- `app/api/submissions/route.ts:1` (StringLiteral): "@/lib/server"
- `app/api/submissions/route.ts:2` (StringLiteral): "@/lib/validation"
- `app/api/submissions/route.ts:4` (StringLiteral): "Please submit this form from our website."
- `app/api/submissions/route.ts:9` (StringLiteral): "join"
- `app/api/submissions/route.ts:9` (StringLiteral): "Volunteer applications are currently closed. Please contact the team instead."
- `app/api/submissions/route.ts:10` (StringLiteral): "SELECT id FROM submissions WHERE id = ?"
- `app/api/submissions/route.ts:12` (StringLiteral): "cf-connecting-ip"
- `app/api/submissions/route.ts:12` (StringLiteral): "oai-authenticated-user-id"
- `app/api/submissions/route.ts:12` (StringLiteral): "anonymous"
- `app/api/submissions/route.ts:13` (StringLiteral): "submit:"
- `app/api/submissions/route.ts:13` (StringLiteral): "email:"
- `app/api/submissions/route.ts:13` (StringLiteral): "You’ve sent several messages recently. Please try again in an hour or email us."
- `app/api/submissions/route.ts:15` (StringLiteral): "INSERT OR IGNORE INTO submissions (id,kind,name,email,data,status,created_at) VALUES (?,?,?,?,?,'new',?)"
- `app/api/submissions/route.ts:17` (StringLiteral): "Submission failed"
- `app/api/submissions/route.ts:17` (StringLiteral): "unknown"
- `app/api/submissions/route.ts:17` (StringLiteral): "Your message wasn’t saved. Please try again or email the team directly."
- `app/auri.tsx:1` (StringLiteral): "use client"
- `app/auri.tsx:2` (StringLiteral): "react"
- `app/auri.tsx:3` (StringLiteral): "react-dom"
- `app/auri.tsx:4` (StringLiteral): "lucide-react"
- `app/auri.tsx:5` (StringLiteral): "./components/auri/AuriCharacter"
- `app/auri.tsx:6` (StringLiteral): "@/lib/auri-guides"
- `app/auri.tsx:9` (StringLiteral): "explaining"
- `app/auri.tsx:10` (StringLiteral): "auri-help"
- `app/auri.tsx:14` (StringLiteral): "Find a tool"
- `app/auri.tsx:14` (StringLiteral): "Filter the catalogue by platform and category. Concept previews are ideas in progress; released tools have real version and download details."
- `app/auri.tsx:14` (StringLiteral): "/products"
- `app/auri.tsx:15` (StringLiteral): "Join the team"
- `app/auri.tsx:15` (StringLiteral): "The application has three steps. Tell us about yourself, your skills, and your approach. Contributions are voluntary and unpaid."
- `app/auri.tsx:15` (StringLiteral): "/join"
- `app/auri.tsx:16` (StringLiteral): "Support the mission"
- `app/auri.tsx:16` (StringLiteral): "You can contribute your skills or explore the Support page. When a payment provider is available, you confirm the amount and terms there."
- `app/auri.tsx:16` (StringLiteral): "/support"
- `app/auri.tsx:17` (StringLiteral): "Talk to the team"
- `app/auri.tsx:17` (StringLiteral): "Send an idea, problem, or question through Contact. A reference appears only after your message is saved successfully."
- `app/auri.tsx:17` (StringLiteral): "/contact"
- `app/auri.tsx:21` (StringLiteral): "I’m Auri. A little guidance, whenever you need it."
- `app/auri.tsx:24` (StringLiteral): "auri-hidden"
- `app/auri.tsx:24` (StringLiteral): "yes"
- `app/auri.tsx:24` (StringLiteral): "auri-hints"
- `app/auri.tsx:24` (StringLiteral): "off"
- `app/auri.tsx:24` (StringLiteral): "auri-motion"
- `app/auri.tsx:24` (StringLiteral): "off"
- `app/auri.tsx:24` (StringLiteral): "auri-welcomed"
- `app/auri.tsx:24` (StringLiteral): "auri-welcomed"
- `app/auri.tsx:24` (StringLiteral): "yes"
- `app/auri.tsx:26` (StringLiteral): "string"
- `app/auri.tsx:26` (StringLiteral): "auri-hidden"
- `app/auri.tsx:26` (StringLiteral): "no"
- `app/auri.tsx:26` (StringLiteral): "auri-help"
- `app/auri.tsx:26` (StringLiteral): "auri-help"
- `app/auri.tsx:29` (StringLiteral): "[data-auri-ui]"
- `app/auri.tsx:29` (StringLiteral): "password"
- `app/auri.tsx:29` (StringLiteral): "title"
- `app/auri.tsx:29` (StringLiteral): "aria-invalid"
- `app/auri.tsx:29` (StringLiteral): "true"
- `app/auri.tsx:29` (StringLiteral): "error"
- `app/auri.tsx:29` (StringLiteral): "explaining"
- `app/auri.tsx:30` (StringLiteral): "[data-auri],[data-help]"
- `app/auri.tsx:31` (StringLiteral): "mouse"
- `app/auri.tsx:31` (StringLiteral): "[data-help]"
- `app/auri.tsx:33` (StringLiteral): "focusin"
- `app/auri.tsx:33` (StringLiteral): "pointerover"
- `app/auri.tsx:33` (StringLiteral): "pointerout"
- `app/auri.tsx:34` (StringLiteral): "focusin"
- `app/auri.tsx:34` (StringLiteral): "pointerover"
- `app/auri.tsx:34` (StringLiteral): "pointerout"
- `app/auri.tsx:41` (StringLiteral): ".field,.consent-field"
- `app/auri.tsx:41` (StringLiteral): "[data-auri-slot]"
- `app/auri.tsx:43` (StringLiteral): "input:not([type=hidden]),textarea,select,button,a,summary,[data-auri-obstacle]"
- `app/auri.tsx:43` (StringLiteral): "[data-auri-ui]"
- `app/auri.tsx:48` (StringLiteral): "scroll"
- `app/auri.tsx:48` (StringLiteral): "resize"
- `app/auri.tsx:48` (StringLiteral): "resize"
- `app/auri.tsx:49` (StringLiteral): "scroll"
- `app/auri.tsx:49` (StringLiteral): "resize"
- `app/auri.tsx:49` (StringLiteral): "resize"
- `app/auri.tsx:52` (StringLiteral): "Escape"
- `app/auri.tsx:52` (StringLiteral): "keydown"
- `app/auri.tsx:52` (StringLiteral): "keydown"
- `app/auri.tsx:53` (StringLiteral): "resize"
- `app/auri.tsx:53` (StringLiteral): "resize"
- `app/auri.tsx:55` (StringLiteral): "auri-hidden"
- `app/auri.tsx:55` (StringLiteral): "yes"
- `app/auri.tsx:56` (StringLiteral): "error"
- `app/auri.tsx:56` (StringLiteral): "has-error"
- `app/auri.tsx:56` (StringLiteral): "auri-context-label"
- `app/auri.tsx:56` (StringLiteral): "error"
- `app/auri.tsx:56` (StringLiteral): "LET’S FIX THIS"
- `app/auri.tsx:56` (StringLiteral): "A LITTLE HELP FROM AURI"
- `app/auri.tsx:56` (StringLiteral): "status"
- `app/auri.tsx:56` (StringLiteral): "button"
- `app/auri.tsx:56` (StringLiteral): "Dismiss this hint"
- `app/auri.tsx:57` (StringLiteral): "auri-system"
- `app/auri.tsx:57` (StringLiteral): "auri-system still"
- `app/auri.tsx:58` (StringLiteral): "auri-anchor"
- `app/auri.tsx:60` (StringLiteral): "auri-dock "
- `app/auri.tsx:60` (StringLiteral): "context-active"
- `app/auri.tsx:61` (StringLiteral): "auri-welcome"
- `app/auri.tsx:61` (StringLiteral): "status"
- `app/auri.tsx:61` (StringLiteral): "success"
- `app/auri.tsx:61` (StringLiteral): "Dismiss Auri welcome"
- `app/auri.tsx:62` (StringLiteral): "button"
- `app/auri.tsx:62` (StringLiteral): "auri-launcher "
- `app/auri.tsx:62` (StringLiteral): "minimal"
- `app/auri.tsx:62` (StringLiteral): "Restore Auri guide"
- `app/auri.tsx:62` (StringLiteral): "Open Auri guide"
- `app/auri.tsx:62` (StringLiteral): "dialog"
- `app/auri.tsx:62` (StringLiteral): "auri-hidden"
- `app/auri.tsx:62` (StringLiteral): "no"
- `app/auri.tsx:63` (StringLiteral): "idle"
- `app/auri.tsx:63` (JsxText): "Ask Auri"
- `app/auri.tsx:66` (StringLiteral): "auri-dialog"
- `app/auri.tsx:66` (StringLiteral): "auri-title"
- `app/auri.tsx:67` (StringLiteral): "auri-dialog-heading"
- `app/auri.tsx:67` (StringLiteral): "eyebrow"
- `app/auri.tsx:67` (StringLiteral): "green-dot"
- `app/auri.tsx:67` (JsxText): "YOUR GUIDE TO THE LAB"
- `app/auri.tsx:67` (StringLiteral): "auri-title"
- `app/auri.tsx:67` (JsxText): "A little clarity."
- `app/auri.tsx:67` (StringLiteral): "button"
- `app/auri.tsx:67` (StringLiteral): "icon-button"
- `app/auri.tsx:67` (StringLiteral): "Close Auri guide"
- `app/auri.tsx:68` (StringLiteral): "auri-intro"
- `app/auri.tsx:68` (StringLiteral): "observing"
- `app/auri.tsx:68` (StringLiteral): "I can explain the studio’s controls. Save confirms an update; Published controls what visitors can see."
- `app/auri.tsx:68` (StringLiteral): "I’m Auri. I can help you find your way and explain each field as you go."
- `app/auri.tsx:68` (JsxText): "Website guidance · no messages are sent to an AI service."
- `app/auri.tsx:69` (StringLiteral): "search-box"
- `app/auri.tsx:69` (StringLiteral): "Find some guidance…"
- `app/auri.tsx:69` (StringLiteral): "Search Auri help"
- `app/auri.tsx:70` (StringLiteral): "auri-faq"
- `app/auri.tsx:70` (StringLiteral): "text-link"
- `app/auri.tsx:70` (JsxText): "Go there"
- `app/auri.tsx:70` (JsxText): "No matching guide."
- `app/auri.tsx:70` (StringLiteral): "/contact"
- `app/auri.tsx:70` (JsxText): "Ask the team."
- `app/auri.tsx:71` (StringLiteral): "auri-preferences"
- `app/auri.tsx:71` (JsxText): "Contextual field & button hints"
- `app/auri.tsx:71` (StringLiteral): "checkbox"
- `app/auri.tsx:71` (StringLiteral): "auri-hints"
- `app/auri.tsx:71` (StringLiteral): "on"
- `app/auri.tsx:71` (StringLiteral): "off"
- `app/auri.tsx:71` (JsxText): "Character animation"
- `app/auri.tsx:71` (StringLiteral): "checkbox"
- `app/auri.tsx:71` (StringLiteral): "auri-motion"
- `app/auri.tsx:71` (StringLiteral): "on"
- `app/auri.tsx:71` (StringLiteral): "off"
- `app/auri.tsx:72` (StringLiteral): "auri-dialog-footer"
- `app/auri.tsx:72` (JsxText): "Reset position"
- `app/auri.tsx:72` (JsxText): "Minimize"
- `app/auri.tsx:72` (StringLiteral): "auri-access-note"
- `app/auri.tsx:72` (JsxText): "Drag the character to move it. Reduced-motion preferences are respected."
- `app/chatgpt-auth.ts:1` (StringLiteral): "next/headers"
- `app/chatgpt-auth.ts:2` (StringLiteral): "next/navigation"
- `app/chatgpt-auth.ts:11` (StringLiteral): "oai-authenticated-user-id"
- `app/chatgpt-auth.ts:12` (StringLiteral): "oai-authenticated-user-email"
- `app/chatgpt-auth.ts:13` (StringLiteral): "oai-authenticated-user-full-name"
- `app/chatgpt-auth.ts:15` (StringLiteral): "oai-authenticated-user-full-name-encoding"
- `app/chatgpt-auth.ts:16` (StringLiteral): "percent-encoded-utf-8"
- `app/chatgpt-auth.ts:17` (StringLiteral): "/signin-with-chatgpt"
- `app/chatgpt-auth.ts:18` (StringLiteral): "/signout-with-chatgpt"
- `app/chatgpt-auth.ts:19` (StringLiteral): "/callback"
- `app/chatgpt-auth.ts:56` (StringLiteral): "/"
- `app/chatgpt-auth.ts:62` (StringLiteral): "/"
- `app/chatgpt-auth.ts:62` (StringLiteral): "//"
- `app/chatgpt-auth.ts:62` (StringLiteral): "/"
- `app/chatgpt-auth.ts:66` (StringLiteral): "https://app.local"
- `app/chatgpt-auth.ts:68` (StringLiteral): "/"
- `app/chatgpt-auth.ts:70` (StringLiteral): "https://app.local"
- `app/chatgpt-auth.ts:70` (StringLiteral): "/"
- `app/chatgpt-auth.ts:71` (StringLiteral): "/"
- `app/components/auri/AuriCharacter.tsx:1` (StringLiteral): "use client"
- `app/components/auri/AuriCharacter.tsx:2` (StringLiteral): "react"
- `app/components/auri/AuriCharacter.tsx:3` (StringLiteral): "@/lib/auri-guides"
- `app/components/auri/AuriCharacter.tsx:4` (StringLiteral): "idle"
- `app/components/auri/AuriCharacter.tsx:6` (StringLiteral): "WebGL2RenderingContext"
- `app/components/auri/AuriCharacter.tsx:7` (StringLiteral): "./AuriScene"
- `app/components/auri/AuriCharacter.tsx:10` (StringLiteral): "small"
- `app/components/auri/AuriCharacter.tsx:10` (StringLiteral): "webgl-ready"
- `app/components/auri/AuriCharacter.tsx:10` (StringLiteral): "true"
- `app/components/auri/AuriCharacter.tsx:10` (StringLiteral): "auri-shadow"
- `app/components/auri/AuriCharacter.tsx:10` (StringLiteral): "auri-antenna"
- `app/components/auri/AuriCharacter.tsx:10` (StringLiteral): "auri-ear left"
- `app/components/auri/AuriCharacter.tsx:10` (StringLiteral): "auri-ear right"
- `app/components/auri/AuriCharacter.tsx:10` (StringLiteral): "auri-head"
- `app/components/auri/AuriCharacter.tsx:10` (StringLiteral): "auri-visor"
- `app/components/auri/AuriCharacter.tsx:10` (StringLiteral): "auri-cheek"
- `app/components/auri/AuriCharacter.tsx:10` (StringLiteral): "auri-body"
- `app/components/auri/AuriCharacter.tsx:10` (JsxText): "a"
- `app/components/auri/AuriCharacter.tsx:10` (StringLiteral): "auri-hand left"
- `app/components/auri/AuriCharacter.tsx:10` (StringLiteral): "auri-hand right"
- `app/components/auri/AuriCharacter.tsx:10` (StringLiteral): "auri-canvas"
- `app/components/auri/AuriScene.ts:1` (StringLiteral): "three"
- `app/components/auri/AuriScene.ts:2` (StringLiteral): "@/lib/auri-guides"
- `app/components/auri/AuriScene.ts:5` (StringLiteral): "low-power"
- `app/components/auri/AuriScene.ts:29` (StringLiteral): "(prefers-reduced-motion: reduce)"
- `app/components/auri/AuriScene.ts:31` (StringLiteral): "error"
- `app/components/auri/AuriScene.ts:32` (StringLiteral): "explaining"
- `app/components/auri/AuriScene.ts:33` (StringLiteral): "success"
- `app/components/auri/AuriScene.ts:34` (StringLiteral): "success"
- `app/components/auri/AuriScene.ts:38` (StringLiteral): "0"
- `app/components/auri/AuriScene.ts:38` (StringLiteral): "webgl-ready"
- `app/components/auri/AuriScene.ts:38` (StringLiteral): "webglcontextlost"
- `app/components/auri/AuriScene.ts:39` (StringLiteral): "webglcontextlost"
- `app/content-preview.tsx:1` (StringLiteral): "use client"
- `app/content-preview.tsx:2` (StringLiteral): "react"
- `app/content-preview.tsx:3` (StringLiteral): "lucide-react"
- `app/content-preview.tsx:4` (StringLiteral): "./visuals"
- `app/content-preview.tsx:5` (StringLiteral): "@/lib/content"
- `app/content-preview.tsx:10` (StringLiteral): "content-preview"
- `app/content-preview.tsx:10` (StringLiteral): "preview-title"
- `app/content-preview.tsx:10` (StringLiteral): "preview-bar"
- `app/content-preview.tsx:10` (JsxText): "UNSAVED PREVIEW · ONLY YOU CAN SEE THIS"
- `app/content-preview.tsx:10` (StringLiteral): "button"
- `app/content-preview.tsx:10` (StringLiteral): "icon-button"
- `app/content-preview.tsx:10` (StringLiteral): "Close content preview"
- `app/content-preview.tsx:10` (StringLiteral): "products"
- `app/content-preview.tsx:10` (StringLiteral): "preview-product"
- `app/content-preview.tsx:10` (StringLiteral): "eyebrow"
- `app/content-preview.tsx:10` (StringLiteral): "released"
- `app/content-preview.tsx:10` (StringLiteral): "RELEASE PREVIEW"
- `app/content-preview.tsx:10` (StringLiteral): "WORK IN PROGRESS"
- `app/content-preview.tsx:10` (StringLiteral): "preview-title"
- `app/content-preview.tsx:10` (StringLiteral): "Your product name"
- `app/content-preview.tsx:10` (StringLiteral): "platform-labels"
- `app/content-preview.tsx:10` (StringLiteral): "prose"
- `app/content-preview.tsx:10` (StringLiteral): "\n\n"
- `app/content-preview.tsx:10` (StringLiteral): "muted"
- `app/content-preview.tsx:10` (JsxText): "release(s) ·"
- `app/content-preview.tsx:10` (StringLiteral): "team"
- `app/content-preview.tsx:10` (StringLiteral): "eyebrow"
- `app/content-preview.tsx:10` (JsxText): "TEAM PROFILE"
- `app/content-preview.tsx:10` (StringLiteral): "preview-title"
- `app/content-preview.tsx:10` (StringLiteral): "Team member"
- `app/content-preview.tsx:10` (StringLiteral): "prose"
- `app/content-preview.tsx:10` (StringLiteral): "eyebrow"
- `app/content-preview.tsx:10` (StringLiteral): "preview-title"
- `app/content-preview.tsx:10` (StringLiteral): "Your headline"
- `app/content-preview.tsx:10` (StringLiteral): "article-deck"
- `app/content-preview.tsx:10` (StringLiteral): "muted"
- `app/content-preview.tsx:10` (JsxText): "·"
- `app/content-preview.tsx:10` (StringLiteral): "research"
- `app/content-preview.tsx:10` (StringLiteral): "prose"
- `app/content-preview.tsx:10` (StringLiteral): "\n\n"
- `app/content-preview.tsx:10` (StringLiteral): "## "
- `app/content-preview.tsx:10` (StringLiteral): "preview-footer"
- `app/content-preview.tsx:10` (JsxText): "Close to continue editing. Saving with Published enabled makes the record public."
- `app/content-preview.tsx:10` (StringLiteral): "button dark"
- `app/content-preview.tsx:10` (StringLiteral): "button"
- `app/content-preview.tsx:10` (JsxText): "Back to editing"
- `app/error.tsx:1` (StringLiteral): "use client"
- `app/error.tsx:2` (StringLiteral): "not-found"
- `app/error.tsx:2` (StringLiteral): "eyebrow"
- `app/error.tsx:2` (JsxText): "A SMALL HICCUP IN THE LAB"
- `app/error.tsx:2` (JsxText): "Let’s try that"
- `app/error.tsx:2` (JsxText): "one more time."
- `app/error.tsx:2` (JsxText): "Something prevented this page from loading. Please retry, or return to the home page."
- `app/error.tsx:2` (StringLiteral): "button orange"
- `app/error.tsx:2` (JsxText): "Try again ↗"
- `app/error.tsx:2` (StringLiteral): "text-link"
- `app/error.tsx:2` (StringLiteral): "/"
- `app/error.tsx:2` (JsxText): "Back to the lab →"
- `app/forms.tsx:1` (StringLiteral): "use client"
- `app/forms.tsx:2` (StringLiteral): "react"
- `app/forms.tsx:3` (StringLiteral): "lucide-react"
- `app/forms.tsx:4` (StringLiteral): "./auri"
- `app/forms.tsx:5` (StringLiteral): "@/lib/auri-guides"
- `app/forms.tsx:6` (StringLiteral): "./use-form-draft"
- `app/forms.tsx:7` (StringLiteral): "@/lib/validation"
- `app/forms.tsx:8` (StringLiteral): "@/lib/content"
- `app/forms.tsx:11` (StringLiteral): "Frontend development"
- `app/forms.tsx:11` (StringLiteral): "Backend development"
- `app/forms.tsx:11` (StringLiteral): "Mobile development"
- `app/forms.tsx:11` (StringLiteral): "UI/UX design"
- `app/forms.tsx:11` (StringLiteral): "DevOps & infrastructure"
- `app/forms.tsx:11` (StringLiteral): "Quality & accessibility"
- `app/forms.tsx:11` (StringLiteral): "Research & writing"
- `app/forms.tsx:11` (StringLiteral): "Community & support"
- `app/forms.tsx:12` (StringLiteral): "text"
- `app/forms.tsx:13` (StringLiteral): "data-auri"
- `app/forms.tsx:13` (StringLiteral): "aria-invalid"
- `app/forms.tsx:13` (StringLiteral): "aria-describedby"
- `app/forms.tsx:13` (StringLiteral): "-hint "
- `app/forms.tsx:13` (StringLiteral): "-auri"
- `app/forms.tsx:13` (StringLiteral): "email"
- `app/forms.tsx:13` (StringLiteral): "This email needs a name, @, and a domain—for example you@gmail.com."
- `app/forms.tsx:13` (StringLiteral): "error"
- `app/forms.tsx:14` (StringLiteral): "field "
- `app/forms.tsx:14` (StringLiteral): "span-two"
- `app/forms.tsx:14` (StringLiteral): "field-label-row"
- `app/forms.tsx:14` (JsxText): "Optional"
- `app/forms.tsx:14` (StringLiteral): "button"
- `app/forms.tsx:14` (StringLiteral): "field-help"
- `app/forms.tsx:14` (StringLiteral): "Help with "
- `app/forms.tsx:14` (JsxText): "Choose an option"
- `app/forms.tsx:14` (StringLiteral): "email"
- `app/forms.tsx:14` (StringLiteral): "name"
- `app/forms.tsx:14` (StringLiteral): "name"
- `app/forms.tsx:14` (StringLiteral): "email"
- `app/forms.tsx:14` (StringLiteral): "email"
- `app/forms.tsx:14` (StringLiteral): "field-error"
- `app/forms.tsx:14` (StringLiteral): "field-hint"
- `app/forms.tsx:14` (StringLiteral): "-hint"
- `app/forms.tsx:14` (StringLiteral): "-auri"
- `app/forms.tsx:16` (StringLiteral): "consent-area"
- `app/forms.tsx:16` (StringLiteral): "volunteer"
- `app/forms.tsx:16` (StringLiteral): "consent"
- `app/forms.tsx:16` (StringLiteral): "consent"
- `app/forms.tsx:16` (StringLiteral): "consent-field"
- `app/forms.tsx:16` (StringLiteral): "check-label"
- `app/forms.tsx:16` (StringLiteral): "checkbox"
- `app/forms.tsx:16` (StringLiteral): "-error "
- `app/forms.tsx:16` (StringLiteral): "-auri"
- `app/forms.tsx:16` (StringLiteral): "volunteer"
- `app/forms.tsx:16` (StringLiteral): "I understand this is an unpaid volunteer opportunity, and I can discuss my capacity with the team."
- `app/forms.tsx:16` (JsxText): "I agree that Aur Labs may use these details to review and respond to my submission, as described in the"
- `app/forms.tsx:16` (StringLiteral): "/privacy"
- `app/forms.tsx:16` (JsxText): "privacy notice"
- `app/forms.tsx:16` (JsxText): "."
- `app/forms.tsx:16` (StringLiteral): "-error"
- `app/forms.tsx:16` (StringLiteral): "-auri"
- `app/forms.tsx:16` (StringLiteral): "honey"
- `app/forms.tsx:16` (StringLiteral): "true"
- `app/forms.tsx:16` (JsxText): "Leave this empty"
- `app/forms.tsx:16` (StringLiteral): "website"
- `app/forms.tsx:16` (StringLiteral): "off"
- `app/forms.tsx:16` (StringLiteral): "website"
- `app/forms.tsx:17` (StringLiteral): "draft-notice"
- `app/forms.tsx:17` (StringLiteral): "green-dot"
- `app/forms.tsx:17` (StringLiteral): "Your draft is restored. Please review your answers and check consent again."
- `app/forms.tsx:17` (StringLiteral): "Draft kept in this tab for up to 24 hours."
- `app/forms.tsx:17` (StringLiteral): "Your answers stay here while this page is open."
- `app/forms.tsx:17` (StringLiteral): "checkbox"
- `app/forms.tsx:17` (JsxText): "Remember in this tab"
- `app/forms.tsx:17` (StringLiteral): "button"
- `app/forms.tsx:17` (StringLiteral): "Clear this draft and start again?"
- `app/forms.tsx:17` (JsxText): "Clear draft"
- `app/forms.tsx:19` (StringLiteral): "join"
- `app/forms.tsx:20` (StringLiteral): "role"
- `app/forms.tsx:20` (StringLiteral): "string"
- `app/forms.tsx:20` (StringLiteral): "role"
- `app/forms.tsx:21` (StringLiteral): "name"
- `app/forms.tsx:21` (StringLiteral): "email"
- `app/forms.tsx:21` (StringLiteral): "timezone"
- `app/forms.tsx:21` (StringLiteral): "portfolio"
- `app/forms.tsx:21` (StringLiteral): "role"
- `app/forms.tsx:21` (StringLiteral): "stack"
- `app/forms.tsx:21` (StringLiteral): "experience"
- `app/forms.tsx:21` (StringLiteral): "hours"
- `app/forms.tsx:21` (StringLiteral): "availability"
- `app/forms.tsx:21` (StringLiteral): "motivation"
- `app/forms.tsx:21` (StringLiteral): "problem"
- `app/forms.tsx:21` (StringLiteral): "collaboration"
- `app/forms.tsx:21` (StringLiteral): "volunteer"
- `app/forms.tsx:21` (StringLiteral): "consent"
- `app/forms.tsx:22` (StringLiteral): "join"
- `app/forms.tsx:22` (StringLiteral): "Required"
- `app/forms.tsx:22` (StringLiteral): "Please complete this field."
- `app/forms.tsx:22` (StringLiteral): "Invalid literal"
- `app/forms.tsx:22` (StringLiteral): "Please check this box to continue."
- `app/forms.tsx:22` (StringLiteral): " "
- `app/forms.tsx:22` (StringLiteral): "error"
- `app/forms.tsx:24` (StringLiteral): "join"
- `app/forms.tsx:24` (StringLiteral): "Your application is saved. The team can now review it in their inbox."
- `app/forms.tsx:24` (StringLiteral): "success"
- `app/forms.tsx:24` (StringLiteral): "TimeoutError"
- `app/forms.tsx:24` (StringLiteral): "The connection timed out. Your answers are still here; retry to confirm the same submission."
- `app/forms.tsx:24` (StringLiteral): "We couldn’t confirm your application yet. Your answers are still here. Please retry."
- `app/forms.tsx:24` (StringLiteral): "error"
- `app/forms.tsx:25` (StringLiteral): "success-card"
- `app/forms.tsx:25` (StringLiteral): "eyebrow"
- `app/forms.tsx:25` (JsxText): "APPLICATION RECEIVED"
- `app/forms.tsx:25` (JsxText): "You might be our"
- `app/forms.tsx:25` (JsxText): "next good thing."
- `app/forms.tsx:25` (JsxText): "Your application is saved for the Aur Labs team to review. We’ll use the email you provided if we’d like to follow up."
- `app/forms.tsx:25` (StringLiteral): "reference"
- `app/forms.tsx:25` (JsxText): "YOUR REFERENCE /"
- `app/forms.tsx:25` (StringLiteral): "button dark"
- `app/forms.tsx:25` (StringLiteral): "/products"
- `app/forms.tsx:25` (JsxText): "Explore the lab"
- `app/forms.tsx:26` (StringLiteral): "application-form"
- `app/forms.tsx:26` (StringLiteral): "form-progress"
- `app/forms.tsx:26` (StringLiteral): "A little about you"
- `app/forms.tsx:26` (StringLiteral): "Your craft & time"
- `app/forms.tsx:26` (StringLiteral): "Your perspective"
- `app/forms.tsx:26` (StringLiteral): "active"
- `app/forms.tsx:26` (StringLiteral): "step"
- `app/forms.tsx:26` (StringLiteral): "0"
- `app/forms.tsx:26` (StringLiteral): "form-step-title"
- `app/forms.tsx:26` (StringLiteral): "eyebrow"
- `app/forms.tsx:26` (JsxText): "STEP 0"
- `app/forms.tsx:26` (JsxText): "/ 03"
- `app/forms.tsx:26` (StringLiteral): "Let’s start with hello."
- `app/forms.tsx:26` (StringLiteral): "What do you love building?"
- `app/forms.tsx:26` (StringLiteral): "A little of how you think."
- `app/forms.tsx:26` (StringLiteral): "Just the essentials. No résumé required."
- `app/forms.tsx:26` (StringLiteral): "Be honest about your skills and the time you can give."
- `app/forms.tsx:26` (StringLiteral): "There are no trick questions. We want to hear your point of view."
- `app/forms.tsx:26` (StringLiteral): "fields-grid"
- `app/forms.tsx:26` (StringLiteral): "Your name"
- `app/forms.tsx:26` (StringLiteral): "name"
- `app/forms.tsx:26` (StringLiteral): "How should we call you?"
- `app/forms.tsx:26` (StringLiteral): "Email address"
- `app/forms.tsx:26` (StringLiteral): "email"
- `app/forms.tsx:26` (StringLiteral): "email"
- `app/forms.tsx:26` (StringLiteral): "you@example.com"
- `app/forms.tsx:26` (StringLiteral): "Timezone"
- `app/forms.tsx:26` (StringLiteral): "timezone"
- `app/forms.tsx:26` (StringLiteral): "Asia/Karachi (UTC+5)"
- `app/forms.tsx:26` (StringLiteral): "Portfolio, GitHub, or work link"
- `app/forms.tsx:26` (StringLiteral): "portfolio"
- `app/forms.tsx:26` (StringLiteral): "url"
- `app/forms.tsx:26` (StringLiteral): "https://…"
- `app/forms.tsx:26` (StringLiteral): "Where would you like to contribute?"
- `app/forms.tsx:26` (StringLiteral): "role"
- `app/forms.tsx:26` (StringLiteral): "Your experience"
- `app/forms.tsx:26` (StringLiteral): "experience"
- `app/forms.tsx:26` (StringLiteral): "Learning / first contribution"
- `app/forms.tsx:26` (StringLiteral): "Less than 1 year"
- `app/forms.tsx:26` (StringLiteral): "1–3 years"
- `app/forms.tsx:26` (StringLiteral): "3+ years"
- `app/forms.tsx:26` (StringLiteral): "Your stack, tools, or skills"
- `app/forms.tsx:26` (StringLiteral): "stack"
- `app/forms.tsx:26` (StringLiteral): "React, Python, Figma, technical writing…"
- `app/forms.tsx:26` (StringLiteral): "Weekly time you can offer"
- `app/forms.tsx:26` (StringLiteral): "hours"
- `app/forms.tsx:26` (StringLiteral): "1–3 hours"
- `app/forms.tsx:26` (StringLiteral): "4–7 hours"
- `app/forms.tsx:26` (StringLiteral): "8–15 hours"
- `app/forms.tsx:26` (StringLiteral): "16+ hours"
- `app/forms.tsx:26` (StringLiteral): "When are you usually available?"
- `app/forms.tsx:26` (StringLiteral): "availability"
- `app/forms.tsx:26` (StringLiteral): "For example: Tuesday and Thursday evenings, after 7 pm in my timezone."
- `app/forms.tsx:26` (StringLiteral): "Why would you like to join Aur Labs?"
- `app/forms.tsx:26` (StringLiteral): "motivation"
- `app/forms.tsx:26` (StringLiteral): "Tell us what connects you to the mission. At least 30 characters."
- `app/forms.tsx:26` (StringLiteral): "Tell us about a problem you solved—or one you’d love to solve."
- `app/forms.tsx:26` (StringLiteral): "problem"
- `app/forms.tsx:26` (StringLiteral): "What was the challenge? How did you approach it, or where would you start?"
- `app/forms.tsx:26` (StringLiteral): "How do you handle feedback or getting stuck?"
- `app/forms.tsx:26` (StringLiteral): "collaboration"
- `app/forms.tsx:26` (StringLiteral): "A small, real example is perfect. At least 20 characters."
- `app/forms.tsx:26` (StringLiteral): "alert"
- `app/forms.tsx:26` (StringLiteral): "form-error"
- `app/forms.tsx:26` (JsxText): "You can also reach us at"
- `app/forms.tsx:26` (StringLiteral): "mailto:"
- `app/forms.tsx:26` (JsxText): "."
- `app/forms.tsx:26` (StringLiteral): "form-actions"
- `app/forms.tsx:26` (StringLiteral): "button"
- `app/forms.tsx:26` (StringLiteral): "button text-button"
- `app/forms.tsx:26` (JsxText): "Back"
- `app/forms.tsx:26` (StringLiteral): "tiny muted"
- `app/forms.tsx:26` (JsxText): "About 5 minutes. A good place to start."
- `app/forms.tsx:26` (StringLiteral): "submit"
- `app/forms.tsx:26` (StringLiteral): "button orange"
- `app/forms.tsx:26` (StringLiteral): "Submit saves your application for the team to review. Please complete the consent boxes first."
- `app/forms.tsx:26` (StringLiteral): "Continue checks this step and takes you to the next part. Your answers stay here while you move between steps."
- `app/forms.tsx:26` (StringLiteral): "Sending…"
- `app/forms.tsx:26` (StringLiteral): "Send my application"
- `app/forms.tsx:26` (StringLiteral): "Continue"
- `app/forms.tsx:29` (StringLiteral): "contact"
- `app/forms.tsx:31` (StringLiteral): "contact"
- `app/forms.tsx:31` (StringLiteral): "Required"
- `app/forms.tsx:31` (StringLiteral): "Please complete this field."
- `app/forms.tsx:31` (StringLiteral): "Invalid literal"
- `app/forms.tsx:31` (StringLiteral): "Please check the consent box."
- `app/forms.tsx:31` (StringLiteral): " "
- `app/forms.tsx:31` (StringLiteral): "error"
- `app/forms.tsx:31` (StringLiteral): "Your message is saved. Thanks for starting a conversation."
- `app/forms.tsx:31` (StringLiteral): "success"
- `app/forms.tsx:31` (StringLiteral): "TimeoutError"
- `app/forms.tsx:31` (StringLiteral): "The connection timed out. Your answers are still here; retry to confirm the same submission."
- `app/forms.tsx:31` (StringLiteral): "Your message hasn’t been confirmed yet. Your answers are still here. Please retry."
- `app/forms.tsx:31` (StringLiteral): "error"
- `app/forms.tsx:32` (StringLiteral): "success-card"
- `app/forms.tsx:32` (JsxText): "You’ve started"
- `app/forms.tsx:32` (JsxText): "a conversation."
- `app/forms.tsx:32` (JsxText): "Your message is saved in our team’s inbox. We’ll review it and reply by email when we can."
- `app/forms.tsx:32` (StringLiteral): "reference"
- `app/forms.tsx:32` (JsxText): "YOUR REFERENCE /"
- `app/forms.tsx:32` (StringLiteral): "/"
- `app/forms.tsx:32` (StringLiteral): "button dark"
- `app/forms.tsx:32` (JsxText): "Back to the lab"
- `app/forms.tsx:33` (StringLiteral): "contact-form"
- `app/forms.tsx:33` (JsxText): "What’s on your mind?"
- `app/forms.tsx:33` (StringLiteral): "muted"
- `app/forms.tsx:33` (JsxText): "A real problem is a good place to begin."
- `app/forms.tsx:33` (StringLiteral): "fields-grid"
- `app/forms.tsx:33` (StringLiteral): "Your name"
- `app/forms.tsx:33` (StringLiteral): "name"
- `app/forms.tsx:33` (StringLiteral): "Your name"
- `app/forms.tsx:33` (StringLiteral): "Email address"
- `app/forms.tsx:33` (StringLiteral): "email"
- `app/forms.tsx:33` (StringLiteral): "email"
- `app/forms.tsx:33` (StringLiteral): "you@example.com"
- `app/forms.tsx:33` (StringLiteral): "How can we help?"
- `app/forms.tsx:33` (StringLiteral): "topic"
- `app/forms.tsx:33` (StringLiteral): "A problem to solve"
- `app/forms.tsx:33` (StringLiteral): "Product support"
- `app/forms.tsx:33` (StringLiteral): "Partnership"
- `app/forms.tsx:33` (StringLiteral): "Donation question"
- `app/forms.tsx:33` (StringLiteral): "Something else"
- `app/forms.tsx:33` (StringLiteral): "Subject"
- `app/forms.tsx:33` (StringLiteral): "subject"
- `app/forms.tsx:33` (StringLiteral): "A short description"
- `app/forms.tsx:33` (StringLiteral): "Related product"
- `app/forms.tsx:33` (StringLiteral): "product"
- `app/forms.tsx:33` (StringLiteral): "Operating system & version"
- `app/forms.tsx:33` (StringLiteral): "platform"
- `app/forms.tsx:33` (StringLiteral): "For example: Ubuntu 24.04, Android 15"
- `app/forms.tsx:33` (StringLiteral): "Tell us a little more"
- `app/forms.tsx:33` (StringLiteral): "message"
- `app/forms.tsx:33` (StringLiteral): "What are you trying to do? What’s getting in the way? If it’s a bug, include steps to reproduce it. Please don’t include passwords or sensitive information."
- `app/forms.tsx:33` (StringLiteral): "alert"
- `app/forms.tsx:33` (StringLiteral): "form-error"
- `app/forms.tsx:33` (JsxText): "Or email"
- `app/forms.tsx:33` (StringLiteral): "mailto:"
- `app/forms.tsx:33` (JsxText): "."
- `app/forms.tsx:33` (StringLiteral): "button orange"
- `app/forms.tsx:33` (StringLiteral): "Send message saves your note in our team’s inbox. We’ll use your email if we need to follow up."
- `app/forms.tsx:33` (StringLiteral): "Sending…"
- `app/forms.tsx:33` (StringLiteral): "Send your message"
- `app/forms.tsx:36` (StringLiteral): "once"
- `app/forms.tsx:36` (StringLiteral): "10"
- `app/forms.tsx:36` (StringLiteral): "custom"
- `app/forms.tsx:36` (StringLiteral): "monthly"
- `app/forms.tsx:37` (StringLiteral): "mailto:"
- `app/forms.tsx:37` (StringLiteral): "?subject="
- `app/forms.tsx:37` (StringLiteral): "Supporting Aur Labs"
- `app/forms.tsx:37` (StringLiteral): "&body="
- `app/forms.tsx:37` (StringLiteral): "monthly"
- `app/forms.tsx:37` (StringLiteral): " monthly"
- `app/forms.tsx:37` (StringLiteral): " as a one-time contribution"
- `app/forms.tsx:38` (StringLiteral): "donation-form"
- `app/forms.tsx:38` (StringLiteral): "eyebrow"
- `app/forms.tsx:38` (JsxText): "A LITTLE SUPPORT. A LOT OF POSSIBILITY."
- `app/forms.tsx:38` (JsxText): "Keep good things"
- `app/forms.tsx:38` (JsxText): "free."
- `app/forms.tsx:38` (StringLiteral): "segmented"
- `app/forms.tsx:38` (StringLiteral): "Contribution preference"
- `app/forms.tsx:38` (StringLiteral): "once"
- `app/forms.tsx:38` (StringLiteral): "selected"
- `app/forms.tsx:38` (StringLiteral): "once"
- `app/forms.tsx:38` (JsxText): "One time"
- `app/forms.tsx:38` (StringLiteral): "monthly"
- `app/forms.tsx:38` (StringLiteral): "selected"
- `app/forms.tsx:38` (StringLiteral): "monthly"
- `app/forms.tsx:38` (JsxText): "Monthly"
- `app/forms.tsx:38` (StringLiteral): "amount-grid"
- `app/forms.tsx:38` (StringLiteral): "5"
- `app/forms.tsx:38` (StringLiteral): "10"
- `app/forms.tsx:38` (StringLiteral): "25"
- `app/forms.tsx:38` (StringLiteral): "50"
- `app/forms.tsx:38` (StringLiteral): "100"
- `app/forms.tsx:38` (StringLiteral): "custom"
- `app/forms.tsx:38` (StringLiteral): "selected"
- `app/forms.tsx:38` (StringLiteral): "custom"
- `app/forms.tsx:38` (StringLiteral): "Other"
- `app/forms.tsx:38` (StringLiteral): "$"
- `app/forms.tsx:38` (StringLiteral): "custom"
- `app/forms.tsx:38` (StringLiteral): "field"
- `app/forms.tsx:38` (JsxText): "Your amount (USD)"
- `app/forms.tsx:38` (StringLiteral): "number"
- `app/forms.tsx:38` (StringLiteral): "1"
- `app/forms.tsx:38` (StringLiteral): "100000"
- `app/forms.tsx:38` (StringLiteral): "0.01"
- `app/forms.tsx:38` (StringLiteral): "Enter an amount"
- `app/forms.tsx:38` (StringLiteral): "tiny muted"
- `app/forms.tsx:38` (JsxText): "USD · Your suggested contribution,"
- `app/forms.tsx:38` (StringLiteral): "monthly"
- `app/forms.tsx:38` (StringLiteral): "every month"
- `app/forms.tsx:38` (StringLiteral): "one time"
- `app/forms.tsx:38` (JsxText): "."
- `app/forms.tsx:38` (StringLiteral): "Choose and confirm the final amount on the provider’s page."
- `app/forms.tsx:38` (StringLiteral): "No payment is taken here."
- `app/forms.tsx:38` (StringLiteral): "button orange full"
- `app/forms.tsx:38` (StringLiteral): "_blank"
- `app/forms.tsx:38` (StringLiteral): "noopener noreferrer"
- `app/forms.tsx:38` (StringLiteral): "This opens the configured donation provider. Confirm the amount, currency, and frequency there. Aur Labs doesn’t collect card details on this website."
- `app/forms.tsx:38` (StringLiteral): "This opens an email to arrange your contribution. It is not a payment or a recurring subscription."
- `app/forms.tsx:38` (StringLiteral): "Continue to "
- `app/forms.tsx:38` (StringLiteral): "Arrange a contribution"
- `app/forms.tsx:38` (StringLiteral): "button orange full"
- `app/forms.tsx:38` (StringLiteral): "Please choose an amount between $1 and $100,000. For example, enter 10 for a $10 contribution."
- `app/forms.tsx:38` (JsxText): "Choose a valid amount"
- `app/forms.tsx:38` (StringLiteral): "donation-note"
- `app/forms.tsx:38` (StringLiteral): "Your payment is handled by the external provider. Check its terms and receipt details before contributing."
- `app/forms.tsx:38` (StringLiteral): "Donation channels are being set up. Send us a note and we’ll discuss the details with you."
- `app/forms.tsx:38` (StringLiteral): "tiny muted"
- `app/forms.tsx:38` (JsxText): "Want to contribute your skills instead?"
- `app/forms.tsx:38` (StringLiteral): "/join"
- `app/forms.tsx:38` (JsxText): "Join the team ↗"
- `app/lab-workbench.tsx:1` (StringLiteral): "use client"
- `app/lab-workbench.tsx:2` (StringLiteral): "react"
- `app/lab-workbench.tsx:3` (StringLiteral): "lucide-react"
- `app/lab-workbench.tsx:4` (StringLiteral): "@/lib/content"
- `app/lab-workbench.tsx:5` (StringLiteral): "@/lib/content"
- `app/lab-workbench.tsx:6` (StringLiteral): "./visuals"
- `app/lab-workbench.tsx:9` (StringLiteral): "lab-workbench"
- `app/lab-workbench.tsx:9` (StringLiteral): "eyebrow"
- `app/lab-workbench.tsx:9` (JsxText): "INSIDE AUR LABS"
- `app/lab-workbench.tsx:9` (JsxText): "Room for the next good idea."
- `app/lab-workbench.tsx:9` (StringLiteral): "/contact"
- `app/lab-workbench.tsx:9` (StringLiteral): "button orange"
- `app/lab-workbench.tsx:9` (JsxText): "Share an idea"
- `app/lab-workbench.tsx:10` (StringLiteral): "lab-workbench"
- `app/lab-workbench.tsx:10` (StringLiteral): "workbench-toolbar"
- `app/lab-workbench.tsx:10` (JsxText): "AUR / WORKSPACE"
- `app/lab-workbench.tsx:10` (StringLiteral): "green-dot"
- `app/lab-workbench.tsx:10` (JsxText): "OPEN POSSIBILITIES"
- `app/lab-workbench.tsx:10` (StringLiteral): "workbench-tabs"
- `app/lab-workbench.tsx:10` (StringLiteral): "group"
- `app/lab-workbench.tsx:10` (StringLiteral): "Explore featured product concepts"
- `app/lab-workbench.tsx:10` (StringLiteral): "cli"
- `app/lab-workbench.tsx:10` (StringLiteral): "app"
- `app/lab-workbench.tsx:10` (StringLiteral): "selected"
- `app/lab-workbench.tsx:10` (StringLiteral): "workbench-preview"
- `app/lab-workbench.tsx:10` (StringLiteral): "workbench-summary"
- `app/lab-workbench.tsx:10` (StringLiteral): "eyebrow"
- `app/lab-workbench.tsx:10` (StringLiteral): "/products/"
- `app/lab-workbench.tsx:10` (StringLiteral): "Explore "
- `app/lab-workbench.tsx:10` (StringLiteral): "workbench-foot"
- `app/lab-workbench.tsx:10` (JsxText): "Thoughtful by design."
- `app/lab-workbench.tsx:10` (JsxText): "Free by purpose. ↗"
- `app/lab-workbench.tsx:10` (StringLiteral): "workbench-caption"
- `app/lab-workbench.tsx:10` (JsxText): "A SMALL LOOK AT WHAT’S NEXT"
- `app/layout.tsx:1` (StringLiteral): "next"
- `app/layout.tsx:2` (StringLiteral): "./globals.css"
- `app/layout.tsx:5` (StringLiteral): "https://aur-labs.warmkid256.chatgpt.site"
- `app/layout.tsx:6` (StringLiteral): "Aur Labs — Good software. For everyone."
- `app/layout.tsx:7` (StringLiteral): "An independent, non-profit software lab building useful free tools for people everywhere. Explore our work, join the team, or share a problem worth solving."
- `app/layout.tsx:8` (StringLiteral): "Aur Labs — Good software. For everyone."
- `app/layout.tsx:8` (StringLiteral): "Useful tools. Thoughtful design. Zero price tags."
- `app/layout.tsx:8` (StringLiteral): "website"
- `app/layout.tsx:8` (StringLiteral): "/assets/aur-sculpture.png"
- `app/layout.tsx:8` (StringLiteral): "Aur Labs chrome sculpture"
- `app/layout.tsx:10` (StringLiteral): "/favicon.svg"
- `app/layout.tsx:11` (StringLiteral): "/favicon.svg"
- `app/layout.tsx:21` (StringLiteral): "en"
- `app/layout.tsx:22` (StringLiteral): "antialiased"
- `app/not-found.tsx:1` (StringLiteral): "not-found"
- `app/not-found.tsx:1` (StringLiteral): "eyebrow"
- `app/not-found.tsx:1` (JsxText): "404 / A LITTLE OFF THE PATH"
- `app/not-found.tsx:1` (JsxText): "This corner of"
- `app/not-found.tsx:1` (JsxText): "the lab is empty."
- `app/not-found.tsx:1` (JsxText): "The page may have moved, or the link may need a second look."
- `app/not-found.tsx:1` (StringLiteral): "button orange"
- `app/not-found.tsx:1` (StringLiteral): "/"
- `app/not-found.tsx:1` (JsxText): "Back to the lab ↗"
- `app/not-found.tsx:1` (StringLiteral): "/products"
- `app/not-found.tsx:1` (StringLiteral): "text-link"
- `app/not-found.tsx:1` (JsxText): "Explore our tools →"
- `app/site.tsx:1` (StringLiteral): "use client"
- `app/site.tsx:2` (StringLiteral): "react"
- `app/site.tsx:3` (StringLiteral): "lucide-react"
- `app/site.tsx:4` (StringLiteral): "@/lib/content"
- `app/site.tsx:5` (StringLiteral): "./visuals"
- `app/site.tsx:6` (StringLiteral): "./auri"
- `app/site.tsx:7` (StringLiteral): "./forms"
- `app/site.tsx:8` (StringLiteral): "./admin"
- `app/site.tsx:9` (StringLiteral): "./lab-workbench"
- `app/site.tsx:11` (StringLiteral): "Products"
- `app/site.tsx:11` (StringLiteral): "/products"
- `app/site.tsx:11` (StringLiteral): "About us"
- `app/site.tsx:11` (StringLiteral): "/about"
- `app/site.tsx:11` (StringLiteral): "Journal"
- `app/site.tsx:11` (StringLiteral): "/journal"
- `app/site.tsx:11` (StringLiteral): "Research"
- `app/site.tsx:11` (StringLiteral): "/research"
- `app/site.tsx:11` (StringLiteral): "Join us"
- `app/site.tsx:11` (StringLiteral): "/join"
- `app/site.tsx:12` (StringLiteral): "button "
- `app/site.tsx:12` (StringLiteral): "orange"
- `app/site.tsx:12` (StringLiteral): "light"
- `app/site.tsx:12` (StringLiteral): "dark"
- `app/site.tsx:13` (StringLiteral): "eyebrow"
- `app/site.tsx:13` (StringLiteral): "orange-dot"
- `app/site.tsx:14` (StringLiteral): "Escape"
- `app/site.tsx:14` (StringLiteral): "keydown"
- `app/site.tsx:14` (StringLiteral): "pointerdown"
- `app/site.tsx:14` (StringLiteral): "keydown"
- `app/site.tsx:14` (StringLiteral): "pointerdown"
- `app/site.tsx:14` (StringLiteral): "site-header"
- `app/site.tsx:14` (StringLiteral): "header-inner"
- `app/site.tsx:14` (StringLiteral): "/"
- `app/site.tsx:14` (StringLiteral): "brand"
- `app/site.tsx:14` (StringLiteral): " home"
- `app/site.tsx:14` (JsxText): "INDEPENDENT SOFTWARE LAB"
- `app/site.tsx:14` (StringLiteral): "main-navigation"
- `app/site.tsx:14` (StringLiteral): "Main navigation"
- `app/site.tsx:14` (StringLiteral): "nav-open"
- `app/site.tsx:14` (StringLiteral): "active"
- `app/site.tsx:14` (StringLiteral): "page"
- `app/site.tsx:14` (StringLiteral): "Join us"
- `app/site.tsx:14` (StringLiteral): "nav-dot"
- `app/site.tsx:14` (StringLiteral): "header-support"
- `app/site.tsx:14` (StringLiteral): "/support"
- `app/site.tsx:14` (StringLiteral): "Explore ways to support free software. Selecting a contribution doesn’t charge you."
- `app/site.tsx:14` (JsxText): "Support the mission"
- `app/site.tsx:14` (StringLiteral): "mobile-menu icon-button"
- `app/site.tsx:14` (StringLiteral): "main-navigation"
- `app/site.tsx:14` (StringLiteral): "Close navigation"
- `app/site.tsx:14` (StringLiteral): "Open navigation"
- `app/site.tsx:15` (StringLiteral): "site-footer"
- `app/site.tsx:15` (StringLiteral): "footer-top"
- `app/site.tsx:15` (StringLiteral): "/"
- `app/site.tsx:15` (StringLiteral): "brand"
- `app/site.tsx:15` (JsxText): "Independent minds."
- `app/site.tsx:15` (JsxText): "A shared belief in better."
- `app/site.tsx:15` (StringLiteral): "footer-email"
- `app/site.tsx:15` (StringLiteral): "mailto:"
- `app/site.tsx:15` (JsxText): "Explore the lab"
- `app/site.tsx:15` (StringLiteral): "/products"
- `app/site.tsx:15` (JsxText): "Our products"
- `app/site.tsx:15` (StringLiteral): "/about"
- `app/site.tsx:15` (JsxText): "Our story"
- `app/site.tsx:15` (StringLiteral): "/journal"
- `app/site.tsx:15` (JsxText): "Journal"
- `app/site.tsx:15` (StringLiteral): "/research"
- `app/site.tsx:15` (JsxText): "Research"
- `app/site.tsx:15` (JsxText): "Be part of it"
- `app/site.tsx:15` (StringLiteral): "/join"
- `app/site.tsx:15` (JsxText): "Join the team"
- `app/site.tsx:15` (StringLiteral): "nav-dot"
- `app/site.tsx:15` (StringLiteral): "/support"
- `app/site.tsx:15` (JsxText): "Support our work"
- `app/site.tsx:15` (StringLiteral): "/contact"
- `app/site.tsx:15` (JsxText): "Share a problem"
- `app/site.tsx:15` (StringLiteral): "_blank"
- `app/site.tsx:15` (StringLiteral): "noopener noreferrer"
- `app/site.tsx:15` (JsxText): "GitHub ↗"
- `app/site.tsx:15` (StringLiteral): "/contact"
- `app/site.tsx:15` (JsxText): "Get in touch"
- `app/site.tsx:15` (StringLiteral): "footer-callout"
- `app/site.tsx:15` (JsxText): "Free tools."
- `app/site.tsx:15` (JsxText): "Bigger possibilities."
- `app/site.tsx:15` (StringLiteral): "footer-bottom"
- `app/site.tsx:15` (JsxText): "©"
- `app/site.tsx:15` (JsxText): "."
- `app/site.tsx:15` (StringLiteral): "/privacy"
- `app/site.tsx:15` (JsxText): "Privacy"
- `app/site.tsx:15` (StringLiteral): "/terms"
- `app/site.tsx:15` (JsxText): "Terms"
- `app/site.tsx:15` (StringLiteral): "/admin"
- `app/site.tsx:15` (JsxText): "Admin"
- `app/site.tsx:15` (StringLiteral): "footer-online"
- `app/site.tsx:15` (StringLiteral): "green-dot"
- `app/site.tsx:15` (JsxText): "A little good on the internet"
- `app/site.tsx:16` (StringLiteral): "product-card"
- `app/site.tsx:16` (StringLiteral): "/products/"
- `app/site.tsx:16` (StringLiteral): "product-image-link"
- `app/site.tsx:16` (StringLiteral): "Explore "
- `app/site.tsx:16` (StringLiteral): "card-corner"
- `app/site.tsx:16` (StringLiteral): "product-card-top"
- `app/site.tsx:16` (StringLiteral): "status-pill "
- `app/site.tsx:16` (StringLiteral): "product-name"
- `app/site.tsx:16` (StringLiteral): "/products/"
- `app/site.tsx:16` (StringLiteral): "platform-labels"
- `app/site.tsx:16` (StringLiteral): "product-free"
- `app/site.tsx:16` (StringLiteral): "released"
- `app/site.tsx:16` (StringLiteral): "Free"
- `app/site.tsx:16` (StringLiteral): "Preview"
- `app/site.tsx:17` (StringLiteral): "mission-strip"
- `app/site.tsx:17` (JsxText): "Free by purpose"
- `app/site.tsx:17` (JsxText): "Built for everyone"
- `app/site.tsx:17` (JsxText): "Ideas into useful things"
- `app/site.tsx:17` (JsxText): "People before profit"
- `app/site.tsx:19` (StringLiteral): "hero section-wrap"
- `app/site.tsx:19` (StringLiteral): "hero-copy"
- `app/site.tsx:19` (StringLiteral): "hero-kicker"
- `app/site.tsx:19` (StringLiteral): "green-dot"
- `app/site.tsx:19` (JsxText): "AN INDEPENDENT, NON-PROFIT SOFTWARE LAB"
- `app/site.tsx:19` (StringLiteral): "hero-star"
- `app/site.tsx:19` (StringLiteral): "hero-actions"
- `app/site.tsx:19` (StringLiteral): "/products"
- `app/site.tsx:19` (StringLiteral): "Browse the catalogue, filter by operating system, and open a product to see its release status and download options."
- `app/site.tsx:19` (JsxText): "Explore our tools"
- `app/site.tsx:19` (StringLiteral): "text-link"
- `app/site.tsx:19` (StringLiteral): "/about"
- `app/site.tsx:19` (JsxText): "Meet the lab"
- `app/site.tsx:19` (StringLiteral): "hero-note"
- `app/site.tsx:19` (StringLiteral): "small-orbit"
- `app/site.tsx:19` (JsxText): "a"
- `app/site.tsx:19` (JsxText): "Small team. Big possibilities."
- `app/site.tsx:19` (JsxText): "Built with care, for people everywhere."
- `app/site.tsx:21` (StringLiteral): "section-wrap featured-section"
- `app/site.tsx:21` (StringLiteral): "section-heading"
- `app/site.tsx:21` (JsxText): "THINGS WE’RE BUILDING"
- `app/site.tsx:21` (JsxText): "A little code."
- `app/site.tsx:21` (JsxText): "A lot of possibility."
- `app/site.tsx:21` (StringLiteral): "section-heading-right"
- `app/site.tsx:21` (JsxText): "Thoughtful tools for everyday challenges."
- `app/site.tsx:21` (JsxText): "Explore what’s taking shape in the lab."
- `app/site.tsx:21` (StringLiteral): "/products"
- `app/site.tsx:21` (StringLiteral): "text-link"
- `app/site.tsx:21` (JsxText): "Explore all products"
- `app/site.tsx:21` (StringLiteral): "product-grid"
- `app/site.tsx:21` (StringLiteral): "catalogue-note"
- `app/site.tsx:21` (StringLiteral): "orange-dot"
- `app/site.tsx:21` (JsxText): "The lab is just getting started. Concept previews show ideas in progress, not released software."
- `app/site.tsx:22` (StringLiteral): "mission-section"
- `app/site.tsx:22` (StringLiteral): "section-wrap mission-layout"
- `app/site.tsx:22` (StringLiteral): "mission-art"
- `app/site.tsx:22` (StringLiteral): "true"
- `app/site.tsx:22` (StringLiteral): "mission-planet"
- `app/site.tsx:22` (StringLiteral): "planet-grid"
- `app/site.tsx:22` (StringLiteral): "planet-label"
- `app/site.tsx:22` (JsxText): "FOR EVERY"
- `app/site.tsx:22` (JsxText): "ONE OF US."
- `app/site.tsx:22` (StringLiteral): "mission-orbit-text"
- `app/site.tsx:22` (JsxText): "GOOD IDEAS HAVE NO BORDERS ↗"
- `app/site.tsx:22` (StringLiteral): "mission-chip"
- `app/site.tsx:22` (JsxText): "Human at the core."
- `app/site.tsx:22` (StringLiteral): "mission-copy"
- `app/site.tsx:22` (JsxText): "MORE THAN SOFTWARE"
- `app/site.tsx:22` (JsxText): "We’re a small team turning real-world problems into useful, free tools. No big promises. Just curious people, thoughtful work, and a belief that technology can do a little more good."
- `app/site.tsx:22` (StringLiteral): "/about"
- `app/site.tsx:22` (StringLiteral): "text-link"
- `app/site.tsx:22` (JsxText): "The people & purpose behind Aur"
- `app/site.tsx:22` (StringLiteral): "mission-values"
- `app/site.tsx:22` (JsxText): "01 /"
- `app/site.tsx:22` (JsxText): "Purpose before profit"
- `app/site.tsx:22` (JsxText): "02 /"
- `app/site.tsx:22` (JsxText): "Access without barriers"
- `app/site.tsx:22` (JsxText): "03 /"
- `app/site.tsx:22` (JsxText): "Better, together"
- `app/site.tsx:23` (StringLiteral): "section-wrap journal-section"
- `app/site.tsx:23` (StringLiteral): "section-heading"
- `app/site.tsx:23` (JsxText): "NOTES FROM THE LAB"
- `app/site.tsx:23` (JsxText): "Always curious."
- `app/site.tsx:23` (JsxText): "Always making."
- `app/site.tsx:23` (StringLiteral): "text-link"
- `app/site.tsx:23` (StringLiteral): "/journal"
- `app/site.tsx:23` (JsxText): "Inside the journal"
- `app/site.tsx:23` (StringLiteral): "journal-home-grid"
- `app/site.tsx:24` (StringLiteral): "section-wrap invitation-wrap"
- `app/site.tsx:24` (StringLiteral): "invitation"
- `app/site.tsx:24` (JsxText): "THERE’S ROOM FOR YOU HERE"
- `app/site.tsx:24` (JsxText): "Good things start"
- `app/site.tsx:24` (JsxText): "with good people."
- `app/site.tsx:24` (JsxText): "Bring your curiosity, your craft, or a problem worth solving."
- `app/site.tsx:24` (JsxText): "Let’s make something that matters."
- `app/site.tsx:24` (StringLiteral): "hero-actions"
- `app/site.tsx:24` (StringLiteral): "/join"
- `app/site.tsx:24` (JsxText): "Build with us"
- `app/site.tsx:24` (StringLiteral): "text-link"
- `app/site.tsx:24` (StringLiteral): "/contact"
- `app/site.tsx:24` (JsxText): "Tell us your idea"
- `app/site.tsx:24` (StringLiteral): "invitation-art"
- `app/site.tsx:24` (JsxText): "YOUR NEXT"
- `app/site.tsx:24` (JsxText): "GOOD THING"
- `app/site.tsx:24` (JsxText): "STARTS HERE."
- `app/site.tsx:25` (StringLiteral): "support-strip section-wrap"
- `app/site.tsx:25` (JsxText): "Free software needs a little support."
- `app/site.tsx:25` (JsxText): "Help us keep useful things free and the lab moving forward."
- `app/site.tsx:25` (StringLiteral): "/support"
- `app/site.tsx:25` (StringLiteral): "text-link"
- `app/site.tsx:25` (JsxText): "Fuel the mission"
- `app/site.tsx:27` (StringLiteral): "page-intro section-wrap"
- `app/site.tsx:27` (StringLiteral): "page-intro-row"
- `app/site.tsx:27` (StringLiteral): "page-star"
- `app/site.tsx:28` (StringLiteral): "pagination"
- `app/site.tsx:28` (StringLiteral): "Result pages"
- `app/site.tsx:28` (JsxText): "Previous"
- `app/site.tsx:28` (StringLiteral): "polite"
- `app/site.tsx:28` (JsxText): "/"
- `app/site.tsx:28` (JsxText): "Next"
- `app/site.tsx:30` (StringLiteral): "all"
- `app/site.tsx:30` (StringLiteral): "All platforms"
- `app/site.tsx:30` (StringLiteral): "featured"
- `app/site.tsx:32` (StringLiteral): "all"
- `app/site.tsx:32` (StringLiteral): "All platforms"
- `app/site.tsx:32` (StringLiteral): " "
- `app/site.tsx:32` (StringLiteral): "az"
- `app/site.tsx:32` (StringLiteral): "available"
- `app/site.tsx:32` (StringLiteral): "released"
- `app/site.tsx:32` (StringLiteral): "released"
- `app/site.tsx:33` (StringLiteral): "THE AUR COLLECTION"
- `app/site.tsx:33` (JsxText): "Your next useful"
- `app/site.tsx:33` (JsxText): "little thing."
- `app/site.tsx:33` (StringLiteral): "Software, apps, and command-line tools. Made with care, built around real needs, and free when released."
- `app/site.tsx:33` (StringLiteral): "section-wrap catalogue"
- `app/site.tsx:33` (StringLiteral): "catalogue-toolbar"
- `app/site.tsx:33` (StringLiteral): "category-tabs"
- `app/site.tsx:33` (StringLiteral): "group"
- `app/site.tsx:33` (StringLiteral): "Product category"
- `app/site.tsx:33` (StringLiteral): "all"
- `app/site.tsx:33` (StringLiteral): "All tools"
- `app/site.tsx:33` (StringLiteral): "software"
- `app/site.tsx:33` (StringLiteral): "Desktop"
- `app/site.tsx:33` (StringLiteral): "app"
- `app/site.tsx:33` (StringLiteral): "Mobile"
- `app/site.tsx:33` (StringLiteral): "cli"
- `app/site.tsx:33` (StringLiteral): "CLI"
- `app/site.tsx:33` (StringLiteral): "active"
- `app/site.tsx:33` (StringLiteral): "search-box"
- `app/site.tsx:33` (StringLiteral): "Search products"
- `app/site.tsx:33` (StringLiteral): "Find your next tool…"
- `app/site.tsx:33` (StringLiteral): "Clear search"
- `app/site.tsx:33` (StringLiteral): "platform-filters"
- `app/site.tsx:33` (StringLiteral): "group"
- `app/site.tsx:33` (StringLiteral): "Filter operating system"
- `app/site.tsx:33` (StringLiteral): "All platforms"
- `app/site.tsx:33` (StringLiteral): "selected"
- `app/site.tsx:33` (StringLiteral): "Linux"
- `app/site.tsx:33` (StringLiteral): "Show tools targeting Linux. Check individual releases for the exact distribution, architecture, and requirements."
- `app/site.tsx:33` (StringLiteral): "Show products for "
- `app/site.tsx:33` (StringLiteral): ". Concept targets are not confirmed compatibility."
- `app/site.tsx:33` (StringLiteral): "results-bar"
- `app/site.tsx:33` (StringLiteral): "polite"
- `app/site.tsx:33` (StringLiteral): "tool"
- `app/site.tsx:33` (StringLiteral): "tools"
- `app/site.tsx:33` (JsxText): "to explore"
- `app/site.tsx:33` (StringLiteral): "all"
- `app/site.tsx:33` (StringLiteral): "All platforms"
- `app/site.tsx:33` (StringLiteral): "filter-reset"
- `app/site.tsx:33` (StringLiteral): "all"
- `app/site.tsx:33` (StringLiteral): "All platforms"
- `app/site.tsx:33` (StringLiteral): "featured"
- `app/site.tsx:33` (JsxText): "Clear filters"
- `app/site.tsx:33` (JsxText): "Sort by"
- `app/site.tsx:33` (StringLiteral): "featured"
- `app/site.tsx:33` (JsxText): "Featured"
- `app/site.tsx:33` (StringLiteral): "az"
- `app/site.tsx:33` (JsxText): "Name: A–Z"
- `app/site.tsx:33` (StringLiteral): "available"
- `app/site.tsx:33` (JsxText): "Available first"
- `app/site.tsx:33` (StringLiteral): "product-grid catalogue-grid"
- `app/site.tsx:33` (StringLiteral): "empty-state"
- `app/site.tsx:33` (JsxText): "No tools in this corner. Yet."
- `app/site.tsx:33` (JsxText): "Try another platform or a shorter search."
- `app/site.tsx:33` (StringLiteral): "button dark"
- `app/site.tsx:33` (StringLiteral): "all"
- `app/site.tsx:33` (StringLiteral): "All platforms"
- `app/site.tsx:33` (JsxText): "Reset filters"
- `app/site.tsx:33` (StringLiteral): "info-banner"
- `app/site.tsx:33` (JsxText): "A quick note from the lab."
- `app/site.tsx:33` (JsxText): "Concept previews are illustrative ideas. Available releases will include version numbers, verified platform requirements, and real download links."
- `app/site.tsx:33` (StringLiteral): "inline-cta"
- `app/site.tsx:33` (JsxText): "Don’t see the thing you need?"
- `app/site.tsx:33` (JsxText): "That might be where our next idea begins."
- `app/site.tsx:33` (StringLiteral): "/contact"
- `app/site.tsx:33` (JsxText): "Share your problem"
- `app/site.tsx:36` (StringLiteral): "overview"
- `app/site.tsx:36` (StringLiteral): "all"
- `app/site.tsx:37` (StringLiteral): "all"
- `app/site.tsx:38` (StringLiteral): "Android"
- `app/site.tsx:38` (StringLiteral): "iOS"
- `app/site.tsx:38` (StringLiteral): "macOS"
- `app/site.tsx:38` (StringLiteral): "Windows"
- `app/site.tsx:38` (StringLiteral): "Linux"
- `app/site.tsx:39` (StringLiteral): "all"
- `app/site.tsx:40` (StringLiteral): "Clipboard access is unavailable. You can select and copy the checksum directly."
- `app/site.tsx:41` (StringLiteral): "section-wrap detail-breadcrumb"
- `app/site.tsx:41` (StringLiteral): "/products"
- `app/site.tsx:41` (JsxText): "All products"
- `app/site.tsx:41` (StringLiteral): "section-wrap product-detail-hero"
- `app/site.tsx:41` (StringLiteral): "status-pill "
- `app/site.tsx:41` (StringLiteral): "released"
- `app/site.tsx:41` (StringLiteral): "A free tool from Aur Labs. Choose your platform below to see available releases."
- `app/site.tsx:41` (StringLiteral): "An idea taking shape in the lab. Explore the concept and tell us what would make it useful to you."
- `app/site.tsx:41` (StringLiteral): "platform-labels"
- `app/site.tsx:41` (StringLiteral): "hero-actions"
- `app/site.tsx:41` (StringLiteral): "released"
- `app/site.tsx:41` (StringLiteral): "button orange"
- `app/site.tsx:41` (StringLiteral): "releases"
- `app/site.tsx:41` (StringLiteral): "product-details"
- `app/site.tsx:41` (StringLiteral): "smooth"
- `app/site.tsx:41` (JsxText): "Get it for free"
- `app/site.tsx:41` (StringLiteral): "/contact"
- `app/site.tsx:41` (JsxText): "Share your feedback"
- `app/site.tsx:41` (StringLiteral): "text-link"
- `app/site.tsx:41` (StringLiteral): "_blank"
- `app/site.tsx:41` (StringLiteral): "noopener noreferrer"
- `app/site.tsx:41` (JsxText): "Source repository"
- `app/site.tsx:41` (StringLiteral): "detail-showcase"
- `app/site.tsx:41` (StringLiteral): "screenshot-main"
- `app/site.tsx:41` (StringLiteral): "Enlarge screenshot"
- `app/site.tsx:41` (StringLiteral): " screenshot "
- `app/site.tsx:41` (JsxText): "Explore screenshot"
- `app/site.tsx:41` (StringLiteral): "screenshot-thumbs"
- `app/site.tsx:41` (StringLiteral): "active"
- `app/site.tsx:41` (StringLiteral): "View screenshot "
- `app/site.tsx:41` (StringLiteral): "lightbox"
- `app/site.tsx:41` (StringLiteral): "lightbox-close icon-button"
- `app/site.tsx:41` (StringLiteral): "Close screenshot"
- `app/site.tsx:41` (StringLiteral): " screenshot "
- `app/site.tsx:41` (StringLiteral): "lightbox-controls"
- `app/site.tsx:41` (StringLiteral): "Previous screenshot"
- `app/site.tsx:41` (JsxText): "/"
- `app/site.tsx:41` (StringLiteral): "Next screenshot"
- `app/site.tsx:41` (StringLiteral): "section-wrap detail-content"
- `app/site.tsx:41` (StringLiteral): "product-details"
- `app/site.tsx:41` (StringLiteral): "category-tabs"
- `app/site.tsx:41` (StringLiteral): "group"
- `app/site.tsx:41` (StringLiteral): "Product information"
- `app/site.tsx:41` (StringLiteral): "overview"
- `app/site.tsx:41` (StringLiteral): "Overview"
- `app/site.tsx:41` (StringLiteral): "releases"
- `app/site.tsx:41` (StringLiteral): "Releases & downloads"
- `app/site.tsx:41` (StringLiteral): "active"
- `app/site.tsx:41` (StringLiteral): "overview"
- `app/site.tsx:41` (StringLiteral): "detail-columns"
- `app/site.tsx:41` (StringLiteral): "prose"
- `app/site.tsx:41` (JsxText): "THE IDEA"
- `app/site.tsx:41` (JsxText): "A small tool."
- `app/site.tsx:41` (JsxText): "A thoughtful purpose."
- `app/site.tsx:41` (StringLiteral): "\n\n"
- `app/site.tsx:41` (StringLiteral): "feature-panel"
- `app/site.tsx:41` (StringLiteral): "released"
- `app/site.tsx:41` (StringLiteral): "What’s inside"
- `app/site.tsx:41` (StringLiteral): "The proposed direction"
- `app/site.tsx:41` (StringLiteral): "license-note"
- `app/site.tsx:41` (JsxText): "License"
- `app/site.tsx:41` (StringLiteral): "releases-panel"
- `app/site.tsx:41` (JsxText): "The right build for you."
- `app/site.tsx:41` (StringLiteral): "muted"
- `app/site.tsx:41` (JsxText): "Always check the operating system, architecture, and requirements before downloading."
- `app/site.tsx:41` (StringLiteral): "platform-filters"
- `app/site.tsx:41` (StringLiteral): "selected"
- `app/site.tsx:41` (StringLiteral): "release-version"
- `app/site.tsx:41` (JsxText): "Version"
- `app/site.tsx:41` (StringLiteral): "all"
- `app/site.tsx:41` (JsxText): "All versions"
- `app/site.tsx:41` (StringLiteral): "release-row"
- `app/site.tsx:41` (StringLiteral): "eyebrow"
- `app/site.tsx:41` (JsxText): "/"
- `app/site.tsx:41` (JsxText): "Version"
- `app/site.tsx:41` (StringLiteral): "tiny muted"
- `app/site.tsx:41` (JsxText): "Released"
- `app/site.tsx:41` (StringLiteral): "checksum"
- `app/site.tsx:41` (StringLiteral): "Copied SHA-256"
- `app/site.tsx:41` (StringLiteral): "button dark"
- `app/site.tsx:41` (StringLiteral): "_blank"
- `app/site.tsx:41` (StringLiteral): "noopener noreferrer"
- `app/site.tsx:41` (StringLiteral): "This opens the release’s download URL. Check the listed platform and architecture. If a SHA-256 checksum is provided, use it to verify the downloaded file."
- `app/site.tsx:41` (JsxText): "Download free"
- `app/site.tsx:41` (StringLiteral): "empty-state compact"
- `app/site.tsx:41` (JsxText): "No"
- `app/site.tsx:41` (JsxText): "release yet."
- `app/site.tsx:41` (StringLiteral): "concept"
- `app/site.tsx:41` (StringLiteral): "This product is a design concept. No download or installation command is available."
- `app/site.tsx:41` (StringLiteral): "We’ll list a release here when one is available."
- `app/site.tsx:41` (StringLiteral): "text-link"
- `app/site.tsx:41` (StringLiteral): "/contact"
- `app/site.tsx:41` (JsxText): "Ask the team"
- `app/site.tsx:43` (StringLiteral): "SMALL TEAM. SHARED PURPOSE."
- `app/site.tsx:43` (JsxText): "Built by people."
- `app/site.tsx:43` (JsxText): "For people."
- `app/site.tsx:43` (StringLiteral): "A software lab with a simple belief: useful technology should be within everyone’s reach."
- `app/site.tsx:43` (StringLiteral): "section-wrap about-manifesto"
- `app/site.tsx:43` (StringLiteral): "huge-a"
- `app/site.tsx:43` (StringLiteral): "true"
- `app/site.tsx:43` (JsxText): "a"
- `app/site.tsx:43` (StringLiteral): "eyebrow"
- `app/site.tsx:43` (JsxText): "AUR / A LITTLE MORE POSSIBILITY"
- `app/site.tsx:43` (StringLiteral): "prose"
- `app/site.tsx:43` (JsxText): "OUR STORY"
- `app/site.tsx:43` (StringLiteral): "\n\n"
- `app/site.tsx:43` (StringLiteral): "/contact"
- `app/site.tsx:43` (StringLiteral): "text-link"
- `app/site.tsx:43` (JsxText): "Tell us what you’re facing"
- `app/site.tsx:43` (StringLiteral): "values-section section-wrap"
- `app/site.tsx:43` (JsxText): "HOW WE WANT TO BUILD"
- `app/site.tsx:43` (StringLiteral): "values-grid"
- `app/site.tsx:43` (StringLiteral): "Purpose comes first"
- `app/site.tsx:43` (StringLiteral): "We build around people’s needs and keep our software free to use."
- `app/site.tsx:43` (StringLiteral): "Thoughtfulness is a feature"
- `app/site.tsx:43` (StringLiteral): "Clear language, approachable design, and accessibility belong in the process."
- `app/site.tsx:43` (StringLiteral): "Good ideas travel"
- `app/site.tsx:43` (StringLiteral): "We welcome perspectives from everywhere. Useful problems don’t stop at borders."
- `app/site.tsx:43` (StringLiteral): "Progress is a team sport"
- `app/site.tsx:43` (StringLiteral): "We learn, share feedback, and make room for people at different stages of their craft."
- `app/site.tsx:43` (StringLiteral): "value-item"
- `app/site.tsx:43` (StringLiteral): "value-number"
- `app/site.tsx:43` (JsxText): "0"
- `app/site.tsx:43` (StringLiteral): "section-wrap team-section"
- `app/site.tsx:43` (StringLiteral): "section-heading"
- `app/site.tsx:43` (JsxText): "THE PEOPLE BEHIND THE PURPOSE"
- `app/site.tsx:43` (JsxText): "Meet the lab."
- `app/site.tsx:43` (JsxText): "Different strengths."
- `app/site.tsx:43` (JsxText): "One shared direction."
- `app/site.tsx:43` (StringLiteral): "team-grid"
- `app/site.tsx:43` (StringLiteral): "team-card"
- `app/site.tsx:43` (StringLiteral): "team-portrait portrait-"
- `app/site.tsx:43` (StringLiteral): "lazy"
- `app/site.tsx:43` (StringLiteral): "portrait-label"
- `app/site.tsx:43` (JsxText): "AUR LABS / TEAM"
- `app/site.tsx:43` (StringLiteral): "_blank"
- `app/site.tsx:43` (StringLiteral): "noopener noreferrer"
- `app/site.tsx:43` (StringLiteral): " profile"
- `app/site.tsx:43` (StringLiteral): "team-role"
- `app/site.tsx:43` (StringLiteral): "/join"
- `app/site.tsx:43` (StringLiteral): "team-join"
- `app/site.tsx:43` (JsxText): "Your name"
- `app/site.tsx:43` (JsxText): "could be here."
- `app/site.tsx:43` (JsxText): "Curiosity welcome."
- `app/site.tsx:43` (JsxText): "A little heart required."
- `app/site.tsx:43` (StringLiteral): "text-link"
- `app/site.tsx:43` (JsxText): "Find your place"
- `app/site.tsx:44` (StringLiteral): "T12:00:00Z"
- `app/site.tsx:44` (StringLiteral): "en"
- `app/site.tsx:44` (StringLiteral): "short"
- `app/site.tsx:44` (StringLiteral): "numeric"
- `app/site.tsx:44` (StringLiteral): "numeric"
- `app/site.tsx:44` (StringLiteral): "UTC"
- `app/site.tsx:45` (StringLiteral): "article-card"
- `app/site.tsx:45` (StringLiteral): "/research/"
- `app/site.tsx:45` (StringLiteral): "/journal/"
- `app/site.tsx:45` (StringLiteral): "article-image"
- `app/site.tsx:45` (StringLiteral): "lazy"
- `app/site.tsx:45` (StringLiteral): "card-corner"
- `app/site.tsx:45` (StringLiteral): "article-meta"
- `app/site.tsx:45` (StringLiteral): "/research/"
- `app/site.tsx:45` (StringLiteral): "/journal/"
- `app/site.tsx:46` (StringLiteral): "All topics"
- `app/site.tsx:46` (StringLiteral): "All topics"
- `app/site.tsx:46` (StringLiteral): "All topics"
- `app/site.tsx:46` (StringLiteral): " "
- `app/site.tsx:46` (StringLiteral): "QUESTIONS WORTH ASKING"
- `app/site.tsx:46` (StringLiteral): "THINKING OUT LOUD"
- `app/site.tsx:46` (JsxText): "Curiosity is"
- `app/site.tsx:46` (JsxText): "where we begin."
- `app/site.tsx:46` (JsxText): "Inside the lab."
- `app/site.tsx:46` (JsxText): "Out in the open."
- `app/site.tsx:46` (StringLiteral): "Ideas, explorations, and research directions. A space to ask better questions before we build the answers."
- `app/site.tsx:46` (StringLiteral): "Notes on making useful things, thoughtful design, and the small decisions that shape our work."
- `app/site.tsx:46` (StringLiteral): "section-wrap article-list"
- `app/site.tsx:46` (StringLiteral): "results-bar"
- `app/site.tsx:46` (StringLiteral): "polite"
- `app/site.tsx:46` (StringLiteral): "explorations"
- `app/site.tsx:46` (StringLiteral): "stories"
- `app/site.tsx:46` (StringLiteral): "search-box"
- `app/site.tsx:46` (StringLiteral): "Search explorations…"
- `app/site.tsx:46` (StringLiteral): "Search the journal…"
- `app/site.tsx:46` (StringLiteral): "Search research"
- `app/site.tsx:46` (StringLiteral): "Search journal"
- `app/site.tsx:46` (StringLiteral): "Clear search"
- `app/site.tsx:46` (StringLiteral): "platform-filters"
- `app/site.tsx:46` (StringLiteral): "group"
- `app/site.tsx:46` (StringLiteral): "Filter by topic"
- `app/site.tsx:46` (StringLiteral): "selected"
- `app/site.tsx:46` (StringLiteral): "journal-grid"
- `app/site.tsx:46` (StringLiteral): "empty-state"
- `app/site.tsx:46` (JsxText): "No matching stories."
- `app/site.tsx:46` (StringLiteral): "text-link"
- `app/site.tsx:46` (StringLiteral): "All topics"
- `app/site.tsx:46` (JsxText): "Reset search & topics"
- `app/site.tsx:46` (StringLiteral): "inline-cta"
- `app/site.tsx:46` (StringLiteral): "A question worth exploring?"
- `app/site.tsx:46` (StringLiteral): "A thought worth sharing?"
- `app/site.tsx:46` (JsxText): "We’d love to hear your perspective."
- `app/site.tsx:46` (StringLiteral): "/contact"
- `app/site.tsx:46` (JsxText): "Start a conversation"
- `app/site.tsx:47` (StringLiteral): "section-wrap detail-breadcrumb"
- `app/site.tsx:47` (StringLiteral): "/research"
- `app/site.tsx:47` (StringLiteral): "/journal"
- `app/site.tsx:47` (StringLiteral): "All research"
- `app/site.tsx:47` (StringLiteral): "All stories"
- `app/site.tsx:47` (StringLiteral): "reading-page"
- `app/site.tsx:47` (StringLiteral): "eyebrow"
- `app/site.tsx:47` (StringLiteral): "article-deck"
- `app/site.tsx:47` (StringLiteral): "byline"
- `app/site.tsx:47` (StringLiteral): "avatar-mark"
- `app/site.tsx:47` (JsxText): "·"
- `app/site.tsx:47` (JsxText): "min read"
- `app/site.tsx:47` (StringLiteral): "icon-button"
- `app/site.tsx:47` (StringLiteral): "Copy article link"
- `app/site.tsx:47` (StringLiteral): "Copy the page address from your browser to share this article."
- `app/site.tsx:47` (StringLiteral): "reading-cover"
- `app/site.tsx:47` (StringLiteral): "prose"
- `app/site.tsx:47` (StringLiteral): "\n\n"
- `app/site.tsx:47` (StringLiteral): "## "
- `app/site.tsx:47` (StringLiteral): "article-references"
- `app/site.tsx:47` (JsxText): "References & further reading"
- `app/site.tsx:47` (StringLiteral): "_blank"
- `app/site.tsx:47` (StringLiteral): "noopener noreferrer"
- `app/site.tsx:47` (StringLiteral): "0"
- `app/site.tsx:47` (StringLiteral): "article-end"
- `app/site.tsx:47` (JsxText): "Have something to add?"
- `app/site.tsx:47` (JsxText): "Good conversations make good ideas better."
- `app/site.tsx:47` (StringLiteral): "/contact"
- `app/site.tsx:47` (StringLiteral): "text-link"
- `app/site.tsx:47` (JsxText): "Share your perspective"
- `app/site.tsx:48` (StringLiteral): "A LITTLE OF YOUR TIME. A REAL DIFFERENCE."
- `app/site.tsx:48` (JsxText): "Bring your craft."
- `app/site.tsx:48` (JsxText): "Build with purpose."
- `app/site.tsx:48` (StringLiteral): "Developers, designers, researchers, and curious people. Help make thoughtful software available to everyone."
- `app/site.tsx:48` (StringLiteral): "section-wrap join-layout"
- `app/site.tsx:48` (StringLiteral): "join-sidebar"
- `app/site.tsx:48` (StringLiteral): "eyebrow"
- `app/site.tsx:48` (JsxText): "A PLACE TO CONTRIBUTE"
- `app/site.tsx:48` (JsxText): "Good people."
- `app/site.tsx:48` (JsxText): "Useful work."
- `app/site.tsx:48` (JsxText): "We’re a non-profit team built around collaboration. Tell us what you enjoy, what you want to learn, and how you’d like to help."
- `app/site.tsx:48` (StringLiteral): "join-benefit"
- `app/site.tsx:48` (JsxText): "From wherever you are"
- `app/site.tsx:48` (JsxText): "Share your timezone and the hours that fit your life."
- `app/site.tsx:48` (StringLiteral): "join-benefit"
- `app/site.tsx:48` (JsxText): "A sustainable commitment"
- `app/site.tsx:48` (JsxText): "Start with a realistic amount of time. Quality matters more than busyness."
- `app/site.tsx:48` (StringLiteral): "join-benefit"
- `app/site.tsx:48` (JsxText): "Volunteer, with purpose"
- `app/site.tsx:48` (JsxText): "This is an unpaid opportunity to contribute to free software."
- `app/site.tsx:48` (StringLiteral): "join-process"
- `app/site.tsx:48` (StringLiteral): "eyebrow"
- `app/site.tsx:48` (JsxText): "WHAT HAPPENS NEXT"
- `app/site.tsx:48` (JsxText): "01"
- `app/site.tsx:48` (JsxText): "We review your application."
- `app/site.tsx:48` (JsxText): "02"
- `app/site.tsx:48` (JsxText): "We may reach out for a conversation."
- `app/site.tsx:48` (JsxText): "03"
- `app/site.tsx:48` (JsxText): "We explore a small, useful starting point."
- `app/site.tsx:48` (StringLiteral): "mailto:"
- `app/site.tsx:48` (StringLiteral): "text-link"
- `app/site.tsx:48` (JsxText): "A question before you apply?"
- `app/site.tsx:48` (StringLiteral): "empty-state"
- `app/site.tsx:48` (JsxText): "Taking a little pause."
- `app/site.tsx:48` (JsxText): "Volunteer applications are currently closed. You can still contact us to introduce yourself."
- `app/site.tsx:48` (StringLiteral): "/contact"
- `app/site.tsx:48` (JsxText): "Say hello"
- `app/site.tsx:49` (StringLiteral): "faq-list"
- `app/site.tsx:50` (StringLiteral): "PEOPLE POWERED. PURPOSE LED."
- `app/site.tsx:50` (JsxText): "Help keep good"
- `app/site.tsx:50` (JsxText): "things free."
- `app/site.tsx:50` (StringLiteral): "section-wrap support-layout"
- `app/site.tsx:50` (StringLiteral): "support-art"
- `app/site.tsx:50` (StringLiteral): "true"
- `app/site.tsx:50` (StringLiteral): "heart-sculpture"
- `app/site.tsx:50` (StringLiteral): "support-art-text"
- `app/site.tsx:50` (JsxText): "a little"
- `app/site.tsx:50` (JsxText): "goes a long way."
- `app/site.tsx:50` (StringLiteral): "eyebrow"
- `app/site.tsx:50` (JsxText): "FOR THE TOOLS. FOR THE PEOPLE."
- `app/site.tsx:50` (JsxText): "What your support can make possible."
- `app/site.tsx:50` (StringLiteral): "support-uses"
- `app/site.tsx:50` (StringLiteral): "Keep the lights on"
- `app/site.tsx:50` (StringLiteral): "Hosting, storage, domains, and the infrastructure behind free tools."
- `app/site.tsx:50` (StringLiteral): "Make room to build"
- `app/site.tsx:50` (StringLiteral): "Development tools, maintenance, and practical product improvements."
- `app/site.tsx:50` (StringLiteral): "Bring more people in"
- `app/site.tsx:50` (StringLiteral): "Accessibility checks, clearer documentation, and broader device testing."
- `app/site.tsx:50` (StringLiteral): "use-number"
- `app/site.tsx:50` (JsxText): "0"
- `app/site.tsx:50` (StringLiteral): "tiny muted"
- `app/site.tsx:50` (JsxText): "These are intended areas of support, not an audited spending breakdown."
- `app/site.tsx:50` (StringLiteral): "section-wrap donation-transparency"
- `app/site.tsx:50` (JsxText): "A LITTLE CLARITY"
- `app/site.tsx:50` (JsxText): "Trust is part"
- `app/site.tsx:50` (JsxText): "of the work."
- `app/site.tsx:50` (StringLiteral): "Is my donation tax-deductible?"
- `app/site.tsx:50` (StringLiteral): "We don’t currently claim tax-deductible status. If tax treatment matters to you, contact us for the organization’s current details before contributing."
- `app/site.tsx:50` (StringLiteral): "Do I need to donate to use the software?"
- `app/site.tsx:50` (StringLiteral): "No. Our mission is to make our released software free to use. Supporting the lab is entirely optional."
- `app/site.tsx:50` (StringLiteral): "How do monthly contributions work?"
- `app/site.tsx:50` (StringLiteral): "When a monthly payment channel is configured, it opens an external provider where you confirm the amount and recurring terms. Without a configured channel, the monthly option only prepares an email inquiry."
- `app/site.tsx:50` (StringLiteral): "Can I contribute in another way?"
- `app/site.tsx:50` (StringLiteral): "Absolutely. Volunteer your skills, test future releases, share a useful problem, or help improve our documentation. Visit Join us or send the team a message."
- `app/site.tsx:50` (StringLiteral): "Who do I contact about a payment?"
- `app/site.tsx:50` (StringLiteral): "Contact "
- `app/site.tsx:50` (StringLiteral): " with the payment date, provider, and reference. Don’t send card numbers, passwords, or other sensitive payment details."
- `app/site.tsx:51` (StringLiteral): "EVERY GOOD SOLUTION STARTS WITH LISTENING"
- `app/site.tsx:51` (JsxText): "A problem?"
- `app/site.tsx:51` (JsxText): "We’re all ears."
- `app/site.tsx:51` (StringLiteral): "Tell us what’s getting in your way. We’ll explore what’s possible and do our best to help."
- `app/site.tsx:51` (StringLiteral): "section-wrap contact-layout"
- `app/site.tsx:51` (StringLiteral): "contact-orbit"
- `app/site.tsx:51` (JsxText): "Start a conversation."
- `app/site.tsx:51` (JsxText): "Have an idea, a bug, a partnership in mind, or a question about the lab? You’re in the right place."
- `app/site.tsx:51` (StringLiteral): "contact-email"
- `app/site.tsx:51` (StringLiteral): "mailto:"
- `app/site.tsx:51` (StringLiteral): "contact-expect"
- `app/site.tsx:51` (StringLiteral): "eyebrow"
- `app/site.tsx:51` (JsxText): "A SMALL TEAM, LISTENING"
- `app/site.tsx:51` (JsxText): "We read submissions as capacity allows. We can’t promise a response time or a solution to every problem, but thoughtful details help us understand what you need."
- `app/site.tsx:52` (StringLiteral): "reading-page legal"
- `app/site.tsx:52` (StringLiteral): "eyebrow"
- `app/site.tsx:52` (JsxText): "CLEAR WORDS. RESPECTFUL PRACTICES."
- `app/site.tsx:52` (StringLiteral): "Terms of use."
- `app/site.tsx:52` (StringLiteral): "Your privacy matters."
- `app/site.tsx:52` (StringLiteral): "muted"
- `app/site.tsx:52` (JsxText): "Website notice · Updated October 13, 2026"
- `app/site.tsx:52` (StringLiteral): "prose"
- `app/site.tsx:52` (StringLiteral): "About this website"
- `app/site.tsx:52` (StringLiteral): "Aur Labs is a non-profit software initiative. This website introduces our work, hosts product information, and accepts applications and messages. References to non-profit purpose do not certify a particular legal registration or tax status."
- `app/site.tsx:52` (StringLiteral): "Products and downloads"
- `app/site.tsx:52` (StringLiteral): "Concept previews are illustrative and are not available applications. Released software is subject to the license and requirements stated on its product page or accompanying release. Always verify platform compatibility. No universal support for every operating system or Linux distribution is implied."
- `app/site.tsx:52` (StringLiteral): "Your submissions"
- `app/site.tsx:52` (StringLiteral): "Submit accurate information that you have permission to share. Do not include passwords, confidential material, or another person’s sensitive information. A volunteer application does not guarantee a role, employment, or compensation."
- `app/site.tsx:52` (StringLiteral): "Donations"
- `app/site.tsx:52` (StringLiteral): "Contributions are optional. This site does not collect card information. Where a donation link is configured, the external provider controls checkout, currency, recurring payments, cancellations, and payment terms. Confirm all details before paying. No tax-deductible status is promised."
- `app/site.tsx:52` (StringLiteral): "Availability and responsibility"
- `app/site.tsx:52` (StringLiteral): "We aim to keep information useful and accurate, but availability, compatibility, and response times are not guaranteed. Product previews and research directions can change. Your rights under applicable law remain unaffected."
- `app/site.tsx:52` (StringLiteral): "Contact"
- `app/site.tsx:52` (StringLiteral): "For corrections, product questions, or concerns about these terms, email "
- `app/site.tsx:52` (StringLiteral): "."
- `app/site.tsx:52` (StringLiteral): "What you share"
- `app/site.tsx:52` (StringLiteral): "Contact forms collect your name, email, topic, message, and any optional product or platform details. Volunteer applications also collect your chosen role, skills, experience, availability, timezone, optional portfolio link, and written answers."
- `app/site.tsx:52` (StringLiteral): "How we use it"
- `app/site.tsx:52` (StringLiteral): "We use submissions to review applications, understand reported problems, and respond by email. We do not sell submission data or use these forms to enroll you in marketing messages. Submission details are available only through the protected admin area."
- `app/site.tsx:52` (StringLiteral): "Where information goes"
- `app/site.tsx:52` (StringLiteral): "Website content and submissions are stored in our hosting database. Uploaded public product images and team images are served from file storage. Hosting services may process request information for delivery, authentication, reliability, and security."
- `app/site.tsx:52` (StringLiteral): "Cookies and browser storage"
- `app/site.tsx:52` (StringLiteral): "The site uses session storage for Auri preferences and, when enabled, form drafts in your current browser tab. Drafts expire after 24 hours and are removed after a confirmed submission. You can disable or clear them from the form. Consent must be checked again after a draft is restored. Hosting authentication may use necessary sign-in cookies. Admin access uses a short-lived unlock token in memory. No third-party analytics or advertising tracker is added by this application."
- `app/site.tsx:52` (StringLiteral): "Retention and your choices"
- `app/site.tsx:52` (StringLiteral): "Submissions remain available to the team until deleted. To request access, correction, or deletion, email "
- `app/site.tsx:52` (StringLiteral): " from the address associated with your submission. Include the reference if available. Please avoid sharing unnecessary sensitive information."
- `app/site.tsx:52` (StringLiteral): "External links and payments"
- `app/site.tsx:52` (StringLiteral): "Portfolio links, software downloads, and configured donation providers are external services with their own privacy practices. We do not receive or store payment card details through this website."
- `app/site.tsx:52` (StringLiteral): "Questions"
- `app/site.tsx:52` (StringLiteral): "For any privacy question, contact "
- `app/site.tsx:52` (StringLiteral): "."
- `app/site.tsx:54` (StringLiteral): "/"
- `app/site.tsx:55` (StringLiteral): "admin"
- `app/site.tsx:57` (StringLiteral): "products"
- `app/site.tsx:58` (StringLiteral): "about"
- `app/site.tsx:59` (StringLiteral): "journal"
- `app/site.tsx:59` (StringLiteral): "research"
- `app/site.tsx:59` (StringLiteral): "research"
- `app/site.tsx:59` (StringLiteral): "research"
- `app/site.tsx:60` (StringLiteral): "join"
- `app/site.tsx:61` (StringLiteral): "support"
- `app/site.tsx:62` (StringLiteral): "contact"
- `app/site.tsx:63` (StringLiteral): "terms"
- `app/site.tsx:64` (StringLiteral): "#main"
- `app/site.tsx:64` (StringLiteral): "skip-link"
- `app/site.tsx:64` (JsxText): "Skip to content"
- `app/site.tsx:64` (StringLiteral): "status"
- `app/site.tsx:64` (StringLiteral): "storage-notice"
- `app/site.tsx:64` (JsxText): "Latest updates are temporarily unavailable. Please refresh before submitting a form."
- `app/site.tsx:64` (StringLiteral): "main"
- `app/use-form-draft.ts:1` (StringLiteral): "use client"
- `app/use-form-draft.ts:2` (StringLiteral): "react"
- `app/use-form-draft.ts:5` (StringLiteral): "join"
- `app/use-form-draft.ts:5` (StringLiteral): "contact"
- `app/use-form-draft.ts:6` (StringLiteral): "aur-draft-v2-"
- `app/use-form-draft.ts:9` (StringLiteral): "object"
- `app/use-form-draft.ts:10` (StringLiteral): "__proto__"
- `app/use-form-draft.ts:10` (StringLiteral): "constructor"
- `app/use-form-draft.ts:10` (StringLiteral): "prototype"
- `app/use-form-draft.ts:10` (StringLiteral): "consent"
- `app/use-form-draft.ts:10` (StringLiteral): "volunteer"
- `app/use-form-draft.ts:10` (StringLiteral): "website"
- `app/use-form-draft.ts:10` (StringLiteral): "string"
- `app/use-form-draft.ts:10` (StringLiteral): "boolean"
- `app/use-form-draft.ts:11` (StringLiteral): "join"
- `app/use-form-draft.ts:11` (StringLiteral): "string"
- `app/use-form-draft.ts:19` (StringLiteral): "/api/submissions"
- `app/use-form-draft.ts:19` (StringLiteral): "POST"
- `app/use-form-draft.ts:19` (StringLiteral): "Content-Type"
- `app/use-form-draft.ts:19` (StringLiteral): "application/json"
- `app/use-form-draft.ts:21` (StringLiteral): "The server could not confirm your submission. Please retry."
- `app/visuals.tsx:1` (StringLiteral): "use client"
- `app/visuals.tsx:2` (StringLiteral): "react"
- `app/visuals.tsx:3` (StringLiteral): "lucide-react"
- `app/visuals.tsx:4` (StringLiteral): "@/lib/content"
- `app/visuals.tsx:6` (StringLiteral): "brand-mark small"
- `app/visuals.tsx:6` (StringLiteral): "brand-mark"
- `app/visuals.tsx:6` (StringLiteral): "true"
- `app/visuals.tsx:6` (StringLiteral): "0 0 40 40"
- `app/visuals.tsx:6` (StringLiteral): "M8 29 18 9h6L34 29h-8l-2-5h-9l-2 5zm10-11h4l-2-5z"
- `app/visuals.tsx:6` (StringLiteral): "currentColor"
- `app/visuals.tsx:6` (StringLiteral): "M6 33h28"
- `app/visuals.tsx:6` (StringLiteral): "currentColor"
- `app/visuals.tsx:6` (StringLiteral): "2"
- `app/visuals.tsx:7` (StringLiteral): "asterisk "
- `app/visuals.tsx:7` (StringLiteral): "0 0 100 100"
- `app/visuals.tsx:7` (StringLiteral): "true"
- `app/visuals.tsx:7` (StringLiteral): "M50 0v100M0 50h100M14.6 14.6l70.8 70.8M14.6 85.4l70.8-70.8"
- `app/visuals.tsx:7` (StringLiteral): "currentColor"
- `app/visuals.tsx:7` (StringLiteral): "18"
- `app/visuals.tsx:10` (StringLiteral): "mouse"
- `app/visuals.tsx:10` (StringLiteral): "(prefers-reduced-motion: reduce)"
- `app/visuals.tsx:10` (StringLiteral): "--rx"
- `app/visuals.tsx:10` (StringLiteral): "deg"
- `app/visuals.tsx:10` (StringLiteral): "--ry"
- `app/visuals.tsx:10` (StringLiteral): "deg"
- `app/visuals.tsx:11` (StringLiteral): "hero-art"
- `app/visuals.tsx:11` (StringLiteral): "--rx"
- `app/visuals.tsx:11` (StringLiteral): "0deg"
- `app/visuals.tsx:11` (StringLiteral): "--ry"
- `app/visuals.tsx:11` (StringLiteral): "0deg"
- `app/visuals.tsx:11` (StringLiteral): "hero-orbit orbit-one"
- `app/visuals.tsx:11` (StringLiteral): "hero-orbit orbit-two"
- `app/visuals.tsx:11` (StringLiteral): "sculpture-tilt"
- `app/visuals.tsx:11` (StringLiteral): "/assets/aur-sculpture.png"
- `app/visuals.tsx:11` (StringLiteral): "1254"
- `app/visuals.tsx:11` (StringLiteral): "1254"
- `app/visuals.tsx:11` (StringLiteral): "A sculptural chrome A embracing an orange sphere"
- `app/visuals.tsx:11` (StringLiteral): "high"
- `app/visuals.tsx:11` (StringLiteral): "float-label label-open"
- `app/visuals.tsx:11` (StringLiteral): "green-dot"
- `app/visuals.tsx:11` (JsxText): "Open possibilities"
- `app/visuals.tsx:11` (StringLiteral): "float-label label-made"
- `app/visuals.tsx:11` (JsxText): "Made for humans"
- `app/visuals.tsx:11` (StringLiteral): "art-coordinates"
- `app/visuals.tsx:11` (JsxText): "25.0° N · IDEAS WITHOUT BORDERS"
- `app/visuals.tsx:15` (StringLiteral): "product-visual uploaded "
- `app/visuals.tsx:15` (StringLiteral): " large"
- `app/visuals.tsx:15` (StringLiteral): " interface screenshot"
- `app/visuals.tsx:15` (StringLiteral): "lazy"
- `app/visuals.tsx:16` (StringLiteral): "product-visual "
- `app/visuals.tsx:16` (StringLiteral): " large"
- `app/visuals.tsx:16` (StringLiteral): " illustrative interface concept"
- `app/visuals.tsx:17` (StringLiteral): "visual-grid"
- `app/visuals.tsx:18` (StringLiteral): "notes"
- `app/visuals.tsx:18` (StringLiteral): "desktop-mock"
- `app/visuals.tsx:18` (StringLiteral): "mock-top"
- `app/visuals.tsx:18` (StringLiteral): "traffic"
- `app/visuals.tsx:18` (StringLiteral): "mock-workspace"
- `app/visuals.tsx:18` (StringLiteral): "mock-sidebar"
- `app/visuals.tsx:18` (JsxText): "My space"
- `app/visuals.tsx:18` (JsxText): "All notes"
- `app/visuals.tsx:18` (JsxText): "Ideas & things"
- `app/visuals.tsx:18` (JsxText): "Little reminders"
- `app/visuals.tsx:18` (StringLiteral): "mock-new"
- `app/visuals.tsx:18` (JsxText): "New note"
- `app/visuals.tsx:18` (StringLiteral): "mock-doc"
- `app/visuals.tsx:18` (StringLiteral): "mock-eyebrow"
- `app/visuals.tsx:18` (JsxText): "A LITTLE SPACE TO THINK"
- `app/visuals.tsx:18` (JsxText): "Make room"
- `app/visuals.tsx:18` (JsxText): "for good ideas."
- `app/visuals.tsx:18` (JsxText): "Big things start with a small thought."
- `app/visuals.tsx:18` (StringLiteral): "mock-rule"
- `app/visuals.tsx:18` (StringLiteral): "mock-check"
- `app/visuals.tsx:18` (JsxText): "Capture a little inspiration"
- `app/visuals.tsx:18` (StringLiteral): "mock-check"
- `app/visuals.tsx:18` (StringLiteral): "empty-check"
- `app/visuals.tsx:18` (JsxText): "Build something useful"
- `app/visuals.tsx:18` (StringLiteral): "mock-note"
- `app/visuals.tsx:18` (JsxText): "Keep it simple. Make it matter. ✳"
- `app/visuals.tsx:19` (StringLiteral): "mobile"
- `app/visuals.tsx:19` (StringLiteral): "phones"
- `app/visuals.tsx:19` (StringLiteral): "phone phone-back"
- `app/visuals.tsx:19` (StringLiteral): "phone-camera"
- `app/visuals.tsx:19` (StringLiteral): "phone-time"
- `app/visuals.tsx:19` (JsxText): "9:41"
- `app/visuals.tsx:19` (StringLiteral): "phone-orb"
- `app/visuals.tsx:19` (JsxText): "A little"
- `app/visuals.tsx:19` (JsxText): "more clarity."
- `app/visuals.tsx:19` (JsxText): "Space for what matters."
- `app/visuals.tsx:19` (StringLiteral): "phone-button"
- `app/visuals.tsx:19` (JsxText): "Let’s begin"
- `app/visuals.tsx:19` (StringLiteral): "phone phone-front"
- `app/visuals.tsx:19` (StringLiteral): "phone-camera"
- `app/visuals.tsx:19` (StringLiteral): "phone-time"
- `app/visuals.tsx:19` (JsxText): "9:41"
- `app/visuals.tsx:19` (StringLiteral): "phone-greeting"
- `app/visuals.tsx:19` (JsxText): "GOOD MORNING"
- `app/visuals.tsx:19` (JsxText): "Hey, you."
- `app/visuals.tsx:19` (JsxText): "☀"
- `app/visuals.tsx:19` (JsxText): "Let’s make a little progress."
- `app/visuals.tsx:19` (StringLiteral): "phone-task"
- `app/visuals.tsx:19` (JsxText): "Today’s focus"
- `app/visuals.tsx:19` (JsxText): "Make something"
- `app/visuals.tsx:19` (JsxText): "you believe in."
- `app/visuals.tsx:19` (StringLiteral): "phone-list"
- `app/visuals.tsx:19` (JsxText): "A fresh idea"
- `app/visuals.tsx:19` (JsxText): "Small steps"
- `app/visuals.tsx:19` (JsxText): "Time to recharge"
- `app/visuals.tsx:19` (StringLiteral): "phone-nav"
- `app/visuals.tsx:19` (JsxText): "⌂"
- `app/visuals.tsx:19` (JsxText): "☷"
- `app/visuals.tsx:20` (StringLiteral): "terminal-mock"
- `app/visuals.tsx:20` (StringLiteral): "mock-top"
- `app/visuals.tsx:20` (StringLiteral): "traffic"
- `app/visuals.tsx:20` (JsxText): "~ / a little less busywork"
- `app/visuals.tsx:20` (StringLiteral): "terminal-body"
- `app/visuals.tsx:20` (StringLiteral): "terminal-brand"
- `app/visuals.tsx:20` (StringLiteral): "terminal-green"
- `app/visuals.tsx:20` (JsxText): "❯"
- `app/visuals.tsx:20` (JsxText): "aur hello"
- `app/visuals.tsx:20` (StringLiteral): "terminal-dim"
- `app/visuals.tsx:20` (JsxText): "Let’s build something useful."
- `app/visuals.tsx:20` (StringLiteral): "terminal-green"
- `app/visuals.tsx:20` (JsxText): "✓"
- `app/visuals.tsx:20` (JsxText): "A clear starting point"
- `app/visuals.tsx:20` (StringLiteral): "terminal-green"
- `app/visuals.tsx:20` (JsxText): "✓"
- `app/visuals.tsx:20` (JsxText): "A little less friction"
- `app/visuals.tsx:20` (StringLiteral): "terminal-green"
- `app/visuals.tsx:20` (JsxText): "✓"
- `app/visuals.tsx:20` (JsxText): "More room to create"
- `app/visuals.tsx:20` (StringLiteral): "terminal-cursor"
- `app/visuals.tsx:20` (JsxText): "❯"
- `app/visuals.tsx:21` (StringLiteral): "concept-caption"
- `app/visuals.tsx:21` (JsxText): "ILLUSTRATIVE CONCEPT"
- `app/visuals.tsx:24` (StringLiteral): "article-art art-"
- `app/visuals.tsx:24` (StringLiteral): "research"
- `app/visuals.tsx:24` (StringLiteral): "true"
- `app/visuals.tsx:24` (StringLiteral): "research-orbits"
- `app/visuals.tsx:24` (StringLiteral): "art-type"
- `app/visuals.tsx:24` (JsxText): "a"
- `app/visuals.tsx:24` (JsxText): "↗"
- `app/visuals.tsx:24` (StringLiteral): "stacked-squares"
- `app/visuals.tsx:24` (StringLiteral): "art-small"
- `app/visuals.tsx:24` (JsxText): "AUR LABS /"
- `app/visuals.tsx:24` (StringLiteral): "EXPLORATIONS"
- `app/visuals.tsx:24` (StringLiteral): "FIELD NOTES"
- `lib/auri-guides.ts:1` (StringLiteral): "idle"
- `lib/auri-guides.ts:1` (StringLiteral): "observing"
- `lib/auri-guides.ts:1` (StringLiteral): "moving"
- `lib/auri-guides.ts:1` (StringLiteral): "explaining"
- `lib/auri-guides.ts:1` (StringLiteral): "error"
- `lib/auri-guides.ts:1` (StringLiteral): "success"
- `lib/auri-guides.ts:3` (StringLiteral): "Name"
- `lib/auri-guides.ts:3` (StringLiteral): "Use the name you’d like our team to call you. Two or more characters is enough."
- `lib/auri-guides.ts:4` (StringLiteral): "Email address"
- `lib/auri-guides.ts:4` (StringLiteral): "Use an address you check regularly, for example you@gmail.com. We’ll use it to reply to this submission."
- `lib/auri-guides.ts:5` (StringLiteral): "Timezone"
- `lib/auri-guides.ts:5` (StringLiteral): "Your city or timezone helps us collaborate. For example: Asia/Karachi (UTC+5)."
- `lib/auri-guides.ts:6` (StringLiteral): "Portfolio"
- `lib/auri-guides.ts:6` (StringLiteral): "Optional: add a complete HTTPS link to your portfolio, GitHub, or a project. It’s fine to leave this blank."
- `lib/auri-guides.ts:7` (StringLiteral): "Contribution role"
- `lib/auri-guides.ts:7` (StringLiteral): "Choose the work you’d most like to contribute. You don’t need to be an expert to apply."
- `lib/auri-guides.ts:8` (StringLiteral): "Experience"
- `lib/auri-guides.ts:8` (StringLiteral): "Choose the level that feels most accurate. Learning and first contributions are welcome."
- `lib/auri-guides.ts:9` (StringLiteral): "Tools and skills"
- `lib/auri-guides.ts:9` (StringLiteral): "A short list is perfect: React, Python, Figma, accessibility testing, or technical writing."
- `lib/auri-guides.ts:10` (StringLiteral): "Weekly commitment"
- `lib/auri-guides.ts:10` (StringLiteral): "Choose time you can comfortably sustain. This is an unpaid volunteer opportunity."
- `lib/auri-guides.ts:11` (StringLiteral): "Availability"
- `lib/auri-guides.ts:11` (StringLiteral): "Share a few days and times, with your timezone. For example: Tuesday evenings after 7 pm, UTC+5."
- `lib/auri-guides.ts:12` (StringLiteral): "Motivation"
- `lib/auri-guides.ts:12` (StringLiteral): "Tell us what connects you to the mission in at least 30 characters. A specific thing you’d like to help with is a good start."
- `lib/auri-guides.ts:13` (StringLiteral): "Problem solving"
- `lib/auri-guides.ts:13` (StringLiteral): "Describe the problem, what you tried, and what you learned. An idea you’d like to explore is welcome too. At least 30 characters."
- `lib/auri-guides.ts:14` (StringLiteral): "Working together"
- `lib/auri-guides.ts:14` (StringLiteral): "Describe how you ask for help or respond to feedback. A small example in at least 20 characters is enough."
- `lib/auri-guides.ts:15` (StringLiteral): "Volunteer acknowledgement"
- `lib/auri-guides.ts:15` (StringLiteral): "Confirm you understand the role is unpaid. You can discuss your capacity with the team before committing."
- `lib/auri-guides.ts:16` (StringLiteral): "Privacy consent"
- `lib/auri-guides.ts:16` (StringLiteral): "Read the privacy notice, then confirm the team may review your details and respond. You can ask the team to delete them later."
- `lib/auri-guides.ts:17` (StringLiteral): "Contact topic"
- `lib/auri-guides.ts:17` (StringLiteral): "Choose the closest match. If your question doesn’t fit, choose Something else."
- `lib/auri-guides.ts:18` (StringLiteral): "Subject"
- `lib/auri-guides.ts:18` (StringLiteral): "Give your message a specific title, such as “A simpler way to organize research”. At least four characters."
- `lib/auri-guides.ts:19` (StringLiteral): "Related product"
- `lib/auri-guides.ts:19` (StringLiteral): "Choose a product if your message is about it. Otherwise leave this optional field empty."
- `lib/auri-guides.ts:20` (StringLiteral): "Operating system"
- `lib/auri-guides.ts:20` (StringLiteral): "An operating system and version help us reproduce issues. For example: Ubuntu 24.04 or Android 15."
- `lib/auri-guides.ts:21` (StringLiteral): "Message"
- `lib/auri-guides.ts:21` (StringLiteral): "Tell us what you wanted to do, what happened, and what you expected. At least 30 characters; leave out passwords and private credentials."
- `lib/auri-guides.ts:22` (StringLiteral): "admin-publish"
- `lib/auri-guides.ts:22` (StringLiteral): "Publishing content"
- `lib/auri-guides.ts:22` (StringLiteral): "Save with Published enabled to make this record visible. Turn Published off and save to keep it as a draft."
- `lib/auri-guides.ts:23` (StringLiteral): "admin-save"
- `lib/auri-guides.ts:23` (StringLiteral): "Saving edits"
- `lib/auri-guides.ts:23` (StringLiteral): "Review the preview, then save. Published content updates the live website after the server confirms it was saved."
- `lib/auri-guides.ts:26` (StringLiteral): "Frontend development"
- `lib/auri-guides.ts:26` (StringLiteral): "Build clear, accessible interfaces and connect them to reliable APIs."
- `lib/auri-guides.ts:27` (StringLiteral): "Backend development"
- `lib/auri-guides.ts:27` (StringLiteral): "Work on APIs, data models, validation, security, and reliable services."
- `lib/auri-guides.ts:28` (StringLiteral): "Mobile development"
- `lib/auri-guides.ts:28` (StringLiteral): "Shape useful mobile experiences, with thoughtful platform and device testing."
- `lib/auri-guides.ts:29` (StringLiteral): "UI/UX design"
- `lib/auri-guides.ts:29` (StringLiteral): "Research needs, design flows, and refine interfaces so people can use them confidently."
- `lib/auri-guides.ts:30` (StringLiteral): "DevOps & infrastructure"
- `lib/auri-guides.ts:30` (StringLiteral): "Help with deployments, monitoring, infrastructure, and dependable releases."
- `lib/auri-guides.ts:31` (StringLiteral): "Quality & accessibility"
- `lib/auri-guides.ts:31` (StringLiteral): "Test real journeys and improve keyboard and assistive technology support."
- `lib/auri-guides.ts:32` (StringLiteral): "Research & writing"
- `lib/auri-guides.ts:32` (StringLiteral): "Explore useful questions and turn what we learn into clear documentation."
- `lib/auri-guides.ts:33` (StringLiteral): "Community & support"
- `lib/auri-guides.ts:33` (StringLiteral): "Listen to users, organize feedback, and help people find the right next step."
- `lib/auri-guides.ts:35` (StringLiteral): "Explore at your own pace. Ask me whenever you need a hand."
- `lib/connector-context.ts:1` (StringLiteral): "node:async_hooks"
- `lib/connector-context.ts:2` (StringLiteral): "./connector-contract.mjs"
- `lib/connector-preview.d.ts:1` (StringLiteral): "virtual:sites-connector-preview"
- `lib/connector-preview.d.ts:2` (StringLiteral): "./connector-contract.mjs"
- `lib/connector-preview.d.ts:10` (StringLiteral): "./connector-contract.mjs"
- `lib/connectors.ts:1` (StringLiteral): "./connector-contract.mjs"
- `lib/connectors.ts:2` (StringLiteral): "./connector-context"
- `lib/connectors.ts:13` (StringLiteral): "./connector-contract.mjs"
- `lib/content.ts:1` (StringLiteral): "Windows"
- `lib/content.ts:1` (StringLiteral): "macOS"
- `lib/content.ts:1` (StringLiteral): "Linux"
- `lib/content.ts:1` (StringLiteral): "FreeBSD"
- `lib/content.ts:1` (StringLiteral): "Android"
- `lib/content.ts:1` (StringLiteral): "iOS"
- `lib/content.ts:1` (StringLiteral): "Web"
- `lib/content.ts:1` (StringLiteral): "Other"
- `lib/content.ts:3` (StringLiteral): "software"
- `lib/content.ts:3` (StringLiteral): "app"
- `lib/content.ts:3` (StringLiteral): "cli"
- `lib/content.ts:3` (StringLiteral): "concept"
- `lib/content.ts:3` (StringLiteral): "development"
- `lib/content.ts:3` (StringLiteral): "released"
- `lib/content.ts:3` (StringLiteral): "peach"
- `lib/content.ts:3` (StringLiteral): "lavender"
- `lib/content.ts:3` (StringLiteral): "mint"
- `lib/content.ts:3` (StringLiteral): "notes"
- `lib/content.ts:3` (StringLiteral): "mobile"
- `lib/content.ts:3` (StringLiteral): "terminal"
- `lib/content.ts:8` (StringLiteral): "products"
- `lib/content.ts:8` (StringLiteral): "journal"
- `lib/content.ts:8` (StringLiteral): "research"
- `lib/content.ts:8` (StringLiteral): "team"
- `lib/content.ts:8` (StringLiteral): "settings"
- `lib/content.ts:12` (StringLiteral): "Aur Labs"
- `lib/content.ts:12` (StringLiteral): "aur@Aurlabs.online"
- `lib/content.ts:12` (StringLiteral): "Good software. For everyone."
- `lib/content.ts:13` (StringLiteral): "Good software."
- `lib/content.ts:13` (StringLiteral): "For everyone."
- `lib/content.ts:14` (StringLiteral): "Useful tools. Thoughtful design. Zero price tags. We’re an independent, non-profit team building software that puts people first."
- `lib/content.ts:15` (StringLiteral): "We believe great software should open doors. Not put a price on them."
- `lib/content.ts:16` (StringLiteral): "Aur Labs is an independent, non-profit software initiative building free software and apps for people everywhere. We bring thoughtful design and practical engineering to everyday challenges, so more people can benefit from technology.\n\nHave a problem worth solving? Tell us about it. We’ll listen, explore what’s possible, and do our best to build a useful solution. We can’t promise to solve every challenge, but we can promise to take yours seriously."
- `lib/content.ts:17` (StringLiteral): "Free for the people who use it. Powered by the people who believe in it. Your support can help cover hosting, development tools, accessibility testing, and the time it takes to build something useful."
- `lib/content.ts:18` (StringLiteral): "Support Aur Labs"
- `lib/content.ts:19` (StringLiteral): "We are setting up our donation channels. Until then, contact us to discuss a contribution. We’ll confirm the payment method and purpose with you before you send anything. No funds are collected on this website. We do not currently claim that contributions are tax-deductible."
- `lib/content.ts:20` (StringLiteral): "Built with care. Made for everyone."
- `lib/content.ts:23` (StringLiteral): "aur-notes"
- `lib/content.ts:23` (StringLiteral): "aur-notes"
- `lib/content.ts:23` (StringLiteral): "Aur Notes"
- `lib/content.ts:23` (StringLiteral): "A little room for your next big idea."
- `lib/content.ts:23` (StringLiteral): "A concept for a calm desktop workspace that makes everyday notes feel simple. This illustrative product gives you a preview of the kind of thoughtful, approachable tools we want to build.\n\nThis is a design concept, not a released application. Features and target platforms describe the proposed direction and are not confirmed capabilities."
- `lib/content.ts:23` (StringLiteral): "software"
- `lib/content.ts:23` (StringLiteral): "Windows"
- `lib/content.ts:23` (StringLiteral): "macOS"
- `lib/content.ts:23` (StringLiteral): "Linux"
- `lib/content.ts:23` (StringLiteral): "concept"
- `lib/content.ts:23` (StringLiteral): "lavender"
- `lib/content.ts:23` (StringLiteral): "notes"
- `lib/content.ts:23` (StringLiteral): "A calm, focused writing space"
- `lib/content.ts:23` (StringLiteral): "Simple notebooks and quick search"
- `lib/content.ts:23` (StringLiteral): "A free tool for everyday ideas"
- `lib/content.ts:23` (StringLiteral): "To be confirmed before release"
- `lib/content.ts:24` (StringLiteral): "aur-pocket"
- `lib/content.ts:24` (StringLiteral): "aur-pocket"
- `lib/content.ts:24` (StringLiteral): "Aur Pocket"
- `lib/content.ts:24` (StringLiteral): "Your everyday, a little more together."
- `lib/content.ts:24` (StringLiteral): "An illustrative mobile app concept for keeping small tasks and useful ideas close. A thoughtful interface, a little clarity, and fewer distractions.\n\nThis is a design concept. There is no Android or iOS download yet. The proposed interface and platform targets are examples for the future catalogue."
- `lib/content.ts:24` (StringLiteral): "app"
- `lib/content.ts:24` (StringLiteral): "Android"
- `lib/content.ts:24` (StringLiteral): "iOS"
- `lib/content.ts:24` (StringLiteral): "concept"
- `lib/content.ts:24` (StringLiteral): "peach"
- `lib/content.ts:24` (StringLiteral): "mobile"
- `lib/content.ts:24` (StringLiteral): "A clear view of the day"
- `lib/content.ts:24` (StringLiteral): "Gentle, useful reminders"
- `lib/content.ts:24` (StringLiteral): "Designed with one-handed use in mind"
- `lib/content.ts:24` (StringLiteral): "To be confirmed before release"
- `lib/content.ts:25` (StringLiteral): "aur-cli"
- `lib/content.ts:25` (StringLiteral): "aur-cli"
- `lib/content.ts:25` (StringLiteral): "Aur CLI"
- `lib/content.ts:25` (StringLiteral): "Less busywork. More building."
- `lib/content.ts:25` (StringLiteral): "A concept for a friendly command-line companion, designed to make repeatable developer tasks easier to understand.\n\nThis is a catalogue concept, not a working command-line package. Commands shown in the interface are illustrative and should not be installed or run."
- `lib/content.ts:25` (StringLiteral): "cli"
- `lib/content.ts:25` (StringLiteral): "Windows"
- `lib/content.ts:25` (StringLiteral): "macOS"
- `lib/content.ts:25` (StringLiteral): "Linux"
- `lib/content.ts:25` (StringLiteral): "concept"
- `lib/content.ts:25` (StringLiteral): "mint"
- `lib/content.ts:25` (StringLiteral): "terminal"
- `lib/content.ts:25` (StringLiteral): "Readable, helpful terminal output"
- `lib/content.ts:25` (StringLiteral): "Guided setup without the guesswork"
- `lib/content.ts:25` (StringLiteral): "A simpler development routine"
- `lib/content.ts:25` (StringLiteral): "To be confirmed before release"
- `lib/content.ts:28` (StringLiteral): "why-free"
- `lib/content.ts:28` (StringLiteral): "why-we-build-for-everyone"
- `lib/content.ts:28` (StringLiteral): "Good tools shouldn’t be a privilege."
- `lib/content.ts:28` (StringLiteral): "The idea behind Aur Labs, and why access belongs at the heart of what we build."
- `lib/content.ts:28` (StringLiteral): "From the lab"
- `lib/content.ts:28` (StringLiteral): "Aur Labs"
- `lib/content.ts:28` (StringLiteral): "2026-10-11"
- `lib/content.ts:28` (StringLiteral): "A useful tool can change a day. It can save someone an hour, make a complicated task understandable, or help an idea become something real. Access to those tools matters.\n\nAur Labs exists to build free software and apps for people everywhere. Our starting point is simple: listen to a real problem, understand who experiences it, and look for the smallest helpful solution.\n\nFree doesn’t mean careless. We want our work to feel considered, welcoming, and easy to use. That includes clear interfaces, honest product information, and support that treats people with respect.\n\nWe’re at the beginning. The catalogue currently includes clearly marked design concepts, and we’ll share verified releases as they become available. If you have a problem, a skill, or an idea to contribute, there’s a place to start here."
- `lib/content.ts:29` (StringLiteral): "design-with-care"
- `lib/content.ts:29` (StringLiteral): "designing-with-a-little-more-care"
- `lib/content.ts:29` (StringLiteral): "A little less friction. A little more care."
- `lib/content.ts:29` (StringLiteral): "Our approach to interfaces that help people feel capable, one small decision at a time."
- `lib/content.ts:29` (StringLiteral): "Design notes"
- `lib/content.ts:29` (StringLiteral): "Aur Labs"
- `lib/content.ts:29` (StringLiteral): "2026-10-11"
- `lib/content.ts:29` (StringLiteral): "A good interface answers the next question before it becomes a problem. What does this button do? Where did my work go? How can I fix this mistake?\n\nWe aim to make those answers visible. Clear labels, helpful examples, readable type, and forgiving forms are part of that commitment.\n\nOur website companion Auri is a small expression of this idea. It offers guidance when you ask and explains form errors with an example. It doesn’t need to interrupt you to be useful.\n\nThese are design principles we intend to keep improving through feedback. Tell us where something feels confusing, and help us make it clearer."
- `lib/content.ts:32` (StringLiteral): "accessibility"
- `lib/content.ts:32` (StringLiteral): "making-useful-tools-more-accessible"
- `lib/content.ts:32` (StringLiteral): "What makes a free tool truly accessible?"
- `lib/content.ts:32` (StringLiteral): "An open question about devices, connectivity, language, and the people software leaves out."
- `lib/content.ts:32` (StringLiteral): "Research direction"
- `lib/content.ts:32` (StringLiteral): "Aur Labs"
- `lib/content.ts:32` (StringLiteral): "2026-10-11"
- `lib/content.ts:32` (StringLiteral): "Price is one barrier to access, but it isn’t the only one. A tool may be free and still be difficult to use on an older device, a slow connection, or with assistive technology.\n\nWe want to explore how simple interfaces, small downloads, clear language, and thoughtful platform support can make software more useful to more people.\n\nThis is a research direction, not a completed study. No findings, benchmarks, or participant results are claimed here.\n\nHave a relevant experience or an idea for an experiment? Share it through our contact page. Practical examples can help shape the questions we investigate next."
- `lib/content.ts:35` (StringLiteral): "awab"
- `lib/content.ts:35` (StringLiteral): "Awab Ur Rehman"
- `lib/content.ts:35` (StringLiteral): "Founder & CEO"
- `lib/content.ts:35` (StringLiteral): "Leading Aur Labs with a simple mission: make useful technology available to more people."
- `lib/content.ts:35` (StringLiteral): "AR"
- `lib/content.ts:36` (StringLiteral): "nafisa"
- `lib/content.ts:36` (StringLiteral): "Nafisa"
- `lib/content.ts:36` (StringLiteral): "UI/UX Designer"
- `lib/content.ts:36` (StringLiteral): "Shaping thoughtful, approachable experiences that help people feel at home with technology."
- `lib/content.ts:36` (StringLiteral): "N"
- `lib/content.ts:40` (StringLiteral): "software"
- `lib/content.ts:40` (StringLiteral): "Desktop software"
- `lib/content.ts:40` (StringLiteral): "app"
- `lib/content.ts:40` (StringLiteral): "Mobile app"
- `lib/content.ts:40` (StringLiteral): "Command line"
- `lib/content.ts:41` (StringLiteral): "released"
- `lib/content.ts:41` (StringLiteral): "Available now"
- `lib/content.ts:41` (StringLiteral): "development"
- `lib/content.ts:41` (StringLiteral): "In development"
- `lib/content.ts:41` (StringLiteral): "Concept preview"
- `lib/server.ts:1` (StringLiteral): "cloudflare:workers"
- `lib/server.ts:2` (StringLiteral): "./content"
- `lib/server.ts:4` (StringLiteral): "Database is not configured."
- `lib/server.ts:6` (StringLiteral): "SELECT id, kind, data, published, deleted FROM content"
- `lib/server.ts:9` (StringLiteral): "settings"
- `lib/server.ts:14` (StringLiteral): "products"
- `lib/server.ts:14` (StringLiteral): "journal"
- `lib/server.ts:14` (StringLiteral): "research"
- `lib/server.ts:14` (StringLiteral): "team"
- `lib/server.ts:20` (StringLiteral): "Cache-Control"
- `lib/server.ts:20` (StringLiteral): "no-store"
- `lib/server.ts:20` (StringLiteral): "X-Content-Type-Options"
- `lib/server.ts:20` (StringLiteral): "nosniff"
- `lib/server.ts:21` (StringLiteral): "origin"
- `lib/server.ts:23` (StringLiteral): "content-length"
- `lib/server.ts:23` (StringLiteral): "This request is too large."
- `lib/server.ts:26` (StringLiteral): "This request is too large."
- `lib/server.ts:30` (StringLiteral): "content-type"
- `lib/server.ts:30` (StringLiteral): "application/json"
- `lib/server.ts:30` (StringLiteral): "Send JSON content."
- `lib/server.ts:33` (StringLiteral): "SHA-256"
- `lib/server.ts:33` (StringLiteral): "0"
- `lib/server.ts:36` (StringLiteral): "raw"
- `lib/server.ts:36` (StringLiteral): "PBKDF2"
- `lib/server.ts:36` (StringLiteral): "deriveBits"
- `lib/server.ts:37` (StringLiteral): "PBKDF2"
- `lib/server.ts:37` (StringLiteral): "SHA-256"
- `lib/server.ts:38` (StringLiteral): "0"
- `lib/server.ts:41` (StringLiteral): "SELECT * FROM administrators WHERE id = 'owner'"
- `lib/server.ts:42` (StringLiteral): "oai-authenticated-user-id"
- `lib/server.ts:46` (StringLiteral): "x-aur-unlock"
- `lib/server.ts:47` (StringLiteral): "SELECT user_id, expires_at FROM admin_unlocks WHERE token_hash = ?"
- `lib/server.ts:51` (StringLiteral): ":"
- `lib/server.ts:52` (StringLiteral): "INSERT INTO rate_limits (id, count, expires_at) VALUES (?, 1, ?) ON CONFLICT(id) DO UPDATE SET count = count + 1 RETURNING count"
- `lib/server.ts:53` (StringLiteral): "DELETE FROM rate_limits WHERE expires_at < ?"
- `lib/server.ts:56` (StringLiteral): "INSERT INTO audit_log (id,actor,action,target,created_at) VALUES (?,?,?,?,?)"
- `lib/server.ts:59` (StringLiteral): "DELETE FROM admin_unlocks WHERE expires_at < ?"
- `lib/server.ts:59` (StringLiteral): "INSERT INTO admin_unlocks (token_hash,user_id,expires_at) VALUES (?,?,?)"
- `lib/utils.ts:1` (StringLiteral): "clsx"
- `lib/utils.ts:2` (StringLiteral): "tailwind-merge"
- `lib/validation.ts:1` (StringLiteral): "zod"
- `lib/validation.ts:2` (StringLiteral): "./content"
- `lib/validation.ts:5` (StringLiteral): "https:"
- `lib/validation.ts:5` (StringLiteral): "Use a complete HTTPS URL."
- `lib/validation.ts:6` (StringLiteral): "Use an uploaded image or HTTPS image URL."
- `lib/validation.ts:9` (StringLiteral): "Add a release download URL."
- `lib/validation.ts:9` (StringLiteral): "SHA-256 must contain 64 hexadecimal characters."
- `lib/validation.ts:10` (StringLiteral): "software"
- `lib/validation.ts:10` (StringLiteral): "app"
- `lib/validation.ts:10` (StringLiteral): "cli"
- `lib/validation.ts:10` (StringLiteral): "concept"
- `lib/validation.ts:10` (StringLiteral): "development"
- `lib/validation.ts:10` (StringLiteral): "released"
- `lib/validation.ts:10` (StringLiteral): "peach"
- `lib/validation.ts:10` (StringLiteral): "lavender"
- `lib/validation.ts:10` (StringLiteral): "mint"
- `lib/validation.ts:10` (StringLiteral): "notes"
- `lib/validation.ts:10` (StringLiteral): "mobile"
- `lib/validation.ts:10` (StringLiteral): "terminal"
- `lib/validation.ts:10` (StringLiteral): "released"
- `lib/validation.ts:10` (StringLiteral): "custom"
- `lib/validation.ts:10` (StringLiteral): "releases"
- `lib/validation.ts:10` (StringLiteral): "A released product needs at least one real download."
- `lib/validation.ts:10` (StringLiteral): "custom"
- `lib/validation.ts:10` (StringLiteral): "releases"
- `lib/validation.ts:10` (StringLiteral): "Release platforms must also be selected as product platforms."
- `lib/validation.ts:11` (StringLiteral): "Add a reference URL."
- `lib/validation.ts:13` (StringLiteral): "Use at most 40 guidance rules."
- `lib/validation.ts:14` (StringLiteral): "Please enter your name."
- `lib/validation.ts:14` (StringLiteral): "Use an email such as you@example.com."
- `lib/validation.ts:15` (StringLiteral): "join"
- `lib/validation.ts:15` (StringLiteral): "Frontend development"
- `lib/validation.ts:15` (StringLiteral): "Backend development"
- `lib/validation.ts:15` (StringLiteral): "Mobile development"
- `lib/validation.ts:15` (StringLiteral): "UI/UX design"
- `lib/validation.ts:15` (StringLiteral): "DevOps & infrastructure"
- `lib/validation.ts:15` (StringLiteral): "Quality & accessibility"
- `lib/validation.ts:15` (StringLiteral): "Research & writing"
- `lib/validation.ts:15` (StringLiteral): "Community & support"
- `lib/validation.ts:15` (StringLiteral): "Learning / first contribution"
- `lib/validation.ts:15` (StringLiteral): "Less than 1 year"
- `lib/validation.ts:15` (StringLiteral): "1–3 years"
- `lib/validation.ts:15` (StringLiteral): "3+ years"
- `lib/validation.ts:15` (StringLiteral): "1–3 hours"
- `lib/validation.ts:15` (StringLiteral): "4–7 hours"
- `lib/validation.ts:15` (StringLiteral): "8–15 hours"
- `lib/validation.ts:15` (StringLiteral): "16+ hours"
- `lib/validation.ts:15` (StringLiteral): "Tell us a little more—at least 30 characters."
- `lib/validation.ts:16` (StringLiteral): "contact"
- `lib/validation.ts:16` (StringLiteral): "A problem to solve"
- `lib/validation.ts:16` (StringLiteral): "Product support"
- `lib/validation.ts:16` (StringLiteral): "Partnership"
- `lib/validation.ts:16` (StringLiteral): "Donation question"
- `lib/validation.ts:16` (StringLiteral): "Something else"
- `lib/validation.ts:16` (StringLiteral): "Please give us at least 30 characters of context."
- `lib/validation.ts:17` (StringLiteral): "kind"
