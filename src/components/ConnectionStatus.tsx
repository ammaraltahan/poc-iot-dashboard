import React from 'react';
import { Badge, Box } from '@mui/material';
import { DeviceStatus } from '../types';

interface ConnectionStatusProps {
  status: DeviceStatus;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status }) => {
  const getColor = () => {
    switch (status) {
      case 'connected': return 'success';
      case 'disconnected': return 'warning';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'connected': return 'Connected';
      case 'disconnected': return 'Disconnected';
      case 'error': return 'Error';
      default: return status;
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <Badge 
        variant="dot" 
        color={getColor()} 
        sx={{ mr: 1 }} 
      />
      <span>{getLabel()}</span>
    </Box>
  );
};

export default ConnectionStatus;