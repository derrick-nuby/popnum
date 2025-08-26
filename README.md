# PopNum - Chrome Extension

A Chrome extension that populates form fields with random numbers within a configurable range.

## Features

- ✅ **Populate Fields**: Fill input fields with random numbers within a configurable range
- ✅ **Clear Fields**: Clear all input fields with a single click
- ⚙️ **Configurable Range**: Set minimum and maximum values (default: 500-1000)
- 💾 **Persistent Settings**: Configuration is saved between sessions
- 🌐 **Wide Compatibility**: Works on most websites with form fields

## Installation

1. Download or clone this repository
2. Open Google Chrome and navigate to `chrome://extensions`
3. Enable "Developer mode" by toggling the switch in the top right corner
4. Click on "Load unpacked" button
5. Select the project folder
6. The extension should now be installed and visible in your extensions list

## Usage

1. Click on the extension icon in the Chrome toolbar
2. Set your desired minimum and maximum values (default is 500-1000)
3. Click "Fill Fields" to populate all text and number input fields with random numbers
4. Click "Clear Fields" to clear all text and number input fields

## Future Features

We're planning to add these features in future releases:

### Planned Features

- 🔤 **Text Generation**: Fill fields with realistic placeholder text (names, addresses, etc.)
- 🎨 **Custom Patterns**: Define custom patterns for different field types
- 📋 **Presets**: Save and load frequently used configurations
- 🧠 **Smart Detection**: Automatically detect field types and populate accordingly
- 📤 **Export/Import**: Export form data to CSV or JSON
- 🔁 **Sequential Numbers**: Fill fields with sequential rather than random numbers
- 🎯 **Targeted Fields**: Select specific fields to populate rather than all fields
- 🌍 **Multi-language**: Support for multiple languages in text generation

### Advanced Features

- 📊 **Data Statistics**: Generate reports on populated data
- 🔗 **API Integration**: Connect to external APIs for realistic data generation
- 🎛️ **Batch Operations**: Process multiple tabs or windows simultaneously
- 📝 **Template System**: Create and save form templates for repeated use
- 🤖 **AI-Powered**: Use AI to generate contextually relevant data

## Files

- `manifest.json` - Configuration file for the Chrome extension
- `popup.html` - User interface for the extension popup
- `popup.css` - Styling for the popup interface
- `popup.js` - Logic for handling user input and communicating with content script
- `content.js` - Script that runs on webpages to fill/clear input fields

## Permissions

This extension requires minimal permissions:

- `activeTab` - To interact with the currently active tab
- `scripting` - To inject content scripts into web pages
- `storage` - To save your configuration settings

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

**Derrick Nuby**

- Website: [https://derrick.rw/](https://derrick.rw/)
- GitHub: [https://github.com/Derrick-Nuby](https://github.com/Derrick-Nuby)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
