import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { 
  PointOfSale as SalesIcon, 
  Inventory as InventoryIcon,
  People as CustomersIcon,
  Assessment as ReportsIcon 
} from '@mui/icons-material';
import './Dashboard.css';

const Dashboard = () => {
  // Sample data - replace with your actual data
  const metrics = [
    { title: 'Today\'s Sales', value: '$1,245', icon: <SalesIcon fontSize="large" /> },
    { title: 'Inventory Items', value: '1,024', icon: <InventoryIcon fontSize="large" /> },
    { title: 'Active Customers', value: '248', icon: <CustomersIcon fontSize="large" /> },
    { title: 'Pending Orders', value: '12', icon: <ReportsIcon fontSize="large" /> }
  ];

  return (
    <Box className="dashboard-container">
      <Typography variant="h4" gutterBottom className="dashboard-title">
        Dashboard
      </Typography>
      
      {/* Metrics Cards */}
      <Grid container spacing={3} className="metrics-grid">
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={3} className="metric-card">
              <Box className="metric-icon">{metric.icon}</Box>
              <Typography variant="h6" className="metric-title">
                {metric.title}
              </Typography>
              <Typography variant="h4" className="metric-value">
                {metric.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity Section */}
      <Paper elevation={3} className="recent-activity">
        <Typography variant="h6" className="section-title">
          Recent Transactions
        </Typography>
        <Box className="activity-list">
          {/* Replace with your actual transaction data */}
          {[1, 2, 3].map((item) => (
            <Box key={item} className="activity-item">
              <Typography>Order #{item} - ${item * 25}.00</Typography>
              <Typography variant="caption">2 hours ago</Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;