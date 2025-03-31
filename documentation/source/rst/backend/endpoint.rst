Endpoint Documentation
=======================

This section presents all the endpoints implemented by our OATPP controller.

Static File Endpoint
--------------------
This endpoint serves all static files. It is defined as a general `*` endpoint.

General Case
^^^^^^^^^^^^
Static files are served as-is, and the server returns the file with its associated content type based on the file extension.

Exceptions
^^^^^^^^^^
There are two exceptions when serving static files:

- **Root Request:** If no specific file is requested, the server serves `index.html` as the default root file.
- **Favicon Handling:** Requests for `favicon.ico` are redirected to `resources-config/image/favicon.ico`.

Network Data Endpoint
---------------------
The network data endpoint provides information about the network and can be accessed via the `dyn/network_data` endpoint.

- It returns JavaScript-based network information from the `resources-config/data` folder (lines and stations).
