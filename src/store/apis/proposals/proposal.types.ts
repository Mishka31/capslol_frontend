﻿export interface IProposal {
    jobId: number | undefined;
    freelancerId: number | undefined;
    coverLetter: string;
    hourRate: number | undefined;
}

export interface IJob {
    id: number;
    price?: number | undefined;
}

export interface IMyJob {
    id?: number;
    title?: string;
    description?: string;
    price?: number;
    timeAvailable?: number;
    createdAt?: string;
    languageLevel?: string;
    projectDuration?: string;
}

export interface IMyProposal {
    id: number;
    jobId: IMyJob;
    freelancerId: number | undefined;
    coverLetter: string;
    hourRate: number | undefined;
    createdAt: string;
}

export interface MetaInterface {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface ProposalResponseInterface {
    meta: MetaInterface;
    data: IMyProposal[];
}

export interface ProposalOptionsInterface {
    page?: number;
    take?: number;
    freelancerId?: number;
}
