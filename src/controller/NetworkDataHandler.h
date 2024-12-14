#ifndef NETWORK_DATA_HANDLER_H
#define NETWORK_DATA_HANDLER_H


#include "oatpp/web/server/api/ApiController.hpp"
#include "oatpp/macro/codegen.hpp"
#include "oatpp/macro/component.hpp"
#include "oatpp/json/Deserializer.hpp"

#include "src/config.h"

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

        ENDPOINT("GET", "dyn/network_data", GetNetworkData, REQUEST(std::shared_ptr<IncomingRequest>, request)) 
        {
            auto response = createResponse(Status::CODE_200, "");
            return response;
        }

};


#endif