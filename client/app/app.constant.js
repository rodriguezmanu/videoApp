/* jslint camelcase: false */
/*jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .constant('constantValues', constantValues);

    function constantValues() {
        return {
            LOCALES: {
                locales: {
                    pt: 'Portugues',
                    en_US: 'English'
                },
                preferredLocale: 'en_US'
            },
            siteKeyCaptcha: '6LcxVxUTAAAAAImxveJW_PAVi3JI9INmq5M4bMRk',
            googleBrowserKey: 'AIzaSyAWiJeWWYKuL95aXyzOuOC47pyDhkQ32PU',
            roles: {
                flixerAdmin: 'flixer-admin',
                flixer: 'flixer',
                businessOwner: 'business-owner',
                regularUser: 'user'
            },
            emails: {
                contactUsGuest: '0001',
                contactUsSupport: '0002'
            },
            status: {
                pending: 'pending',
                accepted: 'accepted',
                rejected: 'rejected',
                reApply: 'reapply'
            },

            statusJobs: {
                canceled: 'canceled',
                expired: 'expired',
                assigned: 'assigned',
                internalValidation: 'internal_validation',
                thirdPartyValidation: 'third_party_validation',
                redo: 'redo',
                completed: 'completed',
                active: 'active'
            },
            jobActions: {
                assign: 'assign',
                unassign: 'unassign',
                cancel: 'cancel',
                redo: 'redo',
                externalValidation: 'external-validation',
                upload: 'upload'
            },
            formats: {
                video: ['mp4', 'flv', 'mov', 'avi', 'wmv', 'mpg', 'MP4', 'FLV', 'MOV', 'AVI', 'WMV', 'MPG'],
                photo: ['png', 'jpg', 'bmp', 'jpeg', 'gif', 'PNG', 'JPG', 'BMP', 'JPEG', 'GIF']
            }
        };
    }
})();
