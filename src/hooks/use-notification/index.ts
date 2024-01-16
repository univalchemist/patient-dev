import { NotificationIO } from 'api';
import { IGetAllNotifications } from 'api/notification/types';
import { useEffect, useState } from 'react';

export const useNotification = () => {
  const [newNotification, setNewNotification] = useState<
    IGetAllNotifications | undefined
  >();

  const clearNewNotification = () => {
    setNewNotification(undefined);
  };

  useEffect(() => {
    NotificationIO.connect();
    NotificationIO.socket.on(
      'getUsersNotifications',
      (response: IGetAllNotifications) => {
        if (response) {
          setNewNotification(response);
        }
      }
    );

    return () => {
      NotificationIO.disconnect();
    };
  }, []);

  return { newNotification, clearNewNotification };
};
