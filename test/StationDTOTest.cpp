#include "StationDTOTest.h"

#include "src/config.h"

#include "oatpp/json/ObjectMapper.hpp"
#include "src/dto/stations.h"

#include <algorithm>

static void SerializeLineTest()
{
    OATPP_LOGi("[Info]", "SerializeLineTest");
    // 1. Create the StationsDTO object
    auto stationsDTO = StationsDTO::createShared();

    // 2. Populate StationDTO objects
    auto station_guingamp = StationDTO::createShared();
    station_guingamp->label = "Guingamp";
    station_guingamp->linked_lignes = oatpp::List<oatpp::String>::createShared(); 
    for(auto line : { "LER_BRE0", "LGV_BRE2", "LGV_BRE0" })
        station_guingamp->linked_lignes->push_back(line);

    auto station_saint_brieuc = StationDTO::createShared();
    station_saint_brieuc->label = "Saint-Brieuc";
    station_saint_brieuc->linked_lignes = oatpp::List<oatpp::String>::createShared();
    for (auto line : { "LER_BRE0", "LGV_BRE2", "LGV_BRE0" })
        station_saint_brieuc->linked_lignes->push_back(line);

    auto station_rennes = StationDTO::createShared();
    station_rennes->label = "Rennes";
    station_rennes->linked_lignes = oatpp::List<oatpp::String>::createShared();
    for (auto line : {"LER_BRE0", "LER_NOR3", "LER_BRE2", "LER_BRE3","LGV_BRE0", "LER_BRE4", "LGV_FR4"})
        station_rennes->linked_lignes->emplace_back(line);


    auto station_chartres = StationDTO::createShared();
    station_chartres->label = "Chartres";
    station_chartres->linked_lignes = oatpp::List<oatpp::String>::createShared();
    for (auto line : {"LER_CVL1", "LGV_BRE0", "LGV_BRE1", "LGV_FR7", "LGV_FR9", "LGV_FR8"})
        station_chartres->linked_lignes->push_back(line);


    auto station_massy = StationDTO::createShared();
    station_massy->label = "Massy TGV";
    station_massy->linked_lignes = oatpp::List<oatpp::String>::createShared();
    for (auto line : {"LGV_BRE0", "LGV_BRE1", "LGV_FR7", "LGV_FR9", "LGV_FR8"})
        station_massy->linked_lignes->push_back(line);


    // 3. Populate the StationsDTO object
    stationsDTO->stations = {
        {"FR_22070_0", station_guingamp},
        {"FR_22278_0", station_saint_brieuc},
        {"FR_35238_0", station_rennes},
        {"FR_28085_0", station_chartres},
        {"FR_91377_1", station_massy}
    };

    // 4. Serialize the object to JSON
    auto jsonObjectMapper = oatpp::json::ObjectMapper();
    auto serializedJson = jsonObjectMapper.writeToString(stationsDTO);

    OATPP_ASSERT(serializedJson == serialization_station_res);
}

static void deserializeLineTest()
{
    OATPP_LOGi("[Info]", "deserializeLineTest");
	auto jsonObjectMapper = oatpp::json::ObjectMapper();
	auto object = jsonObjectMapper.readFromString<oatpp::Object<StationsDTO>>(json_station_test);

	auto& tmp_guingamp = object->stations["FR_22070_0"];
	std::vector<oatpp::String> expected_station_guingamp = { "LER_BRE0","LGV_BRE2","LGV_BRE0" };
	OATPP_ASSERT(tmp_guingamp->label == "Guingamp");
	OATPP_ASSERT(tmp_guingamp->linked_lignes->size() == 3);
	for (const auto& line_name : *(tmp_guingamp->linked_lignes))
		OATPP_ASSERT(std::find(expected_station_guingamp.begin(), expected_station_guingamp.end(), line_name) != expected_station_guingamp.end())

		auto& tmp_saint_brieuc = object->stations["FR_22278_0"];
	std::vector<oatpp::String> expected_station_saint_brieuc = { "LER_BRE0","LGV_BRE2","LGV_BRE0" };
	OATPP_ASSERT(tmp_saint_brieuc->label == "Saint-Brieuc");
	OATPP_ASSERT(tmp_saint_brieuc->linked_lignes->size() == 3);
	for (const auto& line_name : *(tmp_saint_brieuc->linked_lignes))
		OATPP_ASSERT(std::find(expected_station_saint_brieuc.begin(), expected_station_saint_brieuc.end(), line_name) != expected_station_saint_brieuc.end())

		auto& tmp_rennes = object->stations["FR_35238_0"];
	std::vector<oatpp::String> expected_station_rennes = { "LER_BRE0","LER_NOR3","LER_BRE2","LER_BRE3","LGV_BRE0","LER_BRE4","LGV_FR4" };
	OATPP_ASSERT(tmp_rennes->label == "Rennes");
	OATPP_ASSERT(tmp_rennes->linked_lignes->size() == 7);
	for (const auto& line_name : *(tmp_rennes->linked_lignes))
		OATPP_ASSERT(std::find(expected_station_rennes.begin(), expected_station_rennes.end(), line_name) != expected_station_rennes.end())

		auto& tmp_chartres = object->stations["FR_28085_0"];
	std::vector<oatpp::String> expected_station_chartres = { "LER_CVL1","LGV_BRE0","LGV_BRE1","LGV_FR7","LGV_FR9","LGV_FR8" };
	OATPP_ASSERT(tmp_chartres->label == "Chartres");
	OATPP_ASSERT(tmp_chartres->linked_lignes->size() == 6);
	for (const auto& line_name : *(tmp_chartres->linked_lignes))
		OATPP_ASSERT(std::find(expected_station_chartres.begin(), expected_station_chartres.end(), line_name) != expected_station_chartres.end())

		auto& tmp_massy = object->stations["FR_91377_1"];
	std::vector<oatpp::String> expected_station_massy = { "LGV_BRE0","LGV_BRE1","LGV_FR7","LGV_FR9","LGV_FR8" };
	OATPP_ASSERT(tmp_massy->label == "Massy TGV");
	OATPP_ASSERT(tmp_massy->linked_lignes->size() == 5);
	for (const auto& line_name : *(tmp_massy->linked_lignes))
		OATPP_ASSERT(std::find(expected_station_massy.begin(), expected_station_massy.end(), line_name) != expected_station_massy.end())
}

void StationDTOTest::onRun()
{
	deserializeLineTest();
    SerializeLineTest();
}
