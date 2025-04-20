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

const PaymentPanel = ({ cart = [] }) => {
  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  // Payment methods
  const handlePayment = (method) => {
    alert(`Processing ${method} payment for $${total.toFixed(2)}`);
    // Replace with actual payment processing logic
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Order Summary
      </Typography>

      {/* Itemized list */}
      <List dense>
        {cart.map((item, index) => (
          <ListItem key={index}>
            <ListItemText 
              primary={`${item.quantity || 1}x ${item.name}`}
              secondary={`$${(item.price * (item.quantity || 1)).toFixed(2)}`}
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Totals */}
      <Box sx={{ mb: 3 }}>
        <Box display="flex" justifyContent="space-between">
          <Typography>Subtotal:</Typography>
          <Typography>${subtotal.toFixed(2)}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography>Tax ({taxRate * 100}%):</Typography>
          <Typography>${tax.toFixed(2)}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" sx={{ mt: 1, fontWeight: 'bold' }}>
          <Typography variant="subtitle1">Total:</Typography>
          <Typography variant="subtitle1">${total.toFixed(2)}</Typography>
        </Box>
      </Box>

      {/* Payment Buttons */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<PointOfSale />}
          onClick={() => handlePayment('cash')}
          sx={{ py: 1.5, backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#388e3c' } }}
        >
          Cash Payment
        </Button>
        
        <Button
          variant="contained"
          size="large"
          startIcon={<CreditCard />}
          onClick={() => handlePayment('credit')}
          sx={{ py: 1.5, backgroundColor: '#1976d2' }}
        >
          Credit Card
        </Button>
        
        <Button
          variant="outlined"
          size="large"
          startIcon={<LocalAtm />}
          onClick={() => handlePayment('split')}
          sx={{ py: 1.5 }}
        >
          Split Payment
        </Button>
        
        <Button
          variant="text"
          size="small"
          startIcon={<Receipt />}
          sx={{ color: 'text.secondary' }}
        >
          Print Receipt
        </Button>
      </Box>
    </Paper>
  );
};

// Must have this default export
export default PaymentPanel;