Endpoint
========

this section present all the endpoints implemented by our Oat++ controller

Static file
-----------

this endpoint serve all the static files. it is defined as a general `*` endpoint

General case
^^^^^^^^^^^^

the file is served as is with it will return the file with it's associated cotent type according to its extension

Exception
^^^^^^^^^

two exception exist for serving files

 * for no file. the endpoint handle the case where the user just want the root of the website to point to the file index.html
 * favicon.ico. the endpoint handle this file to be `resources-config/image/favicon.ico`


Network Data
------------
Network data is used to get information about the network
it can be accessed using `dyn/network_data` endpoint
this endpoint return javascript information from the `resources-config/data` folder
in the futur these informatin could be collected from a databases
