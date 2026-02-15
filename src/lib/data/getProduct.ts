export default async function getProductForLearning() {
  const url = "https://api.escuelajs.co/api/v1/products";
  const resp = await fetch(url);
  const data = resp.json();
  return data;
}
