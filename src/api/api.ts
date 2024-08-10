import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GlobalObject, Repository, RepositoryDetails } from './github-api';

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/', // начальный урл
  }),
  tagTypes: ['Repository'],
  endpoints: (builder) => ({
    // редурсер получение всех репозиториев
    getRepositories: builder.query<GlobalObject & Repository, {}>({
      query: (params: { page: number; sort: string; direction: string }) => ({
        url: `search/repositories`,
        params: {
          q: 'stars:>0',
          sort: params.sort,
          order: params.direction,
          page: params.page,
        },
      }),
    }),
    // редурсер для получения одного репозитория по id
    getRepositoryDetails: builder.query<RepositoryDetails, number>({
      query: (id: number) => ({
        url: `repositories/${id}`,
      }),
    }),
  }),
});

export const { useGetRepositoriesQuery, useGetRepositoryDetailsQuery } = githubApi;
