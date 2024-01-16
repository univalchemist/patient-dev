import React, { useState, useMemo } from 'react';
import { Button, Checkbox, Input } from 'components/ui';
import { instagramUsernameSchema } from 'utilities/validators';
import { Modal } from 'components/custom';
import { Stack } from 'components/system';
import { useAppContext } from 'context';
import { AddInstagramModalProps } from './types';
import { Description, VerificationCodeItem, VerificationCodeWrapper } from './styles';

const AddInstagramModal = ({ instagramUsername, onConfirm, onClose, ...props }: AddInstagramModalProps) => {
  const [username, setUsername] = useState(instagramUsername);
  const [checked, setChecked] = useState(false);
  const { user } = useAppContext();

  const isFormDataValid = useMemo(() => {
    try {
      instagramUsernameSchema.validateSync(username);
      return !checked;
    } catch {
      return true;
    }
  }, [username, checked]);

  return (
    <Modal
      title="Link you Instagram"
      onClose={onClose}
      {...props}
    >
      <Stack>
        <Description>
          Please enter your Instagram username and send the displayed unique 4-digit code to www.instagram.com/patientsinfluence via direct message to validate your profile securely and keep our community safe.
        </Description>
        <Input
          type="text"
          label="Username"
          placeholder="Please Enter"
          disabled={!!instagramUsername}
          value={username}
          onValue={(value) => setUsername(value)}
        />

        <VerificationCodeWrapper>
          {[...user.influencer.affiliateCode.substring(0, 4)].map((code) => (
            <VerificationCodeItem key={code}>{code}</VerificationCodeItem>
          ))}
        </VerificationCodeWrapper>

        {instagramUsername
          ? <Button
            size="large"
            color="primary"
            variant="contained"
            onClick={onClose}
          >
            Close
          </Button>
          : <>
            <Checkbox
              label="I confirm that I've sent the unique 4-digit code."
              value={checked}
              onValue={value => setChecked(value)}
            />
            <Button
              size="large"
              color="primary"
              variant="contained"
              disabled={isFormDataValid}
              onClick={() => onConfirm(username || '')}
            >
              Confirm
            </Button>
          </>
        }
      </Stack>
    </Modal>
  )
}

export default AddInstagramModal;