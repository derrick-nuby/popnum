// Listen for keyboard shortcuts
chrome.commands.onCommand.addListener(async (command) => {
  console.log('Command received:', command);
  
  if (command === "fill_fields" || command === "clear_fields") {
    try {
      // Get the active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      console.log('Active tab:', tab);
      
      if (!tab) {
        console.log('No active tab found');
        return;
      }
      
      // Inject the content script if not already injected
      console.log('Injecting content script...');
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
      console.log('Content script injected successfully');
      
      // Get saved configuration
      const config = await chrome.storage.local.get(['minValue', 'maxValue']);
      console.log('Retrieved config:', config);
      const minValue = config.minValue || 500;
      const maxValue = config.maxValue || 1000;
      
      // Send message to content script based on command
      if (command === "fill_fields") {
        console.log('Sending fillFields message with min:', minValue, 'max:', maxValue);
        chrome.tabs.sendMessage(tab.id, { 
          action: 'fillFields', 
          minValue: minValue, 
          maxValue: maxValue 
        });
      } else if (command === "clear_fields") {
        console.log('Sending clearFields message');
        chrome.tabs.sendMessage(tab.id, { 
          action: 'clearFields'
        });
      }
    } catch (error) {
      console.error('Error executing command:', error);
    }
  } else {
    console.log('Unknown command:', command);
  }
});