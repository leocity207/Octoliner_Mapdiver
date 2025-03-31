OAT++ Server
============

Oat++ (OATPP) is an open-source framework designed to simplify the development of C++ web applications. It provides a lightweight and efficient server-side solution for handling requests and serving resources to the frontend.

Why OATPP?
-------------
OATPP is chosen for its:

 * **Lightweight design** - Minimal overhead, making it suitable for high-performance applications.
 * **Modern C++ features** - Utilizes smart pointers and async processing for efficiency.
 * **Ease of use** - Simple API for defining endpoints and handling requests.
 * **Flexibility** - Supports various serialization formats and integration with different databases.

Server Structure
-------------
The OATPP server in this project consists of the following main components:

 * **AppComponent** - Configures dependencies such as the router, connection handler, and request processors.
 * **Controllers** - Define REST API endpoints and handle incoming requests.
 * **DTOs (Data Transfer Objects)** - Define structured data exchanged between client and server.

Configuration
-------------
Currently, there is no dedicated configuration file for OATPP. All settings are either hardcoded or determined by CMake during the build process.

 * The server listens on port **8888** and binds to IP address **0.0.0.0** as defined in `src/AppComponent.h`.
 * The resource path is determined via CMake configuration files, as specified in `src/config.h.in`.

Deployment
-------------
To deploy the OATPP server Is curretly done throught binary compilation and direct distribution
For further customization, modifications should be made directly in the source files or through CMake configuration adjustments.

Related Documentation
-------------
For more details, refer to the following sections:

 * **Endpoints** - Defines the available API endpoints and their usage.
 * **DTOs** - Describes the data structures used in API communication.

For additional information, visit the [OATPP official documentation](https://oatpp.io/docs/).