/* eslint-disable no-shadow */
import { Input } from 'components/ui';
import { useModal, useSnackbar } from 'hooks';
import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { CopyIcon } from 'components/svg';
import { useAppContext } from 'context';
import { AuthorizationAPI, InfluencerAPI } from 'api';
import {
  emailSchema,
  firstNameSchema, // potential gazenje
  lastNameSchema,
  passwordSchema,
} from 'utilities/validators';
import { TSelectFieldType } from 'features/discover-influencers/role/admin/elements/influencer-profile/types';
import { useRouter } from 'next/router';
import { useMediaQuery, useTheme } from '@mui/material';
import { ChangeEmailModal, ChangePasswordModal } from '../../elements';
import { StepSpan } from './style';
import { FormData } from '../../type';
import { FormGroup, StepContentLabel, StepContainer } from '../../styles';

type Step1FormProps = {
  formData: FormData;
  setFormData: any;
  handleErrors: (index: number) => (value: boolean) => void;
};

const Step = ({ formData, setFormData, handleErrors }: Step1FormProps) => {
  const { user, influencer, logout } = useAppContext();
  const { t } = useTranslation('register');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    firstName,
    lastName,
    email,
    // invitedBy,
    affiliateFriends,
    affiliateLink,
  } = formData;

  const [ceModal, openCeModal, closeCeModal] = useModal(false);
  const [cpModal, openCpModal, closeCpModal] = useModal(false);
  const [affiliateFriendsList, setAffiliateFriendsList] = useState<
    TSelectFieldType[]
  >([]);

  const { push } = useSnackbar();

  const router = useRouter();

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(affiliateLink);
      push(`Successfully copied!`, {
        variant: 'success',
      });
    } catch {
      push('Something failed!', {
        variant: 'error',
      });
    }
  };

  const getInfluencerData = async (influencerId: number) => {
    const influencer = await InfluencerAPI.getSingleInfluencer(influencerId);
    // handleInfluencer(influencer);
    return influencer;
  };

  const resetPassword = async () => {
    try {
      await AuthorizationAPI.resetPassword(user.email, 'en').then(() => {
        logout();
        router.push('/login');
      });
      push('Email for password reset has been sent.', { variant: 'success' });
    } catch {
      push('Email for password reset has not been sent.', { variant: 'error' });
    }
  };

  useEffect(() => {
    if (influencer) {
      const affiliatedFriends = influencer.invitedInfluencers.map(
        (influencer: { user: any }) => {
          const { id, firstName, lastName } = influencer.user;

          const label = `${firstName} ${lastName}`;

          return { value: id, label };
        }
      );
      setAffiliateFriendsList(affiliatedFriends);
    }
  }, [influencer]);

  useEffect(() => {
    if (user.influencer.invitendByUserId) {
      getInfluencerData(user.influencer.invitendByUserId)
        .then((influencer) => {
          setFormData((prevState: any) => ({
            ...prevState,
            invitedBy: `${influencer.firstName} ${influencer.lastName}`,
          }));
        })
        .catch(() => push('Wrong influencer', { variant: 'error' }));
    }
  }, [user]);

  return (
    <StepContainer>
      <div>
        <StepContentLabel>Account Info</StepContentLabel>
        <FormGroup>
          <Input
            type="text"
            label="First Name"
            placeholder="John"
            disabled
            errorCallback={handleErrors(0)}
            validators={[
              {
                message: t('First name is required'),
                validator: (firstName) => {
                  const v = firstName as string;
                  if (v.trim()) return true;
                  return false;
                },
              },
              {
                message: t('First name needs to be at least 2 characters long'),
                validator: (firstName) => {
                  try {
                    firstNameSchema.validateSync({ firstName });
                    return true;
                  } catch {
                    return false;
                  }
                },
              },
            ]}
            value={firstName}
            onValue={(firstname) => setFormData({ ...formData, firstname })}
          />
          <Input
            type="text"
            label="Last Name"
            placeholder="Doe"
            disabled
            errorCallback={handleErrors(1)}
            validators={[
              {
                message: t('Last name is required'),
                validator: (lastName) => {
                  const v = lastName as string;
                  if (v.trim()) return true;
                  return false;
                },
              },
              {
                message: t('Last name needs to be at least 2 characters long'),
                validator: (lastName) => {
                  try {
                    lastNameSchema.validateSync({ lastName });
                    return true;
                  } catch {
                    return false;
                  }
                },
              },
            ]}
            value={lastName}
            onValue={(lastName) => setFormData({ ...formData, lastName })}
          />
          <Input
            type="text"
            label="Email"
            placeholder="johndoe@gmail.com"
            disabled
            style={isMobile ? {} : { gridColumn: '1 / 3' }}
            errorCallback={handleErrors(3)}
            validators={[
              {
                message: t('Email is required'),
                validator: (email) => {
                  const v = email as string;
                  if (v.trim()) return true;
                  return false;
                },
              },
              {
                message: t('Not a valid email format'),
                validator: (email) => {
                  try {
                    emailSchema.validateSync({ email });
                    return true;
                  } catch {
                    return false;
                  }
                },
              },
            ]}
            value={email}
            onValue={(email) => setFormData({ ...formData, email })}
          />
          <div style={isMobile ? {} : { gridColumn: '1 / 3' }}>
            <Input
              type="password"
              label={t('Password') as string}
              disabled
              placeholder={t('***************') as string}
              value={formData.password}
              onValue={(password) => setFormData({ ...formData, password })}
              errorCallback={handleErrors(4)}
              validators={[
                {
                  message: t('Password is required'),
                  validator: (password) => {
                    const v = password as string;
                    if (v.trim()) return true;
                    return false;
                  },
                },
                {
                  message: t(
                    'Password must have at least one uppercase, lowercase letter, number and symbol'
                  ),
                  validator: (password) => {
                    try {
                      passwordSchema.validateSync({ password });
                      return true;
                    } catch {
                      return false;
                    }
                  },
                },
              ]}
            />

            <StepSpan onClick={resetPassword}>
              <span>Change Password</span>
            </StepSpan>
          </div>
        </FormGroup>
      </div>
      <div>
        <StepContentLabel>Affiliate</StepContentLabel>
        <FormGroup>
          <Input
            type="select"
            label="Affiliate friends"
            placeholder="Affiliate friends"
            value={affiliateFriends}
            style={isMobile ? {} : { gridColumn: '1 / 3' }}
            onValue={(affiliateFriends) =>
              setFormData({ ...formData, affiliateFriends })
            }
            options={affiliateFriendsList}
          />
          <Input
            type="text"
            label="Affiliate link"
            disabled
            value={affiliateLink}
            style={isMobile ? {} : { gridColumn: '1 / 3' }}
            endAdornment={
              <CopyIcon
                style={{ cursor: 'pointer' }}
                onClick={handleCopyToClipboard}
              />
            }
            onValue={(affiliateLink) =>
              setFormData({ ...formData, affiliateLink })
            }
          />
        </FormGroup>
      </div>

      {/* {invitedBy ? (
        <Input
          type="text"
          label="Invited by"
          disabled
          value={invitedBy}
          onValue={(invitedBy) => setFormData({ ...formData, invitedBy })}
        />
      ) : undefined} */}
      {ceModal && <ChangeEmailModal onClose={closeCeModal} />}
      {cpModal && <ChangePasswordModal onClose={closeCpModal} />}
    </StepContainer>
  );
};

export default Step;
