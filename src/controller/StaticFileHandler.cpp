#include "StaticFileHandler.hpp"
#include "src/config.h"




StaticFilesManager::StaticFilesManager(std::shared_ptr<oatpp::web::mime::ContentMappers>& apiContentMappers)
    : oatpp::web::server::api::ApiController(apiContentMappers)
{
}

oatpp::String StaticFilesManager::getFile(oatpp::String& fileName)
{
    if (!fileName || fileName == "")
        return oatpp::String::loadFromFile((RESOURCE_PATH() + oatpp::String("index.html"))->c_str());
    return oatpp::String::loadFromFile((RESOURCE_PATH() + fileName)->c_str());
}

