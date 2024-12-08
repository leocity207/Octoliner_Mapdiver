#ifndef STATION_DTO_TEST_H
#define STATION_DTO_TEST_H

#include "oatpp-test/UnitTest.hpp"

class StationDTOTest : public oatpp::test::UnitTest {
public:

	StationDTOTest() : UnitTest("Station_DTO_Test") {}
	void onRun() override;

};

#endif //STATION_DTO_TEST_H