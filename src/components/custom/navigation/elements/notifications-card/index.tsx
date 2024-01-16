import React, { useState, useEffect, useCallback } from 'react';
import { NotificationsCardList } from 'components/custom/navigation/elements/notifications-card/styles';

import {
  Notification,
  NotificationSettings,
} from 'components/custom/navigation/elements/notifications-card/elements';
import { TNotificationsCardProps } from 'components/custom/navigation/elements/notifications-card/types';
import { useAppContext } from 'context';
import { useModal } from 'hooks';
import { Modal } from 'components/custom';
import { INotificationComponentBody } from 'components/custom/notifications-card';
import { useNotification } from 'hooks/use-notification';
import { NotificationAPI, NotificationIO } from 'api';
import { IGetAllNotifications } from 'api/notification/types';

const NotificationsCard = ({ onClose, ...props }: TNotificationsCardProps) => {
  const { role } = useAppContext();

  const [nModal, _openNModal, closeNModal] = useModal(false);
  const { newNotification, clearNewNotification } = useNotification();

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
    <Modal size="small" title={<>Notifications</>} onClose={onClose} {...props}>
      {['ADMIN', 'SUPERADMIN'].includes(role) && (
        <NotificationsCardList>
          {notifications.map(({ id, ...x }) => (
            <Notification key={id} {...x} />
          ))}
        </NotificationsCardList>
      )}
      {['INFLUENCER', 'CLIENT', 'AMBASSADOR'].includes(role) && (
        <NotificationsCardList>
          {notifications.map(({ id, ...x }) => (
            <Notification key={id} {...x} />
          ))}
        </NotificationsCardList>
      )}
      {nModal && <NotificationSettings onClose={closeNModal} />}
    </Modal>
  );
};

export default NotificationsCard;
