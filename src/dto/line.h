#ifndef LINE_DTO_H
#define LINE_DTO_H

#include "oatpp/macro/codegen.hpp"
#include "oatpp/Types.hpp"

//DTO
#include "timetable_pattern.h"

#include OATPP_CODEGEN_BEGIN(DTO)

class Line_DTO : public oatpp::DTO {
	public:
		DTO_INIT(Line_DTO, DTO)

		DTO_FIELD(String, code, "code");
		DTO_FIELD(String, label, "label");
		DTO_FIELD(Fields<String>, urls, "urls");
		DTO_FIELD(Fields<String>, color, "color");
		DTO_FIELD(List<Object<Timetable_Pattern_DTO>>, timetable_pattern, "timetable_pattern");
};

#include OATPP_CODEGEN_END(DTO)

#endif /* LINE_DTO_H */
