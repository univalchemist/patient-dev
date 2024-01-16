import { Button } from 'components/ui';
import React, { useState, useEffect, useMemo } from 'react';

import { useAppContext } from 'context';
import { EnumsApi, InfluencerAPI } from 'api';
import { useModal, useSnackbar } from 'hooks';
import { TSelectFieldType } from 'features/discover-influencers/role/admin/elements/influencer-profile/types';
import { Step1, Step2, Step3, Step4, StepV } from './stepper-steps';
import { StepperMain, SubmitButtonsMain, StepContent } from './styles';
import PromptFormSubmitModal from './elements/form-submit-modal';
import type { FormData } from './type';
import { generateRegisterAffiliateLink, getInitialForData } from './utils';
import StepContainer from './elements/step-container';

const Stepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [errors, setErrors] = useState([false, false, false, false, false]);

  const [genderOptions, setGenderOptions] = useState<TSelectFieldType[]>([]);
  const [ethnicities, setEthnicities] = useState<TSelectFieldType[]>([]);
  const [stakeholders, setStakholders] = useState<TSelectFieldType[]>([]);
  const [specializations, setSpecializations] = useState<TSelectFieldType[]>(
    []
  );
  const [buttonTextDynamic, setButtonTextDynamic] = useState('');

  const { user, handleInfluencer, getMeData } = useAppContext();
  const [formModal, openFormModal, closeFormModal] = useModal(false);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>(getInitialForData(user));

  const { push } = useSnackbar();

  const handleErrors = (index: number) => (value: boolean) => {
    setErrors((x) => x.map((a, b) => (b === index ? value : a)));
  };

  const submitData = useMemo(() => {
    const campaignDesiredIncome: object[] = [];
    const surveyDesiredIncome: object[] = [];

    if (formData.instaP) {
      campaignDesiredIncome.push({
        postType: 0,
        desiredAmount: parseFloat(formData.instaP),
      });
    }

    if (formData.instaR) {
      campaignDesiredIncome.push({
        postType: 1,
        desiredAmount: parseFloat(formData.instaR),
      });
    }

    if (formData.instaS) {
      campaignDesiredIncome.push({
        postType: 2,
        desiredAmount: parseFloat(formData.instaS),
      });
    }

    if (formData.questionCredit) {
      surveyDesiredIncome.push({
        surveyType: 0,
        desiredAmount: parseFloat(formData.questionCredit),
      });
    }

    if (formData.interviewShort) {
      surveyDesiredIncome.push({
        surveyType: 1,
        desiredAmount: parseFloat(formData.interviewShort),
      });
    }

    if (formData.interviewLong) {
      surveyDesiredIncome.push({
        surveyType: 2,
        desiredAmount: parseFloat(formData.interviewLong),
      });
    }

    return {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      affiliateFriends: formData.affiliateFriends,
      affiliateLink: formData.affiliateLink,
      dateOfBirth: formData.birthDate,
      locationId: formData.location?.value,
      gender: formData.gender?.value,
      diseaseAreas: formData.diseaseAreas?.map((item: any) => item.value),
      ethnicityId: formData.ethnicity?.value,
      type: formData.experienceAs?.value,
      specialization: [1, 2].includes(formData.experienceAs?.value)
        ? null
        : formData.specialization?.value,
      status: user.status,
      instagramUsername: formData.instagramUsername || null,
      campaignDesiredIncome,
      surveyDesiredIncome,
    };
  }, [formData]);

  const isStep2FormValid = useMemo(
    () =>
      !!submitData.dateOfBirth &&
      !!submitData.locationId &&
      submitData.gender >= 0 &&
      submitData.diseaseAreas?.length !== 0 &&
      !!submitData.ethnicityId &&
      !!submitData.type &&
      ([1, 2].includes(submitData.type) || !!submitData.specialization),
    [submitData]
  );

  const isStep3FormValid = useMemo(
    () => !!submitData.instagramUsername,
    [submitData]
  );

  const handleChangeStep = async (idx: any) => {
    if (loading) return;

    setActiveStep(idx);
  };

  const getInfluencerData = async (influencerId: number) => {
    const singleInfluencer =
      await InfluencerAPI.getSingleInfluencer(influencerId);
    handleInfluencer(singleInfluencer);
    return singleInfluencer;
  };

  const setInfluencerData = async () => {
    if (user && genderOptions && ethnicities) {
      getInfluencerData(user.id)
        .then((influencerUser) => {
          // const affiliatedFriends = data.invitedInfluencers.map(
          //   (influencer: { user: any }) => {
          //     const { id, firstName, lastName } = influencer.user;
          //     const label = `${firstName} ${lastName}`;
          //     return { value: id, label };
          //   }
          // );
          // setAffiliateFriendsList(affiliatedFriends);
          setFormData((prevState) => {
            let location;

            if (influencerUser.location) {
              const label =
                influencerUser.location.countryId &&
                influencerUser.location.country
                  ? `${influencerUser.location.name}, ${influencerUser.location.country.name}`
                  : influencerUser.location.name;

              location = {
                label,
                value: influencerUser.location.id,
              };
            }

            const gender =
              influencerUser.influencer.gender === 0 ||
              influencerUser.influencer.gender
                ? genderOptions[influencerUser.influencer.gender]
                : null;

            const diseaseAreas = influencerUser.influencer
              .influencerDiseaseAreas
              ? influencerUser.influencer.influencerDiseaseAreas.map((area) => {
                  const label = area.diseaseArea.name;
                  const value = area.diseaseArea.id;
                  return {
                    label,
                    value,
                  };
                })
              : [];

            const postAmounts =
              influencerUser.influencer.influencerCampaignAmounts;
            const surveyAmounts =
              influencerUser.influencer.influencerSurveyAmounts;

            const postLabel: { [key: number]: string } = {
              0: 'post',
              1: 'reel',
              2: 'story',
            };

            const surveyLabel: { [key: number]: string } = {
              0: 'questionnaire',
              1: 'short',
              2: 'long',
            };

            const formattedPostAmounts = postAmounts.map((obj) => {
              const label = postLabel[obj.postType];
              return { type: label, amount: `${obj.desiredAmount}` };
            });

            const formattedSurveyAmounts = surveyAmounts.map((obj) => {
              const label = surveyLabel[obj.surveyType];
              return { type: label, amount: `${obj.desiredAmount}` };
            });

            const instaP = formattedPostAmounts.find(
              (postAm) => postAm.type === 'post'
            );
            const instaR = formattedPostAmounts.find(
              (postAm) => postAm.type === 'reel'
            );
            const instaS = formattedPostAmounts.find(
              (postAm) => postAm.type === 'story'
            );

            const questionCredit = formattedSurveyAmounts.find(
              (surveyAm) => surveyAm.type === 'questionnaire'
            );
            const interviewShort = formattedSurveyAmounts.find(
              (surveyAm) => surveyAm.type === 'short'
            );
            const interviewLong = formattedSurveyAmounts.find(
              (surveyAm) => surveyAm.type === 'long'
            );

            const ethnicity = influencerUser.influencer.ethnicityId
              ? ethnicities.find(
                  (ethnicityItem) =>
                    ethnicityItem.value ===
                    influencerUser.influencer.ethnicityId
                )
              : null;
            const invitedBy = influencerUser.influencer.invitedByUser
              ? `${influencerUser.influencer.invitedByUser.firstName} ${influencerUser.influencer.invitedByUser.lastName}`
              : '';

            const experience =
              influencerUser.influencer.type === 0 ||
              influencerUser.influencer.type
                ? stakeholders.find(
                    (item: TSelectFieldType) =>
                      item.value === influencerUser.influencer.type
                  )
                : null;

            const specialization = specializations.find(
              (item: TSelectFieldType) =>
                item.value === influencerUser.influencer.specialization
            );

            const instagramUsername =
              influencerUser.influencer.instagramUsername !== null &&
              influencerUser.influencer.instagramUsername.length
                ? influencerUser.influencer.instagramUsername
                : '';

            return {
              ...prevState,
              firstName: influencerUser.firstName,
              lastName: influencerUser.lastName,
              company: '',
              role: '',
              type: influencerUser.influencer.type,
              markets: '',
              email: influencerUser.email,
              password: user.password,
              invitedBy,
              affiliateFriends: null,
              affiliateLink: generateRegisterAffiliateLink(
                user.influencer.affiliateCode
              ),
              birthDate: user.influencer.dateOfBirth,
              location,
              gender,
              diseaseAreas,
              experienceAs: experience,
              specialization,
              ethnicity,
              instaP: instaP?.amount || '',
              instaR: instaR?.amount || '',
              instaS: instaS?.amount || '',
              yVideoS: null,
              yVideoM: null,
              yVideoL: null,
              ttPost: null,
              questionCredit: questionCredit?.amount || '',
              averageQuestionSurvey: '',
              interviewShort: interviewShort?.amount || '',
              interviewLong: interviewLong?.amount || '',
              socialPlatforms: [],
              instagramUsername,
              currency: 2,
              status: user.status,
            };
          });
        })
        .catch(() => {
          push('Something failed!', {
            variant: 'error',
          });
        });
    }
  };

  const handleSubmit = async (isGoNextStep: boolean = true) => {
    const submitFormData = { ...submitData };

    try {
      if (activeStep === 1 && !isStep2FormValid) {
        push('Unable to submit form. Please fill out all required fields!', {
          variant: 'error',
        });
        return;
      }

      if (activeStep === 2 && !isStep3FormValid) {
        push('Unable to submit form. Please fill out all required fields!', {
          variant: 'error',
        });
        return;
      }

      if (activeStep === 3) {
        if (!isStep2FormValid || !isStep3FormValid) {
          push('Unable to submit form. Please fill out all required fields!', {
            variant: 'error',
          });
          return;
        }

        if (!formModal && user.status < 4) {
          openFormModal();
          return;
        }

        submitFormData.status = user.status > 4 ? user.status : 4;
      }

      setLoading(true);

      await InfluencerAPI.updateInfluencer(submitFormData, user.id);
      if (activeStep === 3) {
        if (user.status < 4) {
          push('Form submited!', {
            variant: 'success',
          });
        }

        if (user.status >= 4) {
          push('Form updated!', {
            variant: 'success',
          });
        }
      }

      getMeData();
      if (isGoNextStep) setActiveStep((prev) => prev + 1);
    } catch {
      push('Unable to submit form. Please fill out all required fields!', {
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const getGenderOptions = async () => {
    const result = await EnumsApi.getGenders();

    setGenderOptions(
      result.map((x: any) => ({
        value: x.value,
        label: x.name,
      }))
    );
  };

  const getEthnicity = async () => {
    const result = await EnumsApi.getEthnicities();

    setEthnicities(
      result.map((x: any) => ({
        value: x.id,
        label: x.name,
      }))
    );
  };

  const getStakeholders = async () => {
    const result = await EnumsApi.getStakeholderTypes(true);

    setStakholders(
      result.map((x: any) => ({
        value: x.value,
        label: x.name,
      }))
    );
  };

  const getSpecializations = async (stakeholderType?: number) => {
    if (stakeholderType) {
      const result = await EnumsApi.getSpecializationTypes(stakeholderType);

      setSpecializations(
        result.map((x: any) => ({
          value: x.value,
          label: x.name,
        }))
      );
    }
  };

  useEffect(() => {
    getStakeholders();
    getEthnicity();
    getGenderOptions();
  }, []);

  useEffect(() => {
    getSpecializations(user.influencer?.type);
  }, [user]);

  useEffect(() => {
    setInfluencerData();
  }, [user, genderOptions, ethnicities, specializations]);

  useEffect(() => {
    let buttonText = '';
    buttonText = 'Next';

    if (activeStep === 3 && user.status <= 3) {
      buttonText = 'Submit';
    }

    if (activeStep === 4 && user.status >= 5) {
      buttonText = 'Verified';
    }

    if (activeStep === 3 && user.status >= 4) {
      buttonText = 'Save';
    }

    setButtonTextDynamic(buttonText);
  }, [activeStep, user.status]);

  return (
    <StepperMain>
      <StepContainer
        activeStep={activeStep}
        onChangeStep={handleChangeStep}
        userStatus={user.status}
      />
      <StepContent>
        {activeStep === 0 && (
          <Step1
            formData={formData}
            setFormData={setFormData}
            handleErrors={handleErrors}
          />
        )}
        {activeStep === 1 && (
          <Step2
            formData={formData}
            setFormData={setFormData}
            handleErrors={handleErrors}
          />
        )}
        {activeStep === 2 && (
          <Step3
            formData={formData}
            setFormData={setFormData}
            submit={() => handleSubmit(false)}
          />
        )}
        {activeStep === 3 && (
          <Step4
            formData={formData}
            setFormData={setFormData}
            handleErrors={handleErrors}
          />
        )}
        {activeStep === 4 && <StepV />}
      </StepContent>

      <SubmitButtonsMain>
        <Button
          disabled={activeStep === 0 || loading}
          variant="outlined"
          size="large"
          color="secondary"
          onClick={() => setActiveStep((prev) => prev - 1)}
        >
          Previous
        </Button>
        {activeStep !== 4 ? (
          <Button
            type="submit"
            disabled={activeStep === 4 || loading}
            variant="contained"
            size="large"
            color="primary"
            onClick={() =>
              handleSubmit(!(activeStep === 3 && user.status >= 4))
            }
          >
            {buttonTextDynamic}
          </Button>
        ) : undefined}
      </SubmitButtonsMain>

      {formModal && (
        <PromptFormSubmitModal
          onClose={closeFormModal}
          onSubmit={() => handleSubmit()}
        />
      )}
    </StepperMain>
  );
};

export default Stepper;
