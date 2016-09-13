//search controller

(function() {
    'use strict';

    angular
        .module('classroomApp')
        .controller('ProjectGridController', ProjectGridController);

    //injecting movie factory to search controller
    ProjectGridController.$inject = ['projectFactory', '$ngBootbox'];

    function ProjectGridController(projectFactory, $ngBootbox) {
        var vm = this;

        activate();

        function activate() {
            projectFactory.getProjects().then(
                function(projects) {
                    vm.projects = projects;
                },
                function(error) {}
            );
        }



        vm.addProject = function() {
            vm.newProject = {
                "name": vm.name,
                "description": vm.description
            };
            vm.saving = true;
            projectFactory.addProject(vm.newProject).then(
                function() {
                    vm.saving = false;
                    vm.projects.push(vm.newProject);
                    vm.name = null;
                    vm.description = null;
                },
                function() {}
            );
        };


        vm.editProject = function(project) {
            projectFactory.editProject(project).then(
                function() {},
                function() {}
            );

        };


        vm.deleteProject = function(project) {
            $ngBootbox.confirm('Are you sure you want to delete this project?')
                .then(function() {
                    var index = vm.projects.indexOf(project);
                    projectFactory.deleteProject(project).then(
                        function(projects) {
                            vm.projects.splice(index, 1);
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
