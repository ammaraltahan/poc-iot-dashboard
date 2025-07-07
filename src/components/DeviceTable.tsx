import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Typography
} from '@mui/material';
import { Device } from '../types';
import ConnectionStatus from './ConnectionStatus';
import ProgressBar from './ProgressBar';

interface DeviceTableProps {
  devices: Device[];
}

const DeviceTable: React.FC<DeviceTableProps> = ({ devices }) => {
  if (devices.length === 0) {
    return (
      <Typography variant="body1" align="center" sx={{ p: 4 }}>
        No devices connected
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="IoT devices table">
        <TableHead>
          <TableRow>
            <TableCell>Device ID</TableCell>
            <TableCell>Device Name</TableCell>
            <TableCell>Connection Status</TableCell>
            <TableCell>Operation Progress</TableCell>
            <TableCell>Last Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell>{device.id}</TableCell>
              <TableCell>{device.name}</TableCell>
              <TableCell>
                <ConnectionStatus status={device.status} />
              </TableCell>
              <TableCell>
                <ProgressBar 
                  value={device.progress} 
                  status={device.status} 
                />
              </TableCell>
              <TableCell>
                {new Date(device.timestamp).toLocaleTimeString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeviceTable;