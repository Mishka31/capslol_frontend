﻿/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext, createRef } from 'react';
import { message, notification } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'hooks/redux';
import { colors } from 'constants/index';
import axios from 'axios';
import { AppContext } from 'context';
import { useGetUserByIdQuery } from 'store/apis/profile';
import { useCreateOfferMutation } from 'store/apis/offers';
import Avatar from '../ChatList/Avatar';
import { IChatContentProps, IMessages, Role, TEmoji, TEvent } from '../interfaces';
import ChatItem from './ChatItem';
import {
    ChatBody,
    ChatFooter,
    ChatHeader,
    CurrentChatUser,
    MainChat,
    Project,
    ProjectOwner,
    SendNewMessage,
    SendNewMessageBtn,
    SendNewMessageIcon,
    SendNewMessageInput,
    SettingsBtn,
    Wrapper,
    EmojiIcon,
} from './styles';
import ChatWindow from './ChatWindow';
import Emoji from './Emoji';

const ChatContent: React.FC<IChatContentProps> = ({ currentChat }) => {
    const [messageText, setMessageText] = useState<string>('');
    const [showEmojis, setShowEmojis] = useState<boolean>(false);
    const [messages, setMessages] = useState([] as IMessages[]);
    const [arrivalMessage, setArrivalMessage] = useState({} as IMessages);
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const inputRef = createRef<HTMLInputElement>();
    const [emoji, setEmoji] = useState();

    const { socket } = useContext(AppContext);
    const { user } = useAppSelector((s) => s.auth);
    const { t } = useTranslation();

    const { data } = useGetUserByIdQuery(user?.id);
    const [createOffer, { data: offer }] = useCreateOfferMutation();

    const openModal = (): void => setIsOpen(true);

    const closeModal = (): void => setIsOpen(false);

    const handleMessage = async (): Promise<void> => {
        try {
            const newMessage = {
                content: `<div>${messageText}</div>`,
                senderId: user?.id,
                roomId: currentChat.id,
            };
            socket.emit('msgToServer', newMessage, () => {
                setMessageText('');
            });
        } catch (error) {
            message.error(error?.message);
        }
    };

    const handleOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newValue = event.currentTarget.value;
        setMessageText(newValue);
    };

    const fetchMessages = async (): Promise<void> => {
        try {
            const { data: m } = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/messages?room=${currentChat.id}`
            );
            setMessages(m);
        } catch (error) {
            notification.error({
                message: 'Error',
                description: `${error?.message}`,
            });
        }
    };

    useEffect(() => {
        fetchMessages();

        socket.on(`msgToClient`, (response: IMessages) => {
            setArrivalMessage(response);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentChat]);

    useEffect(() => {
        arrivalMessage &&
            setMessages((prev: IMessages[]) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    const freelancer = currentChat?.proposalId?.freelancerId;
    const jobOwner = currentChat?.proposalId?.jobId?.ownerId;
    const job = currentChat?.proposalId?.jobId;

    const [hourRate, setHourRate] = useState<number>(job?.price);

    const handleOffer = async (): Promise<void> => {
        try {
            const newOffer = {
                ownerId: jobOwner?.id,
                freelancerId: freelancer?.id,
                jobId: job?.id,
                status: 'Declined',
                hourRate,
            };
            await createOffer(newOffer).unwrap();
            const newMessage = {
                content: `<div className=${offer?.status}>${t('Chat.title')}${
                    job?.title
                }<span></p>
                ${t('Chat.dsc')}${job?.description}<span></p>${t(
                    'Chat.rate'
                )}${hourRate}<span></p>
                <p className=${
                    data?.data?.role === Role.jobOwner
                        ? 'Freelancer'
                        : 'JobOwner'
                }>
                ${t('Chat.link')}</p></div>`,
                senderId: user?.id,
                roomId: currentChat.id,
            };

            socket.emit('msgToServer', newMessage);
            closeModal();
        } catch (error) {
            message.error(error?.message);
        }
    };

    const handleHourRateChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const newValue = event.target.value;
        setHourRate(+newValue);
    };

    const handleShowEmojis = (): void => {
        inputRef?.current?.focus();
        setShowEmojis(!showEmojis);
    };

    const handleEmojiClick = (event: TEvent, emojiObject: TEmoji): void => {
        inputRef?.current?.focus();
        setEmoji(emojiObject.emoji);
    };

    useEffect(() => {
        emoji && setMessageText((prev) => prev + emoji);
    }, [emoji]);

    return (
        <Wrapper>
            <MainChat>
                <ChatHeader>
                    <div>
                        <CurrentChatUser>
                            <Avatar
                                id={
                                    freelancer?.id === user?.id
                                        ? jobOwner?.id
                                        : freelancer?.id
                                }
                            />
                            <div>
                                <ProjectOwner>
                                    {freelancer?.id === user?.id
                                        ? `${jobOwner?.firstName} ${jobOwner?.lastName}`
                                        : `${freelancer?.firstName} ${freelancer?.lastName}`}
                                </ProjectOwner>
                                <Project>{job?.title}</Project>
                            </div>
                        </CurrentChatUser>
                    </div>

                    <div>
                        {(data?.data?.role || undefined) === Role.jobOwner &&
                            job?.id !== offer?.jobId?.id && (
                                <SettingsBtn
                                    onClick={openModal}
                                    bg={colors.proposalGreen}
                                    color={colors.textWhite}
                                >
                                    {t('Chat.jobOffer')}
                                </SettingsBtn>
                            )}
                    </div>
                </ChatHeader>
                <ChatBody>
                    <div>
                        {messages
                            .filter(
                                (member) =>
                                    member?.roomId?.id === currentChat.id
                            )
                            .map((memberMessage, index: number) => {
                                return (
                                    <ChatItem
                                        animationDelay={index + 2}
                                        key={memberMessage?.id}
                                        msg={memberMessage}
                                    />
                                );
                            })}
                    </div>
                    {showEmojis && <Emoji onEmojiClick={handleEmojiClick} />}
                </ChatBody>
                <ChatFooter>
                    <SendNewMessage>
                        <EmojiIcon onClick={handleShowEmojis} />

                        <SendNewMessageInput
                            ref={inputRef}
                            value={messageText}
                            type="text"
                            placeholder={`${t('Chat.sendMsgPlaceholder')}`}
                            onChange={handleOnChange}
                        />
                        <SendNewMessageBtn
                            onClick={handleMessage}
                            disabled={messages.length < 1}
                        >
                            <SendNewMessageIcon />
                        </SendNewMessageBtn>
                    </SendNewMessage>
                </ChatFooter>
            </MainChat>

            <ChatWindow
                modalIsOpen={modalIsOpen}
                handleOffer={handleOffer}
                closeModal={closeModal}
                handleHourRateChange={handleHourRateChange}
                price={job?.price}
                hourRate={hourRate}
            />
        </Wrapper>
    );
};

export default ChatContent;
