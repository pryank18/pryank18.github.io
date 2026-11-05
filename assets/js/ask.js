/* "Ask about Pryank": a small assistant for recruiters.
   Every answer below is written by hand and checked against the resume and this site, so it cannot
   invent a fact. If a live model is switched on later (LIVE_URL), these answers still come first and
   still catch every failure. The visitor's words stay in this browser: analytics get only the topic id.
   If a fact changes on the resume, change it here too. */
(function () {
  'use strict';
  var LIVE_URL = '';
  var WA = 'https://wa.me/917397829282?text=Hi%20Pryank%2C%20I%20saw%20your%20portfolio.%20I%27m%20hiring%20for%20%5Brole%5D%20at%20%5Bcompany%5D.';

  /* id, chip label, keywords, answer, links, follow-up ids.
     Keywords: "!word" is enough alone, "word" needs support, "two words" must both appear. */
  var A = [
    { id: 'summary', chip: 'Who is Pryank?',
      k: ['who is pryank', 'who is he', 'about him', 'about pryank', 'introduce', '!summary', 'background', '!profile', 'overview', 'what does he do', 'elevator pitch', '!bio', 'in short'],
      a: 'Pryank is a Senior Product Manager with 7+ years of experience, 5+ of them in product. He builds 0-to-1 B2B SaaS, B2C and AI products across India and Africa. Most recently he was Country Head and Product Manager for FuelBuddy in Zimbabwe, running the P&L while keeping release ownership of both platforms.',
      l: [['Download resume', '/Pryank_Wadhera_Senior_Product_Manager_Resume.pdf']], n: ['wins', 'ai', 'avail'] },

    { id: 'wins', chip: 'Biggest results',
      k: ['!achievement', '!achievements', 'biggest', 'best work', 'proudest', '!results', 'key wins', '!impact', 'track record', 'best project', '!accomplishments', 'key numbers'],
      a: 'Four stand out. He launched Zimbabwe from zero to 8 active depots and 50+ enterprise and regional clients. He cut vendor activation from over a day to under half a day on a platform now serving 150+ vendors. He shipped UPI checkout that ran 2,000+ transactions in the first month of an internal pilot. And an IoT pilot at a major Indian steel producer saved about 20 paise per litre, a run-rate of ~₹4 lakh a month by months 5–6.',
      l: [['See the results', '/#shipped']], n: ['zimbabwe', 'vms', 'iot'] },

    { id: 'avail', chip: 'Availability and location',
      k: ['!available', '!availability', '!notice', 'notice period', 'when can', 'join', '!joining', 'immediately', 'start date', '!location', 'where is he', 'based', '!relocate', '!relocation', 'relocating', '!remote', '!hybrid', '!onsite', 'on site', 'work from home', 'wfh', 'move to', '!dubai', 'uae', 'bangalore', 'bengaluru', 'mumbai', 'gurugram', 'abroad', 'overseas'],
      a: 'He can join immediately. His home base is New Delhi, and he is open to relocation, hybrid and remote roles.',
      l: [['Contact Pryank', '/#contact']], n: ['roles', 'summary'] },

    { id: 'roles', chip: 'Roles he wants',
      k: ['looking for', 'open to roles', 'open to work', 'what roles', 'which roles', 'kind of role', 'type of role', 'target role', 'next role', 'seeking', 'job search'],
      a: 'He is looking for Senior PM, Lead PM and Product Lead roles, and his experience also covers project and programme delivery. The Fit check maps your role to his evidence in about a minute.',
      l: [['Check the fit', '/#fit']], n: ['avail', 'wins'] },

    { id: 'ai', chip: 'AI product experience',
      k: ['!ai', '!ml', 'artificial intelligence', 'machine learning', '!llm', '!llms', 'generative', '!genai', '!rag', '!agents', '!agentic', '!evals', 'forecasting', 'langgraph', 'prompt', 'guardrails'],
      a: 'At work, he built AI demand forecasting into the FMS, live today: it predicts supplier booking volumes from 3 months of daily data, with a planner reviewing each cycle. On his own time, he built Msafara, a multi-agent system using LangGraph, tool calling and RAG. It completed 100% of 100 synthetic test trips, against 86% for a rules baseline, with 0 price-limit breaches. Bolt & Bahi also has a built-in AI assistant, and he is finishing an MBA in AI for Business.',
      l: [['Msafara evals', 'https://pryank18.github.io/Msafara/#evals']], n: ['projects', 'tech', 'education'] },

    { id: 'payments', chip: 'Payments and fintech',
      k: ['!payment', '!payments', '!upi', '!fintech', '!checkout', 'reconciliation', '!wallet', 'qr', '!credit', 'collections', 'bfsi', '!banking'],
      a: 'He specified and shipped UPI Intent and QR checkout for FuelBuddy\'s B2B platform. An internal pilot with 200+ employees across four city clusters ran 2,000+ transactions in month one, so failure handling and reconciliation were proven before customers relied on them. In Zimbabwe he owned customer credit and collections, and he also designed Kids Wallet, a concept for UPI with parental controls.',
      l: [['UPI case study', '/work/upi-checkout/']], n: ['b2b', 'wins'] },

    { id: 'b2b', chip: 'B2B SaaS and platforms',
      k: ['!b2b', '!saas', '!platform', '!platforms', '!enterprise', 'multi tenant', 'multi-tenant', '!marketplace', '!marketplaces', '!procurement', 'procure', 'erp', 'supply chain', 'logistics', 'api', 'apis', 'integrations'],
      a: 'Most of his career is B2B. At FuelBuddy he shipped the procure-to-pay VMS end to end: onboarding, POs, GST invoices and payments. At Legal Suvidha he launched a LegalTech SaaS MVP within 8 months. On his own he built Depotline, Bolt & Bahi and Dispatch OS, a multi-tenant platform for FMCG distributors.',
      l: [['Vendor platform case study', '/work/vendor-onboarding/']], n: ['vms', 'projects'] },

    { id: 'b2c', chip: 'B2C experience',
      k: ['!b2c', '!consumer', 'd2c', 'ecommerce', 'e-commerce', 'edtech', 'subscription', 'growth', 'funnel', 'onboarding flows', 'retention'],
      a: 'At FuelBuddy he worked across B2B and B2C products, with funnel dashboards in Amplitude, Tableau and Power BI. At Legal Suvidha he A/B-tested onboarding flows as website visitors grew from about 120 to 1,000+. His own consumer builds include Pravesh, a live exam-prep app, and FitNexx, a subscription training app. Wapsi is his concept for D2C cart recovery over WhatsApp.',
      l: [['See the builds', '/#builds']], n: ['projects', 'wins'] },

    { id: 'zimbabwe', chip: 'The Zimbabwe launch',
      k: ['!zimbabwe', '!harare', '!africa', 'market entry', 'new market', 'new country', '!expansion', '!international', '!gtm', 'go to market', 'zambia', 'nigeria', 'country head', 'global', 'depots'],
      a: 'He led the evaluation of Zimbabwe, Zambia and Nigeria, then moved to Harare and launched B2B bulk fuel from zero. That meant 40+ customer interviews, ~15 suppliers signed in month one, and 50+ enterprise and regional clients won from a 400+ network. The business reached 8 active depots with zero stock-outs. The CEO then asked him to run Zimbabwe as Country Head alongside his product role.',
      l: [['Read the case study', '/work/market-entry-zimbabwe/']], n: ['pl', 'team', 'wins'] },

    { id: 'pl', chip: 'P&L and business ownership',
      k: ['!p&l', 'p and l', 'pnl', 'profit and loss', 'business ownership', 'pricing', 'unit economics', 'margin', 'margins', 'revenue', 'commercial', 'sales', 'negotiation', 'regulatory', 'compliance', 'zimra', 'zera'],
      a: 'As Country Head he owned the Zimbabwe P&L across dynamic pricing, procurement, logistics, sales, client contracts and RFPs, within ZERA and ZIMRA rules. He also owned customer credit and collections, and improved unit margins through pricing and supplier mix. Commercial terms stay private.',
      l: [['Read the case study', '/work/market-entry-zimbabwe/']], n: ['team', 'zimbabwe'] },

    { id: 'team', chip: 'Leadership and teams',
      k: ['!leadership', '!team', 'lead a', 'led a', '!leader', '!manage', '!managed', 'people manager', 'people management', 'stakeholders', 'stakeholder', 'cross functional', 'cross-functional', 'hired', 'hiring', 'mentor', 'mentoring', 'mentored', 'engineers', 'direct reports', 'reports'],
      a: 'In Zimbabwe he hired and led an eight-person BD, logistics and finance team, and coordinated with teams across the UAE, India, Zambia and Mozambique. Before that he was one of four PMs working with the CEO, CTO, MD and 15 engineers. He has also been a guest mentor at IIM Raipur.',
      l: [['How he leads', '/#leadership']], n: ['style', 'pl'] },

    { id: 'vms', chip: 'The vendor platform',
      k: ['!vms', 'vendor', 'vendors', 'vendor management', 'pump owners', 'onboarding', 'activation', 'kyc'],
      a: 'The Vendor Management System came out of 300+ pump-owner interviews. Its KYC and validation rules check a submission once, at the moment of entry, which cut vendor activation from over a day to under half a day. A phased rollout took it to 150+ vendors.',
      l: [['Read the case study', '/work/vendor-onboarding/']], n: ['iot', 'wins'] },

    { id: 'iot', chip: 'IoT and hardware products',
      k: ['!iot', '!fms', 'fuel management', '!hardware', 'rfid', 'sensors', 'tank gauges', 'flow meters', 'steel', 'industrial', 'pilot'],
      a: 'He defined 100+ FMS requirements across tank gauges, dispensers, flow meters and RFID. A six-month pilot at a major Indian steel producer cut loss, theft and spillage by about 20 paise per litre against the site\'s own baseline, a run-rate of ~₹4 lakh a month by months 5–6. He later took the FMS to a live v3 in Zimbabwe.',
      l: [['Read the case study', '/work/iot-loss-control/']], n: ['ai', 'wins'] },

    { id: 'experiment', chip: 'Analytics and experiments',
      k: ['!a/b', 'ab test', 'ab testing', '!experiment', '!experiments', '!experimentation', '!analytics', 'metrics', 'kpi', 'kpis', 'north star', 'data driven', 'delivery time', 'amplitude', 'tableau', 'power bi'],
      a: 'He cut average last-mile delivery time from 60 to 55 minutes by root-causing failures in IoT order sync, route optimisation and slot booking, then A/B-testing the fixes. He builds funnel dashboards in Amplitude, Tableau and Power BI, and uses SQL for analysis. In Zimbabwe, release priorities were set against North Star metrics of monthly volume and active depots.',
      l: [['See the results', '/#shipped']], n: ['tech', 'wins'] },

    { id: 'tech', chip: 'Technical skills and tools',
      k: ['!skills', '!skill', '!technical', 'tech stack', '!tools', '!sql', '!python', '!jira', '!figma', 'confluence', 'salesforce', 'supabase', 'postman', 'coding', 'code', 'developer', 'engineering background', 'agile', 'scrum', 'prd', 'prds', 'roadmap', 'roadmaps', 'write specs', 'user stories'],
      a: 'He writes PRDs, user stories and acceptance criteria, and runs Agile delivery in Jira and Confluence. His tools include Figma, Amplitude, Tableau, Power BI, Salesforce, Supabase and Postman. On the technical side he works with SQL, Python, REST APIs, LangGraph and LLM APIs.',
      l: [['Product documents', '/#cases']], n: ['ai', 'projects'] },

    { id: 'projects', chip: 'Products he has built',
      k: ['!projects', '!builds', '!built', 'side projects', 'portfolio', '!demo', '!demos', '!apps', 'personal projects'],
      a: 'Seven, built on his own time: Depotline (depot operations), Bolt & Bahi (a GST ledger for textile traders), Msafara (multi-agent AI for travel vendors), Pravesh (exam prep, live), Dispatch OS (FMCG distribution), FitNexx (adaptive strength training) and Wapsi (WhatsApp cart recovery, a concept). ArchaeologyWala, a content platform, is in progress. Pravesh is live; the other demos run on sample data. Ask about any one by name.',
      l: [['See the builds', '/#builds']], n: ['ai', 'tech'] },

    { id: 'career', chip: 'Career history',
      k: ['!career', 'experience', 'work history', 'employment', 'previous companies', 'previous roles', 'worked at', 'where has he worked', 'how many years', 'years of', '!fuelbuddy', 'current company', 'last company', 'latest role', 'current role', 'timeline'],
      a: 'FuelBuddy: Country Head and Product Manager, Harare (May – Oct 2026); Product Manager, Harare (Apr 2025 – Apr 2026); Product Manager, Gurugram (Jan 2023 – Apr 2025). Before that, Associate Product Manager at Legal Suvidha (Sep 2021 – Dec 2022), and Research Associate at Citizens\' Foundation for Policy Solutions (Aug 2019 – Aug 2021). That adds up to 7+ years, 5+ in product.',
      l: [['See the full path', '/#path']], n: ['zimbabwe', 'education'] },

    { id: 'education', chip: 'Education and certifications',
      k: ['!education', '!degree', '!degrees', '!mba', '!college', '!university', '!qualification', '!qualifications', '!certification', '!certifications', '!certified', '!certificate', '!certificates', 'studied', 'study', 'archaeology', 'history', 'languages', 'language', 'speak', 'speaks'],
      a: 'He is completing an MBA in AI for Business at O.P. Jindal Global University (expected Dec 2026). He holds a Master\'s in AIHC & Archaeology from Deccan College, Pune (2019) and a BA (Hons) in History from the University of Delhi (2017). Certifications: Certified Product Manager (micro1), Technical Product Management, Agile Scrum Master, Becoming an AI-First Product Leader, and a Professional Diploma in International Business Management. He speaks English, Hindi, Punjabi and Marathi.',
      n: ['style', 'summary'] },

    { id: 'style', chip: 'How he works',
      k: ['how does he work', 'how he works', 'working style', 'approach', 'philosophy', 'process', 'discovery', 'customer interviews', 'user research', 'strengths', 'strength', 'why hire', 'why should', 'why him', 'what makes', 'stand out', 'different', 'historian', 'archaeologist'],
      a: 'He starts in the field. His products begin at the depot, the pump and the plant, and the numbers show it: 300+ pump-owner interviews behind the vendor platform, and 40+ discovery interviews in Zimbabwe. He prices on value a buyer can verify, and he writes down what the team will not build. Archaeology taught him to trust what people do over what they say.',
      l: [['How he leads', '/#leadership']], n: ['wins', 'team'] },

    { id: 'failure', chip: 'A lesson learned',
      k: ['!failure', '!failed', '!mistake', '!mistakes', '!weakness', '!weaknesses', 'lesson', 'lessons', 'differently', 'gone wrong', 'went wrong'],
      a: 'One from Zimbabwe: he scoped an on-site fuel management system for a large enterprise client, hardware and digital payments included, before confirming the hardware could be sourced in-country. It was paused. His takeaway is to check a product\'s supply chain before you check the appetite for it.',
      l: [['Read the case study', '/work/market-entry-zimbabwe/']], n: ['style', 'zimbabwe'] },

    { id: 'everything', chip: 'Everything he has done',
      k: ['!everything', 'all his work', 'full record', 'all work', 'complete list', 'full list', 'all documents', '!documents', 'case studies', 'full history'],
      a: 'Every role, product, case study and document is on one page, each marked for what it is: shipped, pilot, demo or concept.',
      l: [['See everything', '/work/everything/']], n: ['career', 'projects', 'wins'] },
    { id: 'depotline', chip: 'Depotline', k: ['!depotline'],
      a: 'Depotline puts stock, pricing, live margin and fleet consumption on one screen for small fuel depots, with outlier flags on the fleet log. It came from what he saw running fuel operations in India and Southern Africa. It is a working demo on sample data.',
      l: [['Open demo', '/depotline-fuel-ops/'], ['Case study', '/docs/depotline/']], n: ['projects', 'iot'] },
    { id: 'bolt', chip: 'Bolt & Bahi', k: ['!bolt', '!bahi', '!ara', 'gst ledger', 'textile'],
      a: 'Bolt & Bahi is a local-first GST ledger for Indian textile traders. It works out CGST/SGST or IGST from the transaction, covers billing, stock, job work, dispatch and receivables, runs in ten languages, and includes ARA, a built-in AI assistant. It was tested on 500+ sample transactions and is a demo, not yet used by a live trader.',
      l: [['Open demo', '/bolt-and-bahi/'], ['Case study', '/docs/bolt-and-bahi/']], n: ['projects', 'ai'] },
    { id: 'msafara', chip: 'Msafara', k: ['!msafara', 'multi agent', 'multi-agent', 'tour operators'],
      a: 'Msafara is a multi-agent system for tour operators, built with Python, LangGraph, tool calling and RAG. Agents draft, follow up and negotiate within limits enforced in code, and a person approves every message. On 100 synthetic trips it reached 100% task completion against 86% for a rules baseline, with 0 price-limit breaches against 4. The vendors were simulated, so it is a demo, not yet used by an operator.',
      l: [['Eval results', 'https://pryank18.github.io/Msafara/#evals'], ['Case study', '/docs/msafara/']], n: ['ai', 'projects'] },
    { id: 'dispatch', chip: 'Dispatch OS', k: ['dispatch os', '!dispatch', '!distributor', '!distributors', 'fmcg', 'wholesalers'],
      a: 'Dispatch OS gives each FMCG distributor its own ordering platform, blocks orders that breach a credit limit at checkout, and dispatches against live stock. It is multi-tenant and multi-warehouse, and the MVP is used in distributor pitches. It runs on sample data.',
      l: [['Open demo', '/dispatch-os/'], ['Case study', '/docs/dispatch-os/']], n: ['projects', 'b2b'] },
    { id: 'fitnexx', chip: 'FitNexx', k: ['!fitnexx', 'strength training', 'fitness'],
      a: 'FitNexx is a consumer strength-training app where every logged set updates estimated 1RM and adjusts the next session. It has three programme tracks and pricing pages built to test the offer. It is a demo on sample data.',
      l: [['Open demo', '/fitnexx/'], ['Case study', '/docs/fitnexx/']], n: ['projects', 'b2c'] },
    { id: 'pravesh', chip: 'Pravesh', k: ['!pravesh', 'exam prep', 'upsc', 'aspirants'],
      a: 'Pravesh is a family-first prep companion for competitive-exam aspirants, with daily targets, a mock-test log, syllabus checklists, a focus timer and guardian sharing, in English, Hindi and Hinglish. He dropped a planned guardian paywall, so it is free with voluntary UPI support. It is live with a small group ahead of its soft launch.',
      l: [['Open app', '/pravesh/'], ['PRD', 'https://github.com/pryank18/pryank18.github.io/blob/main/pravesh/docs/PRD.md']], n: ['projects', 'b2c'] },
    { id: 'wapsi', chip: 'Wapsi', k: ['!wapsi', 'abandoned cart', 'abandoned carts', 'cart recovery'],
      a: 'Wapsi is his concept for WhatsApp cart recovery in D2C stores. It makes one decision per cart, checking consent, stock and quiet hours, offers a discount only to shoppers it rates as persuadable, and measures lift against a 10% holdout. It has a working demo on sample data.',
      l: [['Open demo', '/wapsi/demo/'], ['Case study', '/docs/wapsi/']], n: ['projects', 'b2c'] },
    { id: 'archwala', chip: 'ArchaeologyWala', k: ['!archaeologywala'],
      a: 'ArchaeologyWala is a React content platform for archaeology and history, with a blog, learning tracks, a resource library and contributor submissions. It is in progress.',
      l: [['See the code', 'https://github.com/pryank18/ArchaeologyWala']], n: ['projects', 'education'] },
    { id: 'fueltracker', chip: 'FuelTracker', k: ['!fueltracker'],
      a: 'FuelTracker is the BRD that turns the steel-producer pilot into software: it reconciles every litre from delivery to consumption, flags variance within a day and produces a savings report finance will sign. The pilot behind it saved about 20 paise per litre.',
      l: [['Read the BRD', '/docs/fueltracker-brd/']], n: ['iot', 'wins'] },
    { id: 'fleetos', chip: 'FleetOS', k: ['!fleetos', 'fleet running costs'],
      a: 'FleetOS is a concept PRD for one app covering a fleet\'s running costs, starting with small and mid-size fleets in India. It has not been built or piloted.',
      l: [['Read the PRD', '/docs/fleetos-prd/']], n: ['everything', 'b2b'] },
    { id: 'buddycan', chip: 'Buddy Can', k: ['buddy can', '!telecom', 'tower sites', 'genset'],
      a: 'Buddy Can is the operating model and requirements he wrote at FuelBuddy for last-mile diesel delivery to telecom tower sites: certified cans on small vehicles, scheduled from genset run-hours, with every litre traceable. No delivery results are published.',
      l: [['Read it', '/docs/buddy-can/']], n: ['everything', 'iot'] },
    { id: 'kidswallet', chip: 'Kids Wallet', k: ['kids wallet', 'parental controls'],
      a: 'Kids Wallet was a timed design exercise: a UPI wallet for 8 to 16 year olds with parental controls, with 13 parent screens, 10 child screens and a clickable Figma prototype. It was not built or tested with families.',
      l: [['Read it', '/docs/kids-wallet/']], n: ['payments', 'everything'] },
    { id: 'invoice', chip: 'InvoiceDiscount', k: ['!invoicediscount', 'invoice discounting', 'lending', 'working capital'],
      a: 'InvoiceDiscount is a concept PRD for SME invoice discounting, priced on the buyer\'s credit and distributed through the anchor buyer. It has not been built or tested with users.',
      l: [['Read the PRD', '/docs/invoice-discount/']], n: ['payments', 'everything'] },
    { id: 'legal', chip: 'Legal Suvidha', k: ['legal suvidha', '!legaltech', 'compliance hub', 'first job in product', 'apm'],
      a: 'He was Associate Product Manager at Legal Suvidha from Sep 2021 to Dec 2022. He launched the web and mobile MVP within 8 months, introduced Agile, which cut time-to-market by 25%, and A/B-tested onboarding flows as website visitors grew from about 120 to 1,000+.',
      l: [['Read the PRD', '/docs/legaltech-compliance-prd/']], n: ['career', 'b2b'] },
    { id: 'arjun', chip: 'Project Arjun', k: ['project arjun', '!arjun', '!ev', 'ev charging', 'electric vehicles'],
      a: 'He partnered with the GM and CEO on Project Arjun, an EV and oil & gas retail infrastructure plan built on 100+ fleet and EV operator interviews. Leadership approved the plan.',
      l: [['See the full record', '/work/everything/']], n: ['iocl', 'career'] },
    { id: 'iocl', chip: 'The IOCL lease', k: ['!iocl', 'indian oil', 'retail station', 'lease'],
      a: 'He secured FuelBuddy\'s first Indian Oil (IOCL) retail station lease.',
      l: [['See the full record', '/work/everything/']], n: ['arjun', 'career'] },
    { id: 'shopify', chip: 'Freelance work', k: ['!shopify', '!freelance', '!freelancing', 'consulting'],
      a: 'Alongside full-time roles, between 2021 and 2024, he developed a Shopify e-commerce app integrated with 3+ merchant stores through the Shopify API, for separate clients.',
      l: [['See the full record', '/work/everything/']], n: ['b2c', 'tech'] },
    { id: 'research', chip: 'Policy research', k: ['!policy', '!citizens', 'pollution', 'delhi government', 'research associate'],
      a: 'He began as a Research Associate at Citizens\' Foundation for Policy Solutions (Aug 2019 – Aug 2021), designing surveys for pollution-control policy research for the Delhi Government and preparing reports and policy drafts.',
      n: ['career', 'style'] },

    { id: 'contact', chip: 'How to reach him',
      k: ['!contact', '!email', '!phone', '!whatsapp', '!call', '!linkedin', '!github', 'reach', 'speak to', 'talk to', 'interview', 'schedule', 'phone number', 'contact number', 'get in touch', '!resume', '!cv'],
      a: 'Email wadherapryank@gmail.com, or call or WhatsApp +91 73978 29282. His resume is one tap below, and you can leave your number in the contact section for a call back.',
      l: [['Download resume', '/Pryank_Wadhera_Senior_Product_Manager_Resume.pdf'], ['Contact options', '/#contact']], n: ['avail', 'roles'] }
  ];

  /* Asked before the topics above, so these never get a guessed answer. */
  var G = [
    { id: 'pay', r: /\b(salary|salaries|ctc|lpa|compensation|package|pay|paid|expectations?|earn|earns|earning|income|stipend|remuneration|lakhs? (per|a) (year|annum))\b/i,
      a: 'Pryank discusses compensation directly, so I won\'t quote a figure. WhatsApp or email him and he will reply himself.' },
    { id: 'exit', r: /\b(why (did|has|is) (he|pryank) (leave|left|leaving|quit)|why (he|pryank) left|reason for leaving|left fuelbuddy|leave fuelbuddy|quit|resign|resigned|resignation|fired|laid off|terminated|sacked|employment gap|career gap)\b/i,
      a: 'His role at FuelBuddy ended in October 2026, and he can join immediately. He is the right person to talk through the rest, so please ask him directly.' },
    { id: 'personal', r: /\b(age|old|born|birthday|date of birth|dob|married|marriage|wife|husband|girlfriend|boyfriend|single|kids(?! wallet)|children|family|parents|religion|caste|politics|political|address|lives? at|passport|aadhaar|pan card|health|disability|gender|race|nationality|visa|work permit|citizenship)\b/i,
      a: 'I only cover Pryank\'s professional work, so I can\'t answer that. For anything else, please ask him directly.' },
    { id: 'secret', r: /\b(client names?|which clients?|who (are|were) (his|the) clients?|customer names?|confidential|internal figures?|commercial terms|contract value|exact revenue|gross margin|profit figures?)\b/i,
      a: 'Clients stay unnamed and commercial terms stay private. The figures Pryank can share are on this site.' },
    { id: 'self', r: /\b(are you (a )?(human|real|person|bot|ai|robot|pryank)|who (are|built|made) you|what are you|which model|your (instructions|prompt|rules))\b/i,
      a: 'I\'m an automated assistant on Pryank\'s portfolio, not Pryank. My answers come from his resume and this site. To reach him, use WhatsApp or email.' },
    { id: 'offtopic', r: /^(please )?(write|generate|draft|create|make|translate|solve|code|calculate)\b|\b(joke|weather|recipe|poem|capital of|prime minister|president of|stock price|ignore (all|your|previous))\b/i,
      a: 'I can only help with Pryank\'s work and experience. Try asking about his AI work, his results or his availability.' }
  ];

  var FALLBACK = 'I don\'t have a checked answer for that, and I won\'t guess. Pryank can answer it himself on WhatsApp or by email.';
  var HINDI = 'I answer in English here. Pryank speaks Hindi, so please WhatsApp him and he will reply himself.';

  function stem(w) {
    if (w.length > 4 && /ies$/.test(w)) return w.slice(0, -3) + 'y';
    if (w.length > 5 && /ing$/.test(w)) return w.slice(0, -3);
    if (w.length > 4 && /ed$/.test(w)) return w.slice(0, -2);
    if (w.length > 3 && /s$/.test(w) && !/ss$/.test(w)) return w.slice(0, -1);
    return w;
  }
  function words(s) {
    return (s.toLowerCase().replace(/[’']/g, '').match(/[a-z0-9&/+-]+/g) || []);
  }
  function has(all, kw) {
    for (var i = 0; i + kw.length <= all.length; i++) {
      var hit = true;
      for (var j = 0; j < kw.length; j++) if (all[i + j] !== kw[j]) { hit = false; break; }
      if (hit) return true;
    }
    return false;
  }

  /* The best topic for a question, or a guard, or null when nothing clearly matches. */
  function answerFor(q) {
    q = (q || '').trim();
    if (/[ऀ-ॿ]/.test(q)) return { id: 'hindi', a: HINDI };
    for (var i = 0; i < G.length; i++) if (G[i].r.test(q)) return G[i];
    var raw = words(q).map(stem);
    var best = null, top = 0;
    A.forEach(function (t) {
      var score = 0;
      t.k.forEach(function (kw) {
        var strong = kw.charAt(0) === '!';
        var parts = words(strong ? kw.slice(1) : kw).map(stem);
        if (!parts.length || !has(raw, parts)) return;
        score += strong ? 3 : (parts.length > 1 ? 2 + parts.length : 1);
      });
      if (score > top) { top = score; best = t; }
    });
    return top >= 2 ? best : null;
  }

  /* Node tests load this file directly. */
  if (typeof document === 'undefined') { if (typeof module !== 'undefined') module.exports = { A: A, G: G, answerFor: answerFor, FALLBACK: FALLBACK }; return; }

  var CHIPS = ['summary', 'wins', 'ai', 'avail', 'everything'];
  function topic(id) { return A.filter(function (t) { return t.id === id; })[0]; }
  function track(name, p) { try { if (window.PWTrack) window.PWTrack(name, p || {}); } catch (e) {} }
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; }

  var fab = document.getElementById('wa-fab');
  var btn = el('button', 'ask-fab');
  btn.type = 'button';
  btn.setAttribute('aria-haspopup', 'dialog');
  btn.setAttribute('aria-label', 'Ask about Pryank');
  btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5z"/><path d="M9.5 8.2a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1.9-1.1 1.6M12 14.2v.1"/></svg><span class="ask-lbl">Ask about me</span>';

  var dlg = el('dialog', 'ask-dlg');
  dlg.setAttribute('aria-label', 'Ask about Pryank');
  dlg.innerHTML =
    '<div class="ask-head"><img src="/assets/img/pryank-namaste.webp" alt="" width="40" height="40">' +
    '<div><strong>Ask about Pryank</strong><span>Answers from his resume and this site</span></div>' +
    '<button type="button" class="ask-x" aria-label="Close">×</button></div>' +
    '<div class="ask-log" role="log" aria-live="polite" tabindex="0"></div>' +
    '<div class="ask-chips"></div>' +
    '<form class="ask-form"><label class="ask-sr" for="ask-input">Your question</label>' +
    '<input id="ask-input" type="text" maxlength="300" autocomplete="off" enterkeyhint="send" placeholder="Ask about his work">' +
    '<button type="submit" aria-label="Send"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M12 6l6 6-6 6"/></svg></button></form>';

  var log = dlg.querySelector('.ask-log'), chips = dlg.querySelector('.ask-chips'), form = dlg.querySelector('form'), input = dlg.querySelector('input');
  var started = false, turns = [];

  function bubble(who, text) { var b = el('div', 'ask-msg ask-' + who, text); log.appendChild(b); log.scrollTop = log.scrollHeight; return b; }

  function showChips(ids) {
    chips.textContent = '';
    chips.scrollLeft = 0;
    ids.forEach(function (id) {
      var t = topic(id), b = el('button', 'ask-chip', t.chip);
      b.type = 'button';
      b.addEventListener('click', function () { ask(t.chip, t); });
      chips.appendChild(b);
    });
  }

  function reply(text, links, handover) {
    var b = bubble('bot', text);
    var row = el('div', 'ask-links');
    (links || []).forEach(function (l) {
      var a = el('a', '', l[0]);
      a.href = l[1];
      if (l[1] === '/#fit') a.setAttribute('data-fit-open', '');
      if (/^\/#/.test(l[1])) a.addEventListener('click', function () { dlg.close(); });
      else { a.target = '_blank'; a.rel = 'noopener'; }
      row.appendChild(a);
    });
    if (handover) {
      var w = el('a', '', 'WhatsApp Pryank'); w.href = WA; w.target = '_blank'; w.rel = 'noopener'; row.appendChild(w);
      var m = el('a', '', 'Email him'); m.href = 'mailto:wadherapryank@gmail.com'; row.appendChild(m);
    }
    if (row.children.length) b.appendChild(row);
    log.scrollTop = log.scrollHeight;
  }

  function live(q) {
    var wait = el('div', 'ask-msg ask-bot ask-wait', 'Writing a reply');
    log.appendChild(wait); log.scrollTop = log.scrollHeight;
    var c = new AbortController(), timer = setTimeout(function () { c.abort(); }, 12000);
    fetch(LIVE_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: turns.slice(-6) }), signal: c.signal })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        wait.remove();
        if (j && j.ok && j.reply) { turns.push({ role: 'assistant', content: j.reply }); reply(j.reply); track('ask_answer', { item: 'live' }); }
        else { reply(FALLBACK, [], true); track('ask_answer', { item: 'none' }); }
      })
      .catch(function () { wait.remove(); reply(FALLBACK, [], true); track('ask_answer', { item: 'none' }); })
      .then(function () { clearTimeout(timer); });
  }

  function ask(q, chosen) {
    bubble('me', q);
    turns.push({ role: 'user', content: q.slice(0, 300) });
    var t = chosen || answerFor(q);
    if (!t) {
      if (LIVE_URL && window.fetch) { live(q); showChips(CHIPS); return; }
      reply(FALLBACK, [], true); track('ask_answer', { item: 'none' }); showChips(CHIPS); return;
    }
    turns.push({ role: 'assistant', content: t.a });
    reply(t.a, t.l, !t.k);
    track('ask_answer', { item: t.id });
    showChips(t.n || CHIPS);
  }

  btn.addEventListener('click', function () {
    if (!started) {
      started = true;
      reply('Hello. I can tell you about Pryank\'s work, results and availability. Pick a topic or type a question.');
      showChips(CHIPS);
    }
    dlg.showModal();
    document.documentElement.classList.add('ask-open');
    track('ask_open', {});
    if (window.matchMedia('(pointer: fine)').matches) input.focus();
  });
  dlg.querySelector('.ask-x').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', function () { document.documentElement.classList.remove('ask-open'); btn.focus({ preventScroll: true }); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = input.value.trim();
    if (!q) return;
    input.value = '';
    ask(q);
  });

  /* The button comes and goes with the WhatsApp button, so the two always sit together. */
  if (fab) {
    var sync = function () { ['fab-hero', 'fab-scrolling', 'fab-aside'].forEach(function (c) { btn.classList.toggle(c, fab.classList.contains(c)); }); };
    new MutationObserver(sync).observe(fab, { attributes: true, attributeFilter: ['class'] });
    sync();
    fab.insertAdjacentElement('afterend', btn);
  } else document.body.appendChild(btn);
  document.body.appendChild(dlg);
  if (!document.getElementById('tabbar')) btn.classList.add('ask-notab');
})();
