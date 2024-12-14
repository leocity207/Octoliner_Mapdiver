#ifndef LINE_DTO_H
#define LINE_DTO_H

#include "stations.h"
#include "lines.h"

#include OATPP_CODEGEN_BEGIN(DTO)


class NetworkDTO : public oatpp::DTO {

public:
	DTO_INIT(LineDTO, DTO)

	DTO_FIELD(Object<LinesDTO>, lines);
	DTO_FIELD(Object<StationsDTO>, stations);

};

#include OATPP_CODEGEN_END(DTO)

#endif /* LINE_DTO_H */
