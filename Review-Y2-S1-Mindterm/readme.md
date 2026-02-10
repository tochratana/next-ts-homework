>1. What and Why about Next.js ?

Next.js is a `React framework` that helps you build full-stack web apps (frontend + backend) easily.
* React = UI library
* Next.js = Full framework for production apps

Next.js was initially released on `October 25, 2016`. The framework was created by the team at Vercel (formerly known as `Zeit`) to provide an easy way to server-render React applications. 

Why use Next.js? (Like Feature of Next.js)

**Here are the main reasons developers use Next.js**
1. Server-Side Rendering (SSR): 
យើងអាច render នៅ page របស់យើងនៅខាង server ជាចៀងដែលយើង run នៅក្នុង browser ដោយផ្ទាល់។
- Faster page load 
- Better SEO (Google can read page)
- Good for blog, e-commerce, ...
2. Static Site Generation (SSG): Next can generate Html and build time. 
- Very fast Website
- Perfect for portfolio, docs, landing page
- Cheap hosting
3. Fullstack (API Routes): We can build backend inside Next.js.
4. File-based Routing: No need react router.
5. SEO Friendly: 
* Next.js supports:
  * Meta tags
  * Server rendering
  * Fast loading
6. Performance Optimization: 
- Next.js automatic Otipmize Image
- Caching
7. Production Ready : using in bong companies
- Vercel
- Netflix
- TikTok (some parts)
- GitHub

```
Re-cape : 
Since you are learning fullstack + Next.js + Spring Boot, use Next.js when:
You want fullstack React app
You need SEO
You want fast performance
You want server + client in one project
You deploy on Vercel / Docker / Cloud
```
command for create nextjs project
```bash
npx create-next-app@latest
```
---

>2. What are the features of ReactJS ?

1. JSX(JavaScript Syntax Extension): ប្រើប្រាស់នៅ Java script syntax នៅក្នុង jsx
2. Virtual DOM(Document Model Object): React ប្រើ Virtual DOM ដើម្បី update UI ឲ្យលឿន
→ Performance ល្អ
3. One-way Data Binding: Data flow ពី parent → child តែម្ដង
→ ងាយ debug
4. Component-Based : បែងចែក UI ជា Component តូចៗ → ងាយ maintain និង reuse
5. Huge Ecosystem: React ត្រូវការ Library បន្ថែម:
- React Router (Routing)
- Axios / Fetch (API)
- Redux / Zustand (State)
- Vite / Webpack (Build)

`React មិនមែន Full framework ទេ`

---
> 3. Compare React vs Next.js

| Feature     | React        | Next.js         |
| ----------- | ------------ | --------------- |
| Type        | Library      | Framework       |
| Routing     | React Router | File-based      |
| Rendering   | CSR          | CSR + SSR + SSG |
| Backend     | ❌            | ✅ API Routes    |
| SEO         | ❌            | ✅               |
| Performance | Manual       | Auto            |
| Fullstack   | ❌            | ✅               |

---

> 3. Server side, and Client side rendering → process

- Client-Side Rendering (CSR) នៅក្នុង Next.js

Render នៅ Browser (Client)
1. Process (ជំហាន)
2. User request page (example: /products)
3. Server ផ្ញើ HTML ទទេ + JavaScript bundle
4. Browser download JS
5. React run នៅ browserFetch data (API)
6. Render UI នៅ browser
7. User ទើបឃើញ page

```bash
"use client"
import { useEffect, useState } from "react"

export default function Page() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("https://api.example.com/products")
      .then(res => res.json())
      .then(setData)
  }, [])

  return <div>{data.length} items</div>
}
```

`use client` នៅក្នុងនៅក្នុង next.js

- Server-Side Rendering (SSR) នៅក្នុង Next.js

Render នៅក្នុង Server ហើយបានធ្វើការ send ទៅកាន់ browser
1. Process (ជំហាន)
2. User request page (/products)
3. Next.js Server run React
4. Fetch data from DB/API
5. Render HTML complete page
6. Send HTML to browser
7. Browser show content instantly
8. React hydrate → page becomes interactive

Compare 

| Step | CSR                   | SSR             |
| ---- | --------------------- | --------------- |
| 1    | Request               | Request         |
| 2    | Empty HTML            | Server render   |
| 3    | Download JS           | Fetch data      |
| 4    | React run in browser  | HTML ready      |
| 5    | Fetch data in browser | Send to browser |
| 6    | Render UI             | Show instantly  |
| 7    | Interactive           | Hydration       |
