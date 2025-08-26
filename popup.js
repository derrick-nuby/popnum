// Load saved settings when popup opens
document.addEventListener('DOMContentLoaded', () => {
  console.log('Popup loaded');
  
  // Load saved min/max values from storage
  chrome.storage.local.get(['minValue', 'maxValue'], (result) => {
    console.log('Loaded config from storage:', result);
    document.getElementById('minValue').value = result.minValue || 500;
    document.getElementById('maxValue').value = result.maxValue || 1000;
  });
  
  // Display current keyboard shortcuts
  displayShortcuts();
  
  // Set up event listeners for the buttons
  document.getElementById('fillButton').addEventListener('click', fillFields);
  document.getElementById('clearButton').addEventListener('click', clearFields);
});

// Function to display current keyboard shortcuts
async function displayShortcuts() {
  try {
    console.log('Fetching keyboard shortcuts');
    const commands = await chrome.commands.getAll();
    console.log('Available commands:', commands);
    commands.forEach(command => {
      if (command.name === 'fill_fields' && command.shortcut) {
        document.getElementById('fillShortcut').textContent = command.shortcut;
      } else if (command.name === 'clear_fields' && command.shortcut) {
        document.getElementById('clearShortcut').textContent = command.shortcut;
      }
    });
  } catch (error) {
    console.error('Error fetching shortcuts:', error);
  }
}

// Function to fill form fields with random numbers
async function fillFields() {
  console.log('Fill fields button clicked');
  
  // Get min/max values from input fields
  const minValue = parseInt(document.getElementById('minValue').value) || 500;
  const maxValue = parseInt(document.getElementById('maxValue').value) || 1000;
  
  console.log('Using min:', minValue, 'max:', maxValue);
  
  // Save settings to storage
  chrome.storage.local.set({ minValue, maxValue });
  console.log('Saved config to storage');
  
  // Update status
  const status = document.getElementById('status');
  status.textContent = 'Filling fields...';
  
  try {
    // Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log('Active tab:', tab);
    
    // Inject the content script
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
    console.log('Content script injected');
    
    // Send message with configuration to content script
    chrome.tabs.sendMessage(tab.id, { 
      action: 'fillFields', 
      minValue: minValue, 
      maxValue: maxValue 
    });
    console.log('Message sent to content script');
    
    status.textContent = 'Fields filled successfully!';
    setTimeout(() => {
      status.textContent = '';
    }, 2000);
  } catch (error) {
    console.error('Error:', error);
    status.textContent = 'Error: ' + error.message;
  }
}

// Function to clear all input fields
async function clearFields() {
  console.log('Clear fields button clicked');
  
  // Update status
  const status = document.getElementById('status');
  status.textContent = 'Clearing fields...';
  
  try {
    // Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log('Active tab:', tab);
    
    // Inject the content script if not already injected
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
    console.log('Content script injected');
    
    // Send message to content script to clear fields
    chrome.tabs.sendMessage(tab.id, { 
      action: 'clearFields'
    });
    console.log('Message sent to content script');
    
    status.textContent = 'Fields cleared successfully!';
    setTimeout(() => {
      status.textContent = '';
    }, 2000);
  } catch (error) {
    console.error('Error:', error);
    status.textContent = 'Error: ' + error.message;
  }
}