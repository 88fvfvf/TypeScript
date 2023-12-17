import React, { useState } from "react";
import { IRepo } from "../models/models";
import { useActionData } from "react-router-dom";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

export function RepoCard({ repo = {} as IRepo }: { repo: IRepo }) {
    const { addFavorites, removeFavorites } = useActions()
    const { favorites } = useAppSelector(state => state.github)

    const [isFav, setIsFav] = useState(favorites.includes(repo.html_url))

    const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        addFavorites(repo.html_url)
        setIsFav(true)
    }

    const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        removeFavorites(repo.html_url)
        setIsFav(false)
    }

    return (
        <div className="border py-3 bg-yellow-200 px-5 rouned mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
            <a href={repo.html_url} target="_blank">
                <h2 className="text-lg font-bold">{repo.full_name}</h2>
                <p>
                    Forks: <span className="font-bold mr-2">{repo.forks}</span>
                    Watchers: <span className="font-bold">{repo.watchers}</span>
                </p>
                <p className="text-sm font-thin">{repo?.description}</p>
                {!isFav && <button onClick={addToFavorite} className="py-2 px-4 mr-2 bg-red-400 rounded hover:shadow-md transition-all">Add</button> }
                {/* Remove */}
                {isFav && <button onClick={removeFromFavorite} className="py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all">Remove</button>}
            </a>
        </div>
    )
}
