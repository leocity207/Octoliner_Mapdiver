![Windows](https://img.shields.io/badge/Tested-Windows-blue?logo=windows)
![Firefox](https://img.shields.io/badge/Tested-Firefox-orange?logo=firefox)

# Octoliner Maptiva

Octoliner Maptiva is an open-source software that enables easy visualization of public transport networks. It provides an intuitive interface for users to explore the network map and retrieve relevant information about lines and stations.

## Features
- **Interactive Network Map** – Navigate and zoom across the public transport map effortlessly.
- **Line Information** – Retrieve details about different transport lines.
- **Station Information** – Access data on specific stations, including connections and schedules.

## Installation & Compilation
### Prerequisites
Before installing Octoliner Maptiva, ensure you have the following dependencies installed:

```sh
# Install CMake (if not already installed)
sudo apt install cmake   # For Ubuntu/Debian
brew install cmake       # For macOS
choco install cmake      # For Windows (using Chocolatey)

# Install required Python packages for documentation
tpip install sphinx sphinx-rtd-theme
```

### Server Compilation
To compile the server-side application:
```sh
git clone https://github.com/your-repo/octoliner-maptiva.git
cd octoliner-maptiva
cmake .
make
```
This process generates a local build file for your host system.

### Server Configuration
- Paths to resources are currently hardcoded (e.g., `name/`).
- Future updates may include dynamic configuration support.

### Customizing Resources
Octoliner Maptiva is designed for easy customization. 
- All personalized elements are stored inside `resources/resources-config`.
- Refer to the documentation for details on modifying the experience to suit your needs.

## Documentation
Documentation is available in the `resources/doc/` directory. To generate the documentation, run:
```sh
cd resources/doc/
make html
```
Then open `_build/html/index.html` in your browser.

The documentation includes:
- Technical details about resources
- Web server implementation details (C++ backend)
- Contribution guidelines

## Testing & Quality Assurance
- Currently, testing is performed manually using XML-based validation.
- Future updates will provide more structured quality assurance processes.

## Dependencies
This project relies on several external libraries:
```sh
# Install project dependencies
sudo apt install graphviz
npm install animejs fabric normalize-wheel rxjs
```
- **oatpp** – C++ web server
- **Sphinx** – Documentation generation
- **Graphviz** – Visualization support
- **anime.js** – JavaScript animation
- **Fabric.js** – Canvas and SVG handling
- **normalizeWheel** – Smooth scrolling experience
- **RxJS** – Reactive event handling

## Contributing
We welcome contributions! 
1. Fork the repository.
2. Make your changes in a feature branch.
3. Submit a pull request with a detailed description of your modifications.

Refer to the `CONTRIBUTING.md` file for more details.

## Reporting Issues & Suggestions
- Report bugs and feature requests via the **GitHub Issues** section.
- Please be clear and provide sufficient details.
- Use Markdown formatting for clarity.

## Future Enhancements
- Dynamic resource path configuration
- Automated testing suite integration
- Improved UI for better user interaction

---
We appreciate your interest in Octoliner Maptiva! 🎉 If you find this project useful, consider giving it a ⭐ on GitHub!
