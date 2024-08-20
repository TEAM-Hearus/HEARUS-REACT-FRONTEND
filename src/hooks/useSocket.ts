import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKETURL } from '../apis/index';
import useRecordModalStore from '../store/useRecordModalStore';

export const useSocket = (onTransitionResult: (result: string) => void) => {
  const socketRef = useRef<Socket | null>(null);
  const { recordData } = useRecordModalStore();

  useEffect(() => {
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
      console.log('socket connected');
      const lectureId = recordData.scheduleId;
      socketRef.current?.emit('lectureId', lectureId);
    });

    socketRef.current.on('transitionResult', onTransitionResult);

    return () => {
      socketRef.current?.disconnect();
    };
  }, [onTransitionResult]);

  return socketRef;
};
