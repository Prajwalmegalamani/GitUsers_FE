//Get gitusers by name(search)
export async function searchUsers({
  searchText,
  currentPage,
  perPage,
  cancelToken,
}: {
  searchText: string;
  currentPage: number;
  perPage: number;
  cancelToken: any;
}) {
  console.log("🚀 ~ file: users.ts:13 ~ searchText:", searchText);
  const response = await fetch(
    `http://localhost:3000/api/searchUsers?searchText=${searchText}&currentPage=${currentPage}&perPage=${perPage}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: cancelToken,
    }
  );

  const data = await response.json();

  return data;
}

//Get random gitusers
export async function getRandomUsers({
  currentPage,
  perPage,
  cancelToken,
}: {
  currentPage: number;
  perPage: number;
  cancelToken: any;
}) {
  const response = await fetch(
    `http://localhost:3000/api/randomUsers?currentPage=${currentPage}&perPage=${perPage}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: cancelToken,
    }
  );

  const data = await response.json();

  return data;
}
