#include "StaticFileHandler.h"
#include "src/config.h"

#include <utility>
#include <array>



StaticFilesManager::StaticFilesManager(std::shared_ptr<oatpp::web::mime::ContentMappers>& apiContentMappers)
	: oatpp::web::server::api::ApiController(apiContentMappers)
{
}

oatpp::String StaticFilesManager::getFile(oatpp::String& fileName)
{
	OATPP_LOGi("[Info]", "getFile '{}'", fileName);
	if (!fileName || fileName == "" || fileName->find_last_of(".") == std::string::npos)
		return oatpp::String::loadFromFile((RESOURCE_PATH().generic_string() + oatpp::String("index.html"))->c_str());
	if(fileName == "favicon.ico")
		return oatpp::String::loadFromFile((RESOURCE_PATH().generic_string() + oatpp::String("resources-config/image/favicon.ico"))->c_str());
	return oatpp::String::loadFromFile((RESOURCE_PATH().generic_string() + fileName)->c_str());
}


const char * StaticFilesManager::getContentType(const std::string& path) {
	static std::vector <std::pair<const char*, const char*>> matcher = {
		{ "aac", "audio/aac"},
		{ "abw","application/x-abiword" },
		{ "arc","application/octet-stream" },
		{ "avi","video/x-msvideo" },
		{ "azw","application/vnd.amazon.ebook" },
		{ "bin","application/octet-stream" },
		{ "bmp","image/bmp" },
		{ "bz","application/x-bzip" },
		{ "bz2","application/x-bzip2" },
		{ "csh","application/x-csh" },
		{ "css","text/css" },
		{ "csv","text/csv" },
		{ "doc","application/msword" },
		{ "docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
		{ "eot","application/vnd.ms-fontobject" },
		{ "epub","application/epub+zip" },
		{ "gif","image/gif" },
		{ "htm","text/html" },
		{ "html","text/html" },
		{ "ico","image/x-icon" },
		{ "ics","text/calendar" },
		{ "jar","application/java-archive" },
		{ "jpeg", "image/jpeg" },
		{ "jpg","image/jpeg" },
		{ "js","application/javascript" },
		{ "json","application/json" },
		{ "mid", "audio/midi" },
		{ "midi","audio/midi" },
		{ "mpeg","video/mpeg" },
		{ "mpkg","application/vnd.apple.installer+xml" },
		{ "odp","application/vnd.oasis.opendocument.presentation" },
		{ "ods","application/vnd.oasis.opendocument.spreadsheet" },
		{ "odt","application/vnd.oasis.opendocument.text" },
		{ "oga","audio/ogg" },
		{ "ogv","video/ogg" },
		{ "ogx","application/ogg" },
		{ "otf","font/otf" },
		{ "png","image/png" },
		{ "pdf","application/pdf" },
		{ "ppt","application/vnd.ms-powerpoint" },
		{ "pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation" },
		{ "rar","application/x-rar-compressed" },
		{ "rtf","application/rtf" },
		{ "sh","application/x-sh" },
		{ "svg","image/svg+xml" },
		{ "swf","application/x-shockwave-flash" },
		{ "tar","application/x-tar" },
		{ "tif","image/tiff" },
		{ "tiff", "image/tiff"},
		{ "ts","application/typescript" },
		{ "ttf","font/ttf" },
		{ "vsd","application/vnd.visio" },
		{ "wav","audio/x-wav" },
		{ "weba","audio/webm" },
		{ "webm","video/webm" },
		{ "webp","image/webp" },
		{ "woff","font/woff" },
		{ "woff2","font/woff2" },
		{ "xhtml","application/xhtml+xml" },
		{ "xls","application/vnd.ms-excel" },
		{ "xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
		{ "xml","application/xml" },
		{ "xul","application/vnd.mozilla.xul+xml" },
		{ "zip","application/zip" },
		{ "3gp","video/3gpp" },
		{ "3g2","video/3gpp2" },
		{ "7z","application/x-7z-compressed" },
	};

	const size_t i = path.find_last_of(".");
	if (i != std::string::npos) {
		const std::string extension = path.substr(i + 1);
		auto it = std::find_if(matcher.begin(), matcher.end(), [&](const std::pair<const char*, const char*> pair) { return pair.first == extension; });
		if (it != matcher.end())
			return it->second;
	}
	return ""; // if the path has no "." or has unknow extension we can not find the correct mime as well.
};

