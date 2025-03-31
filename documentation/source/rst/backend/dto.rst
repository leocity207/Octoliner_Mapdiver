Data Transfer Objects
=====================

Data Transfer Objects are structured data used to transfer information betwen the server and the client.
Right now only the edpoint `dyn/network_data` use such Objects

line
----

more information can be found in the data section. we simply read and translate the `resources-config/data/line.json` file

station
--------

more information can be found in the data section. we simply read and translate the `resources-config/data/station.json` file

network
-------

The network DTO combine all the information of station and lines to send it to the frontend
It send back a json object structured as

.. code-block:: json
    {
        "Lines" : ...,
        "Station" : ...,
    }