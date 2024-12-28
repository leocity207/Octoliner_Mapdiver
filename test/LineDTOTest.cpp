#include "LineDTOTest.h"

#include "src/config.h"

#include "oatpp/json/ObjectMapper.hpp"
#include "src/dto/lines.h"

static void SerializeLineTest()
{
	OATPP_LOGi("[Info]", "SerializeLineTest");
	// 1. Create the LinesDTO object
	auto linesDTO = LinesDTO::createShared();

	// 2. Populate LineDTO objects
	auto line_BRE0 = LineDTO::createShared();
	line_BRE0->label = "LER BRE0";
	line_BRE0->colors = { {"default", "#25158B"}, {"easy", "#DD2F1D"} };
	line_BRE0->urls = {};

	auto reverse_a = oatpp::data::type::String("~default-a");
	auto BRE0_stations = oatpp::Vector<oatpp::String>::createShared();
	for (auto elt : { "FR_29019_0", "FR_29103_0", "FR_29105_0",
		"FR_29265_0", "FR_29151_0", "FR_22207_0",
		"FR_22070_0", "FR_22278_0", "FR_22093_0",
		"FR_35184_0", "FR_35238_0", "FR_35360_0",
		"FR_53130_0", "FR_53097_0", "FR_72181_0" })
		BRE0_stations->emplace_back(elt);
	auto BRE1_stations = oatpp::Vector<oatpp::String>::createShared();
	for (auto elt : { "FR_29019_0", "FR_29080_0", "FR_29302_0",
			"FR_29232_0", "FR_29233_0", "FR_56121_0",
			"FR_56098_0", "FR_56007_0", "FR_56260_0",
			"FR_56206_0", "FR_56184_0", "FR_35236_0",
			"FR_44129_0", "FR_44195_0", "FR_44109_0",
			"FR_44003_0", "FR_49007_0", "FR_49328_0",
			"FR_37261_0" })
		BRE1_stations->emplace_back(elt);
	auto BRE2_stations = oatpp::Vector<oatpp::String>::createShared();
	for (auto elt : { "FR_29232_0", "FR_29233_0", "FR_56121_0",
			"FR_56098_0", "FR_56007_0", "FR_56260_0",
			"FR_56206_0", "FR_56184_0", "FR_35236_0",
			"FR_44007_0", "FR_35176_0", "FR_35238_0" })
		BRE2_stations->emplace_back(elt);
	

	line_BRE0->stations = {
		{"default-a", oatpp::Any(BRE0_stations)},
		{"default-r", oatpp::Any(reverse_a)}
	};

	auto line_BRE1 = LineDTO::createShared();
	line_BRE1->label = "LER BRE1";
	line_BRE1->colors = { {"default", "#4D84B8"}, {"easy", "#9184BE"} };
	line_BRE1->urls = {};
	line_BRE1->stations = {
		{"default-a", oatpp::Any(BRE1_stations)},
		{"default-r", oatpp::Any(reverse_a)}
	};

	auto line_BRE2 = LineDTO::createShared();
	line_BRE2->label = "LER BRE2";
	line_BRE2->colors = { {"default", "#7065B2"}, {"easy", "#008B39"} };
	line_BRE2->urls = {};
	line_BRE2->stations = {
		{"default-a", oatpp::Any(BRE2_stations)},
		{"default-r", oatpp::Any(reverse_a)}
	};

	// 3. Populate the LinesDTO object
	linesDTO->lines = {
		{"LER-BRE0", line_BRE0},
		{"LER-BRE1", line_BRE1},
		{"LER-BRE2", line_BRE2}
	};

	// 4. Serialize the object to JSON
	auto jsonObjectMapper = oatpp::json::ObjectMapper();
	auto serializedJson = jsonObjectMapper.writeToString(linesDTO);

	// 6. Compare the serialized JSON with the expected JSON
	OATPP_ASSERT(serializedJson == serialization_line_res);
}

static void deserializeLineTest()
{
	OATPP_LOGi("[Info]", "deserializeLineTest");
	auto jsonObjectMapper = oatpp::json::ObjectMapper();
	auto object = jsonObjectMapper.readFromString<oatpp::Object<LinesDTO>>(json_line_test);

	auto& line_BRE0 = object->lines["LER-BRE0"];
	auto& line_BRE1 = object->lines["LER-BRE1"];
	auto& line_BRE2 = object->lines["LER-BRE2"];
	OATPP_ASSERT(line_BRE0->label == "LER BRE0");
	OATPP_ASSERT(line_BRE1->label == "LER BRE1");
	OATPP_ASSERT(line_BRE2->label == "LER BRE2");

	OATPP_ASSERT(line_BRE0->colors["default"] == "#25158B");
	OATPP_ASSERT(line_BRE0->colors["easy"] == "#DD2F1D");

	OATPP_ASSERT(line_BRE1->colors["default"] == "#4D84B8");
	OATPP_ASSERT(line_BRE1->colors["easy"] == "#9184BE");

	OATPP_ASSERT(line_BRE2->colors["default"] == "#7065B2");
	OATPP_ASSERT(line_BRE2->colors["easy"] == "#008B39");


	OATPP_ASSERT(line_BRE0->urls->size() == 0);
	OATPP_ASSERT(line_BRE1->urls->size() == 0);
	OATPP_ASSERT(line_BRE2->urls->size() == 0);

	auto& stationsBRE0 = line_BRE0->stations;
	OATPP_ASSERT(LineDTO::GetStationType(stationsBRE0, "default-a")->classId == oatpp::Vector<oatpp::String>::Class::getType()->classId);
	OATPP_ASSERT(LineDTO::GetStationType(stationsBRE0, "default-r")->classId == oatpp::String::Class::getType()->classId);
	OATPP_ASSERT(LineDTO::GetStationString(stationsBRE0, "default-r") == "~default-a");
	std::vector<oatpp::String> BREO = {
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
		"FR_72181_0" };
	auto BRE0_List = LineDTO::GetStationList(stationsBRE0, "default-a");
	for (auto& station : *BRE0_List)
		OATPP_ASSERT(std::find(BREO.begin(), BREO.end(), station) != BREO.end());

	auto& stationsBRE1 = line_BRE1->stations;
	OATPP_ASSERT(LineDTO::GetStationType(stationsBRE1, "default-a")->classId == oatpp::Vector<oatpp::String>::Class::getType()->classId);
	OATPP_ASSERT(LineDTO::GetStationType(stationsBRE1, "default-r")->classId == oatpp::String::Class::getType()->classId);
	OATPP_ASSERT(LineDTO::GetStationString(stationsBRE1, "default-r") == "~default-a");
	std::vector<oatpp::String> BRE1 = {
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
		"FR_37261_0" };
	auto BRE1_List = LineDTO::GetStationList(stationsBRE1, "default-a");
	for (auto& station : *BRE1_List)
		OATPP_ASSERT(std::find(BRE1.begin(), BRE1.end(), station) != BRE1.end());

	auto& stationsBRE2 = line_BRE2->stations;
	OATPP_ASSERT(LineDTO::GetStationType(stationsBRE2, "default-a")->classId == oatpp::Vector<oatpp::String>::Class::getType()->classId);
	OATPP_ASSERT(LineDTO::GetStationType(stationsBRE2, "default-r")->classId == oatpp::String::Class::getType()->classId);
	OATPP_ASSERT(LineDTO::GetStationString(stationsBRE2, "default-r") == "~default-a");
	std::vector<oatpp::String> BRE2 = {
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
		"FR_35238_0" };
	auto BRE2_List = LineDTO::GetStationList(stationsBRE2, "default-a");
	for (auto& station : *BRE2_List)
		OATPP_ASSERT(std::find(BRE2.begin(), BRE2.end(), station) != BRE2.end());
}

void LineDTOTest::onRun()
{
	SerializeLineTest();
	deserializeLineTest();
}
