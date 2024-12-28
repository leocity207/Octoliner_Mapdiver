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
	"Lines": {
		"LER-BRE0":{
			"label" : "LER BRE0",
			"urls" : {},
			"color" : {
				"default": "#25158B",
				"easy" : "#DD2F1D"
			},
			"stations" : {
				"default-a": [
					"FR_29019_0",
					"FR_29103_0",
					"FR_29105_0",
					"FR_29265_0",
					"FR_29151_0",
					"FR_22207_0",
					"FR_22070_0",
					"FR_22278_0",
					"FR_22093_0",
					"FR_35184_0",
					"FR_35238_0",
					"FR_35360_0",
					"FR_53130_0",
					"FR_53097_0",
					"FR_72181_0"],
				"default-r": "~default-a"
			}
		},
		"LER-BRE1":{
			"label" : "LER BRE1",
				"urls" : {},
				"color" : {
					"default": "#4D84B8",
					"easy" : "#9184BE"
			},
			"stations" : {
				"default-a": [
					"FR_29019_0",
					"FR_29080_0",
					"FR_29302_0",
					"FR_29232_0",
					"FR_29233_0",
					"FR_56121_0",
					"FR_56098_0",
					"FR_56007_0",
					"FR_56260_0",
					"FR_56206_0",
					"FR_56184_0",
					"FR_35236_0",
					"FR_44129_0",
					"FR_44195_0",
					"FR_44109_0",
					"FR_44003_0",
					"FR_49007_0",
					"FR_49328_0",
					"FR_37261_0"],
				"default-r": "~default-a"
			}
		},
		"LER-BRE2":{
			"label" : "LER BRE2",
				"urls" : {},
				"color" : {
					"default": "#7065B2",
					"easy" : "#008B39"
			},
			"stations" : {
				"default-a": [
					"FR_29232_0",
					"FR_29233_0",
					"FR_56121_0",
					"FR_56098_0",
					"FR_56007_0",
					"FR_56260_0",
					"FR_56206_0",
					"FR_56184_0",
					"FR_35236_0",
					"FR_44007_0",
					"FR_35176_0",
					"FR_35238_0"],
				"default-r": "~default-a"
			}
		}
	}
})";

static std::string serialization_line_res = "{\"Lines\":{\"LER-BRE0\":{\"label\":\"LER BRE0\",\"color\":{\"default\":\"#25158B\",\"easy\":\"#DD2F1D\"},\"urls\":{},\"stations\":{\"default-a\":[\"FR_29019_0\",\"FR_29103_0\",\"FR_29105_0\",\"FR_29265_0\",\"FR_29151_0\",\"FR_22207_0\",\"FR_22070_0\",\"FR_22278_0\",\"FR_22093_0\",\"FR_35184_0\",\"FR_35238_0\",\"FR_35360_0\",\"FR_53130_0\",\"FR_53097_0\",\"FR_72181_0\"],\"default-r\":\"~default-a\"}},\"LER-BRE1\":{\"label\":\"LER BRE1\",\"color\":{\"default\":\"#4D84B8\",\"easy\":\"#9184BE\"},\"urls\":{},\"stations\":{\"default-a\":[\"FR_29019_0\",\"FR_29080_0\",\"FR_29302_0\",\"FR_29232_0\",\"FR_29233_0\",\"FR_56121_0\",\"FR_56098_0\",\"FR_56007_0\",\"FR_56260_0\",\"FR_56206_0\",\"FR_56184_0\",\"FR_35236_0\",\"FR_44129_0\",\"FR_44195_0\",\"FR_44109_0\",\"FR_44003_0\",\"FR_49007_0\",\"FR_49328_0\",\"FR_37261_0\"],\"default-r\":\"~default-a\"}},\"LER-BRE2\":{\"label\":\"LER BRE2\",\"color\":{\"default\":\"#7065B2\",\"easy\":\"#008B39\"},\"urls\":{},\"stations\":{\"default-a\":[\"FR_29232_0\",\"FR_29233_0\",\"FR_56121_0\",\"FR_56098_0\",\"FR_56007_0\",\"FR_56260_0\",\"FR_56206_0\",\"FR_56184_0\",\"FR_35236_0\",\"FR_44007_0\",\"FR_35176_0\",\"FR_35238_0\"],\"default-r\":\"~default-a\"}}}}";


#endif //LINE_DTO_TEST_H