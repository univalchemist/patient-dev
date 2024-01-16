import { ProductOrderInfluencerStatus } from "api/platformProduct/enums";

export const ACampaignItems = [
  {
    reference: 'campaign',
    label: 'Campaign',
    visible: true,
  },
  {
    reference: 'status',
    label: 'Status',
    visible: true,
  },
  {
    reference: 'actions',
    label: '',
    visible: true,
  },
];


export const AvailableCampaignInfluencerStatus: number[] = [
  ProductOrderInfluencerStatus.Invited,
  ProductOrderInfluencerStatus.Matching,
  ProductOrderInfluencerStatus.NotSelected,
  ProductOrderInfluencerStatus.Withdrawn,
  ProductOrderInfluencerStatus.ToBeSubmitted,
];
// 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 13
export const OnGoingCampaignInfluencerStatus: number[] = [
  ProductOrderInfluencerStatus.Invited,
  ProductOrderInfluencerStatus.Matching,
  ProductOrderInfluencerStatus.NotSelected,
  ProductOrderInfluencerStatus.Withdrawn,
  ProductOrderInfluencerStatus.ToBeSubmitted,
  ProductOrderInfluencerStatus.ToBeApproved,
  ProductOrderInfluencerStatus.Approved,
  ProductOrderInfluencerStatus.NotApproved,
  ProductOrderInfluencerStatus.ToBePaid,
  ProductOrderInfluencerStatus.Paid,
  ProductOrderInfluencerStatus.ToBeAnswered,

];