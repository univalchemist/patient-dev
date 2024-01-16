export interface IGetAllNotifications {
  id: number;
  type: number;
  title: string;
  description: string;
  link: any;
  variant: string;
  createdAt: string;
  updatedAt: string;
  notificationPayload: INotificationPayload;
  notificationUsers: INotificationUser[];
}

export interface INotificationPayload {
  id: number;
  client?: IClient;
  campaign?: INotificationCampaign;
  createdAt: string;
  updatedAt: string;
}

export interface IPlatformProductOrderInfluencer {
  id: number;
  status: number;
}

export interface INotificationCampaign {
  ageMax?: number;
  clientCompanyWebsite?: string;
  createdAt: string;
  dateEnd?: string;
  dateStart?: string;
  id: number;
  name: string;
  platformProductOrderId: number;
  platformProductOrder: {
    id: number;
    status: number;
    platformProductOrderInfluencers?: IPlatformProductOrderInfluencer[];
  };
  socialPlatformId: number;
  updatedAt: string;
}

export interface IClient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface INotificationUser {
  id: number;
  notificationId: number;
  userId: number;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
}
