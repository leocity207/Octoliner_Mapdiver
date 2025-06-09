#ifndef STATION_DTO_H
#define STATION_DTO_H

#include "oatpp/macro/codegen.hpp"
#include "oatpp/Types.hpp"

#include OATPP_CODEGEN_BEGIN(DTO)


class Station_DTO : public oatpp::DTO {

public:
	DTO_INIT(Station_DTO, DTO)

		DTO_FIELD(String, label, "label");
	DTO_FIELD(List<String>, linked_lines, "lines");
};

#include OATPP_CODEGEN_END(DTO)

#endif /* STATION_DTO_H */