// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fillFields') {
    // Fill input fields with random numbers
    fillInputFields(request.minValue, request.maxValue);
  } else if (request.action === 'clearFields') {
    // Clear all input fields
    clearInputFields();
  }
});

// Function to fill input fields with random numbers
function fillInputFields(min, max) {
  // Select all relevant input fields
  const inputFields = document.querySelectorAll(
    'input[type="text"], input[type="number"], input:not([type])'
  );
  
  // Fill each field with a random number in the specified range
  inputFields.forEach(field => {
    // Generate random number between min and max (inclusive)
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Set the value of the field
    field.value = randomNum;
    
    // Trigger events to ensure the change is detected by frameworks
    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
  });
}

// Function to clear all input fields
function clearInputFields() {
  // Select all relevant input fields
  const inputFields = document.querySelectorAll(
    'input[type="text"], input[type="number"], input:not([type])'
  );
  
  // Clear each field
  inputFields.forEach(field => {
    // Clear the value of the field
    field.value = '';
    
    // Trigger events to ensure the change is detected by frameworks
    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
  });
}