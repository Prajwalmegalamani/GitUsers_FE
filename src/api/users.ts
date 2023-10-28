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
  const response = await fetch(
    `https://git-users-be-git-main-prajwals-projects-f720f3ee.vercel.app/api/searchUsers?searchText=${searchText}&currentPage=${currentPage}&perPage=${perPage}`,
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
    `https://git-users-be-git-main-prajwals-projects-f720f3ee.vercel.app/api/randomUsers?currentPage=${currentPage}&perPage=${perPage}`,
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
