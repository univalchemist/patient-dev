import { Input } from 'components/ui';
import React, { useEffect, useMemo, useState } from 'react';
import { DiseaseAreaAPI, EnumsApi, LocationAPI } from 'api';
import { useAppContext } from 'context';
import { useDebounce } from 'hooks';
import { useTranslation } from 'react-i18next';
import {
  birthDateSchema,
  diseaseAreaSchema,
  ethnicitySchema,
  experienceAsSchema,
  genderSchema,
  locationSchema,
} from 'utilities/validators';
import { TSelectFieldType } from 'features/discover-influencers/role/admin/elements/influencer-profile/types';
import { useMediaQuery, useTheme } from '@mui/material';
import { FormData } from '../../type';
import {
  FormGroup,
  StepAlert,
  StepContainer,
  StepContentLabel,
} from '../../styles';

type Step2FormProps = {
  formData: FormData;
  setFormData: any;
  handleErrors: (index: number) => (value: boolean) => void;
};

const Step = ({ formData, setFormData, handleErrors }: Step2FormProps) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('register');

  const [locations, setLocations] = useState([]);
  const [diseaseAreasOptions, setDiseaseAreasOptions] = useState([]);
  const [ethnicities, setEthnicities] = useState([]);
  const [stakeholder, setStakeholders] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [genders, setGenders] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useAppContext();

  const showSpecialization = useMemo(
    () => [3, 4, 5].includes(formData.experienceAs?.value),
    [formData.experienceAs]
  );

  const getLocations = async (searchTerm: string = '') => {
    setLoading(true);
    const { result } = await LocationAPI.getAll(searchTerm);
    setLocations(
      result.map((data: any) => {
        const checkNotInitial = data.countryId
          ? `${data.name}, ${data.country.name}`
          : data.name;
        const label = !searchTerm.length
          ? `${data.name}, ${data.country.name}`
          : checkNotInitial;

        return {
          value: data.id,
          label,
        };
      })
    );
    setLoading(false);
  };

  const getDiseaseArea = async (s: string = '') => {
    const { result } = await DiseaseAreaAPI.getAll(s);

    setDiseaseAreasOptions(
      result.map((item: any) => ({
        value: item.id,
        label: item.name,
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

    setStakeholders(
      result.map((x: any) => ({
        value: x.value,
        label: x.name,
      }))
    );
  };

  const getSpecializations = async (influencerType?: number) => {
    if (influencerType) {
      const result = await EnumsApi.getSpecializationTypes(influencerType);

      setSpecializations(
        result.map((x: any) => ({
          value: x.value,
          label: x.name,
        }))
      );
    } else {
      setSpecializations([]);
    }
  };

  const getGenders = async () => {
    const result = await EnumsApi.getGenders();

    setGenders(
      result.map((x: any) => ({
        value: x.value,
        label: x.name,
      }))
    );
  };

  const debouncedLocation = useDebounce(getLocations, 250);

  const debouncedDisease = useDebounce(getDiseaseArea, 250);

  useEffect(() => {
    getLocations();
    getDiseaseArea();
    getEthnicity();
    getStakeholders();
    getGenders();
    getSpecializations(formData.experienceAs?.value);
  }, []);

  const filteredStakeholders = stakeholder.filter((element: { value: any }) =>
    [1, 2, 3, 4, 5].includes(element.value)
  );

  const handleChangeExperienceAs = (value: TSelectFieldType) => {
    setFormData({ ...formData, experienceAs: value, specialization: null });
    getSpecializations(value?.value);
  };

  const {
    birthDate,
    location,
    gender,
    diseaseAreas,
    experienceAs,
    ethnicity,
    specialization,
  } = formData;

  return (
    <>
      <StepContentLabel>Influencer Info</StepContentLabel>
      <StepContainer>
        <FormGroup>
          <Input
            type="select"
            label="Experience As"
            placeholder="Please Select"
            value={experienceAs}
            disabled={user.status >= 4}
            onValue={handleChangeExperienceAs}
            options={filteredStakeholders}
            errorCallback={handleErrors(9)}
            validators={[
              {
                message: t('Experience As is required'),
                validator: (value?: TSelectFieldType) => {
                  if (value) return true;
                  return false;
                },
              },
              {
                message: t('Please choose type of profile!'),
                validator: (value: TSelectFieldType) => {
                  try {
                    experienceAsSchema.validateSync({ value });
                    return true;
                  } catch {
                    return false;
                  }
                },
              },
            ]}
          />
          {showSpecialization && (
            <Input
              type="select"
              label="Specialization"
              placeholder="Please Select"
              value={specialization || null}
              disabled={user.status >= 4}
              onValue={(value: TSelectFieldType) =>
                setFormData({ ...formData, specialization: value })
              }
              options={specializations}
              errorCallback={handleErrors(9)}
              validators={[
                {
                  message: t('Experience As is required'),
                  validator: (value?: TSelectFieldType) => {
                    if (value) return true;
                    return false;
                  },
                },
                {
                  message: t('Please choose type of profile!'),
                  validator: (value: TSelectFieldType) => {
                    try {
                      experienceAsSchema.validateSync({ value });
                      return true;
                    } catch {
                      return false;
                    }
                  },
                },
              ]}
            />
          )}
          <Input
            type="select"
            label="Gender"
            placeholder="Please Select"
            value={gender}
            disabled={user.status >= 4}
            onValue={(value) => setFormData({ ...formData, gender: value })}
            options={genders}
            errorCallback={handleErrors(6)}
            validators={[
              {
                message: t('Gender is required'),
                validator: (value?: TSelectFieldType) => {
                  if (value) return true;
                  return false;
                },
              },
              {
                message: t('Please select gender!'),
                validator: (value?: TSelectFieldType) => {
                  try {
                    genderSchema.validateSync({ value });
                    return true;
                  } catch {
                    return false;
                  }
                },
              },
            ]}
          />
          <Input
            type="select"
            label="Location"
            onSearch={debouncedLocation}
            placeholder="Please Select"
            value={location}
            loading={loading}
            options={locations}
            disabled={user.status >= 4}
            onValue={(value) => setFormData({ ...formData, location: value })}
            style={
              !showSpecialization && !isMobile ? { gridColumn: '1/3' } : {}
            }
            errorCallback={handleErrors(5)}
            validators={[
              {
                message: t('Location is required'),
                validator: (value?: TSelectFieldType) => {
                  if (value) return true;
                  return false;
                },
              },
              {
                message: t('Please choose location!'),
                validator: (value?: TSelectFieldType) => {
                  try {
                    locationSchema.validateSync({ value });
                    return true;
                  } catch {
                    return false;
                  }
                },
              },
            ]}
          />
          <Input
            type="date"
            label="Date of Birth"
            placeholder="Please Select"
            value={birthDate}
            disabled={user.status >= 4}
            onValue={(value) => setFormData({ ...formData, birthDate: value })}
            validators={[
              {
                message: t('Birth date is required'),
                validator: (value?: string) => {
                  if (value) return true;
                  return false;
                },
              },
              {
                message: t('Please add date of birth!'),
                validator: (value?: string) => {
                  try {
                    birthDateSchema.validateSync({ value });
                    return true;
                  } catch {
                    return false;
                  }
                },
              },
            ]}
          />
          <Input
            type="select"
            label="Ethnicity"
            placeholder="Please Select"
            value={ethnicity}
            onValue={(value) => setFormData({ ...formData, ethnicity: value })}
            disabled={user.status >= 4}
            errorCallback={handleErrors(8)}
            validators={[
              {
                message: t('Ethnicity is required'),
                validator: (value?: TSelectFieldType) => {
                  if (value) return true;
                  return false;
                },
              },
              {
                message: t('Please choose ethnicity!'),
                validator: (value?: TSelectFieldType) => {
                  try {
                    ethnicitySchema.validateSync({ value });
                    return true;
                  } catch {
                    return false;
                  }
                },
              },
            ]}
            options={ethnicities}
          />
          <Input
            type="multiselect"
            label={
              showSpecialization ? 'Treatment / Management of' : 'Disease Area'
            }
            placeholder="Please Select"
            value={diseaseAreas}
            disabled={user.status >= 4}
            onSearch={debouncedDisease}
            errorCallback={handleErrors(7)}
            onValue={(value) => {
              setFormData({ ...formData, diseaseAreas: value });
            }}
            options={diseaseAreasOptions}
            isFilterActive
            style={isMobile ? {} : { gridColumn: '1/3' }}
            validators={[
              {
                message: t('Disease area is required'),
                validator: (value?: TSelectFieldType[]) => {
                  if (value && value?.length !== 0) return true;
                  return false;
                },
              },
              {
                message: t('Please choose disease areas!'),
                validator: (value?: TSelectFieldType[]) => {
                  try {
                    diseaseAreaSchema.validateSync({ value });
                    return true;
                  } catch {
                    return false;
                  }
                },
              },
            ]}
          />
        </FormGroup>
        <div>
          <StepAlert severity="info">
            <div>
              These details allows us to match you with fitting projects based
              on the client-set criteria, boosting your opportunities and
              income.
            </div>
            <div style={{ marginTop: 5 }}>
              <i>
                Your profile and data will stay anonymised to others at all
                times, unless you explicitly consent to share it to a specific
                client during your campaign application (first name and username
                only).
              </i>
            </div>
          </StepAlert>
        </div>
      </StepContainer>
    </>
  );
};

export default Step;
