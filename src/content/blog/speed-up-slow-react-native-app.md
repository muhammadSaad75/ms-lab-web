---
title: "How to Speed Up a Slow React Native App: A Practical Checklist"
description: Slow startup, janky lists or laggy screens? A step-by-step checklist for finding and fixing the most common React Native performance problems.
date: 2026-10-10
service: app-performance-optimization
---

Most slow React Native apps are not slow because of React Native. They are slow because of a handful of common, fixable problems: too much work at startup, components that re-render far more than they need to, and long lists that are not virtualized properly.

This checklist is the order we work through when an app feels slow. Fix the biggest problem first, measure again, then move on.

## 1. Measure in a release build first

Development builds are much slower than release builds. Dev mode adds warnings, checks and a debugger connection, so it is not a fair test. Always judge performance on a **release build on a real, mid-range Android device**. If the app is fast there, it will be fast almost everywhere.

Write down a few numbers before changing anything:

- **Startup time**: from tapping the icon to the first useful screen.
- **Frame rate** while scrolling your heaviest list.
- **Memory use** after navigating around for a minute.

Without a baseline you cannot tell whether a change helped.

## 2. Make sure Hermes and the New Architecture are on

Hermes is the JavaScript engine built for React Native. It precompiles your JavaScript to bytecode, which noticeably improves startup time and memory use. It is the default in current React Native versions, but older apps sometimes still have it turned off.

The New Architecture (Fabric and TurboModules) is also the default in recent versions. If your app is on an old version, upgrading is often the single biggest performance win. It also keeps you on supported libraries.

## 3. Do less work at startup

Everything that runs before your first screen appears adds to startup time. Common culprits:

- Importing large libraries at the top of `App.tsx` that are only used on one screen.
- Fetching data, initializing SDKs and reading storage all at once before rendering anything.
- Large images or fonts loaded upfront.

Enable **inline requires** in your Metro config so modules are loaded when first used rather than all at startup. Show the first screen as soon as possible and load everything else afterwards.

## 4. Stop unnecessary re-renders

Use the React DevTools **Profiler** to record an interaction and see which components re-render and why. Typical fixes:

- Wrap expensive child components in `React.memo`.
- Keep values and callbacks passed as props stable with `useMemo` and `useCallback`, or let the React Compiler handle this.
- Split large context providers, so a change to one value does not re-render the whole app.
- Select only the state a component needs from your store, not the entire store.

## 5. Fix your lists

Long lists are the most common source of jank. Never render a long list with `ScrollView` and `.map()`. That renders every item at once. Instead:

- Use `FlatList`, or a faster list library such as FlashList, for anything longer than a screen.
- Give every item a stable `keyExtractor`.
- Provide `getItemLayout` when items have a fixed height.
- Keep list items light: memoize them and avoid heavy work inside `renderItem`.

## 6. Optimize images

Large images use a lot of memory and slow down scrolling. Serve images at the size they are displayed, use a caching image component, and prefer modern formats such as WebP.

## 7. Move animations off the JavaScript thread

If animations stutter whenever the app is busy, they are probably running on the JavaScript thread. Use the native driver for `Animated`, or a library like Reanimated, so animations run on the UI thread and stay smooth even when JavaScript is working.

## 8. Defer heavy work until after transitions

Navigating to a screen and immediately doing heavy processing makes the transition stutter. Let the screen appear first, then start the expensive work, and show a lightweight placeholder while it runs.

## Measure again

After each change, repeat the measurements from step 1. Keep the changes that make a real difference and undo the ones that only add complexity.

If your app is still slow after this checklist, or you would rather have someone else find the bottlenecks, [our app performance optimization service](/services/app-performance-optimization/) starts with exactly this kind of audit.
