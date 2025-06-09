#include "LineDTOTest.h"

#include "src/config.h"

#include "oatpp/json/ObjectMapper.hpp"
#include "src/dto/line.h"
#include "src/dto/lines.h"
#include "src/dto/timetable_pattern.h"
#include "src/dto/line_flow_stop.h"

static void Serialize_Line_Test()
{
	OATPP_LOGi("[Info]", "Serialize_Line_Test");

	auto lineflowstops_1 = Line_Flow_Stop_DTO::createShared();
	lineflowstops_1->station_ID = "Station_1";
	lineflowstops_1->departure_minute = 14;
	lineflowstops_1->flags = {};

	auto lineflowstops_2 = Line_Flow_Stop_DTO::createShared();
	lineflowstops_2->station_ID = "Station_2";
	lineflowstops_2->departure_minute = 24;
	lineflowstops_2->departure_minute = 24;
	lineflowstops_2->flags->emplace_back("warning");

	auto timetable_pattern = Timetable_Pattern_DTO::createShared();
	timetable_pattern->code = "code_1";
	timetable_pattern->label = "a - b";
	timetable_pattern->interval_minutes = 60,
	timetable_pattern->departure_minute = 22,
	timetable_pattern->first_departure = "4:22:00",
	timetable_pattern->last_departure ="23:22:00",
	timetable_pattern->service = "local",
	timetable_pattern->infomessages = {},
	timetable_pattern->lineflowstops =  {lineflowstops_1, lineflowstops_2};

	auto line = Line_DTO::createShared();
	line->code = "LER_BRE0";
	line->label = "LER BRE0";
	line->color = { {"default", "#25158B"}, {"easy", "#DD2F1D"} };
	line->urls = {{"fr","/fr/BRE0"},{"en","/en/BRE0"}};
	line->timetable_pattern = {timetable_pattern};
	line->svg_icon = "<svg>";
	
	auto jsonObjectMapper = oatpp::json::ObjectMapper();
	auto serializedJson = jsonObjectMapper.writeToString(line);

	OATPP_ASSERT(serializedJson == json_line_test_serialized);
}

static void Deserialize_Line_Test()
{
	OATPP_LOGi("[Info]", "Deserialize_Line_Test");
	auto jsonObjectMapper = oatpp::json::ObjectMapper();
	auto object = jsonObjectMapper.readFromString<oatpp::Object<Line_DTO>>(json_line_test);

	OATPP_ASSERT(object->code == "EXPRESS_1");
	OATPP_ASSERT(object->label == "Express Line 1");
	OATPP_ASSERT(object->urls.getValueByKey("fr") == "/fr/express1");
	OATPP_ASSERT(object->urls.getValueByKey("en") == "/en/express1");
	OATPP_ASSERT(object->color.getValueByKey("default") == "#FF0000");
	OATPP_ASSERT(object->color.getValueByKey("night") == "#880000");
	auto& timetable_pattern = object->timetable_pattern[0];

	OATPP_ASSERT(timetable_pattern->code == "EXPRESS_1_A_00");
	OATPP_ASSERT(timetable_pattern->label == "North Terminal → South Terminal");
	OATPP_ASSERT(timetable_pattern->interval_minutes == 30);
	OATPP_ASSERT(timetable_pattern->departure_minute == 0);
	OATPP_ASSERT(timetable_pattern->first_departure == "5:00:00");
	OATPP_ASSERT(timetable_pattern->last_departure == "23:00:00");
	OATPP_ASSERT(timetable_pattern->service == "express");
	OATPP_ASSERT(timetable_pattern->infomessages->size() == 0);
	OATPP_ASSERT(timetable_pattern->code == "EXPRESS_1_A_00");

	auto& station_1 = timetable_pattern->lineflowstops[0];
	auto& station_2 = timetable_pattern->lineflowstops[1];
	auto& station_3 = timetable_pattern->lineflowstops[2];

	OATPP_ASSERT(station_1->station_ID = "NORTH_TERMINAL");
	OATPP_ASSERT(station_1->departure_minute == 0);
	OATPP_ASSERT(station_1->hasArrivalMinute() == false);
	OATPP_ASSERT(station_1->hasDepartureMinute() == true);
	OATPP_ASSERT(station_1->hasFlags() == false);

	OATPP_ASSERT(station_2->station_ID = "CENTER_CITY");
	OATPP_ASSERT(station_2->departure_minute == 16);
	OATPP_ASSERT(station_2->arrival_minute == 15);
	OATPP_ASSERT(station_2->flags->front() == "warning");
	OATPP_ASSERT(station_2->flags->size() == 1);
	OATPP_ASSERT(station_2->hasArrivalMinute() == true);
	OATPP_ASSERT(station_2->hasDepartureMinute() == true);
	OATPP_ASSERT(station_2->hasFlags() == true);

	OATPP_ASSERT(station_3->station_ID = "SOUTH_TERMINAL");
	OATPP_ASSERT(station_3->arrival_minute == 30);
	OATPP_ASSERT(station_3->hasArrivalMinute() == true);
	OATPP_ASSERT(station_3->hasDepartureMinute() == false);
	OATPP_ASSERT(station_3->hasFlags() == false);
}

static void Serialize_Lines_Test()
{
	OATPP_LOGi("[Info]", "Serialize_Lines_Test");

	auto lines = Lines_DTO::createShared();
	lines->lines = {};
	lines->lines->emplace_back("LINE_1");
	lines->lines->emplace_back("LINE_2");
	lines->lines->emplace_back("LINE_3");


	auto jsonObjectMapper = oatpp::json::ObjectMapper();
	auto serializedJson = jsonObjectMapper.writeToString(lines);

	OATPP_ASSERT(serializedJson == json_lines_test_serialized);
}

static void Deserialize_Lines_Test()
{
	OATPP_LOGi("[Info]", "Deserialize_Lines_Test");
	auto jsonObjectMapper = oatpp::json::ObjectMapper();
	auto object = jsonObjectMapper.readFromString<oatpp::Object<Lines_DTO>>(json_lines_test);

	OATPP_ASSERT(object->lines->size() == 4);

	auto it = object->lines->begin();
	OATPP_ASSERT(*(it) == "LER_BRE0");
	OATPP_ASSERT(*(++it) == "LER_BRE1");
	OATPP_ASSERT(*(++it) == "LER_BRE2");
	OATPP_ASSERT(*(++it) == "LER_BRE3");
}

void LineDTOTest::onRun()
{
	Serialize_Line_Test();
	Deserialize_Line_Test();

	Serialize_Lines_Test();
	Deserialize_Lines_Test();
}
