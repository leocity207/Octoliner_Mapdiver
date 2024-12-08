#include "NetworkDataHandler.h"

NetworkDataHandler::NetworkDataHandler(std::shared_ptr<oatpp::web::mime::ContentMappers>& apiContentMappers)
    : oatpp::web::server::api::ApiController(apiContentMappers)
{
}