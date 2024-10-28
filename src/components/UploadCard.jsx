// src/components/UploadCard.jsx
import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Container,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

const UploadCard = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    jobTitle: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    address: '',
  });
  const [error, setError] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      if (selectedFile) {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a file');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5007/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setContactInfo(response.data);
    } catch (error) {
      setError('Error processing the image');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = () => {
    navigate('/cards');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: 'flex',
          bgcolor: '#fff',
          borderRadius: 2,
          boxShadow: 3,
          p: 3,
          textAlign: 'center'
        }}
      >
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed #007bff',
            borderRadius: 2,
            padding: 2,
            marginRight: 2,
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: '#e3f2fd',
            },
          }}
        >
          <input {...getInputProps()} />
          <Typography variant="body1" align="center">Drag & Drop or Click to Upload</Typography>
          {preview && (
            <img src={preview} alt="Preview" style={{ width: '100%', borderRadius: 4, marginTop: 10 }} />
          )}
        </Box>

        <Box sx={{ flex: '1', padding: 2 }}>
          <Typography variant="h5" gutterBottom>
            Extracted Information
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
            sx={{ mb: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Upload'}
          </Button>
          <Button onClick={() => { handleNavigate() }} variant="contained" sx={{ mb: 2, ml: 2 }}>
            View Stored Cards
          </Button>
          {error && <Typography color="error">{error}</Typography>}
          <TextField label="Name" value={contactInfo.name} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          <TextField label="Job Title" value={contactInfo.jobTitle} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          <TextField label="Company Name" value={contactInfo.companyName} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          <TextField label="Email Address" value={contactInfo.email} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          <TextField label="Phone Number" value={contactInfo.phoneNumber} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          <TextField label="Address" value={contactInfo.address} fullWidth margin="normal" InputProps={{ readOnly: true }} />
        </Box>
      </Box>
    </Container>
  );
};

export default UploadCard;
