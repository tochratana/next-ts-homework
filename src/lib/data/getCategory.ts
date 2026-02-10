export default async function getCategory() {
  const base = process.env.NEXT_PUBLIC_API_BASE_API;
  const url = `${base}/api/v1/categories`;

  const response = await fetch(url);
  const datas = await response.json();
  return datas;
}
