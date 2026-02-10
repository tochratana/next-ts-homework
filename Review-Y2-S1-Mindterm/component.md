## និយាយអំពី component នៅក្នុង React/Next

Component = UI block តូចៗ ដែលយើងបង្កើត ដើម្បីប្រើ build Website/App

Example UI បំបែកជា Component

- ឧទាហរណ៍ Website មួយ:
  - Navbar
  - Sidebar
  - Product Card
  - Button
  - Footer

Example :

```jsx
export default function Button() {
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded">
      Click me
    </button>
  );
}
```

នៅពេលដែលយើងចង់ប្រើប្រាស់យើងគ្រាន់តែ call

```jsx
import Button from "./Button";

export default function Page() {
  return (
    <div>
      <h1>Hello</h1>
      <Button />
    </div>
  );
}
```

### Component មាន 2 ប្រភេទ (Next.js)

#### 1. Server Component (Default)

ជាធម្មតាជា Server Component នៅពេលដែលយើងប្រើ async + fetch

Run on Server

```tsx
export default async function Page() {
  const res = await fetch("https://api.com/data");
  const data = await res.json();

  return <div>{data.title}</div>;
}
```

#### 2. Client Component

Run on Browser

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

**Using Fetch in Client Side**

```tsx
"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<any>(null); // create state for get value from api

  useEffect(() => {
    fetch("https://api.com/data")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  if (!data) return <p>Loading...</p>;

  return <div>{data.title}</div>;
}
```

**Using use() hook for fetch api in client**

```tsx
"use client";

import { use } from "react";

async function getProducts() {
  const res = await fetch("https://api.escuelajs.co/api/v1/products");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export default function ProductsClient() {
  const products = use(getProducts()); // ✅ await promise

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.slice(0, 6).map((p: any) => (
        <div key={p.id} className="border p-4">
          <h2>{p.title}</h2>
          <p>${p.price}</p>
        </div>
      ))}
    </div>
  );
}
```


---

**Client-side options**

1. React Query
- Fetch + cache data automatically
- Like RTK Query, but does NOT require Redux
- Good for interactive UI, polling, refetching

2. RTK Query
- Redux + fetch + cache all in one
- Works only in client components (hooks)
- Can support SSR with prefetch + hydration\

3. use() + fetch
- Client-side async fetching in React 18+ / Next.js App Router
- Cleaner than useEffect + useState
- Can use with <Suspense> for fallback UI

4. fetch + useEffect + useState
- Classic way for client-side fetching
- Manual loading, error handling, caching

**Server-side options**
- async + fetch in Server Component
- Runs on server before sending HTML
- SEO-friendly
- Can hide API keys
- No useState / useEffect / client hooks


✅ So your note is correct in concept, but I just added a few clarifications:
- use() + fetch = modern client async
- RTK Query = needs Redux, mostly client but can do SSR with extra setup
- Server async fetch = SSR / SEO-friendly

**Comparition**

| Feature         | Server Component | Client Component |
| --------------- | ---------------- | ---------------- |
| Run where       | Server           | Browser          |
| Default         | Yes              | No               |
| useState        | ❌                | ✔                |
| useEffect       | ❌                | ✔                |
| Fetch DB/API    | ✔                | ⚠️ (public only) |
| SEO             | ✔                | ❌                |
| Event (onClick) | ❌                | ✔                |



```bash
app/
 ├─ page.tsx           → Server Component
 ├─ products/
 │   ├─ page.tsx       → Server (fetch data)
 │   └─ ProductCard.tsx → Client (click / add cart)
```