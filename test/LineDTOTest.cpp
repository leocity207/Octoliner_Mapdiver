#include "LineDTOTest.h"

#include "src/config.h"

#include "oatpp/json/ObjectMapper.hpp"
#include "src/dto/lines.h"



void LineDTOTest::onRun()
{
	oatpp::String json_data = oatpp::String::loadFromFile((RESOURCE_PATH() + oatpp::String("data/line.json"))->c_str());

	auto jsonObjectMapper = oatpp::json::ObjectMapper();
	auto object = jsonObjectMapper.readFromString<oatpp::Object<LinesDTO>>(json_data);

	auto b = object->lines["LGV-FR8"];
	int a = 0;
}
