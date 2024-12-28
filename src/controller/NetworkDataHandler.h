#ifndef NETWORK_DATA_HANDLER_H
#define NETWORK_DATA_HANDLER_H


#include "oatpp/web/server/api/ApiController.hpp"
#include "oatpp/macro/codegen.hpp"
#include "oatpp/macro/component.hpp"
#include "oatpp/json/ObjectMapper.hpp"

#include "src/config.h"

#include "dto/lines.h"
#include "dto/stations.h"
#include "dto/network.h"

#include <fstream>
#include <sstream>

#include OATPP_CODEGEN_BEGIN(ApiController) //<-- Begin Codegen

class NetworkDataHandler : public oatpp::web::server::api::ApiController {
    public:
        NetworkDataHandler(OATPP_COMPONENT(std::shared_ptr<oatpp::web::mime::ContentMappers>, apiContentMappers));

        std::string readFile() {
            std::ifstream file(RESOURCE_PATH() + std::string("data/ligne.json"));
            std::stringstream buffer;
            buffer << file.rdbuf();
            return buffer.str();
        }

        ENDPOINT("GET", "dyn/network_data", GetNetworkData) 
        {
            oatpp::String json_data_lines = oatpp::String::loadFromFile((RESOURCE_PATH() + oatpp::String("data/line.json"))->c_str());
            oatpp::String json_data_station = oatpp::String::loadFromFile((RESOURCE_PATH() + oatpp::String("data/station.json"))->c_str());

            auto jsonObjectMapper = oatpp::json::ObjectMapper();
            auto lines_data_dto = jsonObjectMapper.readFromString<oatpp::Object<LinesDTO>>(json_data_lines);
            auto station_data_dto = jsonObjectMapper.readFromString<oatpp::Object<StationsDTO>>(json_data_station);
            
            auto network_dto = NetworkDTO::createShared();
            network_dto->stations = station_data_dto->stations;
            network_dto->lines = lines_data_dto->lines;

            auto response = createDtoResponse(Status::CODE_200, network_dto);
            response->putHeader("Content-Type", "json");
            return response;


            return response;
        }

};


#endif