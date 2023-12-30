export const handleDownloadClick = async () => {
  try {
    const response = await fetch('https://salesapi.elabassist.com/api/Dashboard/downloadDocs');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotation.docx'; // Set the correct file extension here
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};
