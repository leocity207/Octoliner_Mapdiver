Data Transfer Objects (DTOs)
===============================

Data Transfer Objects (DTOs) are structured data models used to facilitate communication between the server and the client.

Currently, only the `dyn/network_data` endpoint utilizes DTOs.

Line DTO
-----------
The **Line DTO** represents transit lines and is derived from the `resources-config/data/line.json` file.

More details can be found in the **Data** section.

Station DTO
--------------
The **Station DTO** represents transit stations and is derived from the `resources-config/data/station.json` file.

More details can be found in the **Data** section.

Network DTO
-------------
The **Network DTO** aggregates all station and line data into a single object for the frontend. The returned JSON structure is as follows:

.. code-block:: json

	{
		"Lines": [...],
		"Stations": [...]
	}

This DTO ensures efficient data transfer and integration between the backend and frontend.


