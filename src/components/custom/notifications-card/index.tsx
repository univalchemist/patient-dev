import React, { useState, useEffect, useCallback } from 'react';
import {
  NotificationsCardMain,
  NotificationsCardList,
  NotificationCard,
  NotificationTitle,
} from 'components/custom/notifications-card/styles';

import {
  Notification,
  NotificationSettings,
} from 'components/custom/notifications-card/elements';
import {
  TNotificationStatus,
  TNotificationsCardProps,
} from 'components/custom/notifications-card/types';
import { useAppContext } from 'context';
import { useModal } from 'hooks';
import { useNotification } from 'hooks/use-notification';
import { NotificationAPI, NotificationIO } from 'api';
import { IGetAllNotifications } from 'api/notification/types';

export interface INotificationComponentBody {
  id: number;
  text: string;
  createdAt?: string;
  status: TNotificationStatus;
}

const NotificationsCard = ({ ...props }: TNotificationsCardProps) => {
  const { role } = useAppContext();
  const { newNotification, clearNewNotification } = useNotification();

  const [nModal, closeNModal] = useModal(false);

  const [notifications, setNotifications] = useState<
    INotificationComponentBody[]
  >([]);

  const getNotifications = useCallback(async () => {
    const result = await NotificationAPI.getNotifications();
    const formattedNotifications: INotificationComponentBody[] = result?.map(
      (notification: IGetAllNotifications) => ({
        id: notification.id,
        status: notification.notificationUsers[0].seen ? 'seen' : 'unseen',
        text: notification.description,
        createdAt: notification.createdAt,
      })
    );
    setNotifications(formattedNotifications);
  }, []);

  useEffect(() => {
    if (newNotification) {
      setNotifications((prev) => [
        {
          id: newNotification.id,
          status: newNotification.notificationUsers[0].seen ? 'seen' : 'unseen',
          text: newNotification.description,
          createdAt: newNotification.createdAt,
        },
        ...prev,
      ]);
      NotificationIO.markNotificationsAsSeen([newNotification.id]);
      clearNewNotification();
    }
  }, [newNotification]);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  return (
    <>
      {['ADMIN', 'SUPERADMIN'].includes(role) && (
        <NotificationCard>
          <NotificationTitle>Notifications</NotificationTitle>
          <NotificationsCardList>
            {notifications
              ? notifications.map(({ id, ...x }) => (
                  <Notification key={id} {...x} />
                ))
              : undefined}
          </NotificationsCardList>
        </NotificationCard>
      )}
      {['INFLUENCER', 'CLIENT', 'AMBASSADOR'].includes(role) && (
        <NotificationsCardMain title="Notifications" {...props}>
          <NotificationsCardList>
            {notifications.map(({ id, ...x }) => (
              <Notification key={id} {...x} />
            ))}
          </NotificationsCardList>
        </NotificationsCardMain>
      )}
      {nModal && <NotificationSettings onClose={closeNModal} />}
    </>
  );
};

export default NotificationsCard;
