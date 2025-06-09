#include "StationDTOTest.h"

#include "src/config.h"

#include "oatpp/json/ObjectMapper.hpp"
#include "src/dto/stations.h"
#include "src/dto/station.h"

#include <algorithm>

static void Serialize_Line_Test()
{
	OATPP_LOGi("[Info]", "Serialize_Line_Test");

	auto station_DTO = Station_DTO::createShared();

	station_DTO->label = "STATION";
	station_DTO->linked_lines = {};
	station_DTO->code = "FR_03190_0";
	station_DTO->linked_lines->emplace_back("LINE_1");
	station_DTO->linked_lines->emplace_back("LINE_2");
	station_DTO->linked_lines->emplace_back("LINE_3");

	auto jsonObjectMapper = oatpp::json::ObjectMapper();
	auto serializedJson = jsonObjectMapper.writeToString(station_DTO);

	OATPP_ASSERT(serializedJson == json_station_test_serialized);
}

static void Deserialize_Line_Test()
{
	OATPP_LOGi("[Info]", "Deserialize_Line_Test");
	auto jsonObjectMapper = oatpp::json::ObjectMapper();
	auto object = jsonObjectMapper.readFromString<oatpp::Object<Station_DTO>>(json_station_test);

	std::vector<oatpp::String> expected_station_rennes = { "LER_BRE0","LER_NOR3","LER_BRE2","LER_BRE3","LGV_BRE0","LER_BRE4","LGV_FR4" };
	OATPP_ASSERT(object->label == "Rennes");
	OATPP_ASSERT(object->code == "FR_03190_0");
	OATPP_ASSERT(object->linked_lines->size() == 7);
	for (const auto& line_name : *(object->linked_lines))
		OATPP_ASSERT(std::find(expected_station_rennes.begin(), expected_station_rennes.end(), line_name) != expected_station_rennes.end());
}

static void Serialize_Lines_Test()
{
	OATPP_LOGi("[Info]", "Serialize_Lines_Test");
	auto stationsDTO = Stations_DTO::createShared();
	stationsDTO->stations = {
		{"FR_22070_0"},
		{"FR_22278_0"},
		{"FR_35238_0"},
		{"FR_28085_0"},
		{"FR_91377_1"}
	};

	auto jsonObjectMapper = oatpp::json::ObjectMapper();
	auto serializedJson = jsonObjectMapper.writeToString(stationsDTO);

	OATPP_ASSERT(serializedJson == json_stations_test_serialized);
}

static void Deserialize_Lines_Test()
{
	OATPP_LOGi("[Info]", "Deserialize_Lines_Test");
	auto jsonObjectMapper = oatpp::json::ObjectMapper();
	auto object = jsonObjectMapper.readFromString<oatpp::Object<Stations_DTO>>(json_stations_test);

	std::vector<oatpp::String> station_list = { "FR_22070_0", "FR_22278_0", "FR_35238_0", "FR_28085_0", "FR_91377_1" };
	OATPP_ASSERT(object->stations->size() == 5);
	for (const auto& line_name : *(object->stations))
		OATPP_ASSERT(std::find(station_list.begin(), station_list.end(), line_name) != station_list.end())
}


void StationDTOTest::onRun()
{
	Serialize_Line_Test();
	Deserialize_Line_Test();

	Serialize_Lines_Test();
	Deserialize_Lines_Test();
}
