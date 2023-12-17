import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ServerResponse, IUser, IRepo } from '../../models/models';

export const githubApi = createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com',
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchUsers: build.query<IUser[], string>({
      query: (search: string) => ({
        url: `search/users?q=${search}`,
        params: {
            per_page: 10
        }
      }),
      transformResponse:(response: ServerResponse<IUser>) => response.items
    }),
    getUserRepos: build.query<IRepo[],string>({
      query: (username: any) => ({
        url: `users/${username}/repos`,
        params: {
          per_page: 5
      }
      })
    })
  }),
});

export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi;
