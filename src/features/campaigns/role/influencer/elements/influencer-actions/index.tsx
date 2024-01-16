import React, { useState, useEffect, useMemo } from 'react';
import { useMenu, useModal, useSnackbar } from 'hooks';
import {
  ApproveIcon,
  DeclineIcon,
  DeleteIcon,
  InfoIcon,
  VerticalDotsIcon,
} from 'components/svg';
import {
  NoteInfluencer,
  ScheduleInfluencerModal,
} from 'features/discover-influencers/role/admin/elements';
import { CampaignAPI } from 'api';
import AcceptCampaign from 'features/home/role/influencer/elements/apply-campaign';
import { hasEndDatePassed } from 'utilities/calendar';
import PromptModal from '../prompt-modal';
import { THomeActionsMenuProps } from './types';
import { HomeActionsMain, HomeActionsMenu, ISpan } from './styles';
import CampaignModal from '../campaign-modal';

const InfluencerActions = ({
  data,
  reload,
  actionLabels,
  ...props
}: THomeActionsMenuProps) => {
  const [menu, open, setOpen, buttonRef, position] = useMenu(false);
  const [aiModal, openAiModal, closeAiModal] = useModal(false);
  const [siModal, openSiModal, closeSiModal] = useModal(false);
  const [niModal, openNiModal, closeNiModal] = useModal(false);
  const [diModal, openDiModal, closeDiModal] = useModal(false);
  const [ciModal, openCiModal, closeCiModal] = useModal(false);
  const [lCModal, openLCModal, closeLCModal] = useModal(false);

  const { push } = useSnackbar();

  const handleMenu = () => {
    setOpen((prevState: boolean) => !prevState);
  };

  const initialInfluencerActions = [
    {
      icon: <InfoIcon />,
      label: 'Info',
      action: () => {
        openCiModal();
        handleMenu();
      },
    },
    {
      icon: <ApproveIcon />,
      label: 'Apply',
      action: () => {
        openAiModal();
        handleMenu();
      },
    },
    {
      icon: <DeclineIcon />,
      label: 'Decline',
      action: () => {
        openDiModal();
        handleMenu();
      },
    },
    {
      icon: <DeleteIcon />,
      label: 'Leave',
      action: () => {
        openLCModal();
        handleMenu();
      },
    },
  ];

  const handleDecline = async () => {
    try {
      await CampaignAPI.declineInvitationToCampaign(data.id).then(() => {
        reload();
      });
      push('Influencer successfully declined invitation!', {
        variant: 'success',
      });
    } catch (e: any) {
      push(e.response.data.message, { variant: 'error' });
    }
  };

  const handleApplyInfluencerToCampaign = async () => {
    try {
      await CampaignAPI.acceptInvitationToCampaign(data.id).then(() => {
        reload();
      });

      push('Influencer successfully accepted invitation!', {
        variant: 'success',
      });
      closeAiModal();
    } catch (e: any) {
      push(e.response.data.message, { variant: 'error' });
    }
  };

  const handleLeaveCampaign = async () => {
    try {
      await CampaignAPI.removeInfluencerFromCampaign(data.id).then(() => {
        reload();
      });
      push('You have successfully left the campaign.', {
        variant: 'success',
      });
    } catch (e: any) {
      push(e.response.data.message, { variant: 'error' });
    }
  };

  const influencerActions = useMemo(() => 
    initialInfluencerActions.filter((action) => actionLabels.includes(action.label)), [actionLabels]);

  return (
    <HomeActionsMain {...props}>
      {influencerActions.length ? (
        <ISpan
          onClick={() => {
            handleMenu();
          }}
          ref={buttonRef}
        >
          <VerticalDotsIcon />
        </ISpan>
      ) : undefined}
      {open && (
        <HomeActionsMenu
          position={position}
          items={influencerActions}
          ref={menu}
        />
      )}
      {aiModal && (
        <AcceptCampaign
          handleAction={handleApplyInfluencerToCampaign}
          onClose={closeAiModal}
        />
      )}
      {niModal && <NoteInfluencer onClose={closeNiModal} />}
      {diModal && (
        <PromptModal
          onClose={() => {
            closeDiModal();
          }}
          handleAction={handleDecline}
        />
      )}
      {lCModal && (
        <PromptModal
          type="leave"
          onClose={() => {
            closeLCModal();
          }}
          handleAction={handleLeaveCampaign}
        />
      )}
      {siModal && <ScheduleInfluencerModal onClose={closeSiModal} />}
      {ciModal && (
        <CampaignModal reload={reload} onClose={closeCiModal} data={data} />
      )}
    </HomeActionsMain>
  );
};

export default InfluencerActions;
