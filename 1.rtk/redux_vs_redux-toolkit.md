## Classic Redux vs Redux Toolkit


### 1. Redux

#### Structure Project 
```bash
src/
 ├── actions/
 │     counterActions.js
 ├── reducers/
 │     counterReducer.js
 ├── store.js
 └── App.js
```

#### counterActions.js
```js
export const increment = () => {
  return {
    type: "INCREMENT",
  };
};

export const decrement = () => {
  return {
    type: "DECREMENT",
  };
};
```


#### counterReducer.js
```js
const initialState = {
  value: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        value: state.value + 1,
      };
    case "DECREMENT":
      return {
        ...state,
        value: state.value - 1,
      };
    default:
      return state;
  }
};

export default counterReducer;
```


#### store.js
```js
import { createStore } from "redux";
import counterReducer from "./reducers/counterReducer";

const store = createStore(counterReducer);

export default store;
```

App.js
```js
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./actions/counterActions";

function App() {
  const count = useSelector((state) => state.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}

export default App;
```

#### types.ts
```ts
export interface CounterState {
  value: number;
}

export interface IncrementAction {
  type: "INCREMENT";
}

export interface DecrementAction {
  type: "DECREMENT";
}

export type CounterAction = IncrementAction | DecrementAction;
```


#### reducer.ts
```ts
// reducer.ts
import { CounterState, CounterAction } from "./types";

const initialState: CounterState = {
  value: 0,
};

export const counterReducer = (
  state = initialState,
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, value: state.value + 1 };
    case "DECREMENT":
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
};
```


Problem of Classic Redux
- Boilerplate ច្រើន
- ត្រូវសរសេរ action type ដោយដៃ
- ត្រូវប្រើ switch case
- Setup store ស្មុគស្មាញ


---


### 2. Redux Toolkit (RTK)

Redux Toolkit គឺ official recommended way ពី Redux Team

#### structure
```bash
src/
 ├── features/
 │     counterSlice.js
 ├── store.js
 └── App.js
```

#### counterSlice.js
```js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1; // can mutate (Immer inside)
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

#### store.js
```js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
```

#### App.js
```js
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./features/counterSlice";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}

export default App;
```