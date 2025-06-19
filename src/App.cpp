#include "src/controller/StaticFileHandler.h"
#include "src/controller/NetworkDataHandler.h"
#include "src/AppComponent.h"
#include "config.h"

#include <oatpp/network/Server.hpp>

#include <iostream>
#include <cxxopts.hpp>
#include <iostream>

std::string g_argument_resource_path = "";
std::string g_argument_doc_path = "";
void run() {

	/* Register Components in scope of run() method */
	AppComponent components;

	//Create Rooter and add componant
	OATPP_COMPONENT(std::shared_ptr<oatpp::web::server::HttpRouter>, router);
	router->addController(std::make_shared<NetworkDataHandler>());
	router->addController(std::make_shared<StaticFilesManager>());

	// Create the server
	OATPP_COMPONENT(std::shared_ptr<oatpp::network::ConnectionHandler>, connectionHandler);
	OATPP_COMPONENT(std::shared_ptr<oatpp::network::ServerConnectionProvider>, connectionProvider);
	oatpp::network::Server server(connectionProvider, connectionHandler);

	/* Print info about server port */
	OATPP_LOGi("[Info]", "Server running on port {}", connectionProvider->getProperty("port").toString());

	server.run();

}


int main(int argc, const char * argv[]) {

	cxxopts::Options options("WebsiteR2R", "Backend server");

	options.add_options()
	("r,path-to-resource", "Path to resource folder", cxxopts::value<std::string>())
	("d,path-to-doc",      "Path to documentation folder", cxxopts::value<std::string>())
	("h,help",             "Print help");

	auto result = options.parse(argc, argv);

	if (result.count("help")) {
		std::cout << options.help() << "\n";
		return 0;
	}

	if (result.count("path-to-resource")) 
		g_argument_resource_path = result["path-to-resource"].as<std::string>();

	if (result.count("path-to-doc"))
		g_argument_doc_path = result["path-to-doc"].as<std::string>();

	oatpp::Environment::init();

	run();

	/* Print how much objects were created during app running, and what have left-probably leaked */
	/* Disable object counting for release builds using '-D OATPP_DISABLE_ENV_OBJECT_COUNTERS' flag for better performance */
	std::cout << "\nEnvironment:\n";
	std::cout << "objectsCount = " << oatpp::Environment::getObjectsCount() << "\n";
	std::cout << "objectsCreated = " << oatpp::Environment::getObjectsCreated() << "\n\n";

	oatpp::Environment::destroy();

	return 0;
}
