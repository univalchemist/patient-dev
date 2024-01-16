import Project from 'constants/project';
import type { FormData } from './type';

export const generateRegisterAffiliateLink = (affiliateCode: string) => {
  const {
    environment,
    baseUrl: baseDevUrl,
    baseProdUrl,
    baseStageUrl,
  } = Project.app;
  let baseUrl;

  switch (environment) {
    case 'development':
      baseUrl = baseDevUrl;
      break;
    case 'staging':
      baseUrl = baseStageUrl;
      break;
    case 'production':
      baseUrl = baseProdUrl;
      break;
    default:
      // Handle the case where 'environment' is not one of the specified values
      console.error('Unknown environment:', environment);
      break;
  }

  return `${baseUrl}/register?as=influencer&affiliateCode=${affiliateCode}`;
};

export const getInitialForData = (user: any): FormData => ({
  firstName: user.firstName,
  lastName: user.lastName,
  company: '',
  role: '',
  type: user.influencer.type,
  markets: '',
  email: user.email,
  password: user.password,
  invitedBy: user.influencer.invitendByUserId,
  affiliateFriends: null,
  affiliateLink: generateRegisterAffiliateLink(user.influencer.affiliateCode),
  birthDate: user.influencer.dateOfBirth,
  location: null,
  gender: null,
  diseaseAreas: [],
  experienceAs: user.influencer.type,
  ethnicity: null,
  instaP: '',
  instaR: '',
  instaS: '',
  yVideoS: null,
  yVideoM: null,
  yVideoL: null,
  ttPost: null,
  questionCredit: '',
  averageQuestionSurvey: '',
  interviewShort: '',
  interviewLong: '',
  socialPlatforms: [],
  currency: 2,
  status: user.status,
  instagramUsername: '',
});
