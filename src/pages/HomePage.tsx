import React, { useEffect, useState } from "react";
import { useLazyGetUserReposQuery, useSearchUsersQuery } from "../store/github/github.api";
import { useDebaunce } from "../hooks/Debaunce";
import { RepoCard } from "../components/RepoCard";

const HomePage = () => {
    const [search, setSearch] = useState('')
    const [dropDown, setDropDown] = useState(false)
    const debounced = useDebaunce(search)
    const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true
    })
    const [fetchrepos, { isLoading: LoadingRepos, data: repos }] = useLazyGetUserReposQuery()

    useEffect(() => {
        setDropDown(debounced.length > 3 && data?.length! > 0)
    }, [debounced, data])

    const clickHandler = (username: string) => {
        fetchrepos(username);
        setDropDown(false)
    }

    return (
        <div className="flex justify-center pt-10 mx-auto h-[100px]">
            {isError && <p className="text-center pr-5 text-red-600">isError</p>}

            <div className="relative w-[560px] h-[100px] text-black">
                <input
                    type="text"
                    className="border py-2 px-4 w-full h-[42px] mb-2"
                    placeholder="Search..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                {dropDown &&
                    <ul className="list-none overflow-y-scroll absolute top-[42px] left-0 right-0 max-0[200px] shadow-md bg-white text-black">
                        {isLoading && <p className="text-center text-green-700 text-bold">Loading...</p>}
                        {data?.map(user => (
                            <li onClick={() => clickHandler(user.login)} key={user.id} className="py-2 px-4 hover:bg-gray-500 hover:text-red-500 transition-colors cursor-pointer">{user.login}</li>
                        ))}
                    </ul>}
                <div className="container">
                    {LoadingRepos && <p className="text-center text-green-700">Repositoring Loading...</p>}
                    {repos?.map(repo => <RepoCard repo={repo} key={repo.id}/>)}
                </div>
            </div>
        </div>
    )
}

export default HomePage