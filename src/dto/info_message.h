#ifndef INFO_MESSAGE_DTO_H
#define INFO_MESSAGE_DTO_H

#include <oatpp/macro/codegen.hpp>
#include <oatpp/Types.hpp>

#include OATPP_CODEGEN_BEGIN(DTO)


class Info_Message_DTO : public oatpp::DTO {

	public:
		DTO_INIT(Info_Message_DTO, DTO)

		DTO_FIELD(Fields<String>, infomessages, "infomessages");
};


#include OATPP_CODEGEN_END(DTO)

#endif // INFO_MESSAGE_DTO_H
