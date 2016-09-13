(function() {
    'use strict';

    angular
        .module('classroomApp')
        .factory('projectFactory', projectFactory);

    //injecting parameters to the factory
    projectFactory.$inject = ['$http', '$q', 'toastr'];

    function projectFactory($http, $q, toastr) {
        var service = {
            getProjects: getProjects,
            getProjectById: getProjectById,
            addProject: addProject,
            deleteProject: deleteProject,
            editProject: editProject
        };

        return service;

        function getProjects() {
            var deferred = $q.defer();

            //communicating with the api
            $http.get('http://localhost:60926/api/projects').then(
                function(response) {
                    deferred.resolve(response.data);
                },
                function(err) {
                    toastr.error('Oh no! An error has occurred. Please try again.');
                    deferred.reject(err);
                }
            );

            //returns the array
            return deferred.promise;
        }


        function getProjectById(id) {
            var deferred = $q.defer();

            //communicating with the api
            $http.get('http://localhost:60926/api/projects/' + id).then(
                function(response) {
                    deferred.resolve(response.data);
                },
                function(err) {
                    toastr.error('Oh no! An error has occurred. Please try again.');
                    deferred.reject(err);
                }
            );

            //returns the array
            return deferred.promise;
        }

        function addProject(project) {
            var deferred = $q.defer();

            //communicating with the api
            $http.post('http://localhost:60926/api/projects', project).then(
                function(response) {
                    toastr.success('The project was successfully added to the database.');
                    deferred.resolve(response.data);
                },
                function(err) {
                    toastr.error('Oh no! An error has occurred. Please try again.');
                    deferred.reject(err);
                }
            );

            //returns the array
            return deferred.promise;
        }

        function editProject(project) {
            var deferred = $q.defer();

            //communicating with the api
            $http.put('http://localhost:60926/api/projects' + '/' + project.projectId, project).then(
                function(response) {
                    toastr.success("This project's information has been successfully edited.");
                    deferred.resolve(response.data);
                },
                function(err) {
                    toastr.error('Oh no! An error has occurred. Please try again.');
                    deferred.reject(err);
                }
            );

            //returns the array
            return deferred.promise;
        }

        function deleteProject(project) {
            var deferred = $q.defer();

            //communicating with the api
            $http.delete('http://localhost:60926/api/projects' + '/' + project.projectId).then(
                function(response) {
                    toastr.success('This project was successfully removed from the database.');
                    deferred.resolve(response.data);
                },
                function(err) {
                    toastr.error('Oh no! An error has occurred. Please try again.');
                    deferred.reject(err);
                }
            );

            //returns the array
            return deferred.promise;
        }

    }
})();
