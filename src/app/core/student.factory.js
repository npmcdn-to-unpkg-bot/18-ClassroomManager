(function() {
    'use strict';

    angular
        .module('classroomApp')
        .factory('studentFactory', studentFactory);

    //injecting parameters to the factory
    studentFactory.$inject = ['$http', '$q', 'toastr'];

    function studentFactory($http, $q, toastr) {
        var service = {
            getStudents: getStudents,
            getStudentById: getStudentById,
            addStudent: addStudent,
            deleteStudent: deleteStudent,
            editStudent: editStudent
        };

        return service;

        function getStudents() {
            var deferred = $q.defer();

            //communicating with the api
            $http.get('http://localhost:60926/api/students').then(
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

        function getStudentById(id) {
            var deferred = $q.defer();

            //communicating with the api
            $http.get('http://localhost:60926/api/students/' + id).then(
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

        function addStudent(student) {
            var deferred = $q.defer();

            //communicating with the api
            $http.post('http://localhost:60926/api/students', student).then(
                function(response) {
                    toastr.success('The student was successfully added to the database.');
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

        function editStudent(student) {
            var deferred = $q.defer();

            //communicating with the api
            $http.put('http://localhost:60926/api/students' + '/' + student.studentId, student).then(
                function(response) {
                    toastr.success("This student's information has been successfully edited.");
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

        function deleteStudent(student) {
            var deferred = $q.defer();

            //communicating with the api
            $http.delete('http://localhost:60926/api/students' + '/' + student.studentId).then(
                function(response) {
                    toastr.success('This student was successfully removed from the database. Goodbye!');
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
