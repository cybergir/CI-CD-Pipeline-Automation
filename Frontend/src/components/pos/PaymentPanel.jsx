import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { 
  CreditCard, 
  PointOfSale, 
  Receipt,
  LocalAtm
} from '@mui/icons-material';
import './PaymentPanel.css'; // Optional CSS import

const PaymentPanel = ({ cart = [] }) => {
  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  // Payment handlers
  const handlePayment = (method) => {
    console.log(`Processing ${method} payment: $${total.toFixed(2)}`);
    /* Payment gateway integration would go here */
  };

  return (
    <Paper elevation={3} className="payment-panel">
      <Typography variant="h6" className="panel-title">
        Order Summary
      </Typography>

      <List dense className="item-list">
        {cart.map((item, index) => (
          <ListItem key={index} className="cart-item">
            <ListItemText 
              primary={`${item.quantity || 1}x ${item.name}`}
              secondary={`$${(item.price * (item.quantity || 1)).toFixed(2)}`}
              className="item-text"
            />
          </ListItem>
        ))}
      </List>

      <Divider className="summary-divider" />

      <Box className="totals-container">
        <Box className="total-row">
          <Typography>Subtotal:</Typography>
          <Typography>${subtotal.toFixed(2)}</Typography>
        </Box>
        <Box className="total-row">
          <Typography>Tax (8%):</Typography>
          <Typography>${tax.toFixed(2)}</Typography>
        </Box>
        <Box className="total-row grand-total">
          <Typography variant="subtitle1">Total:</Typography>
          <Typography variant="subtitle1">${total.toFixed(2)}</Typography>
        </Box>
      </Box>

      <Box className="payment-buttons">
        <Button
          variant="contained"
          startIcon={<PointOfSale />}
          className="payment-button cash"
          onClick={() => handlePayment('cash')}
        >
          Cash Payment
        </Button>
        <Button
          variant="contained"
          startIcon={<CreditCard />}
          className="payment-button credit"
          onClick={() => handlePayment('credit')}
        >
          Credit Card
        </Button>
      </Box>
    </Paper>
  );
};

export default PaymentPanel;