#ifndef LINE_DTO_TEST_H
#define LINE_DTO_TEST_H

#include "oatpp-test/UnitTest.hpp"


class LineDTOTest : public oatpp::test::UnitTest {
public:

	LineDTOTest() : UnitTest("Line_DTO_Test") {}
	void onRun() override;

};
//https://github.com/oatpp/oatpp/blob/master/changelog/1.3.0.md#polymorphic-dto_field

static std::string json_line_test = R"(
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
)";

static std::string json_line_test_serialized = R"({"code":"LER_BRE0","label":"LER BRE0","urls":{"fr":"\/fr\/BRE0","en":"\/en\/BRE0"},"color":{"default":"#25158B","easy":"#DD2F1D"},"timetable_pattern":[{"code":"code_1","label":"a - b","interval_minutes":60,"departure_minute":22,"first_departure":"4:22:00","last_departure":"23:22:00","service":"local","infomessages":[],"lineflowstops":[{"station_ID":"Station_1","arrival_minute":null,"departure_minute":14,"flags":null},{"station_ID":"Station_2","arrival_minute":null,"departure_minute":24,"flags":["warning"]}]}]})";

static std::string json_lines_test = R"(
{
	"lines": [
		"LER_BRE0",
		"LER_BRE1",
		"LER_BRE2",
		"LER_BRE3"
	]
}
)";

static std::string json_lines_test_serialized = R"({"lines":["LINE_1","LINE_2","LINE_3"]})";

#endif //LINE_DTO_TEST_H