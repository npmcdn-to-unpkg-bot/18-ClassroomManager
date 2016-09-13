(function() {
    'use strict';

    angular
        .module('classroomApp')
        .factory('assignmentFactory', assignmentFactory);

    //injecting parameters to the factory
    assignmentFactory.$inject = ['$http', '$q', 'toastr'];

    function assignmentFactory($http, $q, toastr) {
        var service = {
            addAssignment: addAssignment,
            getAssignments: getAssignments,
            deleteAssignment: deleteAssignment,
            editAssignment: editAssignment
        };

        return service;

        function getAssignments() {
            var deferred = $q.defer();

            //communicating with the api
            $http.get('http://localhost:60926/api/assignments').then(
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

        function addAssignment(assignment) {
            var deferred = $q.defer();

            //communicating with the api
            $http.post('http://localhost:60926/api/assignments', assignment).then(
                function(response) {
                    toastr.success('The assignment was successfully added.');
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

        function editAssignment(student, project, assignment) {
            var deferred = $q.defer();

            //communicating with the api
            $http.put('http://localhost:60926/api/assignments' + '/' + student + '/' + project, assignment).then(
                function(response) {
                    toastr.success("The grade was saved successfully.");
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

        function deleteAssignment(studentId, projectId) {
            var deferred = $q.defer();

            //communicating with the api
            $http.delete('http://localhost:60926/api/assignments' + '/' + studentId + '/' + projectId).then(
                function(response) {
                    toastr.success('The assignment was successfully deleted.');
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
