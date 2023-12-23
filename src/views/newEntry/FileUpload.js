import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Paper, Typography } from '@mui/material';

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
    <Box sx={{ padding: '20px', textAlign: 'center', border: '1px solid red' }}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Typography variant="h6">Drag and drop a file here, or click to select a file</Typography>
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
      <Button variant="contained" color="primary" onClick={() => {}}>
        Upload File
      </Button>
    </Box>
  );
};

export default FileUpload;
