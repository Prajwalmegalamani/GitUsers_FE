import { ScreenContext } from "@/hooks/useScreenSize";
import { UsersContext } from "@/hooks/useUsersContext";
import React from "react";

export default function DisplayGrid() {
  const { users, status } = UsersContext();
  const { handleNextPage, handlePrevPage, currentPage, perPage } =
    ScreenContext();
  console.log("🚀 ~ file: DisplayGrid.tsx:47 ~ DisplayGrid ~ users:", users);

  return (
    <div className="w-full mx-5 my-10">
      {status === "success" && users && users.length > 0 && (
        <div className="w-full flex flex-col justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 w-full">
            {users.map((user: any) => (
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                key={user.id}
                className="flex justify-between px-10 py-5 border-gray-300 rounded-lg border m-5 align-middle items-center hover:scale-105 cursor-pointer transition-all hover:bg-gradient-to-bl hover:from-stone-700"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-[50%]"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                />
                <div
                  className="text-white flex flex-col text-base 
                w-[50%]"
                >
                  <h3>{user.name || user.login}</h3>
                  <h3>{user.location}</h3>
                  <p>Followers: {user.followers}</p>
                  <p>PublicRepos: {user.public_repos}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
      {status === "success" && users.length > 0 && (
        <div className="text-white flex justify-between md:mx-40 ">
          {currentPage != 1 ? (
            <button
              className="border border-gray-300 px-3 py-2 rounded-lg hover:bg-white hover:text-black"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous Page
            </button>
          ) : (
            <div></div>
          )}
          {users.length > 0 && users.length === perPage && (
            <button
              className="border border-gray-300 px-3 py-2 rounded-lg hover:bg-white hover:text-black"
              onClick={handleNextPage}
            >
              Next Page
            </button>
          )}
        </div>
      )}
    </div>
  );
}
