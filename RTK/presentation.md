## Presentation on 18-02-2026

### 1. តើ Redux និង Redux Toolkit ខុសគ្នាដូចម្ដេច?

##### Redux (Classic Redux) : គឺជា state management library សម្រាប់រក្សាទុក global state (auth, theme, cart, user...)

ប៉ុន្តែ Redux ដើមមានបញ្ហា ៖
- Boilerplate code ច្រើន
- ត្រូវសរសេរ action, reducer, type, store ដោយខ្លួនឯង
- Setup ពិបាក
##### Redux Toolkit (RTK)

Redux Toolkit គឺជា official modern Redux ដែលធ្វើឲ្យ Redux ងាយប្រើ​ ។

អត្ថប្រយោជន៍៖
- Boilerplate តិច
- Setup ងាយ
- មាន built-in tools (createSlice, createAsyncThunk, RTK Query)

![redux_vs_reduxtoolkit](https://theonetechnologies.com/Posts/files/difference-between-redux-and-redux-tool_638434027314381443.webp)

---

### 2. តើ Redux Toolkit ដំណើរការដូចម្ដេច?

របៀបដែល Redux Toolkit ដំណើរការ
```bash
Component → dispatch(action) → reducer → update store → UI re-render
```

នៅក្នុង RTK​ ៖
- CreateSlice -> Create reducer + action, logic
- ConfigureStore -> Create Store
- useSelector -> read state
- useDispatch -> send action

> Redux Toolkit ប្រើ Immer → អាច mutate state ដោយសុវត្ថិភាព

![redux-toolkit-work](https://redux.js.org/assets/images/ReduxAsyncDataFlowDiagram-d97ff38a0f4da0f327163170ccc13e80.gif)

**Example** 

1. Setup Folder Structure 
```bash
/store
   index.ts // store.ts
   hooks.ts // យើងអាចបង្កើតនៅ folder hook ហើយផ្ទុកនៅ file មួយនេះ
   /slice
       counterSlice.ts
/app
   layout.tsx
   page.tsx
```
2. Create slice `store/slice/counterSlice.ts`

```ts
import { createSlice } from "@reduxjs/toolkit";

type CounterState = {
  value: number;
};

const initialState: CounterState = {
  value: 0
};

const counterSlice = createSlice({
  name: "counter", // must be the same
  initialState, // { value: 0 }
  reducers: {
    increment: (state) => {
      state.value += 1; // Immer → safe mutate
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

export const { increment, decrement, incrementByAmount } =
  counterSlice.actions;

export default counterSlice.reducer;
```

3. Create Store `store/index.ts`

```ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer // must be the same
  }
});

// Types(Important) for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```


4. Typed Hooks (Best Practice) `store/hooks.ts` 

យើងមិនប្រើប្រាស់នៅ hook ក៏បានដែរ


You can use raw hooks:
```tsx
import { useSelector, useDispatch } from "react-redux";
```

នៅក្នុង component 
```tsx
const count = useSelector((state: any) => state.counter.value);
const dispatch = useDispatch();
```
✔ Redux still works
✔ Selector still works
✔ Dispatch still works

Because TypeScript safety + cleaner code

Without hooks.ts:
- state becomes any
- No autocomplete
- Can make mistakes

with hook.ts
```ts
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```


then : 
```tsx
const count = useAppSelector((state) => state.counter.value);
const dispatch = useAppDispatch();
```

Benefits:
- Full TypeScript typing
- Autocomplete
- Safer code
- Cleaner imports


`hook.ts`
```ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./index";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

5. Provide Store to App `app/layout.tsx`

```tsx
"use client";

import { Provider } from "react-redux";
import { store } from "@/store";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
```

6. Use Redux Toolkit in Component `app/page.tsx`

```tsx
"use client";

import {
  increment,
  decrement,
  incrementByAmount
} from "@/store/slice/counterSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Page() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div style={{ padding: 20 }}>
      <h1>Redux Toolkit Flow Example</h1>
      <h2>Count: {count}</h2>

      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>
        +5
      </button>
    </div>
  );
}
```


> You don’t need StoreProvider if your store is simple and client-only
> You should use StoreProvider when using Next.js App Router + Server Components + SSR + per-request store




> Why sometimes NOT using StoreProvider works?

In my example:
```tsx
<Provider store={store}>{children}</Provider>
```
- Store is single global store
- Runs only in client
- No SSR / no server state
- Simple app → OK

> When you MUST use StoreProvider (Recommended in real apps)

Use StoreProvider when:
- Using Next.js App Router (Server + Client mix) ⚠️
- Need per-request store (SSR safe)
- Avoid store sharing between users
- Want scalable architecture

Example store provider : `store/StoreProvider.tsx`
```bash
"use client";

import { Provider } from "react-redux";
import { store } from "./index";

export default function StoreProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
```

Use in layout
```bash
import StoreProvider from "@/store/StoreProvider";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
```





---


### 3. តើ RTK Query គឺជាអ្វី?

![](https://raw.githubusercontent.com/rtk-incubator/rtk-query/main/logo.png)

**RTK Query** គឺជា tool មួយនៅក្នុង Redux Toolkit ដែលជួយយើង fetch data ពី API និងគ្រប់គ្រង state ដោយស្វ័យប្រវត្តិ ។

និយាយសាមញ្ញ -> `RTK Query = Tool សម្រាប់ call API + cache + loading + error + update UI ដោយមិនចាំបាច់សរសេរ code ច្រើន។`

វាជួួយយើង
* Fetch data (GET)
* Create / Update / Delete (POST, PUT, DELETE)
* Cache data
* Refetch auto
* Manage loading & error state

![RTK](https://paper-attachments.dropboxusercontent.com/s_118F96EA7D62F679A47C2AD439C93DC9203009C47C6538B354532E5ADE3FA23F_1676627146090_redux-graphs.png)


---


### 4. ហេតុអ្វីបានជាយើងត្រូវប្រើប្រាស់ RTK Query?

មុនមាន RTK Query

យើងត្រូវសរសេរ៖
* useEffect
* useState
* dispatch action
* reducer
* loading / error state
* cache logic
> Code ច្រើន + ពិបាក maintain

ក្រោយមាន RTK Query
* Auto caching
* Auto refetch
* Auto loading / error state
* Reduce boilerplate code
* Easy CRUD with API
* Better performance
> RTK Query ធ្វើអោយ React App : clean, fast, easy maintain
> 
---

### 5. តើពេលណាដែលយើងត្រូវប្រើប្រាស់ RTK Query?

យើងគួរប្រើ RTK Query នៅពេល
* App មាន API
  * Fetch products
  * Fetch users
  * Blog / Posts
  * Dashboard data
* ត្រូវការប្រើ Cache
  * មិនចង់ fetch API ម្តងហើយម្តងទៀត
  * Improve performance
* CRUD App
  * Create post
  * Update profile
  * Delete item
* Large / Real project
  * Ecommerce
  * Admin Dashboard
  * Social Media
  * SaaS App

> បើ App តូច ឬ API តិច អាចប្រើ fetch ធម្មតាបាន
> បើ App ធំ -> RTK Query ជាជម្រើសល្អ

------

### 6. តើ RTK Query ដំណើរការដូចម្ដេច?


```mermaid
flowchart LR
    D["Component"] --> n1["Hook"]
    n1 --> n2["RTK Query"]
    n2 --> n3["API"]
    n3 --> n4["Cache"]
    n4 --> n5["UI Update"]

    style D fill:#FFE0B2
    style n1 fill:#FFD600
    style n2 fill:#AA00FF
    style n3 stroke:#2962FF,fill:#2962FF
    style n4 fill:#E1BEE7
    style n5 fill:transparent
```

**Structure Project :**

<img src="../image/structure-project.png" alt="structure-project" width="200"/>

1. Create API Slice