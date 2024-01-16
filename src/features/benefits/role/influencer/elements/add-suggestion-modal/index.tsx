import React, { useState, useEffect } from 'react';
import { Modal } from 'components/custom';
import { TAddSuggestionModalProps } from 'features/benefits/role/influencer/elements/add-suggestion-modal/types';
import { AddSuggestionModalMain } from 'features/benefits/role/influencer/elements/add-suggestion-modal/styles';
import { Button, Input } from 'components/ui';
import { Stack } from 'components/system';
import { BenefitsAPI } from 'api';
import { useModal, useSnackbar } from 'hooks';
import { useTranslation } from 'react-i18next';
import { websiteSchema } from 'utilities/validators';
import InfoSuggestionModal from '../info-suggestion-modal';

const AddSuggestionModal = ({
  onClose,
  reload,
  ...props
}: TAddSuggestionModalProps) => {
  const { t } = useTranslation('suggestion');

  const [state, setState] = useState({
    partnershipName: '',
    partnershipLink: '',
    argumentDescription: '',
    outcomeDescription: '',
  });

  const [initialState, setInitialState] = useState({
    partnershipName: '',
    partnershipLink: '',
    argumentDescription: '',
    outcomeDescription: '',
  });

  const { push } = useSnackbar();

  const [
    confirmSuggestionModal,
    openConfirmSuggestionModal,
    closeConfirmSuggestionModal,
  ] = useModal(false);

  const handleAddSuggestion = async () => {
    try {
      await BenefitsAPI.addSuggestion(state).then(() => {
        push('Suggestion successfully added.', { variant: 'success' });
        setState(initialState);
        reload();
        onClose();
      });
    } catch {
      push("Suggestion couldn't be added.", { variant: 'error' });
    }
  };

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const noValueDisabled =
      !state.partnershipName.trim() ||
      !state.partnershipLink.trim() ||
      !state.argumentDescription.trim() ||
      !state.outcomeDescription.trim();

    const partnershipLinkValidator = state.partnershipLink.endsWith('.com');

    if (noValueDisabled === false && partnershipLinkValidator === true) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [state]);

  return (
    <Modal
      size="medium"
      title="Suggestion"
      actions={[
        <Button
          color="primary"
          variant="contained"
          size="large"
          disabled={isDisabled}
          onClick={async () => {
            openConfirmSuggestionModal();
          }}
        >
          Make Suggestion
        </Button>,
      ]}
      onClose={onClose}
      {...props}
    >
      <Stack>
        <AddSuggestionModalMain columns={2}>
          <Input
            type="text"
            label="Company Name"
            placeholder="Please Enter"
            validators={[
              {
                message: t('Company name is required'),
                validator: (CompanyName) => {
                  const v = CompanyName as string;
                  if (v.trim()) return true;
                  return false;
                },
              },
            ]}
            value={state.partnershipName}
            onValue={(partnershipName) =>
              setState({ ...state, partnershipName })
            }
          />
          <Input
            type="text"
            label="Company website"
            placeholder="Please Enter"
            validators={[
              {
                message: t('Company website is required'),
                validator: (companyWebsite) => {
                  const v = companyWebsite as string;
                  if (v.trim()) return true;
                  return false;
                },
              },
              {
                message: t('Please enter a valid URL ending with .com'),
                validator: (companyWebsite) => {
                  try {
                    websiteSchema.validateSync({ url: companyWebsite });
                    return true;
                  } catch {
                    return false;
                  }
                },
              },
            ]}
            value={state.partnershipLink}
            onValue={(partnershipLink) =>
              setState({ ...state, partnershipLink })
            }
          />
          <Input
            multiline
            rows={3}
            type="text"
            label="Argument"
            validators={[
              {
                message: t('Argument is required'),
                validator: (Argument) => {
                  const v = Argument as string;
                  if (v.trim()) return true;
                  return false;
                },
              },
            ]}
            value={state.argumentDescription}
            onValue={(argumentDescription) =>
              setState({ ...state, argumentDescription })
            }
          />
          <Input
            multiline
            rows={3}
            type="text"
            label="Desired outcome"
            validators={[
              {
                message: t('Desired outcome is required'),
                validator: (DesiredOutcome) => {
                  const v = DesiredOutcome as string;
                  if (v.trim()) return true;
                  return false;
                },
              },
            ]}
            value={state.outcomeDescription}
            onValue={(outcomeDescription) =>
              setState({ ...state, outcomeDescription })
            }
          />

          {confirmSuggestionModal ? (
            <InfoSuggestionModal
              onClose={() => {
                closeConfirmSuggestionModal();
              }}
              handleAction={() => handleAddSuggestion()}
            />
          ) : undefined}
        </AddSuggestionModalMain>
      </Stack>
    </Modal>
  );
};

export default AddSuggestionModal;
