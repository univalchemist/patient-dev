import React, { FC, useEffect, useState } from 'react';
import { useModal } from 'hooks';
import AddInstagramModal from 'features/account/role/influencer/elements/add-instagram-modal';
import InstagramGroupIcon from 'components/svg/instagram-group';
import {
  FullName,
  SecondIcon,
  InstagramButton,
  InstagramContent,
  InstagramDescription,
  InstagramGroupIconContent,
  InstagramUserName,
  FirstIcon,
} from './style';
import type { FormData } from '../../type';
import { StepContainer, StepContentLabel } from '../../styles';

type Step3FormProps = {
  formData: FormData;
  setFormData: any;
  submit: () => void;
};

const Step: FC<Step3FormProps> = ({ formData, setFormData, submit }) => {
  const { instagramUsername, firstName, lastName } = formData;

  const [instagramModal, openInstagramModal, closeInstagramModal] =
    useModal(false);
  const [needUpdate, setNeedUpdate] = useState(false);

  useEffect(() => {
    if (needUpdate) submit();
  }, [needUpdate]);

  return (
    <>
      <StepContainer>
        <div>
          <StepContentLabel>Link Your Instagram</StepContentLabel>
          <InstagramDescription>
            Link your instagram to validate your profile securely and keep our
            community safe.
          </InstagramDescription>
          <InstagramContent>
            <div>
              <FullName>{`${firstName} ${lastName}`}</FullName>
              {instagramUsername && (
                <InstagramUserName>{`@${instagramUsername}`}</InstagramUserName>
              )}
            </div>
            <InstagramButton
              color="secondary"
              variant="contained"
              onClick={() => openInstagramModal()}
            >
              {instagramUsername && <FirstIcon />}
              <SecondIcon />
              {instagramUsername ? 'Instagram Linked' : 'Link Instagram'}
            </InstagramButton>
          </InstagramContent>
        </div>
        <InstagramGroupIconContent>
          <InstagramGroupIcon />
        </InstagramGroupIconContent>
      </StepContainer>

      {instagramModal && (
        <AddInstagramModal
          instagramUsername={formData.instagramUsername}
          onConfirm={(value) => {
            setFormData({ ...formData, instagramUsername: value });
            closeInstagramModal();
            setNeedUpdate(true);
          }}
          onClose={closeInstagramModal}
        />
      )}
    </>
  );
};

export default Step;
