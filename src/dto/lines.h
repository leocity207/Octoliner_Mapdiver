#ifndef LINE_DTO_H
#define LINE_DTO_H

#include "oatpp/macro/codegen.hpp"
#include "oatpp/Types.hpp"

#include OATPP_CODEGEN_BEGIN(DTO)


class LineDTO : public oatpp::DTO {

public:
	DTO_INIT(LineDTO, DTO)

	DTO_FIELD(String, label, "label");
	DTO_FIELD(Fields<String>, colors, "color");
	DTO_FIELD(Fields<String>, urls, "urls");
	DTO_FIELD(Fields<Any>, stations, "stations");

	static const oatpp::Type* GetStationType(const Fields<Any>& stations, const std::string& key);
	static Vector<String> GetStationList(const Fields<Any>& stations, const std::string& key);
	static String GetStationString(const Fields<Any>& stations, const std::string& key);
};


class LinesDTO : public oatpp::DTO {

public:

	DTO_INIT(LinesDTO, DTO)

	DTO_FIELD(Fields<Object<LineDTO>>, lines, "Lines");

};

#include OATPP_CODEGEN_END(DTO)

#endif /* LINE_DTO_H */
