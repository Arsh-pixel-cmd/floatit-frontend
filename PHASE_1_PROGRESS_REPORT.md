# Phase 1 Progress Report

## 1. Summary of completed work

Phase 1 successfully extracted a substantial amount of presentation and UI state from `src/Engine.tsx` into dedicated components and hooks. The refactor created explicit boundaries for modal handling, prompt input, pipeline sidebar rendering, phase transition overlays, engine status views, and canvas controls. It also introduced centralized route constants and reusable engine types to reduce implicit coupling and improve compile-time safety.

Key achievements:
- Separated UI/presentation from orchestration logic in `Engine.tsx`
- Centralized modal and overlay state management in `src/hooks/engineHooks.ts`
- Extracted persistent prompt and pipeline command UI into `src/components/Engine/PromptBar.tsx`
- Centralized route constants in `src/lib/routes.ts`
- Added typed engine-specific interfaces in `src/types/engine.ts`
- Reduced inline state and event handling inside `Engine.tsx`
- Verified the refactor with a successful production build (`npm run build`)

## 2. Exact files added

- `src/hooks/engineHooks.ts`
- `src/components/Engine/PromptBar.tsx`
- `src/components/Engine/EngineModalStack.tsx`
- `src/components/Engine/PipelineSidebar.tsx`
- `src/components/Engine/EngineStatusView.tsx`
- `src/components/Engine/PhaseTransitionOverlay.tsx`
- `src/lib/routes.ts`
- `src/types/engine.ts`

## 3. Exact files modified

- `src/Engine.tsx`
- `src/lib/store.ts`

## 4. Exact files cleaned up

- `src/Engine.tsx` — removed inline modal boilerplate, prompt bar JSX, status view JSX, overlay JSX, and sidebar rendering details
- `src/hooks/engineHooks.ts` — removed unused imports and consolidated canvas control state
- `src/lib/store.ts` — tightened the workflow store interface and added selectors relevant to engine state
- `src/components/Engine/PromptBar.tsx` — established a dedicated command bar component with explicit props
- `src/components/Engine/EngineModalStack.tsx` — created a reusable modal/overlay stack component
- `src/components/Engine/PipelineSidebar.tsx` — isolated sidebar rendering and iframe-safe output handling
- `src/components/Engine/EngineStatusView.tsx` — isolated loading/error display logic
- `src/components/Engine/PhaseTransitionOverlay.tsx` — isolated phase transition overlay logic
- `src/lib/routes.ts` — removed hard-coded route strings from inline code
- `src/types/engine.ts` — centralized reusable engine UI and workflow types

## 5. Why each change was made

- `src/hooks/engineHooks.ts`: to separate transient UI and canvas control state from the main orchestrator and avoid duplicating cursor/pan/highlighter logic inside `Engine.tsx`.
- `src/components/Engine/PromptBar.tsx`: to isolate the project prompt input, file attachment logic, phase launch controls, and key modal trigger from the engine layout and let `Engine.tsx` focus on orchestration.
- `src/components/Engine/EngineModalStack.tsx`: to consolidate all modal presentation logic and transitions in one place rather than scattering modal JSX across the engine container.
- `src/components/Engine/PipelineSidebar.tsx`: to extract selected-node output rendering and iframe-safe UI presentation from the canvas container.
- `src/components/Engine/EngineStatusView.tsx`: to make engine loading/error states reusable and extracted from the main render branch.
- `src/components/Engine/PhaseTransitionOverlay.tsx`: to isolate the phase transition splash screen and reduce inline conditional rendering inside `Engine.tsx`.
- `src/lib/routes.ts`: to eliminate ad hoc route strings and enforce shared route values.
- `src/types/engine.ts`: to create explicit contracts for modal state, canvas controls, workflow store state, and UI props.
- `src/lib/store.ts`: to align the workflow store interface with the newly extracted engine hooks and make state shape expectations explicit.

## 6. What architectural problem each change solves

- `Engine.tsx` coupling: reduces the single-file responsibility of `Engine.tsx` by moving UI and input concerns into smaller, self-contained modules.
- Modal scatter: `EngineModalStack` consolidates modal and overlay rendering, avoiding duplicated animation/visibility logic.
- Inline UI density: `PromptBar` removes tightly coupled prompt UI and file attachment state from the orchestrator.
- Route inconsistency: `routes.ts` prevents hard-coded route patterns and decouples routing from component logic.
- Type ambiguity: `engine.ts` provides explicit engine-type contracts that reduce runtime assumptions and improve editor/typechecker feedback.
- Canvas control complexity: `useCanvasControls` centralizes pan/draw/select behavior so the canvas event model can evolve separately.
- Sidebar rendering responsibility: `PipelineSidebar` removes output presentation from the canvas and keeps node selection details in a dedicated pane.

## 7. What responsibilities were reduced from Engine.tsx

- Prompt input rendering and attachment upload handling
- Modal lifecycle and token/key modal state
- Output report button and modal stack display
- Phase transition overlay rendering
- Engine status / loading / error presentation
- Sidebar selected-node output rendering
- Canvas event state declaration for sticky notes, text labels, drawing, and panning
- Route constant references via `ROUTES` centralization
- Reusable type definitions for engine UI state

## 8. What routing inconsistencies were fixed

- Introduced `src/lib/routes.ts` and exported a single `ROUTES` constant object.
- This eliminates the previous risk of route string mismatches caused by multiple in-file hard-coded path literals.
- `ROUTES` now formalizes route keys like `landing`, `dashboard`, `canvas`, and `profile`.

## 9. What UI/presentation logic was extracted

- Project prompt command bar and pipeline execution controls (`PromptBar`)
- Modal overlay stack and token/key modal presentation (`EngineModalStack`)
- Sidebar output details and iframe-safe agent output rendering (`PipelineSidebar`)
- Engine startup/loading/error state display (`EngineStatusView`)
- Phase transition splash screen (`PhaseTransitionOverlay`)

## 10. What dead code or unused imports were removed

- Removed `useBuilderStore` import from `src/hooks/engineHooks.ts` because the hook no longer directly mutates builder state.
- Removed `supabase` import from `src/hooks/engineHooks.ts` after separating modal/key event handling from direct Supabase access.
- Cleaned inline modal state variables inside `Engine.tsx` by moving them into `useModalState`.
- Reduced unnecessary inline React event handler scaffolding in `Engine.tsx` by extracting it to hooks/components.

## 11. Build verification results

- Verified using `npm run build` in the repository root.
- Result: successful production build.
- No TypeScript or Vite compilation errors were reported.

## 12. Remaining Phase 1 tasks

- Complete the final `Engine.tsx` decomposition by moving remaining inline render sections to dedicated components if safe.
- Add shared route usage in existing navigation components so `src/lib/routes.ts` is fully adopted.
- Replace the remaining untyped `any` usage in extracted engine hooks and new components with stronger typed interfaces.
- Verify that `src/lib/store.ts` changes fully align with the engine hook props and selectors.
- Add regression tests or storybook previews for extracted UI components if available.

## 13. Risks avoided intentionally

- Avoided moving the core pipeline execution loops (`runFullPipeline`, `runPhase`) into new abstractions too early.
- Avoided refactoring the underlying graph layout algorithm in the same phase as UI extraction.
- Avoided changing the business logic in `Engine.tsx` during layout and runtime state extraction.
- Avoided introducing new routing behavior until route constants and navigation were stabilized.
- Avoided consolidating deeply coupled builder store state into the engine hooks before first verifying existing behavior.

## 14. What was intentionally NOT refactored yet and why

- The core engine execution and batching logic remains inside `Engine.tsx` because it is high-risk and behavior-sensitive.
- Canvas node rendering and layout computation remain intact to preserve current flow and minimize regression.
- `BuilderCanvas` and `BuilderSidebar` were left in place to keep the builder-mode surface stable while pipeline UI extraction proceeds.
- Supabase persistence and auto-save still live in `Engine.tsx` for now, because those flows are foundational and should be isolated after the UI boundary stabilization.

## 15. Current architecture improvements achieved

- Reduced Engine.tsx from a monolithic view controller toward a coordinator component.
- Enabled a cleaner separation between orchestration logic and presentation layout.
- Introduced a dedicated hook layer for canvas and modal state, which improves reuse and testability.
- Added explicit route constants to reduce string coupling across navigation surfaces.
- Centralized engine types for stronger type-checking and developer intent.

## 16. Technical debt still remaining

- `Engine.tsx` still contains high-density execution logic and should be broken into smaller pipeline coordination modules.
- There are still broad `any` and weakly typed state definitions in both `store.ts` and the new components.
- The route constant file is added, but full adoption across the app is incomplete.
- The `useWorkflowStore` API still allows free-form `any` for many state setters.
- There is no explicit test coverage around the new component boundary contracts yet.

## 17. Recommended next safe steps

1. Stabilize `Engine.tsx` as a pure coordinator by extracting the remaining heavy render branches into dedicated engine UI or layout components.
2. Replace the remaining `any` typed props and store signatures in `src/types/engine.ts` and `src/lib/store.ts` with stricter domain models.
3. Wire `src/lib/routes.ts` into navigation components and remove route string literals from the app.
4. Add focused component-level tests for `PromptBar`, `EngineModalStack`, `PipelineSidebar`, `EngineStatusView`, and `PhaseTransitionOverlay`.
5. Validate behavior with a smoke regression test for pipeline execution after the next extract.

## Architecture Notes

### Before

- `Engine.tsx` contained orchestration, routing assumptions, UI wiring, modal state, prompt input, sidebar presentation, and canvas controls in one file.
- Route strings were implicit and scattered.
- Modal display and phase-transition rendering were tightly coupled with the engine render tree.
- Canvas event state and sticky note/label logic were mixed with engine lifecycle effects.

### After

- `Engine.tsx` now acts as the orchestration shell with reduced responsibility.
- Presentation concerns are delegated to `PromptBar`, `EngineModalStack`, `PipelineSidebar`, `EngineStatusView`, and `PhaseTransitionOverlay`.
- Modal/input hooks are centralized in `src/hooks/engineHooks.ts`.
- Route values are centralized in `src/lib/routes.ts` and can be reused consistently.
- Engine-specific UI types live in `src/types/engine.ts`.

### Coupling reductions

- Decoupled modal state from engine rendering by moving it into `useModalState`.
- Decoupled canvas interaction state from render logic by moving it into `useCanvasControls`.
- Decoupled prompt UI from orchestration with `PromptBar` props.
- Decoupled selected-node output rendering from the main canvas container with `PipelineSidebar`.

### Maintainability improvements

- Smaller, focused components mean future changes to modal flow, prompt input, or sidebar output are localized.
- Central route constants simplify cross-file navigation updates.
- Shared engine types reduce the chance of mismatched prop shapes and modal state contracts.
- The extracted hook layer enables future memoization or standalone hook testing.

### Future refactor preparation benefits

- The new component/hook boundaries create a safer foundation for moving execution workflows out of `Engine.tsx` next.
- Centralized types and route constants make the next refactor less error-prone.
- The reduced size of `Engine.tsx` makes it easier to identify the remaining orchestration surface.
- The extracted UI modules are ready for potential isolation into a `components/EngineShell` or `engine` feature folder later.
