// import { setProfile } from 'store/slices/profile/profile.slace';
import { newProfile } from 'store/apis/publicProfile/publicProfile.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponse, UserType } from './auth.type';

interface ICounts {
    proposalsCount: number;
}
interface UsersState {
    user: UserType | null;
    accessToken: string | null | undefined;
    loading: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string;
    isLoggedIn: boolean | undefined;
    profile: newProfile | null;
    ownerJobsLength: number | null;
    counts: ICounts;
}
const initialState: UsersState = {
    user: null,
    accessToken: '',
    loading: 'idle',
    error: '',
    isLoggedIn: false,
    profile: null,
    ownerJobsLength: null,
    counts: {
        proposalsCount: 0,
    },
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
            state.isLoggedIn = data.isLoggedIn;
        },
        logOut: (state: UsersState) => {
            state.user = null;
            state.accessToken = '';
            state.isLoggedIn = false;
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
            state.counts.proposalsCount = payload;
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
} = authSlice.actions;

export default authSlice.reducer;
