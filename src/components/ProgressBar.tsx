import React from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';

interface ProgressBarProps {
  value: number;
  status: 'connected' | 'disconnected' | 'error';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, status }) => {
  const getColor = () => {
    if (status === 'error') return 'error';
    if (status === 'disconnected') return 'inherit';
    return 'primary';
  };

  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress 
          variant="determinate" 
          value={value} 
          color={getColor()}
          sx={{ height: 10, borderRadius: 5 }}
        />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;