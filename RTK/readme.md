## Redux Toolkit (RTK)

Redux Toolkit is a tool for managing global state in your app.

* RTK → store your app state (auth, theme, UI, counter)
* RTK Query → talk to backend API (fetch, cache, sync data)

1. Install RTK
```bash
npm install @reduxjs/toolkit
npm install react-redux

# Both command for install redux toolkit and react redux
npm install @reduxjs/toolkit react-redux
```
2. Setup project structure 
```bash
src/
 ├── store/
 │    ├── store.ts
 │    └── features/
 │         └── counter/
 │              └── counterSlice.ts
```

- `store` in this store have file `store.ts` and folder `feature` and in this folder store all folder slice, like counteState(CounterSlice.ts)

This code defines a Redux slice for a simple counter using Redux Toolkit. It manages the state and actions for incrementing, decrementing, and resetting a counter.


A slice = state + reducer logic + actions
```ts
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CounterState { // type of CounterState
  value: number
}

const initialState = { value: 0 } satisfies CounterState as CounterState // init value of initialState 

const counterSlice = createSlice({ // for create countslice we have contain 3 : createSlice({ name: "name", initialState, reducers: {logic here}})
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions // after logic here we will export value for use 
export default counterSlice.reducer
```
This is more resourece for learn about how to createSlice : [https://redux-toolkit.js.org/api/createSlice](https://redux-toolkit.js.org/api/createSlice)


- After createslice we will call slice to store, so we must be config store 
```ts
// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { CounterSlice } from "./feature/counteState/CounterSlice";  // call CounterSlice

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: CounterSlice.reducer, // counter is the name that we init in createSlice and CounterSlice.reducer is we have export in createSlice
    },
  });
};

// Types (important for TS)
export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
```
- After call createSlice to store we continure to `StoreProvider.tsx`
 
```tsx
// StoreProvider.tsx
"use client";

import { Provider } from "react-redux";
import { makeStore } from "./store";

const store = makeStore();

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
```

and then call from storeProvider to `Layout.tsx`

```tsx
import StoreProvider from "@/store/StoreProvider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
```

- How to use it in Component

> After call slice to store we will use selector that have dispatch, so in : 

```tsx
export default function Counter(){
  const dispatch = useDispatch(); // for useDispatch is import from react-redux

  const selector = useSelector((state: RootState) => state.counter.value) // for use selector import from react-redux

  // after this we will get value in selector

  console.log(seletor); // value render here
}
```

---

Recape : 
```bash
App → Layout → Navbar → Button → Counter
```
Redux lets you store state in one global store and access anywhere.

**Core Concept:**
1. store: Global state container
2. Slice