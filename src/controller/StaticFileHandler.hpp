#ifndef STATIC_FILE_HANDLER_hpp
#define STATIC_FILE_HANDLER_hpp

#include "dto/DTOs.hpp"

#include "oatpp/web/server/api/ApiController.hpp"
#include "oatpp/macro/codegen.hpp"
#include "oatpp/macro/component.hpp"

#include OATPP_CODEGEN_BEGIN(ApiController) //<-- Begin Codegen

class StaticFilesManager : public oatpp::web::server::api::ApiController {
    public:

        /////////
        /// CTOR
        StaticFilesManager(OATPP_COMPONENT(std::shared_ptr<oatpp::web::mime::ContentMappers>, apiContentMappers));

        ///////////////////
        /// STATIC MEMEBER
        static oatpp::String getFile(oatpp::String& fileName);

        ENDPOINT("GET", "*", GetStaticFiles, REQUEST(std::shared_ptr<IncomingRequest>, request)) 
        {
            oatpp::String tail = request->getPathTail();
            oatpp::String file = getFile(tail);
            OATPP_ASSERT_HTTP(file.get() != nullptr, Status::CODE_404, "File not found");
            return createResponse(Status::CODE_200, file);
        }
};

#endif
