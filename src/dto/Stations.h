#ifndef STATIONS_DTO_H
#define STATIONS_DTO_H

#include "oatpp/macro/codegen.hpp"
#include "oatpp/Types.hpp"

#include OATPP_CODEGEN_BEGIN(DTO)


class Stations_DTO : public oatpp::DTO {

public:

	DTO_INIT(Stations_DTO, DTO)

		DTO_FIELD(List<String>, stations, "stations");

};

#include OATPP_CODEGEN_END(DTO)

#endif /* STATIONS_DTO_H */
