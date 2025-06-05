cmake_minimum_required(VERSION 3.20)


#-------------------------
# add resources by default
option(DOWNLOAD_RESOURCES "Download resources if not present" ON)
set(RESOURCES_DIR "${CMAKE_CURRENT_SOURCE_DIR}/resources/resources-config")
file(GLOB RESOURCE_CONTENTS "${RESOURCES_DIR}/*")
if(DOWNLOAD_RESOURCES AND NOT RESOURCE_CONTENTS)
	message(STATUS "Resources config directory is empty or missing. Will attempt to download data.")
	file(MAKE_DIRECTORY "${RESOURCES_DIR}")
	add_custom_target(clone_resources ALL
		COMMAND ${CMAKE_COMMAND} -E echo "Cloning resources into ${RESOURCES_DIR}"
		COMMAND ${CMAKE_COMMAND} -E remove_directory "${RESOURCES_DIR}" # In case it's just an empty folder
		COMMAND git clone https://github.com/leocity207/Mapdiver_NeoBretagne_Data.git "${RESOURCES_DIR}"
		WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
		COMMENT "Cloning Mapdiver_NeoBretagne_Data into resources/resources-config"
	)
else()
	message(STATUS "Skipping resource download. Either disabled or resources already present.")
endif()

#-----------------
# Creating Project
set(project_name WebsiteR2R)
project(${project_name} VERSION 1.0)

#---------------------------------------
#get the current commit hash for version
execute_process(
	COMMAND git rev-parse HEAD
	WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
	OUTPUT_VARIABLE GIT_COMMIT_HASH
	OUTPUT_STRIP_TRAILING_WHITESPACE
)

#-----------------------
#setting the config file
get_filename_component(STATIC_CURRENT_DIR ./ ABSOLUTE)
configure_file(${PROJECT_SOURCE_DIR}/src/config.h.in ${PROJECT_SOURCE_DIR}/src/config.h)



set(CMAKE_CXX_STANDARD 20)
include_directories(${PROJECT_SOURCE_DIR})

FILE(GLOB CONTROLER_SRC src/controller/*.cpp)
FILE(GLOB CONTROLER_H src/controller/*.h*)
FILE(GLOB DTO_H src/dto/*.h*)
FILE(GLOB DTO_SRC src/dto/*.cpp*)
FILE(GLOB APP_SRC src/*.cpp*)
FILE(GLOB APP_H src/*.h*)

add_library(${project_name}-lib
    ${DTO_H}
    ${APP_H}
    ${CONTROLER_H}
    ${CONTROLER_SRC}
    ${DTO_SRC}
)

## link libs

add_subdirectory(externals/oatpp)


target_link_libraries(${project_name}-lib
        PUBLIC oatpp
        PUBLIC oatpp-test
)

target_include_directories(${project_name}-lib PUBLIC src)

## add executables

add_executable(${project_name}-exe
       ${APP_SRC}
)
target_link_libraries(${project_name}-exe ${project_name}-lib)
add_dependencies(${project_name}-exe ${project_name}-lib)

FILE(GLOB TEST_APP_H test/app/*.h*)
FILE(GLOB TEST_H test/*.h*)
FILE(GLOB TEST_SRC test/*.cpp)

add_executable(${project_name}-test
        ${TEST_APP_H}
        ${TEST_APP_H}
        ${TEST_SRC}
)

target_link_libraries(${project_name}-test ${project_name}-lib)
add_dependencies(${project_name}-test ${project_name}-lib)

set_target_properties(${project_name}-lib ${project_name}-exe ${project_name}-test PROPERTIES
        CXX_STANDARD 20
        CXX_EXTENSIONS OFF
        CXX_STANDARD_REQUIRED ON
)

enable_testing()
add_test(project-tests ${project_name}-test)
