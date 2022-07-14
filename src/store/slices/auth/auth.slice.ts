import { newProfile } from 'store/apis/publicProfile/publicProfile.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponse, UserType } from './auth.type';

interface UsersState {
    user: UserType | null;
    accessToken: string | null | undefined;
    loading: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string;
    isLoggedIn: boolean;
    profile: newProfile | null;
    ownerJobsLength: number | null;
    newMessageCount: number[];
    offersCount: number;
    proposalsCount: number;
    contractsCount: number;
    invitationsCount: number;
}
const initialState: UsersState = {
    user: null,
    accessToken: '',
    loading: 'idle',
    error: '',
    isLoggedIn: false,
    profile: null,
    ownerJobsLength: 0,
    newMessageCount: [],
    offersCount: 0,
    proposalsCount: 0,
    contractsCount: 0,
    invitationsCount: 0,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state: UsersState,
            { payload: { data } }: PayloadAction<IResponse>
        ) => {
            state.user = data.user;
            state.accessToken = data.accessToken;
            state.isLoggedIn = true;
        },
        logOut: (state: UsersState) => {
            state.user = null;
            state.profile = null;
            state.accessToken = '';
            state.isLoggedIn = false;
            state.profile = null;
            state.ownerJobsLength = 0;
            state.newMessageCount = [];
            state.offersCount = 0;
            state.proposalsCount = 0;
            state.contractsCount = 0;
            state.invitationsCount = 0;
        },
        setUserRole: (
            state: UsersState,
            { payload: { data } }: PayloadAction<IResponse>
        ) => {
            state.user = data.user;
        },

        setProfile: (
            state: UsersState,
            { payload }: PayloadAction<newProfile>
        ) => {
            state.profile = payload;
        },

        setOwnerJobsLength: (
            state: UsersState,
            { payload }: PayloadAction<number>
        ) => {
            state.ownerJobsLength = payload;
        },
        setProposalCount: (
            state: UsersState,
            { payload }: PayloadAction<number>
        ) => {
            state.proposalsCount = payload;
        },

        setOffersCount: (
            state: UsersState,
            { payload }: PayloadAction<number>
        ) => {
            state.offersCount = payload;
        },

        setContractsCount: (
            state: UsersState,
            { payload }: PayloadAction<number>
        ) => {
            state.contractsCount = payload;
        },

        setInvitationsCount: (
            state: UsersState,
            { payload }: PayloadAction<number>
        ) => {
            state.invitationsCount = payload;
        },

        setNewMessageCount: (
            state: UsersState,
            { payload }: PayloadAction<number[]>
        ) => {
            state.newMessageCount = payload;
        },
    },
});

export const {
    setCredentials,
    logOut,
    setUserRole,
    setProfile,
    setOwnerJobsLength,
    setProposalCount,
    setOffersCount,
    setNewMessageCount,
    setContractsCount,
    setInvitationsCount,
} = authSlice.actions;

export default authSlice.reducer;
