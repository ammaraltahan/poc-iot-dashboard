import React from 'react';
import DeviceTable from './components/DeviceTable';
import { Container, Typography, Box, Chip, Button } from '@mui/material';
import { useDeviceSocket } from './hooks/useDeviceSocket';

function App() {
  const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:5000';
  const { devices, connectionStatus } = useDeviceSocket(wsUrl);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          IoT Device Dashboard
        </Typography>
        
        <Box mb={2} display="flex" alignItems="center">
          <Typography variant="subtitle1" mr={1}>
            WebSocket Status:
          </Typography>
          <Chip 
            label={connectionStatus} 
            color={connectionStatus === 'connected' ? 'success' : 'error'} 
            size="small"
          />
          <Button size='medium' type='button' color='error' onClick={(ev)=> {}} />
        </Box>
        
        <DeviceTable devices={devices} />
      </Box>
    </Container>
  );
}

export default App;