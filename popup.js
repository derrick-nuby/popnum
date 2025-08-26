// Load saved settings when popup opens
document.addEventListener('DOMContentLoaded', () => {
  // Load saved min/max values from storage
  chrome.storage.local.get(['minValue', 'maxValue'], (result) => {
    document.getElementById('minValue').value = result.minValue || 500;
    document.getElementById('maxValue').value = result.maxValue || 1000;
  });
  
  // Set up event listener for the fill button
  document.getElementById('fillButton').addEventListener('click', fillFields);
});

// Function to fill form fields with random numbers
async function fillFields() {
  // Get min/max values from input fields
  const minValue = parseInt(document.getElementById('minValue').value) || 500;
  const maxValue = parseInt(document.getElementById('maxValue').value) || 1000;
  
  // Save settings to storage
  chrome.storage.local.set({ minValue, maxValue });
  
  // Update status
  const status = document.getElementById('status');
  status.textContent = 'Filling fields...';
  
  try {
    // Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Inject the content script
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
    
    // Send message with configuration to content script
    chrome.tabs.sendMessage(tab.id, { 
      action: 'fillFields', 
      minValue: minValue, 
      maxValue: maxValue 
    });
    
    status.textContent = 'Fields filled successfully!';
    setTimeout(() => {
      status.textContent = '';
    }, 2000);
  } catch (error) {
    console.error('Error:', error);
    status.textContent = 'Error: ' + error.message;
  }
}