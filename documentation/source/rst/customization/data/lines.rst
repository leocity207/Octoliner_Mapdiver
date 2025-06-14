Lines
=====

This documentation describes the structure and format for defining transit lines in the system.

File Structure
--------------

The line data is organized in two types of files:

1. ``lines.json`` - The master index file listing all lines in the network
2. Individual line files (e.g., ``LINE_1.json``) - Contain detailed information about each line

lines.json - Master Index
-------------------------

This file serves as a registry of all lines in the network and is located at the root of the data folder.

Structure:

.. code-block:: json

	{
		"Lines": [
			"LINE_1",
			"LINE_2",
			"LINE_3",
			"LINE_4",
			"LINE_5",
			"LINE_6",
			"LINE_7"
		]
	}

Key Points:
- The ``Lines`` array contains the exact filenames (without extension) of all line definition files
- Each entry corresponds to a separate JSON file in the lines folder (e.g., ``LINE_1.json``)
- The order in the array doesn't affect functionality

Individual Line Files
---------------------

Each line is defined in its own JSON file named according to its code (e.g., ``MY_LINE.json``).

Structure:

.. code-block:: json

	{
		"code": "MY_LINE",
		"label": "MY Line",
		"urls": {
			"fr": "/MY_LINE"
		},
		"color": {
			"default": "#25158B",
			"easy": "#DD2F1D"
		},
		"svg_icon":"<svg viewBox='0 0 33.212 6.35'>..."
		"timetable_pattern": [
			{
				"code": "MY_LINE_A_15",
				"label": "Quimper - Rennes",
				"interval_minutes": 60,
				"departure_minute": 15,
				"first_departure": "4:15:00",
				"last_departure": "00:15:00",
				"service": "local",
				"infomessages": [],
				"lineflowstops": [
					{
						"station_ID": "START_STATION",
						"departure_minute": 0
					},
					{
						"station_ID": "MIDDLE_STATION",
						"arrival_minute": 22,
						"departure_minute": 23,
						"flags": ["warning"]
					}
				]
			}
		]
	}

Field Reference
---------------

``code`` (required)
+++++++++++++++++++
- Unique identifier for the line
- Must match the filename (e.g., "MY_LINE" for MY_LINE.json)
- Convention: UPPERCASE with underscores
- Example: ``"MY_LINE"``

``label`` (required)
++++++++++++++++++++
- Display name of the line
- Should be human-readable
- Example: ``"MY Line"``

``urls`` (required)
+++++++++++++++++++
- Language-specific URLs for line information pages
- Key: language code (e.g., "fr", "en")
- Value: URL path
- Example:

	.. code-block:: json

		"urls": {
			"fr": "/fr/MY_LINE",
			"en": "/en/MY_LINE"
		}

``color`` (required)
++++++++++++++++++++
- Color definitions for different service types
- Must include at least a "default" color
- Colors in HEX format (#RRGGBB)
- Example:

	.. code-block:: json

		"color": {
			"default": "#25158B",
		}

``svg_icon`` (required)
+++++++++++++++++++++++
- the icon of the line as xml element
- should begin by a <svg> tags

``timetable_pattern`` (required)
++++++++++++++++++++++++++++++++
Array of service patterns that define how trains operate on this line.

Each pattern contains:

``code``
	- Unique identifier for this specific pattern
	- Convention: ``LINE_CODE_DIRECTION_DEPARTUREMINUTE``
	- Example: ``"MY_LINE_A_15"`` (A = direction A, departs at :15)

``label``
	- Human-readable description
	- Typically shows origin and destination
	- Example: ``"Quimper → Rennes"``

``interval_minutes``
	- Frequency of service in minutes
	- Use 0 for irregular or special services
	- Example: ``60`` (hourly service)

``departure_minute``
	- Minute of the hour when service departs origin
	- Range: 0-59
	- Example: ``15`` (departs at :15 past the hour)

``first_departure`` / ``last_departure``
	- Service hours in HH:MM:SS format
	- 24-hour clock
	- Example: ``"4:15:00"`` (first departure at 4:15 AM)

``service``
	- Service type identifier
	- Common values: "local", "express", "night"
	- Example: ``"local"``

``infomessages``
	- Array of informational messages
	- Currently unused (empty array)

``lineflowstops``
	- Ordered list of stops along this pattern

``lineflowstops`` Details
^^^^^^^^^^^^^^^^^^^^^^^^^
Each stop definition contains:

``station_ID`` (required)
	- Reference to a station from the stations database
	- Example: ``"FR_29232_0"``

``arrival_minute`` (optional)
	- Minutes after origin departure when train arrives
	- Omit for origin station
	- Example: ``22``

``departure_minute`` (optional)
	- Minutes after origin departure when train departs
	- Omit for terminal stations
	- Example: ``23``

``flags`` (optional)
	- Array of special behavior flags
	- Currently supported:
	  - ``"warning"``: Displays a warning indicator
	- Example: ``["warning"]``

Example with All Features
-------------------------

.. code-block:: json

	{
		"code": "EXPRESS_1",
		"label": "Express Line 1",
		"urls": {
			"fr": "/fr/express1",
			"en": "/en/express1"
		},
		"color": {
			"default": "#FF0000",
			"night": "#880000"
		},
		"timetable_pattern": [
			{
				"code": "EXPRESS_1_A_00",
				"label": "North Terminal → South Terminal",
				"interval_minutes": 30,
				"departure_minute": 0,
				"first_departure": "5:00:00",
				"last_departure": "23:00:00",
				"service": "express",
				"infomessages": [],
				"lineflowstops": [
					{
						"station_ID": "NORTH_TERMINAL",
						"departure_minute": 0
					},
					{
						"station_ID": "CENTER_CITY",
						"arrival_minute": 15,
						"departure_minute": 16,
						"flags": ["warning"]
					},
					{
						"station_ID": "SOUTH_TERMINAL",
						"arrival_minute": 30
					}
				]
			}
		]
	}