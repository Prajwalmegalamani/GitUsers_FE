"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import SearchBox from "../components/SearchBox";
import { ScreenContext, ScreenSizeProvider } from "@/hooks/useScreenSize";
import { UsersProvider } from "@/hooks/useUsersContext";
import DisplayGrid from "@/components/DisplayGrid";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* React query provider */}
      <ScreenSizeProvider>
        {/* Screen related details provider (custom hook)*/}
        <UsersProvider>
          {/* user data context (custom hook)*/}
          <main className="flex min-h-screen bg-black min-w-screen flex-col items-center justify-start p-5 align-middle">
            {/* search component*/}
            <SearchBox />
            {/* display grid component*/}
            <DisplayGrid />
          </main>
        </UsersProvider>
      </ScreenSizeProvider>
    </QueryClientProvider>
  );
}
