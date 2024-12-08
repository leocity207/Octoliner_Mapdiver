#ifndef STATION_DTO_H
#define STATION_DTO_H

#include "oatpp/macro/codegen.hpp"
#include "oatpp/Types.hpp"

#include OATPP_CODEGEN_BEGIN(DTO)


class StationDTO : public oatpp::DTO {
  
public:
  DTO_INIT(StationDTO, DTO)
  
  DTO_FIELD(String, label, "label");
  DTO_FIELD(List<String>, linked_lignes,"lignes");
  
};


class StationsDTO : public oatpp::DTO {

public:
  
  DTO_INIT(StationsDTO, DTO)
 
  DTO_FIELD(Fields<Object<StationDTO>>, stations,"Stations");
  
};

#include OATPP_CODEGEN_END(DTO)

#endif /* STATION_DTO_H */
