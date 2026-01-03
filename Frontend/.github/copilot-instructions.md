# RateMySupplements Frontend - AI Coding Instructions

## Project Overview
A React 19 + TypeScript supplement review platform using Vite, Tailwind CSS v4, and react-router-dom v7. Users can browse brands, view products, and submit reviews. Admin approval workflow exists at `/secret`.

## Architecture

### Core Data Flow
- **Backend API**: All data fetched from `http://localhost:8080/api/` (Spring Boot backend assumed)
- **Custom Hooks**: Use `useFetch` hook for all API calls - returns `{ get, post, patch, del }` methods
- **State Management**: Local `useState` per component, no global state library
- **Routing**: React Router with state passing via `navigate(path, { state: {...} })`

### Key Patterns

**API Calls with useFetch:**
```tsx
const { get, post } = useFetch("http://localhost:8080/api/");
// Usage: get("endpoint"), post("endpoint", body)
```

**Error Handling Pattern** (auto-dismissing toast):
```tsx
const [error, setError] = useState(false);
// On error:
setError(true);
setTimeout(() => setError(false), 3000);
// Render: {error && <Error />}
```

**Loading States**: Use `<Load />` component during data fetches

**Navigation with State**:
```tsx
navigate(`/product/${brandName}/${supplementName}/${id}`, { state: { supplement } });
// Receiving: const { supplement } = location.state;
```

## File Structure Conventions

| Directory | Purpose |
|-----------|---------|
| `src/types/` | TypeScript interfaces (`Brand`, `Supplement`, `Review`, `Tag`) |
| `src/hooks/` | Custom hooks (`useFetch`, `useDebounce`) |
| `src/components/` | Reusable UI (`Carousel`, `Search`, `NavBar`, `Load`, `Error`) |
| `src/pages/` | Route-level components |
| `src/misc/` | App configuration (`Router.tsx`) |

## Styling

- **Tailwind CSS v4** with `@tailwindcss/vite` plugin
- **Brand Colors**: emerald-500 (primary), gray/slate (neutrals)
- **Common Classes**: `rounded-xl`, `shadow-lg`, `transition-colors`, `cursor-pointer`
- **Responsive**: Use `md:` breakpoints (e.g., `min-w-[200px] md:min-w-[240px]`)

## API Endpoints (Backend)

| Entity | Endpoints |
|--------|-----------|
| Supplements | `supplement/top-rated`, `supplement/getSupplement?supplementId=`, `supplement/searchByName?name=` |
| Brands | `brand/getBrandByName?name=`, `brand/createBrand` |
| Reviews | `review/getReviews?supplementId=`, `review/approveReview?reviewId=` |

## Commands
```bash
npm run dev      # Start dev server (Vite)
npm run build    # TypeScript check + production build
npm run lint     # ESLint
```

## Critical Notes

1. **Icons**: Use `lucide-react` for all icons (ChevronLeft, Search, Loader2, etc.)
2. **Search Debouncing**: Use `useDebounce` hook (500ms default) for search inputs
3. **Form Validation**: Inline with disabled button pattern: `disabled={!field.trim()}`
4. **Image Handling**: Always provide `alt` text; use `object-cover` for consistent sizing
5. **Route Parameters**: ProductPage uses `/product/:brandName/:supplementName/:supplementId`
