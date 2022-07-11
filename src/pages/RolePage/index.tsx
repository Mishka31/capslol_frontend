/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Col, Divider, message, Row, Typography } from 'antd';
import { setUserRole } from 'store/slices/auth/auth.slice';
import { useLazySetRoleQuery } from 'store/apis/auth';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { Role, UserType } from 'store/slices/auth/auth.type';
import { Paths } from 'router/paths';
import { StyledButton, StyledCard, Title } from './style';

const RolePage: React.FC = (): React.ReactElement => {
    const navigate = useNavigate();
    const [setRole] = useLazySetRoleQuery();
    const currentUser: UserType | null = useAppSelector(
        (state) => state.auth.user
    );
    const dispatch = useAppDispatch();

    const clickHandler = async (
        role: Role,
        id: number | undefined
    ): Promise<void> => {
        try {
            if (!id) {
                navigate(Paths.HOME, {
                    state: { message: 'User unauthorized' },
                });
                return;
            }

            const payload = await setRole({
                userId: id,
                roleType: role,
            }).unwrap();

            dispatch(setUserRole(payload));

            const { user } = payload.data;

            if (!user.role) {
                throw new Error('role is empty');
            }

            if (user.role === Role.JOB_OWNER) {
                navigate(Paths.CREATE_JOB_PAGE);
            }

            if (user.role === Role.FREELANCER) {
                navigate(`${Paths.SETTING_PAGE}/${user?.id}`);
            }
        } catch (error) {
            if ('data' in error) {
                message.error(error.data.message);
            }
            if ('error' in error) {
                message.error(error.status);
            }
        }
    };

    React.useEffect(() => {
        if (currentUser?.role) {
            if (currentUser.role === Role.JOB_OWNER) {
                navigate(Paths.CREATE_JOB_PAGE);
            }

            if (currentUser.role === Role.FREELANCER) {
                navigate(`${Paths.SETTING_PAGE}/${currentUser?.id}`);
            }
        }
    }, []);
    return (
        <Row>
            <Col span={24}>
                <Title level={2}>Choose role</Title>
            </Col>
            <Col span={24}>
                <Row justify="space-evenly">
                    <Col>
                        <StyledCard>
                            <Avatar
                                size={200}
                                src="https://joeschmoe.io/api/v1/jai"
                            />

                            <Divider />
                            <Typography.Paragraph>
                                I looking for talent
                            </Typography.Paragraph>
                        </StyledCard>
                        <StyledButton
                            onClick={() =>
                                clickHandler(Role.JOB_OWNER, currentUser?.id)
                            }
                        >
                            Job owner
                        </StyledButton>
                    </Col>

                    <Col>
                        <StyledCard>
                            <Avatar
                                size={200}
                                src="https://joeschmoe.io/api/v1/julie"
                            />
                            <Divider />
                            <Typography.Paragraph>
                                I looking for job
                            </Typography.Paragraph>
                        </StyledCard>
                        <StyledButton
                            onClick={() =>
                                clickHandler(Role.FREELANCER, currentUser?.id)
                            }
                        >
                            Freelancer
                        </StyledButton>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default RolePage;
