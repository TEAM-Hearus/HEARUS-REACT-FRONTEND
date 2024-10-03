import { useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKETURL } from '../apis/index';
import useRecordModalStore from '../store/useRecordModalStore';

export const useSocket = (onTransitionResult: (result: string) => void) => {
  const socketRef = useRef<Socket | null>(null);
  const { recordData } = useRecordModalStore();

  const connectSocket = useCallback(() => {
    socketRef.current = io(SOCKETURL, {
      path: '/socket.io',
      transports: ['websocket'],
      extraHeaders: {
        'Sec-WebSocket-Extensions':
          'permessage-deflate; client_max_window_bits',
      },
      reconnection: true,
      reconnectionDelay: 5000,
      reconnectionAttempts: Infinity,
    });

    socketRef.current.on('connect', () => {
      console.log('Socket connected');
      const lectureId = recordData.scheduleId;
      socketRef.current?.emit('lectureId', lectureId);
    });

    socketRef.current.on('disconnect', (reason) => {
      console.log('Socket disconnected. Reason:', reason);
    });

    socketRef.current.on('transitionResult', onTransitionResult);
  }, [recordData.scheduleId, onTransitionResult]);

  const disconnectSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      console.log('Socket disconnected manually');
      socketRef.current = null;
    }
  }, []);

  return { socketRef, connectSocket, disconnectSocket };
};
