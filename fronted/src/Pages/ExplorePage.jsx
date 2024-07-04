import React, { useState } from "react";
import Spinner from "../components/Spinner";
import Repos from "../components/Repos";

function ExplorePage() {
  // states ...
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [selectedLang, setSelectedLang] = useState("");

  const exploreRepos = async (lang) => {
    setLoading(true);
    setRepos([]);
    try {
      const res = await fetch(
        `https://api.github.com/search/repositories?q=language:${lang}&sort=stars&order=desc&per_page=10`,{
          headers : {
            authorization : `token ${import.meta.env.VITE_GITHUB_API_KEY}`,
          }
        }
      );
      const data = await res.json();
      setRepos(data.items);
      setSelectedLang(lang)
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4">
      <div className="bg-glass max-w-2xl mx-auto rounded-md p-4">
        <h1 className="text-xl font-bold  text-center">
          Explore Popular Repositories
        </h1>
        <div className="flex flex-wrap gap-2 my-2 justify-center">
          <img
            src="/javascript.svg"
            alt="JavaScript logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepos("javascript")}
          />
          <img
            src="/typescript.svg"
            alt="TypeScript logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepos("typescript")}

          />
          <img
            src="/c++.svg"
            alt="C++ logo"
            onClick={() => exploreRepos("c++")}
            className="h-11 sm:h-20 cursor-pointer"
          />
          <img
            src="/python.svg"
            alt="Python logo"
            onClick={() => exploreRepos("python")}
            className="h-11 sm:h-20 cursor-pointer"
          />
          <img
            src="/java.svg"
            alt="Java logo"
            onClick={() => exploreRepos("java")}
            className="h-11 sm:h-20 cursor-pointer"
          />
        </div>
        {repos.length > 0  && (
          <h2 className="text-lg font-semibold text-center my-4" >
          <span className="bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded-full" >
          {selectedLang.toUpperCase()}{" "}
          </span>
          Repositories
          </h2>
        )}
        {!loading  && repos.length > 0 &&  <Repos repos={repos}/>}
        {loading && <Spinner />}
      </div>
    </div>
  );
}

export default ExplorePage;
