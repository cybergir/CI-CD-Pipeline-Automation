import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import { 
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Receipt as ReceiptIcon,
  DateRange as DateRangeIcon 
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import './Sales.css';

const Sales = () => {
  // Sample sales data
  const [sales, setSales] = useState([
    {
      id: 1,
      date: '2023-10-15',
      customer: 'John Doe',
      items: 3,
      total: 45.99,
      status: 'Completed'
    },
    {
      id: 2,
      date: '2023-10-14',
      customer: 'Jane Smith',
      items: 5,
      total: 87.50,
      status: 'Completed'
    },
    {
      id: 3,
      date: '2023-10-13',
      customer: 'Mike Johnson',
      items: 2,
      total: 32.75,
      status: 'Refunded'
    }
  ]);

  const [filter, setFilter] = useState('');
  const [dateRange, setDateRange] = useState({
    start: dayjs().subtract(7, 'day'),
    end: dayjs()
  });
  const [openDatePicker, setOpenDatePicker] = useState(false);

  // Filter sales by search term and date range
  const filteredSales = sales.filter(sale => {
    const matchesSearch = 
      sale.customer.toLowerCase().includes(filter.toLowerCase()) ||
      sale.id.toString().includes(filter);
    
    const saleDate = dayjs(sale.date);
    const matchesDate = 
      saleDate.isAfter(dateRange.start.subtract(1, 'day')) && 
      saleDate.isBefore(dateRange.end.add(1, 'day'));
    
    return matchesSearch && matchesDate;
  });

  const handleRefresh = () => {
    // Simulate data refresh
    setSales(prevSales => [
      ...prevSales,
      {
        id: prevSales.length + 1,
        date: dayjs().format('YYYY-MM-DD'),
        customer: `Customer ${prevSales.length + 1}`,
        items: Math.floor(Math.random() * 5) + 1,
        total: parseFloat((Math.random() * 100 + 10).toFixed(2)),
        status: ['Completed', 'Refunded', 'Processing'][Math.floor(Math.random() * 3)]
      }
    ]);
  };

  const handlePrintReceipt = (saleId) => {
    console.log('Printing receipt for sale:', saleId);
    alert(`Printing receipt for sale #${saleId}`);
  };

  return (
    <Box className="sales-container">
      <Typography variant="h4" gutterBottom className="sales-title">
        Sales History
      </Typography>
      
      {/* Filters */}
      <Paper elevation={2} className="filters-paper">
        <Box display="flex" alignItems="center" gap={2} p={2}>
          <TextField
            label="Search Sales"
            variant="outlined"
            size="small"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon color="action" />
            }}
          />
          
          <Button
            variant="outlined"
            startIcon={<DateRangeIcon />}
            onClick={() => setOpenDatePicker(true)}
          >
            {dateRange.start.format('MMM D')} - {dateRange.end.format('MMM D')}
          </Button>
          
          <IconButton onClick={handleRefresh}>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Paper>

      {/* Date Picker Dialog */}
      <Dialog open={openDatePicker} onClose={() => setOpenDatePicker(false)}>
        <DialogTitle>Select Date Range</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}>
          <DatePicker
            label="Start Date"
            value={dateRange.start}
            onChange={(newValue) => setDateRange(prev => ({
              ...prev,
              start: newValue
            }))}
          />
          <DatePicker
            label="End Date"
            value={dateRange.end}
            onChange={(newValue) => setDateRange(prev => ({
              ...prev,
              end: newValue
            }))}
          />
          <Button 
            variant="contained" 
            onClick={() => setOpenDatePicker(false)}
            sx={{ mt: 2 }}
          >
            Apply Filters
          </Button>
        </DialogContent>
      </Dialog>

      {/* Sales Table */}
      <TableContainer component={Paper} className="sales-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSales.map((sale) => (
              <TableRow key={sale.id} hover>
                <TableCell>#{sale.id}</TableCell>
                <TableCell>{dayjs(sale.date).format('MMM D, YYYY')}</TableCell>
                <TableCell>{sale.customer}</TableCell>
                <TableCell>{sale.items}</TableCell>
                <TableCell>${sale.total.toFixed(2)}</TableCell>
                <TableCell>
                  <span className={`status-badge ${sale.status.toLowerCase()}`}>
                    {sale.status}
                  </span>
                </TableCell>
                <TableCell>
                  <IconButton 
                    onClick={() => handlePrintReceipt(sale.id)}
                    size="small"
                    color="primary"
                  >
                    <ReceiptIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Sales;