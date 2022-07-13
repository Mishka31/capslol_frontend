﻿import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, message, notification, Row } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import { colors } from 'constants/index';
import {
    useSendProposalMutation,
    useGetProposalsByFreelancerQuery,
} from 'store/apis/proposals';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useGetJobByIdQuery } from 'store/apis/jobs';
import { Paths } from 'router/paths';
import ModalWindow from 'components/ModalWindow/ModalWindow';
import { usePostChatContactMutation } from 'store/apis/chat';
import { AppContext } from 'context';
import { HideWrapper } from 'components/HideWrapper/styles';
import EmptyListNotification from 'components/EmptyListNotification';
import { setProposalCount } from 'store/slices/auth/auth.slice';
import {
    Font,
    FontTitle,
    Hr,
    ProposalCard,
    Section,
    StyledButton,
    StyledTextArea,
    Wrapper,
    StyledFormItem,
} from './styles';
import {
    IFormValue,
    IJobId,
    TFilterArg,
    NotificationType,
    TProposalFilter,
    IRateArg,
    TFilterReturn,
} from './interfaces';
import ValidateInput from './ValidateInput';

const SendProposal: React.FC = () => {
    const location = useLocation();

    const { user } = useAppSelector((s) => s.auth);

    const { t } = useTranslation();

    const [form] = Form.useForm();

    const navigate = useNavigate();

    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    const [hourlyRate, setHourlyRate] = useState<number>();

    const stateJob = location.state as IJobId;

    const { data: job } = useGetJobByIdQuery(stateJob.id);

    const [postProposal, { isSuccess, isError }] = useSendProposalMutation();

    const { data: freelancerProposals } = useGetProposalsByFreelancerQuery(
        user?.id
    );

    const [postChatContact] = usePostChatContactMutation();

    const { socket } = useContext(AppContext);

    const onReset = (): void => form.resetFields();

    const openModal = (): void => setIsOpen(true);

    const dispatch = useAppDispatch();

    const currentProposalsCount = useAppSelector(
        (state) => state.auth.proposalsCount
    );

    const handleFiltered = (data: TFilterArg): TProposalFilter => {
        const filtered = data?.filter((i) => i?.jobId?.id === stateJob?.id)[0];

        return filtered;
    };

    const navigateToProjectDetails = (): void => {
        navigate(Paths.JOB_PAGE, { state: { id: stateJob.id } });
    };

    const proposalId = handleFiltered(freelancerProposals);

    const closeModal = async (): Promise<void> => {
        try {
            setIsOpen(false);

            const newChatContact = {
                proposalId: proposalId?.id,
                isActive: false,
            };

            const chatContact = await postChatContact(newChatContact).unwrap();

            const newMessage = {
                content: `<div><p className="title">${t('Chat.rate')}<span>${
                    proposalId?.hourRate
                }</span></p>
                <div>${proposalId?.coverLetter}</div>
                </div>`,
                senderId: user?.id,
                roomId: chatContact?.id,
                isOffer: false,
            };

            socket.emit('msgToServer', newMessage);
            navigateToProjectDetails();
        } catch (error) {
            message.error(`${error?.message}`);
        }
    };

    const handleGetJobPercent = (rate: IRateArg): number =>
        ((rate || 0) / 100) * 12.5;

    const handleGotFreelancerRate = (freelancerRate: IRateArg): number => {
        const getJobRate = handleGetJobPercent(freelancerRate);
        return (freelancerRate || 0) - getJobRate;
    };

    const handleSubmit = async (values: IFormValue): Promise<void> => {
        try {
            const newProposal = {
                jobId: stateJob.id,
                freelancerId: user?.id,
                coverLetter: values.coverLetter,
                hourRate: handleGotFreelancerRate(hourlyRate as number),
            };
            await postProposal(newProposal);
            setHourlyRate(0);
            onReset();
            openModal();
        } catch (error) {
            message.error(`${error?.message}`);
        }
        dispatch(setProposalCount(currentProposalsCount + 1));
        onReset();
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue = event.target.value;
        setHourlyRate(+inputValue);
    };

    const openNotificationWithIcon = (
        type: NotificationType,
        msg: string,
        desc: string
    ): void => {
        notification[type]({
            message: msg,
            description: desc,
        });
    };

    const handleProposalFiltered = (data: TFilterArg): TFilterReturn => {
        const filtered = data?.filter((i) => i.jobId.id === stateJob.id)[0]
            ?.jobId?.id;

        return filtered;
    };

    return (
        <>
            {!(handleProposalFiltered(freelancerProposals) === stateJob.id) && (
                <Wrapper>
                    <FontTitle color={colors.textWhite} fs="30" mb="30">
                        {t('Proposal.title')}
                    </FontTitle>

                    <Form form={form} onFinish={handleSubmit}>
                        <ProposalCard>
                            <Font color={colors.textWhite} fs="22">
                                {t('Proposal.subTitle')}
                            </Font>
                            <Section>
                                <FontTitle color={colors.textWhite} fs="18">
                                    {t('Proposal.jobQuestion')}
                                </FontTitle>

                                <Row justify="space-between">
                                    <FontTitle color={colors.textGrey} fs="16">
                                        {t('Proposal.youRate')} ${' '}
                                        {hourlyRate || '0'}/hr
                                    </FontTitle>
                                    <FontTitle color={colors.textGrey} fs="16">
                                        {t('Proposal.jobOwnerRate')} ${' '}
                                        {job?.price || '0'} /hr
                                    </FontTitle>
                                </Row>

                                <Row justify="space-between">
                                    <FontTitle color={colors.textWhite} fs="16">
                                        {t('Proposal.hourlyRate')}
                                    </FontTitle>
                                    <ValidateInput
                                        onChange={onChange}
                                        propsValue={hourlyRate}
                                        width="35"
                                    />
                                </Row>
                                <Hr />
                                <FontTitle
                                    color={colors.textWhite}
                                    fs="16"
                                    mb="15"
                                >
                                    {t('Proposal.coverLetterTitle')}
                                </FontTitle>

                                <StyledFormItem
                                    name="coverLetter"
                                    rules={[
                                        {
                                            required: true,
                                            message: `${t(
                                                'Proposal.errorLetter'
                                            )}`,
                                        },
                                    ]}
                                >
                                    <StyledTextArea
                                        showCount
                                        maxLength={500}
                                        style={{ height: 150 }}
                                    />
                                </StyledFormItem>
                                <Hr />
                                <Form.Item>
                                    <StyledButton
                                        htmlType="submit"
                                        className="login-form-button"
                                    >
                                        {t('Proposal.submitBtnText')}
                                    </StyledButton>
                                </Form.Item>
                            </Section>
                        </ProposalCard>
                    </Form>
                </Wrapper>
            )}

            <>
                {' '}
                {isSuccess && (
                    <ModalWindow
                        modalIsOpen={modalIsOpen}
                        closeModal={() => closeModal()}
                        bg={colors.bgBlack}
                        modalBg={colors.bgBlack}
                        borderCol={colors.textWhite}
                    >
                        <Row justify="center">
                            <FontTitle color={colors.textWhite} fs="18">
                                {t('Proposal.sentSuccess')}
                            </FontTitle>
                        </Row>
                    </ModalWindow>
                )}
                {isError &&
                    openNotificationWithIcon(
                        'error',
                        'Error',
                        'You have already responded to this project. Try another one!'
                    )}
            </>

            <HideWrapper
                showWhen={
                    handleProposalFiltered(freelancerProposals) === stateJob.id
                }
            >
                <EmptyListNotification note={t('Proposal.proposalSentTitle')} />
            </HideWrapper>
        </>
    );
};

export default SendProposal;
