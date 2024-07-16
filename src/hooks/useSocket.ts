import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import SOCKETURL from '../apis/record';

export const useSocket = (onTransitionResult: (result: string) => void) => {
  const socketRef = useRef<Socket | null>(null);

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
      const lectureId = '668cceb8ebef2b4462de0fb5';
      socketRef.current?.emit('lectureId', lectureId);
    });

    socketRef.current.on('transitionResult', onTransitionResult);

    return () => {
      socketRef.current?.disconnect();
    };
  }, [onTransitionResult]);

  return socketRef;
};
