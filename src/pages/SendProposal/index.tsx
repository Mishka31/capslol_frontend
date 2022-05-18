﻿import React from 'react';
import { useTranslation } from 'react-i18next';
<<<<<<< HEAD
import { Form, message, Row } from 'antd';
=======
import { Button, Form, Row, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
>>>>>>> develop

import { colors } from 'constants/index';
import {
    Block,
    Font,
    FontTitle,
    Hr,
    ProposalCard,
    Section,
    StyledButton,
    StyledInput,
    StyledTextArea,
<<<<<<< HEAD
=======
    UploadForm,
>>>>>>> develop
    Wrapper,
    FormItem,
} from './styles';
import { IFormValue } from './interfaces';

const SendProposal: React.FC = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();

<<<<<<< HEAD
    const onReset = (): void => form.resetFields();

    const handleSubmit = async (values: IFormValue): Promise<void> => {
        try {
            console.log(values);
        } catch (error) {
            message.error(`${error.data.message}`);
        }
        onReset();
=======
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleSubmit = async () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        onReset();
    };

    const onReset = (): void => {
        form.resetFields();
>>>>>>> develop
    };

    return (
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
                                {t('Proposal.youRate')}
                            </FontTitle>
                            <FontTitle color={colors.textGrey} fs="16">
                                {t('Proposal.jobOwnerRate')}
                            </FontTitle>
                        </Row>

                        <Row justify="space-between">
                            <FontTitle color={colors.textWhite} fs="16">
                                {t('Proposal.hourlyRate')}
                            </FontTitle>
                            <FormItem
                                label=""
                                name="jobOwnerValue"
                                rules={[
                                    {
                                        pattern: /^(?:\d*)$/,
                                        message: `${t(
                                            'Proposal.error.number'
                                        )}`,
                                    },
                                    {
                                        pattern: /^[\d]{0,50}$/,
                                        message: `${t(
                                            'Proposal.error.length'
                                        )}`,
                                    },
                                    {
                                        required: true,
                                        message: `${t('Proposal.errorRate')}`,
                                    },
                                ]}
                            >
                                <StyledInput prefix="$" maxLength={4} />
                            </FormItem>
                        </Row>

                        <Hr />

                        <Row justify="space-between">
                            <FontTitle color={colors.textWhite} fs="16">
                                {t('Proposal.getJobRate')}
                            </FontTitle>
                            <FontTitle color={colors.textWhite} fs="16">
                                /hr
                            </FontTitle>
                        </Row>

                        <Hr />

                        <Row justify="space-between">
                            <FontTitle color={colors.textWhite} fs="16">
                                {t('Proposal.gotRate')}
                            </FontTitle>
                            <FormItem label="" name="freelancerValue">
                                <StyledInput
                                    disabled
                                    prefix="$"
                                    maxLength={4}
                                />
                            </FormItem>
                        </Row>
                    </Section>
                </ProposalCard>
                <ProposalCard>
                    <Font fs="22" color={colors.textWhite}>
                        {t('Proposal.letterTitle')}
                    </Font>
                    <Section>
                        <Block>
                            <FontTitle color={colors.textWhite} fs="16" mb="15">
                                {t('Proposal.coverLetterTitle')}
                            </FontTitle>

                            <Form.Item
                                name="coverLetter"
                                rules={[
                                    {
                                        required: true,
                                        message: `${t('Proposal.errorLetter')}`,
                                    },
                                ]}
                            >
                                <StyledTextArea
                                    maxLength={500}
                                    style={{ height: 150 }}
                                />
                            </Form.Item>
                        </Block>
                    </Section>
                </ProposalCard>

                <Form.Item>
                    <StyledButton
                        htmlType="submit"
                        className="login-form-button"
                    >
                        {t('Proposal.submitBtnText')}
                    </StyledButton>
                </Form.Item>
            </Form>
        </Wrapper>
    );
};

export default SendProposal;
