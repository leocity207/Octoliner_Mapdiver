#ifndef NETWORK_DTO_H
#define NETWORK_DTO_H

#include "stations.h"
#include "lines.h"

#include OATPP_CODEGEN_BEGIN(DTO)


class NetworkDTO : public oatpp::DTO {

public:
	DTO_INIT(NetworkDTO, DTO)

	DTO_FIELD(Fields<Object<LineDTO>>, lines, "Lines");
	DTO_FIELD(Fields<Object<StationDTO>>, stations, "Stations");

};

#include OATPP_CODEGEN_END(DTO)

#endif /* LINE_DTO_H */
