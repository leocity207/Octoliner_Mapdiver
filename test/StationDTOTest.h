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
	"Stations": {
		"FR_22070_0":{
			"label": "Guingamp",
			"lines" : ["LER_BRE0","LGV_BRE2","LGV_BRE0"]
		},
		"FR_22278_0":{
			"label": "Saint-Brieuc",
			"lines" : ["LER_BRE0","LGV_BRE2","LGV_BRE0"]
		},
		"FR_35238_0":{
			"label": "Rennes",
			"lines" : ["LER_BRE0","LER_NOR3","LER_BRE2","LER_BRE3","LGV_BRE0","LER_BRE4","LGV_FR4"]
		},
		"FR_28085_0":{
			"label": "Chartres",
			"lines" : ["LER_CVL1","LGV_BRE0","LGV_BRE1","LGV_FR7","LGV_FR9","LGV_FR8"]
		},
		"FR_91377_1":{
			"label": "Massy TGV",
			"lines" : ["LGV_BRE0","LGV_BRE1","LGV_FR7","LGV_FR9","LGV_FR8"]
		}
	}
}
)";


static std::string serialization_station_res = "{\"Stations\":{\"FR_22070_0\":{\"label\":\"Guingamp\",\"lines\":[\"LER_BRE0\",\"LGV_BRE2\",\"LGV_BRE0\"]},\"FR_22278_0\":{\"label\":\"Saint-Brieuc\",\"lines\":[\"LER_BRE0\",\"LGV_BRE2\",\"LGV_BRE0\"]},\"FR_35238_0\":{\"label\":\"Rennes\",\"lines\":[\"LER_BRE0\",\"LER_NOR3\",\"LER_BRE2\",\"LER_BRE3\",\"LGV_BRE0\",\"LER_BRE4\",\"LGV_FR4\"]},\"FR_28085_0\":{\"label\":\"Chartres\",\"lines\":[\"LER_CVL1\",\"LGV_BRE0\",\"LGV_BRE1\",\"LGV_FR7\",\"LGV_FR9\",\"LGV_FR8\"]},\"FR_91377_1\":{\"label\":\"Massy TGV\",\"lines\":[\"LGV_BRE0\",\"LGV_BRE1\",\"LGV_FR7\",\"LGV_FR9\",\"LGV_FR8\"]}}}";
#endif //STATION_DTO_TEST_H