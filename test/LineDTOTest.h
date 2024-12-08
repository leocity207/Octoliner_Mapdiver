#ifndef LINE_DTO_TEST_H
#define LINE_DTO_TEST_H

#include "oatpp-test/UnitTest.hpp"

class LineDTOTest : public oatpp::test::UnitTest {
public:

	LineDTOTest() : UnitTest("Line_DTO_Test") {}
	void onRun() override;

};

#endif //LINE_DTO_TEST_H