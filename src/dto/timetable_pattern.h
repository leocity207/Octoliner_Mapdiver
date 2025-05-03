#ifndef TIMETABLE_PATTERN_DTO_H
#define TIMETABLE_PATTERN_DTO_H

#include "oatpp/macro/codegen.hpp"
#include "oatpp/Types.hpp"

#include "line_flow_stop.h"
#include "info_message.h"

#include OATPP_CODEGEN_BEGIN(DTO)

class Timetable_Pattern_DTO : public oatpp::DTO {

	public:
		DTO_INIT(Timetable_Pattern_DTO, DTO)


		DTO_FIELD(String, code, "code");
		DTO_FIELD(String, label, "label");
        DTO_FIELD(UInt16, interval_minutes, "interval_minutes");
        DTO_FIELD(UInt16, departure_minute, "departure_minute");
        DTO_FIELD(String, first_departure, "first_departure");
        DTO_FIELD(String, last_departure, "last_departure");
        DTO_FIELD(String, service, "service");

		DTO_FIELD(List<Object<Info_Message_DTO>>, infomessages, "infomessages");
		DTO_FIELD(List<Object<Line_Flow_Stop_DTO>>, lineflowstops, "lineflowstops");
};


#include OATPP_CODEGEN_END(DTO)

#endif // TIMETABLE_PATTERN_DTO_H
