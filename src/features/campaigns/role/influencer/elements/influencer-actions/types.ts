import React from 'react';
import { IProductOrderCampaign } from '../../types';

export type THomeActionsMenuProps = React.HTMLAttributes<HTMLDivElement> & {
  data: IProductOrderCampaign;
  reload: () => Promise<void>;
  actionLabels: string[];
};
