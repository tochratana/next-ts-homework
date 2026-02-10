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
   index.ts
   hooks.ts
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
  name: "counter",
  initialState,
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
    counter: counterReducer
  }
});

// Types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```


4. Typed Hooks (Best Practice) `store/hooks.ts`

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

---

1. តើ RTK Query គឺជាអ្វី?
2. ហេតុអ្វីបានជាយើងត្រូវប្រើប្រាស់ RTK Query?
3. តើពេលណាដែលយើងត្រូវប្រើប្រាស់ RTK Query?
4. តើ RTK Query ដំណើរការដូចម្ដេច?