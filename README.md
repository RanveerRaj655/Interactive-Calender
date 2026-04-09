# Interactive Wall Calendar

**Live Deployment:** [https://interactive-calender-xi.vercel.app](https://interactive-calender-xi.vercel.app)

An interactive, strictly frontend React/Next.js calendar widget designed around a physical "wall calendar" aesthetic. This project fulfills the interactive calendar frontend challenge, focusing deeply on fluid UI/UX, complex client state management, responsive constraints, and creative design liberties. 

---

## ✨ Features

- **The Wall Calendar Aesthetic:** Built using a dedicated Hero Image column representing the month's theme, accompanied by a realistic "spiral binding" graphical component mimicking physical paper calendars.
- **Advanced Day Range Engine:** Select start and end dates natively across the calendar grid. Employs mathematically robust overlap validation to support multiple concurrent, customized colored ranges!
- **Integrated Note-Taking System:** 
  - **Month Notes:** Document broad goals.
  - **Range Notes:** Attach granular plans securely to the specific ranges you mapped.
  - **Day Notes:** Drop daily reminders.
- **Client-Side Persistence:** Because backend requests were prohibited, application state actively leverages `zustand` combined with `localStorage`. All ranges, image uploads, and notes are perfectly saved strictly within the user's browser without external databases.
- **Fully Responsive Architecture:** Responsive CSS grids scale dynamically. At `1024px`, it renders a wide 3-column physical layout (Hero -> Calendar -> Notes). On mobile and tablet, it seamlessly collapses into a touch-friendly vertical stack!

#### 🚀 Creative Liberties Taken
- **Motion Animations:** Framer Motion physically "flips" the pages via slide transactions when shifting back and forth through time!
- **Intelligent Theming:** The application changes its core Tailwind CSS colors actively depending on the active Month to complement the hero visual.
- **Custom Image Uploading:** Users can override the default Unsplash hero photos by uploading custom images directly from their machine. Images are converted client-side to raw base64 data via the `FileReader` API and saved in localStorage.
- **Holiday Intelligence:** Automatic detection rendering tooltips organically onto days acting as major holidays.

---

## 📂 Project Structure

```text
src/
├── app/                  # Next.js global layout execution
├── components/
│   ├── calendar/         # Core chronological math rendering, daily cells, and Flip Animations
│   ├── hero/             # Base64 responsive Image Uploader and Banner
│   ├── notes/            # Responsive pane holding Month, Range, and Daily text handlers!
│   └── ui/               # Reusable primitives (Buttons, Tooltips, Modals)
├── hooks/                # Modular abstractions separating complicated drag selection ranges from views
├── lib/                  # Deep utility toolboxes (date maths, calendar generators, holiday arrays)
├── store/                # Persistent Zustand logic containing the brain of the user configs
└── types/                # Strict TypeScript contracts guarding the entirety of the database shapes
```

---

## 🛠 Tech Stack 

- **Framework:** Next.js 15 (App Router Mode) / React 19
- **Styling:** Tailwind CSS v4 
- **State Management:** Zustand + `persist` middleware
- **Icons & Animation:** Lucide React, Framer Motion
- **Language:** TypeScript

---

## 💻 Running the Project Locally

Clone the repository and install the dependencies:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/wall-calendar.git
cd wall-calendar
npm install
```

Start the Next.js local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the application.
