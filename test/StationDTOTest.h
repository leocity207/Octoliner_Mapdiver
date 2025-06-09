#ifndef STATION_DTO_TEST_H
#define STATION_DTO_TEST_H

#include "oatpp-test/UnitTest.hpp"

class StationDTOTest : public oatpp::test::UnitTest {
public:

	StationDTOTest() : UnitTest("Station_DTO_Test") {}
	void onRun() override;

};

static std::string json_station_test = R"(
{
	"label": "Rennes",
	"code": "FR_03190_0"
	"lines" : ["LER_BRE0","LER_NOR3","LER_BRE2","LER_BRE3","LGV_BRE0","LER_BRE4","LGV_FR4"]
}
)";

static std::string json_station_test_serialized = R"({"label":"STATION","code":"FR_03190_0","lines":["LINE_1","LINE_2","LINE_3"]})";

static std::string json_stations_test = R"(
{
	"stations": [
		"FR_22070_0",
		"FR_22278_0",
		"FR_35238_0",
		"FR_28085_0",
		"FR_91377_1"
	]
}
)";

static std::string json_stations_test_serialized = R"({"stations":["FR_22070_0","FR_22278_0","FR_35238_0","FR_28085_0","FR_91377_1"]})";
#endif //STATION_DTO_TEST_H