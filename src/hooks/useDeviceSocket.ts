import { useEffect, useState } from 'react';
import { Device } from '../types';

export const useDeviceSocket = (url: string) => {
  const [devices, setDevices] = useState<Record<string, Device>>({});
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected'>('disconnected');

  useEffect(() => {
    const ws = new WebSocket(url);
    
    ws.onopen = () => {
      setConnectionStatus('connected');
      console.log('WebSocket connected');
    };
    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      if (message.type === 'deviceUpdate') {
        const device: Device = message.data;
        setDevices(prev => ({
          ...prev,
          [device.id]: device
        }));
      }

      if (message.type === 'deviceRemove') {
        setDevices(prev => {
            const newList: Record<string, Device> = {};
            Object.keys(prev).forEach(id => {
                if (id !== message.data.id) {
                    newList[id] = prev[id];
                }
            });

            return newList;
        });
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onclose = () => {
      setConnectionStatus('disconnected');
      console.log('WebSocket disconnected');
    };
    
    return () => ws.close();
  }, [url]);

  return { 
    devices: Object.values(devices), 
    connectionStatus 
  };
};