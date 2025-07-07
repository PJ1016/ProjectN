import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
} from '@mui/material';
import { Phone, Flag } from '@mui/icons-material';

interface PhoneNumberDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (phoneNumber: string) => void;
  userEmail?: string;
}

export const PhoneNumberDialog = ({ open, onClose, onSubmit, userEmail }: PhoneNumberDialogProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('US');
  const [error, setError] = useState('');

  const countries = [
    { code: 'US', name: 'United States', prefix: '+1', flag: '🇺🇸', placeholder: '(555) 123-4567' },
    { code: 'IN', name: 'India', prefix: '+91', flag: '🇮🇳', placeholder: '98765 43210' },
  ];

  const selectedCountry = countries.find(c => c.code === country) || countries[0];

  const handleSubmit = () => {
    if (!phoneNumber.trim()) {
      setError('Phone number is required');
      return;
    }
    
    let isValid = false;
    let formattedPhone = '';
    
    if (country === 'US') {
      const usPhoneRegex = /^[\d\s\-\(\)]{10,}$/;
      if (usPhoneRegex.test(phoneNumber)) {
        const digits = phoneNumber.replace(/\D/g, '');
        if (digits.length === 10) {
          formattedPhone = `+1${digits}`;
          isValid = true;
        }
      }
    } else if (country === 'IN') {
      const inPhoneRegex = /^[6-9]\d{9}$/;
      const digits = phoneNumber.replace(/\D/g, '');
      if (inPhoneRegex.test(digits)) {
        formattedPhone = `+91${digits}`;
        isValid = true;
      }
    }
    
    if (!isValid) {
      setError(`Please enter a valid ${selectedCountry.name} phone number`);
      return;
    }

    onSubmit(formattedPhone);
    setPhoneNumber('');
    setError('');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', color: 'primary.main' }}>
        <Phone sx={{ mr: 1 }} />
        Complete Your Profile
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="body1" color="text.secondary">
            Hi! We need your phone number for order updates and delivery notifications.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Signed in as: {userEmail}
          </Typography>
        </Box>
        
        <Stack spacing={2} sx={{ mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select
              value={country}
              label="Country"
              onChange={(e) => {
                setCountry(e.target.value);
                setPhoneNumber('');
                setError('');
              }}
            >
              {countries.map((c) => (
                <MenuItem key={c.code} value={c.code}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>{c.flag}</span>
                    <span>{c.name} ({c.prefix})</span>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            label={`Phone Number (${selectedCountry.name})`}
            placeholder={selectedCountry.placeholder}
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setError('');
            }}
            error={!!error}
            helperText={error || `Format: ${selectedCountry.prefix} ${selectedCountry.placeholder}`}
            InputProps={{
              startAdornment: (
                <Typography variant="body2" sx={{ mr: 1, color: 'text.secondary' }}>
                  {selectedCountry.prefix}
                </Typography>
              ),
            }}
          />
        </Stack>
        
        <Typography variant="caption" color="text.secondary">
          🔒 Your phone number is secure and will only be used for order-related communications.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} color="inherit">
          Skip for now
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          sx={{ background: 'linear-gradient(45deg, #e91e63, #f06292)' }}
        >
          Save Phone Number
        </Button>
      </DialogActions>
    </Dialog>
  );
};