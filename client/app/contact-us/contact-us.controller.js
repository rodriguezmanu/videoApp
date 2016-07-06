(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('ContactUsCtrl', ContactUsCtrl);

    ContactUsCtrl.$inject = ['mailService', '$state', '$timeout', 'constantValues'];

    /* @ngInject */
    function ContactUsCtrl(mailService, $state, $timeout, constantValues) {
        var vm = this;
        vm.message = null;
        vm.errors = {};
        vm.sendMessage = sendMessage;
        vm.disabled = false;

        function sendMessage() {
            vm.submitted = true;

            if (vm.form.$valid) {
                vm.disabled = true;
                vm.contact.template = constantValues().emails.contactUsGuest;
                vm.contact.emailOpts = {
                    name: vm.contact.name,
                    email: vm.contact.email
                };
                //Sending email to the support team
                mailService.sendMail(vm.contact)
                    .then(function(response) {
                        vm.message = 'contactUs.error.emailSent';
                        vm.contact.template = constantValues().emails.contactUsSupport;
                        vm.contact.emailOpts = {
                            name: vm.contact.name,
                            email: vm.contact.email,
                            message: vm.contact.message
                        };
                        //Sending email to the guest
                        mailService.sendMail(vm.contact)
                            .then(function(response) {
                                vm.message = 'contactUs.error.emailSent';
                                vm.errors.other = '';
                                $timeout(function() {
                                    $state.go('root.home');
                                }, 3000);
                            })
                            .catch(function(err) {
                                vm.errors.other = 'contactUs.error.emailNotSend';
                                vm.message = null;
                                vm.disabled = false;
                            });
                    })
                    .catch(function(err) {
                        vm.errors.other = 'contactUs.error.emailNotSend';
                        vm.message = null;
                        vm.disabled = false;
                    });
            }
        }
    }
})();
