import { getRandomUsers, searchUsers } from "@/api/users";
import { ScreenContext } from "@/hooks/useScreenSize";
import { UsersContext } from "@/hooks/useUsersContext";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";

export default function SearchBox() {
  const [searchText, setSearchText] = useState<string>("");
  const { perPage, currentPage, setCurrentPage } = ScreenContext();
  const {
    users,
    setUsers,
    status,
    setStatus,
    searchMinChars,
    debouceDelay,
    responseDelay,
  } = UsersContext();

  const timerId = useRef<string | number | NodeJS.Timeout>();
  const timeout = useRef<string | number | NodeJS.Timeout>();

  const controllerRef:
    | MutableRefObject<AbortController>
    | MutableRefObject<undefined> = useRef();

  // get users function on search with slow connection check
  function getSearchUsers() {
    setStatus("loading");
    controllerRef.current = new AbortController();
    timeout.current = setTimeout(() => {
      setStatus("delayed");
    }, debouceDelay);

    mFetchSearchUsers({
      searchText: searchText,
      currentPage: currentPage,
      perPage: perPage,
      cancelToken: controllerRef.current.signal,
    });
  }

  useEffect(() => {
    setCurrentPage(1);
    setUsers([]);
  }, [searchText]);

  // check if the search text is of min chars
  useEffect(() => {
    if (searchText.length > searchMinChars) {
      setStatus("loading");
      clearTimeout(timerId.current);
      // Debouncing
      timerId.current = setTimeout(() => getSearchUsers(), responseDelay);
    }
  }, [searchText, currentPage, perPage]);

  //Cancel request on slow connection(manual)
  const handleCancel = () => {
    controllerRef.current && controllerRef.current.abort();
  };

  //Search users mutaion
  const { mutate: mFetchSearchUsers } = useMutation(searchUsers, {
    onSuccess: (data: any) => {
      setUsers(data);
      clearTimeout(timeout.current);
      setStatus("success");
    },
    onError: (error: any) => {
      clearTimeout(timeout.current);
      if (error.toString().includes("aborted")) {
        setStatus("cancelled");
      } else {
        setStatus("error");
      }
    },
  });

  //Random users mutaion
  const { mutate: mFetchRandomUsers } = useMutation(getRandomUsers, {
    onSuccess: (data: any) => {
      setUsers(data);
      clearTimeout(timeout.current);
      setStatus("success");
    },
    onError: (error: any) => {
      clearTimeout(timeout.current);
      if (error.toString().includes("aborted")) {
        setStatus("cancelled");
      } else {
        setStatus("error");
      }
    },
  });

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex w-full flex-col justify-center items-center">
        <label htmlFor="search" className="my-2 text-lg text-white">
          Search for GitHub users
        </label>
        <input
          autoFocus={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchText(e.target.value);
            setUsers([]);
          }}
          id="search"
          placeholder="Enter a username"
          className="rounded-full bg-black w-[75%] max-w-[750px] h-16 text-white border border-gray-200  text-2xl py-2 px-6"
        />
        <div className="flex py-2 my-2">
          {status === "loading" && (
            <div className="text-white">Getting users...</div>
          )}
          {status === "cancelled" && (
            <div className="text-white">Request canceled</div>
          )}
          {status === "delayed" && (
            <div className="text-white flex justify-center flex-col align-middle items-center">
              <p>Request is taking more time than expected</p>
              <button
                className="border border-gray-300 px-3 py-2 my-2 rounded-lg hover:bg-white hover:text-black"
                onClick={() => {
                  handleCancel();
                }}
              >
                Cancel Request
              </button>
            </div>
          )}
          {status === "error" && (
            <div className="text-white">Oops something went wrong</div>
          )}
          {status === "success" &&
            users.length === 0 &&
            searchText.length > searchMinChars && (
              <div className="text-white">
                We did not find any users with that name
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

//total length check for pagination
//randaom users
