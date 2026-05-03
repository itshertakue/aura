# System Architecture: Aura Carbon Intelligence

## 1. Technical Strategy
Aura is designed as a high-performance, AI-native platform for real-time carbon intelligence. The architecture prioritizes low-latency data processing and multi-modal intelligence to automate the transition from unstructured ESG documents to actionable financial insights.

## 2. Infrastructure Stack
- **Framework:** Next.js 15 (App Router) using React Server Components for optimized performance.
- **AI Engine:** Google Gemini 1.5 Flash via the Google Generative AI SDK, chosen for its efficiency and 1M+ token context window.
- **Styling:** Custom CSS-based Design System focusing on "Glassmorphism" to provide a premium, futuristic SaaS aesthetic.
- **Deployment:** Firebase App Hosting (Google Cloud) for seamless SSR and managed global distribution.

## 3. Key Components
### A. The Intelligence Core (`/api/chat`)
The core reasoning engine that fuses real-time supply chain metrics with LLM strategic capabilities. It uses "Dynamic Context Injection" to provide personalized, data-driven recommendations.

### B. Auto-Reader Ingestion
A vision-capable pipeline that processes logistics and utility documents. It extracts high-fidelity carbon intensity data, removing the manual overhead of carbon accounting.

### C. The Impact Layer
A visualization engine that maps carbon intensity across global coordinates, identifying "Hotspots" in the supply chain for immediate optimization.

## 4. Security & Compliance
- Environment variables managed via Firebase Secrets.
- Stateless API design ensuring data privacy and scalability.
- Compliance-first logic designed for upcoming 2026 global carbon tax regulations.
