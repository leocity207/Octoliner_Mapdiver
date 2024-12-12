#include "StationDTOTest.h"

#include "src/config.h"

#include "oatpp/json/ObjectMapper.hpp"
#include "src/dto/stations.h"

#include <algorithm>


void StationDTOTest::onRun()
{

	auto jsonObjectMapper = oatpp::json::ObjectMapper();
	auto object = jsonObjectMapper.readFromString<oatpp::Object<StationsDTO>>(json_station_test);

	auto& tmp_guingamp = object->stations["FR_22070_0"];
	std::vector<oatpp::String> expected_station_guingamp = { "LER_BRE0","LGV_BRE2","LGV_BRE0" };
	OATPP_ASSERT(tmp_guingamp->label == "Guingamp");
	OATPP_ASSERT(tmp_guingamp->linked_lignes->size() == 3);
	for(const auto& line_name : *(tmp_guingamp->linked_lignes))
		OATPP_ASSERT(std::find(expected_station_guingamp.begin(), expected_station_guingamp.end(), line_name) != expected_station_guingamp.end())
	
	auto& tmp_saint_brieuc = object->stations["FR_22278_0"];
	std::vector<oatpp::String> expected_station_saint_brieuc = { "LER_BRE0","LGV_BRE2","LGV_BRE0" };
	OATPP_ASSERT(tmp_saint_brieuc->label == "Saint-Brieuc");
	OATPP_ASSERT(tmp_saint_brieuc->linked_lignes->size() == 3);
	for(const auto& line_name : *(tmp_saint_brieuc->linked_lignes))
		OATPP_ASSERT(std::find(expected_station_saint_brieuc.begin(), expected_station_saint_brieuc.end(), line_name) != expected_station_saint_brieuc.end())
	
	auto& tmp_rennes = object->stations["FR_35238_0"];
	std::vector<oatpp::String> expected_station_rennes = { "LER_BRE0","LER_NOR3","LER_BRE2","LER_BRE3","LGV_BRE0","LER_BRE4","LGV_FR4" };
	OATPP_ASSERT(tmp_rennes->label == "Rennes");
	OATPP_ASSERT(tmp_rennes->linked_lignes->size() == 7);
	for(const auto& line_name : *(tmp_rennes->linked_lignes))
		OATPP_ASSERT(std::find(expected_station_rennes.begin(), expected_station_rennes.end(), line_name) != expected_station_rennes.end())
	
	auto& tmp_chartres = object->stations["FR_28085_0"];
	std::vector<oatpp::String> expected_station_chartres = { "LER_CVL1","LGV_BRE0","LGV_BRE1","LGV_FR7","LGV_FR9","LGV_FR8" };
	OATPP_ASSERT(tmp_chartres->label == "Chartres");
	OATPP_ASSERT(tmp_chartres->linked_lignes->size() == 6);
	for(const auto& line_name : *(tmp_chartres->linked_lignes))
		OATPP_ASSERT(std::find(expected_station_chartres.begin(), expected_station_chartres.end(), line_name) != expected_station_chartres.end())
	
	auto& tmp_massy = object->stations["FR_91377_1"];
	std::vector<oatpp::String> expected_station_massy = { "LGV_BRE0","LGV_BRE1","LGV_FR7","LGV_FR9","LGV_FR8" };
	OATPP_ASSERT(tmp_massy->label == "Massy TGV");
	OATPP_ASSERT(tmp_massy->linked_lignes->size() == 5);
	for(const auto& line_name : *(tmp_massy->linked_lignes))
		OATPP_ASSERT(std::find(expected_station_massy.begin(), expected_station_massy.end(), line_name) != expected_station_massy.end())
}
