#ifndef LINES_DTO_H
#define LINES_DTO_H

#include "oatpp/macro/codegen.hpp"
#include "oatpp/Types.hpp"

#include OATPP_CODEGEN_BEGIN(DTO)

class Lines_DTO : public oatpp::DTO {

public:

	DTO_INIT(Lines_DTO, DTO)

	DTO_FIELD(List<String>, lines, "lines");
};

#include OATPP_CODEGEN_END(DTO)

#endif /* LINES_DTO_H */
