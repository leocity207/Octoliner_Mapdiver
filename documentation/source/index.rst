.. _index:

Octoliner Mapdiver Documentation
================================

Introduction
------------

**Octoliner Mapdiver** is an open-source web application designed to display public transport network maps interactively. It simplifies the presentation of network and transport information, making it user-friendly and intuitive.

Key Features
------------

Octoliner Mapdiver offers several interactive functionalities:

- **Interactive Map** – Select a station and view all the lines that pass through it.
- **Line Information Display** – View details about specific transport lines.
- **Searchable Lines & Stations** – Quickly locate transport lines and stations.
- **Customizable Line Colors** – Easily adjust line colors for better readability and consistency.

Planned Enhancements
--------------------

Future improvements will include:

- **GTFS Support** – Display future train arrivals at a station.
- **Real-Time Transport Updates** – Show currently operating transport via GTFS real-time data.
- **Ridership Information** – Display transport usage statistics.
- **Connection Display** – Show transfer points when selecting a line.
- **Route Finder** – Find all possible connections between two stations.
- **Personalized Timetable Generation** – Create custom schedules for travel planning.
- **Ticket Purchase Integration** – Redirect users to ticketing platforms.

Project Structure
-----------------

Octoliner Mapdiver is organized into several key components:

.. graphviz::

	digraph ProjectStructure {
		rankdir=LR;
		App -> Page [label="Contains"];
		Page -> Map [label="Displays"];
		Page -> Component [label="Includes"];
		App -> Loader [label="Uses"];
		App -> Config [label="Configured by"];
		Page -> Utils [label="Utilizes"];
	}

Component Overview
------------------

- **Application (`app_base`)** – Manages multiple pages, similar to a book with chapters.
- **Pages (`page_base`)** – Main areas where users interact with the application.
- **Maps (`map_base`)** – Objects inside pages designed to display transport network maps.
- **Components (`component_base`)** – General UI elements like sticky headers or side panels.
- **Loaders (`loader_base`)** – Loading animations displayed inside an application.
- **Configuration (`config_base`)** – Defines variables and settings for the application.
- **Utilities (`utils`)** – Common functions used throughout the project.

License
-------

Octoliner Mapdiver is licensed under the **MIT License**, ensuring openness and flexibility for developers and contributors.

For more details, visit the official repository or contribute to the project!

**Let's make transport information more accessible and interactive!** 🚆🌍



Documentation Index
-------------------
.. toctree::
	:maxdepth: 2
	:caption: Backend

	rst/backend/oatpp
	rst/backend/endpoint
	rst/backend/dto

.. toctree::
	:maxdepth: 2
	:caption: Frontend

	rst/frontend/app/app_base
	rst/frontend/page/page_base
	rst/frontend/map/map_base
	rst/frontend/components/component_base
	rst/frontend/right-panel/right-panel_base
	rst/frontend/loader/loader_base
	rst/frontend/utils/utils_base

.. toctree::
	:maxdepth: 2
	:caption: Customization

	rst/customization/customisation_base
	rst/customization/customize_image
	rst/customization/customize_style
	rst/customization/config/config_base
	rst/customization/data/data_base

.. toctree::
	:maxdepth: 2
	:caption: Contributing

	rst/contribution/cpp
	rst/contribution/javascript
	rst/contribution/testing
	rst/contribution/bug_and_feature

