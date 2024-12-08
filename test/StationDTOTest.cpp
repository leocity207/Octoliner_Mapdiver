#include "StationDTOTest.h"

#include "src/config.h"

#include "oatpp/json/ObjectMapper.hpp"
#include "src/dto/Stations.h"



void StationDTOTest::onRun()
{
	oatpp::String json_data = oatpp::String::loadFromFile((RESOURCE_PATH() + oatpp::String("data/station.json"))->c_str());

	auto jsonObjectMapper = oatpp::json::ObjectMapper();
	auto object = jsonObjectMapper.readFromString<oatpp::Object<StationsDTO>>(json_data);

	auto b = object->stations["FR_91377_1"];
	int a = 0;
}
