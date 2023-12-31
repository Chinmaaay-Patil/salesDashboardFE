import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Paper, Tooltip, Typography } from '@mui/material';

const FileUpload = ({ onFileUpload }) => {
  const [filePreviews, setFilePreviews] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (onFileUpload) {
        onFileUpload(acceptedFiles);
      }

      // Generate previews for each dropped file
      const previews = acceptedFiles.map((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreviews((prevPreviews) => [...prevPreviews, { file, preview: e.target.result }]);
        };
        reader.readAsDataURL(file);
        return null; // Not returning anything from the map
      });
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const removeFilePreview = (index) => {
    const newPreviews = [...filePreviews];
    newPreviews.splice(index, 1);
    setFilePreviews(newPreviews);
  };

  return (
    <Tooltip title="Feature comming soon">
      <Box
        sx={{
          padding: '20px',
          textAlign: 'center',
          border: '1px dotted gray',
          borderRadius: 5,
          height: '100%',

          opacity: 0.5
        }}
      >
        <div
          style={{
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 15,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Typography variant="h6">Drag and drop a file here, or click to select a file</Typography>
          <Button variant="outlined" color="primary" sx={{ borderRadius: 5 }}>
            Upload File
          </Button>
        </div>
        {filePreviews.map((preview, index) => (
          <div key={index} style={{ marginTop: '10px' }}>
            <img src={preview.preview} alt={`Preview ${index}`} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
            <span>{preview.file.name}</span>
            <Button variant="outlined" color="secondary" onClick={() => removeFilePreview(index)}>
              Remove
            </Button>
          </div>
        ))}
      </Box>
    </Tooltip>
  );
};

export default FileUpload;
