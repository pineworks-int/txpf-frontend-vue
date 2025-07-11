## 🎯 Purpose & Context

_(The "Why?")_
A brief, one or two-sentence summary of the PR's goal. What feature or issue does this PR address? What is the overall objective?

---

## 🔗 Related Issues

_(Connecting to the plan)_
This section directly links the work back to your `README.md` project plan. We'll use a nested list to show the hierarchy clearly.

- **Epic:** `[Phase 1: Foundation Setup]`
- **Issue:** `[Issue 1.3: Authentication System]`
  - **Sub-task:** `[x] Set up Supabase authentication`
  - **Sub-task:** `[x] Create login/signup modal`
  - **Sub-task:** `[x] Implement JWT token handling`
  - **Sub-task:** `[x] Create protected route middleware`
  - **Sub-task:** `[x] Test authentication flow`

_(**Mentor Note:** If you were using real GitHub Issues, you could write `Closes #123` here, and GitHub would automatically close that issue when the PR is merged. Since we're using a README, this section serves as a manual checklist and reference.)_

---

## 🚀 Summary of Changes

_(The "What?")_
A high-level, bulleted list of the main changes implemented in this PR.

- Implemented a complete, end-to-end client-side authentication flow.
- Created a global state management system for UI (modal) and Auth state using Pinia.
- Developed a reactive login modal component.
- Refactored all auth logic into a reusable `useAuth` composable.
- Added a navigation guard to protect routes from unauthenticated access.

---

## 💡 Implementation Highlights

_(The "How?")_
This is the most important section for showcasing your work. We'll detail the key architectural decisions and patterns used.

### 1. Centralized State with Pinia

- **`stores/ui.ts`:** Manages the visibility of the `AuthModal`.
- **`stores/auth.ts`:** Acts as the single source of truth for the user's authentication status and data.

### 2. The `useAuth` Composable

- All direct Supabase calls (`signInWithPassword`, `signOut`, `onAuthStateChange`) are encapsulated here.
- This provides a clean, reusable API for the rest of the application, abstracting away the specifics of the auth provider.

### 3. Reactive UI Components

- **`AuthModal.vue`:** A fully self-contained component for user login. Uses the `useAuth` composable and a `try...catch` block for robust error handling.
- **`NavBar.vue`:** Now conditionally renders "Log In" or "Log Out" buttons based on the `isUserLoggedIn` state from the `authStore`.

### 4. Route Protection

- The `router/index.ts` file now includes a `beforeEach` navigation guard.
- This guard checks a route's `meta.requiresAuth` field to prevent unauthenticated access, redirecting users to the homepage.

---

## 👨‍🏫 Key Learnings & Best Practices

_(The "Showcase")_
Explicitly state the concepts you applied. This demonstrates deep understanding.

- **State Management:** Applied the Pinia store pattern for managing global, reactive state.
- **Separation of Concerns:** Decoupled UI state (`uiStore`) from data state (`authStore`).
- **Composable Architecture (DRY):** Abstracted logic into a `useAuth` composable to avoid repetition and make components cleaner.
- **Conditional Rendering:** Used `v-if`/`v-else` to build a reactive UI that responds to state changes.
- **Navigation Guards:** Implemented middleware in Vue Router to protect application routes.
- **Asynchronous Operations:** Handled promises gracefully using `async/await` and `try...catch` blocks.

---

## 🧪 How to Test

_(Verifying the work)_
Clear, step-by-step instructions for a reviewer to test the functionality.

1.  Pull the branch.
2.  Run `pnpm install` and `pnpm run dev`.
3.  **Logged Out State:**
    - Verify the "Log In" button is visible in the navbar.
    - Attempt to navigate to `/about-me`. Confirm you are redirected to the homepage.
4.  **Login Flow:**
    - Click "Log In" to open the modal.
    - Enter incorrect credentials and confirm an error is logged to the console.
    - Enter correct credentials and confirm the modal closes and the navbar updates to "Log Out".
5.  **Logged In State:**
    - Verify you can now access the `/about-me` page.
    - Refresh the page and confirm you remain logged in.
    - Click "Log Out" and confirm the navbar returns to the "Log In" state.
