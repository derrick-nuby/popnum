// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Content script received message:', request);
  
  if (request.action === 'fillFields') {
    console.log('Filling input fields with min:', request.minValue, 'max:', request.maxValue);
    // Fill input fields with random numbers
    fillInputFields(request.minValue, request.maxValue);
  } else if (request.action === 'clearFields') {
    console.log('Clearing input fields');
    // Clear all input fields
    clearInputFields();
  }
});

// Function to fill input fields with random numbers (all input fields)
function fillInputFields(min, max) {
  // Select all input fields (text, password, email, search, tel, url, etc.)
  const inputFields = document.querySelectorAll(
    'input[type="text"], input[type="password"], input[type="email"], input[type="search"], ' +
    'input[type="tel"], input[type="url"], input[type="number"], input:not([type])'
  );
  console.log('Found', inputFields.length, 'input fields');
  
  // Fill each field with a random number in the specified range
  inputFields.forEach(field => {
    // Generate random number between min and max (inclusive)
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    
    console.log('Setting field value to:', randomNum);
    
    // Set the value of the field
    field.value = randomNum;
    
    // Trigger events to ensure the change is detected by frameworks
    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
  });
  
  console.log('Finished filling fields');
}

// Function to clear all input fields
function clearInputFields() {
  // Select all input fields
  const inputFields = document.querySelectorAll(
    'input[type="text"], input[type="password"], input[type="email"], input[type="search"], ' +
    'input[type="tel"], input[type="url"], input[type="number"], input:not([type])'
  );
  
  console.log('Found', inputFields.length, 'input fields to clear');
  
  // Clear each field
  inputFields.forEach(field => {
    // Clear the value of the field
    field.value = '';
    
    // Trigger events to ensure the change is detected by frameworks
    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
  });
  
  console.log('Finished clearing fields');
}