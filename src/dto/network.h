#ifndef NETWORK_DTO_H
#define NETWORK_DTO_H

#include "station.h"
#include "line.h"

#include OATPP_CODEGEN_BEGIN(DTO)


class NetworkDTO : public oatpp::DTO {

public:
	DTO_INIT(NetworkDTO, DTO)

	DTO_FIELD(Fields<Object<Line_DTO>>, lines, "lines");
	DTO_FIELD(Fields<Object<Station_DTO>>, stations, "Stations");

};

#include OATPP_CODEGEN_END(DTO)

#endif /* LINE_DTO_H */
