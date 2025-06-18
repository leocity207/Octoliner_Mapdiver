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
	"code": "FR_03190_0",
	"lines" : ["LER_BRE0","LER_NOR3","LER_BRE2","LER_BRE3","LGV_BRE0","LER_BRE4","LGV_FR4"],
	"direction": {
		"LGV_FR8_A_27": "FR_13201_0",
		"LER_NOR2_A_05": "FR_14118_0",
		"LGV_FR4_A_00": "FR_64260_0",
		"LGV_FR4_R_30": "FR_62193_0",
		"LGV_BRE0_A_00": "FR_72181_0",
		"LGV_BRE0_R_30": "FR_29019_0",
		"LER_BRE0_A_22": "FR_72181_0",
		"LER_BRE0_R_07": "FR_29019_0",
		"LER_BRE2_R_15": "FR_29019_0",
		"LGV_BRE3_R_45": "FR_29232_0",
		"LER_BRE4_A_22": "FR_44109_0",
		"LER_BRE4_R_50": "FR_35288_0",
		"LER_BRE3_A_30": "FR_86194_0",
		"LER_BRE3_R_00": "FR_44109_0"
	}
}
)";

static std::string json_station_test_serialized = R"({"label":"STATION","code":"FR_03190_0","lines":["LINE_1","LINE_2","LINE_3"],"direction":{"SCHEDULE_1":"STATION_1","SCHEDULE_2":"STATION_1","SCHEDULE_3":"STATION_1"}})";

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