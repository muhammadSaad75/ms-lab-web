import { Smartphone, Layers, Globe, Server, Plug, Package, Gauge, LifeBuoy, type LucideIcon } from 'lucide-react'
// Each service gets its own page at /services/<slug>/. `summary` is the meta description (aim for 140–160 chars);
// `intro`, `included` and `faqs` are the page body — the more specific to real projects, the better it ranks.
export type Service = {
  slug: string; icon: LucideIcon; title: string; desc: string; capabilities: string[]; home?: boolean
  summary: string; intro: string[]; included: [string, string][]; stack: string[]; faqs: [string, string][]
}
export const process = [
  ['Understand', 'Understand the problem, users and requirements.'],
  ['Plan', 'Define the product strategy, architecture and implementation approach.'],
  ['Build', 'Develop the product using modern technologies and clean engineering practices.'],
  ['Launch', 'Test, optimize and release the product.'],
  ['Improve', 'Use feedback and data to continuously improve the product.'],
] as const
export const services: Service[] = [
  {
    slug: 'mobile-app-development', icon: Smartphone, title: 'Mobile App Development', home: true,
    desc: 'Modern, scalable mobile applications for iOS and Android.',
    capabilities: ['Native-feeling UX', 'Store release support', 'Offline & push notifications'],
    summary: 'iOS and Android app development by MS Labs — from idea and UX to App Store and Google Play release, with offline support, push notifications and ongoing updates.',
    intro: [
      'A good mobile app does one job well and feels fast doing it. We design and build iOS and Android apps around the problem your users actually have, then take them all the way to the App Store and Google Play.',
      'We build our own apps too, so we treat client projects the way we treat our products: clear scope, clean code, and an app that is easy to keep improving after launch.',
    ],
    included: [
      ['Product & UX planning', 'We turn your idea into user flows and screens, and cut scope to what the first release really needs.'],
      ['iOS and Android apps', 'One codebase for both platforms in most cases, with native modules where the platform demands it.'],
      ['Offline support & sync', 'Local storage and background sync so the app stays useful on weak or no connection.'],
      ['Push notifications', 'Targeted notifications through Firebase Cloud Messaging and Apple Push Notification service.'],
      ['Store release', 'App Store and Google Play listings, signing, review submission and handling rejections.'],
      ['Analytics & crash reporting', 'Know how people use the app and catch crashes before users report them.'],
    ],
    stack: ['React Native', 'TypeScript', 'Expo', 'Firebase', 'Node.js', 'REST APIs'],
    faqs: [
      ['How long does it take to build a mobile app?', 'A focused first version usually takes 6–12 weeks, depending on the number of screens, integrations and backend work. We agree a timeline in writing before work starts.'],
      ['How much does a mobile app cost?', 'Cost depends on scope: screens, backend, integrations and design. After a short discovery call we give you a fixed quote for a clearly defined first release.'],
      ['Do you build for both iOS and Android?', 'Yes. We usually use React Native so both platforms share one codebase, which keeps cost and maintenance lower.'],
      ['Will you publish the app to the stores?', 'Yes. We handle store listings, builds, signing and review submission, and the app is published under your developer account.'],
      ['Who owns the code?', 'You do. The source code and store accounts belong to you once the project is paid for.'],
    ],
  },
  {
    slug: 'react-native-development', icon: Layers, title: 'React Native Development', home: true,
    desc: 'Cross-platform applications with maintainable and production-ready architecture.',
    capabilities: ['Single codebase, two platforms', 'Native module integration', 'Typed, testable code'],
    summary: 'React Native app development: one TypeScript codebase for iOS and Android, native module integration, and production-ready architecture that stays easy to maintain.',
    intro: [
      'React Native lets one team ship a single codebase to both iOS and Android without giving up a native look and feel. It is our main mobile stack, and the one we use for our own apps.',
      'We start new apps on React Native, take over existing ones, and upgrade old projects to current React Native versions and the New Architecture.',
    ],
    included: [
      ['New React Native apps', 'Typed, well-structured apps with navigation, state management and API layers set up properly from day one.'],
      ['Native modules', 'Bridging to native iOS (Swift) and Android (Kotlin) code when a library does not cover what you need.'],
      ['Upgrades & migrations', 'Moving older apps to current React Native versions, the New Architecture and maintained libraries.'],
      ['Expo or bare workflow', 'We pick Expo or a bare setup based on your native needs, not habit.'],
      ['Testing & CI', 'Unit and component tests, plus automated builds so releases are repeatable.'],
      ['Code reviews & rescue', 'Audits of existing React Native codebases with a clear, prioritized fix list.'],
    ],
    stack: ['React Native', 'TypeScript', 'Expo', 'React Navigation', 'Reanimated', 'Jest'],
    faqs: [
      ['Is React Native good enough for production apps?', 'Yes. Many large apps run on React Native. With the New Architecture and the Hermes engine, performance is close to native for most kinds of apps.'],
      ['Can you take over an existing React Native app?', 'Yes. We start with a code audit, fix the most important issues, and then continue with features or maintenance.'],
      ['Can you upgrade our old React Native version?', 'Yes. We upgrade step by step, replace unmaintained libraries and test on real devices before release.'],
      ['Expo or bare React Native?', 'Expo suits most apps today and speeds up development. We use a bare setup when you need deep native customization.'],
    ],
  },
  {
    slug: 'web-application-development', icon: Globe, title: 'Web Application Development', home: true,
    desc: 'Responsive and modern web applications designed around real user needs.',
    capabilities: ['React & TypeScript', 'Responsive, accessible UI', 'SEO-friendly delivery'],
    summary: 'Custom web application development with React and TypeScript: dashboards, portals and SaaS products that are fast, responsive, accessible and SEO-friendly.',
    intro: [
      'From internal dashboards to customer portals and SaaS products, we build web applications that load fast, work on every screen size, and are easy to extend.',
      'Public pages are prerendered so search engines can read them, and app screens are built as typed React components that your team can maintain.',
    ],
    included: [
      ['Web apps & dashboards', 'Admin panels, customer portals and internal tools built around your real workflows.'],
      ['SaaS products', 'Accounts, roles, subscriptions and billing for software sold online.'],
      ['Marketing & product sites', 'Fast, prerendered websites with proper SEO metadata, sitemaps and structured data.'],
      ['Responsive, accessible UI', 'Layouts that work from phone to desktop, with keyboard and screen-reader support.'],
      ['Performance', 'Code splitting, caching and Core Web Vitals tuning so pages load quickly.'],
      ['Deployment', 'CI/CD and hosting setup on platforms such as Vercel, Netlify, GitHub Pages or your own server.'],
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Next.js', 'Tailwind CSS', 'Node.js'],
    faqs: [
      ['Will my web app be SEO-friendly?', 'Yes. Public pages are prerendered or server-rendered, with titles, descriptions, sitemaps and structured data set up.'],
      ['Can you redesign or rebuild an existing website?', 'Yes. We can rebuild it on a modern stack while keeping your URLs and search rankings intact.'],
      ['Do you also build the backend?', 'Yes. See our backend & API development service. We can build the full stack or work with your existing API.'],
      ['Where will it be hosted?', 'Wherever suits you. We set up hosting, the domain and automated deployments as part of the project.'],
    ],
  },
  {
    slug: 'backend-api-development', icon: Server, title: 'Backend & API Development', home: true,
    desc: 'Reliable APIs and backend systems that power digital products.',
    capabilities: ['REST API design', 'Authentication & data models', 'Documentation'],
    summary: 'Backend and REST API development for mobile and web apps: data modelling, authentication, documentation and reliable, secure deployment.',
    intro: [
      'Every app depends on a backend it can trust. We design and build APIs, databases and server logic that are secure, documented and ready to grow with your product.',
      'Because we build the apps that use these APIs too, we design endpoints around what the client actually needs. That means fewer round-trips and simpler app code.',
    ],
    included: [
      ['REST API design', 'Consistent, versioned endpoints with clear error handling and pagination.'],
      ['Data modelling', 'Database schemas designed for your data and queries, with migrations from the start.'],
      ['Authentication & roles', 'Secure sign-in (email, phone OTP, social login) and role-based access control.'],
      ['Admin & background jobs', 'Scheduled tasks, queues, emails and admin endpoints.'],
      ['API documentation', 'OpenAPI/Swagger docs so frontend and third-party developers can integrate quickly.'],
      ['Deployment & monitoring', 'Containerized deployment, logging and alerts so problems are caught early.'],
    ],
    stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Firebase', 'Docker'],
    faqs: [
      ['Which backend technology do you use?', 'Mostly Node.js with TypeScript and PostgreSQL. We also work with Firebase and other existing stacks when that fits better.'],
      ['Can you build an API for our existing app?', 'Yes. We can build a new API, or extend and document the one you already have.'],
      ['How do you handle security?', 'Validated inputs, hashed credentials, token-based auth, least-privilege access and secrets kept out of code.'],
      ['Will we get documentation?', 'Yes. Every API we build comes with OpenAPI documentation and setup instructions.'],
    ],
  },
  {
    slug: 'api-integrations', icon: Plug, title: 'Third-Party API Integration',
    desc: 'Connect your product with payments, messaging, maps and other services.',
    capabilities: ['Payments & messaging', 'Webhooks & sync', 'Error handling'],
    summary: 'Third-party API integration for apps and websites: payment gateways, SMS and WhatsApp messaging, maps, email, CRMs and webhooks, with robust error handling.',
    intro: [
      'Most products depend on outside services such as payments, messaging, maps, email and CRMs. We connect your app to them reliably, so a slow or failing provider does not break your product.',
      'We handle retries, webhooks, idempotency and logging, which are the parts that usually cause problems in production.',
    ],
    included: [
      ['Payment gateways', 'Card and wallet payments, subscriptions, refunds and payment webhooks.'],
      ['Messaging', 'SMS, WhatsApp Business, email and push notification providers.'],
      ['Maps & location', 'Maps, geocoding, places search and route calculations.'],
      ['CRMs & business tools', 'Syncing data with CRMs, spreadsheets, accounting and support tools.'],
      ['Webhooks & sync', 'Receiving and verifying events, background sync and conflict handling.'],
      ['Error handling', 'Retries, timeouts, idempotency keys and alerts when an integration fails.'],
    ],
    stack: ['Node.js', 'TypeScript', 'REST & webhooks', 'OAuth 2.0', 'Message queues'],
    faqs: [
      ['Which services can you integrate?', 'Any service with a documented API, including payment gateways, messaging providers, maps, CRMs and analytics tools.'],
      ['Can you integrate local payment gateways?', 'Yes. If the provider offers an API or SDK, we can integrate it into your app or website.'],
      ['What happens if the third-party service goes down?', 'We design for it with timeouts, retries, queued jobs and clear error states, so your app degrades gracefully.'],
    ],
  },
  {
    slug: 'sdk-development', icon: Package, title: 'SDK Development', home: true,
    desc: 'Reusable SDKs and integrations for embedding functionality into existing applications.',
    capabilities: ['Clean public APIs', 'Cross-platform packages', 'Versioning & docs'],
    summary: 'SDK development for mobile and web: React Native, JavaScript and native packages with clean public APIs, semantic versioning and clear documentation for integrators.',
    intro: [
      'If other apps need to embed your product or service, an SDK makes that easy. We build SDKs that developers enjoy integrating, with small, clear APIs and good documentation.',
      'We package the same features for React Native, web (JavaScript/TypeScript) and native platforms, and version them so updates do not break your integrators.',
    ],
    included: [
      ['Public API design', 'A small, typed and well-named API surface that is hard to misuse.'],
      ['React Native & JS packages', 'npm packages with TypeScript types, tree-shaking and native modules where needed.'],
      ['Native wrappers', 'iOS and Android libraries, or bridges to your existing native SDKs.'],
      ['Versioning & releases', 'Semantic versioning, changelogs and automated publishing.'],
      ['Documentation & samples', 'Getting-started guides, API reference and a working example app.'],
      ['Integration support', 'Helping your partners integrate the SDK and resolving issues they hit.'],
    ],
    stack: ['TypeScript', 'React Native', 'Swift', 'Kotlin', 'npm', 'GitHub Actions'],
    faqs: [
      ['What is an SDK?', 'A software development kit is a package other developers add to their apps to use your service, for example payments, chat or analytics, without building it themselves.'],
      ['Which platforms can the SDK support?', 'React Native, web (JavaScript/TypeScript), and native iOS and Android, depending on who your integrators are.'],
      ['Do you write the documentation?', 'Yes. Every SDK ships with a quick-start guide, an API reference and an example app.'],
    ],
  },
  {
    slug: 'app-performance-optimization', icon: Gauge, title: 'App Performance Optimization', home: true,
    desc: 'Performance improvements, bug fixes and integrations for existing products.',
    capabilities: ['Startup & render profiling', 'Bundle & memory tuning', 'Crash & bug fixing'],
    summary: 'Mobile and web app performance optimization: faster startup, smooth scrolling, smaller bundles, lower memory use and fewer crashes, measured before and after.',
    intro: [
      'A slow, janky or crashing app loses users. We find out where your app spends its time and memory, fix the biggest problems first, and show the improvement with before-and-after measurements.',
      'We work on React Native, React and web apps, whether we built them or not.',
    ],
    included: [
      ['Performance audit', 'Profiling startup, rendering, network and memory to find the real bottlenecks.'],
      ['Startup time', 'Lazy loading, smaller bundles and deferred work so the app opens faster.'],
      ['Smooth UI', 'Fixing dropped frames, heavy re-renders and slow lists.'],
      ['Memory & battery', 'Finding leaks, oversized images and unnecessary background work.'],
      ['Crash & bug fixing', 'Reproducing and fixing crashes from your crash reports, worst first.'],
      ['Web performance', 'Core Web Vitals, caching and bundle-size work for web apps.'],
    ],
    stack: ['React Native', 'Hermes', 'Flipper / React DevTools', 'Xcode Instruments', 'Android Studio Profiler', 'Lighthouse'],
    faqs: [
      ['Can you speed up an app you did not build?', 'Yes. Most of our optimization work is on existing codebases. We start with an audit and a prioritized list of fixes.'],
      ['How do you measure improvement?', 'We measure startup time, frame rate, memory and crash rate before and after each change, on real devices in release builds.'],
      ['Do we need to rewrite the app?', 'Rarely. Most performance problems are fixed with targeted changes, not rewrites.'],
    ],
  },
  {
    slug: 'maintenance-support', icon: LifeBuoy, title: 'Maintenance & Support',
    desc: 'Long-term product support so your software stays reliable.',
    capabilities: ['Dependency & OS updates', 'Bug triage', 'Incremental improvements'],
    summary: 'Ongoing app and website maintenance: OS and dependency updates, store compliance, bug fixes, monitoring and small improvements on a monthly plan.',
    intro: [
      'Software needs regular care. New iOS and Android versions, store policy changes and outdated libraries can break an app that worked fine last year. We keep your product up to date, secure and running smoothly.',
      'Maintenance is usually a simple monthly plan with agreed response times, so you always know who to call.',
    ],
    included: [
      ['OS & store compliance', 'Updates for new iOS and Android versions and changing App Store / Google Play requirements.'],
      ['Dependency updates', 'Keeping frameworks and libraries current and replacing unmaintained ones.'],
      ['Bug triage & fixes', 'Investigating reported issues and fixing them in order of impact.'],
      ['Monitoring', 'Watching crash reports, errors and uptime, and acting before users complain.'],
      ['Small improvements', 'Ongoing small features and UX tweaks based on user feedback.'],
      ['Backups & security', 'Backups, security patches and access reviews for your servers and accounts.'],
    ],
    stack: ['React Native', 'React', 'Node.js', 'Sentry / Crashlytics', 'GitHub Actions'],
    faqs: [
      ['Can you maintain an app built by another team?', 'Yes. We begin with a short audit to understand the codebase and set up builds, then take over maintenance.'],
      ['How does billing work for maintenance?', 'Usually a monthly plan with a set number of hours and agreed response times, adjusted to your needs.'],
      ['Why does my app need updates if nothing is broken?', 'Apple and Google regularly raise the minimum OS and SDK requirements. Apps that fall behind can be removed from the stores or stop working on new devices.'],
    ],
  },
]
