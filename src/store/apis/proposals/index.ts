﻿/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '..';
import { IProposal, IJob, IMyProposal } from './proposal.types';

const apiProposalsTag = baseApi.enhanceEndpoints({ addTagTypes: ['Proposal'] });

export const proposalApi = apiProposalsTag.injectEndpoints({
    endpoints: (builder) => ({
        sendProposal: builder.mutation<IProposal, IProposal>({
            query(value) {
                return {
                    url: '/proposals',
                    method: 'POST',
                    body: value,
                };
            },
            invalidatesTags: ['Proposal'],
        }),
        getSingleJob: builder.query<IJob, number | undefined>({
            query: (value: number) => ({
                url: `/jobs/${value}`,
            }),
        }),
        getAll: builder.query<any, any>({
            query: () => ({
                url: `/proposals`,
            }),
            providesTags: ['Proposal'],
        }),
        getProposalsByFreelancer: builder.query<
            IMyProposal[],
            number | undefined
        >({
            query: (value: number) => ({
                url: `/proposals/search?freelancerId=${value}`,
            }),
        }),
    }),
});

export const {
    useSendProposalMutation,
    useGetSingleJobQuery,
    useGetProposalsByFreelancerQuery,
    useGetAllQuery,
} = proposalApi;
