//search controller

(function() {
    'use strict';

    angular
        .module('classroomApp')
        .controller('StudentGridController', StudentGridController);

    //injecting movie factory to search controller
    StudentGridController.$inject = ['studentFactory', '$ngBootbox'];

    function StudentGridController(studentFactory, $ngBootbox) {
        var vm = this;

        activateStudents();

        function activateStudents() {
            studentFactory.getStudents().then(
                function(students) {
                    vm.students = students;
                },
                function(error) {}
            );
        }


        vm.addStudent = function() {
            vm.newStudent = {
                "firstName": vm.firstName,
                "lastName": vm.lastName,
                "emailAddress": vm.emailAddress,
                "telephone": vm.telephone
            };
            vm.saving = true;
            studentFactory.addStudent(vm.newStudent).then(
                function() {
                    vm.saving = false;
                    vm.students.push(vm.newStudent);
                    vm.firstName = null;
                    vm.lastName = null;
                    vm.emailAddress = null;
                    vm.telephone = null;
                },
                function() {}
            );
        };


        vm.deleteStudent = function(student) {
            $ngBootbox.confirm("Are you sure you want to delete this student?")
                .then(function() {
                    var index = vm.students.indexOf(student);
                    studentFactory.deleteStudent(student).then(
                        function(students) {
                            vm.students.splice(index, 1);
                        },
                        function(error) {}
                    );
                    console.log('Confirmed!');
                }, function() {
                    console.log('Confirm dismissed!');
                });

        };




    }

})();
