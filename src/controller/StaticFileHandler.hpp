#ifndef STATIC_FILE_HANDLER_hpp
#define STATIC_FILE_HANDLER_hpp

#include "dto/DTOs.hpp"

#include "oatpp/web/server/api/ApiController.hpp"
#include "oatpp/macro/codegen.hpp"
#include "oatpp/macro/component.hpp"

#include OATPP_CODEGEN_BEGIN(ApiController) //<-- Begin Codegen

class StaticFilesManager : public oatpp::web::server::api::ApiController {
private:
    oatpp::String m_basePath;
    oatpp::concurrency::SpinLock m_lock;
    std::unordered_map<oatpp::String, oatpp::String> m_cache;

public:
    StaticFilesManager(const oatpp::String& basePath) : m_basePath(basePath) {}
    oatpp::String getFile(const oatpp::String& path) {
        if (!path) {
            return nullptr;
        }
        std::lock_guard<oatpp::concurrency::SpinLock> lock(m_lock);
        auto& file = m_cache[path];
        if (file) {
            return file;
        }
        oatpp::String filename = m_basePath + "/" + path;
        file = oatpp::String::loadFromFile(filename->c_str());
        return file;
    }
};

#endif
