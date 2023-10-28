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
    `https://api.github.com/users?since=${currentPage}&per_page=${perPage}`,
    {
      headers: {
        Authorization: `Bearer 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`,
      },
      signal: cancelToken,
    }
  );

  const data = await response.json();

  const promises = data.map(async (item: any) => {
    const userDataResponse = await fetch(item.url, {
      method: "GET",
      headers: {
        Authorization: `Bearer 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`,
      },
      signal: cancelToken,
    });

    const userData = await userDataResponse.json();
    return userData;
  });

  const usersData = await Promise.all(promises);

  const sortedUsers = usersData.sort(
    (a: any, b: any) => b.followers - a.followers
  );

  return sortedUsers;
}
