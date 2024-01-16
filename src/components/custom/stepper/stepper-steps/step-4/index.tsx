import { Input } from 'components/ui';
import React from 'react';

import { useAppContext } from 'context';
import { handleCurrencyCalculation } from 'utilities/currency';
import InfoOutlinedIcon from 'components/svg/info-outlined';
import InfoFilledIcon from 'components/svg/info-filled';
import { ThemeProvider, Tooltip, createTheme } from '@mui/material';
import {
  InputGroup,
  BlockLabel,
  InputLabel,
  Hint,
  TooltipDescription,
} from './style';
import { FormData } from '../../type';
import {
  FormGroup,
  StepAlert,
  StepContainer,
  StepContentLabel,
} from '../../styles';

type Step4FormProps = {
  formData: FormData;
  setFormData: any;
  handleErrors: (index: number) => (value: boolean) => void;
};

const tootlipTheme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          width: 189,
          background: 'white',
          borderRadius: 8,
          boxShadow: '0px 10px 30px 0px rgba(45, 55, 121, 0.2)',
          padding: '12px 15px 15px 12px',
          boxSizing: 'content-box',
        },
      },
    },
  },
});

const Step = ({ formData, setFormData, handleErrors }: Step4FormProps) => {
  const {
    instaP,
    instaR,
    instaS,
    questionCredit,
    interviewShort,
    interviewLong,
  } = formData;

  const { currency, currencyRate } = useAppContext();

  return (
    <StepContainer>
      <div>
        <StepContentLabel>Surveys</StepContentLabel>

        <BlockLabel>Questionnaire</BlockLabel>
        <FormGroup style={{ gridTemplateColumns: '1fr' }}>
          <InputGroup>
            <InputLabel>
              Question Credit
              <ThemeProvider theme={tootlipTheme}>
                <Tooltip
                  title={
                    <TooltipDescription>
                      <span className="title">Question Credit</span>
                      <span>
                        Question Credit is determined by the complexity of the
                        question. If the question is taking more time for
                        participant to answer it will be worth more credits.
                      </span>
                      <div>
                        <span className="example">Example:</span>
                        <br />
                        <span>
                          Yes or No = 1 credit
                          <br />
                          Multiple Choice = 1 credit
                          <br /> Open-ended Question = 2 credits
                        </span>
                      </div>
                      <span>
                        <i>
                          Additional credits will be assigned to the questions
                          that require more time e.g. watching a short video.
                        </i>
                      </span>
                    </TooltipDescription>
                  }
                  placement="bottom-start"
                >
                  <div style={{ display: 'flex' }}>
                    <InfoOutlinedIcon fill="white" />
                  </div>
                </Tooltip>
              </ThemeProvider>
            </InputLabel>
            <Input
              type="number"
              placeholder="Please Enter Amount"
              value={questionCredit}
              onValue={(value) =>
                setFormData({ ...formData, questionCredit: value })
              }
              errorCallback={handleErrors(13)}
              endAdornment={
                <span style={{ font: 'inter', color: '#7e839f' }}>CHF</span>
              }
            />
            {currency !== 'CHF' && +questionCredit !== 0 && (
              <Hint>
                <InfoOutlinedIcon />
                Approximately&nbsp;
                <strong>
                  {handleCurrencyCalculation(
                    +questionCredit,
                    currencyRate,
                    currency as 'CHF' | 'EUR' | 'USD'
                  )}{' '}
                  {currency}.
                </strong>
              </Hint>
            )}
          </InputGroup>
          <InputGroup>
            <Input
              type="number"
              label="Average 20 Question Survey"
              placeholder="Calculation"
              value={(+formData.questionCredit * 40).toFixed(2)}
              disabled
              onValue={(averageQuestionSurvey) =>
                setFormData({ ...formData, averageQuestionSurvey })
              }
              endAdornment={
                <span style={{ font: 'inter', color: '#7e839f' }}>CHF</span>
              }
            />
            {currency !== 'CHF' && +formData.questionCredit !== 0 && (
              <Hint>
                <InfoOutlinedIcon />
                Approximately&nbsp;
                <strong>
                  {handleCurrencyCalculation(
                    +formData.questionCredit * 40,
                    currencyRate,
                    currency as 'CHF' | 'EUR' | 'USD'
                  )}{' '}
                  {currency}.
                </strong>
              </Hint>
            )}
          </InputGroup>
        </FormGroup>

        <BlockLabel style={{ marginTop: 24 }}>Interview</BlockLabel>
        <FormGroup style={{ gridTemplateColumns: '1fr' }}>
          <InputGroup>
            <Input
              type="number"
              label="30min"
              placeholder="Please Enter Amount"
              value={interviewShort}
              onValue={(value) =>
                setFormData({ ...formData, interviewShort: value })
              }
              errorCallback={handleErrors(14)}
              endAdornment={
                <span style={{ font: 'inter', color: '#7e839f' }}>CHF</span>
              }
            />
            {currency !== 'CHF' && +interviewShort !== 0 && (
              <Hint>
                <InfoOutlinedIcon />
                Approximately&nbsp;
                <strong>
                  {handleCurrencyCalculation(
                    +interviewShort,
                    currencyRate,
                    currency as 'CHF' | 'EUR' | 'USD'
                  )}{' '}
                  {currency}.
                </strong>
              </Hint>
            )}
          </InputGroup>
          <InputGroup>
            <Input
              type="number"
              label="60min"
              placeholder="Please Enter Amount"
              value={interviewLong}
              onValue={(value) =>
                setFormData({ ...formData, interviewLong: value })
              }
              errorCallback={handleErrors(15)}
              endAdornment={
                <span style={{ font: 'inter', color: '#7e839f' }}>CHF</span>
              }
            />
            {currency !== 'CHF' && +interviewLong !== 0 && (
              <Hint>
                <InfoOutlinedIcon />
                Approximately&nbsp;
                <strong>
                  {handleCurrencyCalculation(
                    +interviewLong,
                    currencyRate,
                    currency as 'CHF' | 'EUR' | 'USD'
                  )}{' '}
                  {currency}.
                </strong>
              </Hint>
            )}
          </InputGroup>
        </FormGroup>
      </div>
      <div>
        <StepContentLabel>Campaigns</StepContentLabel>

        <BlockLabel>Instagram</BlockLabel>
        <FormGroup style={{ gridTemplateColumns: '1fr' }}>
          <InputGroup>
            <Input
              type="number"
              label="Post"
              placeholder="Please Enter Amount"
              value={instaP}
              // onValue={(instaP) => setFilter({ ...filter, instaP })}
              onValue={(value) => setFormData({ ...formData, instaP: value })}
              errorCallback={handleErrors(10)}
              endAdornment={
                <span style={{ font: 'inter', color: '#7e839f' }}>CHF</span>
              }
              style={{ color: 'red', font: 'inter', fontWeight: '500' }}
            />
            {currency !== 'CHF' && +instaP !== 0 && (
              <Hint>
                <InfoOutlinedIcon />
                Approximately&nbsp;
                <strong>
                  {handleCurrencyCalculation(
                    +instaP,
                    currencyRate,
                    currency as 'CHF' | 'EUR' | 'USD'
                  )}{' '}
                  {currency}.
                </strong>
              </Hint>
            )}
          </InputGroup>
          <InputGroup>
            <Input
              type="number"
              label="Story"
              placeholder="Please Enter Amount"
              value={instaS}
              // onValue={(instaP) => setFilter({ ...filter, instaP })}
              onValue={(value) => setFormData({ ...formData, instaS: value })}
              errorCallback={handleErrors(11)}
              endAdornment={
                <span style={{ font: 'inter', color: '#7e839f' }}>CHF</span>
              }
            />
            {currency !== 'CHF' && +instaS !== 0 && (
              <Hint>
                <InfoOutlinedIcon />
                Approximately&nbsp;
                <strong>
                  {handleCurrencyCalculation(
                    +instaS,
                    currencyRate,
                    currency as 'CHF' | 'EUR' | 'USD'
                  )}{' '}
                  {currency}.
                </strong>
              </Hint>
            )}
          </InputGroup>
          <InputGroup>
            <Input
              type="number"
              label="Reel"
              placeholder="Please Enter Amount"
              value={instaR}
              // onValue={(instaP) => setFilter({ ...filter, instaP })}
              onValue={(value) => setFormData({ ...formData, instaR: value })}
              errorCallback={handleErrors(12)}
              endAdornment={
                <span style={{ font: 'inter', color: '#7e839f' }}>CHF</span>
              }
            />
            {currency !== 'CHF' && +instaR !== 0 && (
              <Hint>
                <InfoOutlinedIcon />
                Approximately&nbsp;
                <strong>
                  {handleCurrencyCalculation(
                    +instaR,
                    currencyRate,
                    currency as 'CHF' | 'EUR' | 'USD'
                  )}{' '}
                  {currency}.
                </strong>
              </Hint>
            )}
          </InputGroup>
        </FormGroup>

        <StepAlert
          severity="info"
          iconMapping={{
            info: <InfoFilledIcon />,
          }}
          style={{ marginTop: 42 }}
        >
          Please fill out at least one field to complete your submission.
        </StepAlert>
      </div>
    </StepContainer>
  );
};

export default Step;
