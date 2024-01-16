import React from 'react';
import { TStateItem } from 'features/campaigns/role/admin/elements/created-campaign-modal/types';
import { IProductOrderCampaign } from '../../types';

export type TCampaignsModalProps = React.HTMLAttributes<HTMLDivElement> & {
  onClose: () => void;
  data: IProductOrderCampaign;
  reload: () => void;
};

export type TState = {
  campaignName: string;
  productName: string;
  companyName: string;
  socialMedia: string;
  postType: string;
  startDate: string;
  endDate: string;
  status: string;
  amount: string;
  instructionsInfo: string;
  submissionLink: string;
  chatRoomId?: { value: any };
};
