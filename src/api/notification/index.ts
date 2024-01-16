import Cookies from 'js-cookie';
import { io, Socket } from 'socket.io-client';
import Project from 'constants/project';
import { client } from 'api/api-client';
import { IGetAllNotifications } from './types';

export const NotificationIO = {
  socket: {} as Socket,

  connect() {
    if (this.socket.connected) {
      return;
    }

    const token = Cookies.get('auth');

    const socketUrl = (() => {
      switch (Project.app.environment) {
        case 'production':
          return Project.socket.productionSocket;
        case 'staging':
          return Project.socket.stagingSocket;
        default:
          return Project.socket.developmentSocket;
      }
    })();

    this.socket = io(`${socketUrl}/notifications`, {
      extraHeaders: {
        'x-jwt-cookie': `auth=${token}`,
      },
    });
  },
  markNotificationsAsSeen(notificationIds: number[]) {
    this.socket.emit('markNotificationsAsSeen', { notificationIds });
  },

  disconnect() {
    this.socket.disconnect();
  },
  findUserNotifications(callback: (response: IGetAllNotifications[]) => void) {
    this.socket.emit('getUsersNotifications', callback);
  },
};

export const NotificationAPI = {
  getNotifications: async () => {
    const { data } = await client.get(`${Project.apis.v1}/notifications`);
    return data;
  },
};
