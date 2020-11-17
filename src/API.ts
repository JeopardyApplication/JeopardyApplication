export const fetchCategories = async (count: number) => {
  const endpoint = `http://jservice.io/api/categories?count=${count}`;
  const data = await (await fetch(endpoint)).json();

  return data;
};

export const fetchCategory = async (id: number) => {
  const endpoint = `http://jservice.io/api/category?id=${id}`;
  const data = await (await fetch(endpoint)).json();

  return data;
};
