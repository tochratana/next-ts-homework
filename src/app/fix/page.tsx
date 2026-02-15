import Hello from "./test";

export default function Page() {
  const result = Hello(10, 20);
  return <h1>{result}</h1>;
}
