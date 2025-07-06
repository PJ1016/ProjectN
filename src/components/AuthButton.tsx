import { Button, Avatar, Box, Typography, styled } from '@mui/material';
import { Google, Logout, Person } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const StyledLoginButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #ff6b9d, #ff8fab)',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '25px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '16px',
  boxShadow: '0 4px 15px rgba(255, 107, 157, 0.4)',
  border: '2px solid white',
  [theme.breakpoints.down('sm')]: {
    padding: '8px 16px',
    fontSize: '14px',
    minWidth: 'auto',
  },
  '&:hover': {
    background: 'linear-gradient(45deg, #ff5a8a, #ff7d98)',
    boxShadow: '0 6px 20px rgba(255, 107, 157, 0.5)',
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease',
}));

const StyledUserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  background: 'linear-gradient(45deg, #ffeef4, #fff0f6)',
  padding: '8px 16px',
  borderRadius: '25px',
  border: '2px solid #ff6b9d',
  boxShadow: '0 2px 10px rgba(255, 107, 157, 0.2)',
  [theme.breakpoints.down('sm')]: {
    gap: '8px',
    padding: '6px 12px',
  },
}));

const StyledLogoutButton = styled(Button)(({ theme }) => ({
  background: 'transparent',
  color: '#ff6b9d',
  padding: '6px 16px',
  borderRadius: '20px',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '14px',
  '&:hover': {
    background: 'rgba(255, 107, 157, 0.2)',
  },
}));

export const AuthButton = () => {
  const { user, signInWithGoogle, logout } = useAuth();

  if (user) {
    return (
      <StyledUserBox>
        <Avatar 
          src={user.photoURL || undefined} 
          sx={{ width: 32, height: 32, border: '2px solid #ff6b9d' }}
        >
          <Person sx={{ color: '#ff6b9d' }} />
        </Avatar>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Typography variant="body2" sx={{ color: '#ff6b9d', fontWeight: 600, fontSize: '14px' }}>
            {user.displayName || 'Welcome, Naturally!'}
          </Typography>
        </Box>
        <StyledLogoutButton onClick={logout} startIcon={<Logout />} sx={{ display: { xs: 'none', sm: 'flex' } }}>
          Logout
        </StyledLogoutButton>
        <StyledLogoutButton onClick={logout} sx={{ display: { xs: 'flex', sm: 'none' }, minWidth: 'auto', padding: '4px 8px' }}>
          <Logout sx={{ fontSize: 18 }} />
        </StyledLogoutButton>
      </StyledUserBox>
    );
  }

  return (
    <StyledLoginButton
      onClick={signInWithGoogle}
      startIcon={<Google />}
    >
      Join Nature's Circle
    </StyledLoginButton>
  );
};