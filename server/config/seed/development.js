/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
/*jslint maxlen: 5000 */

'use strict';

var User = require('../../components/models/user.model');
var async = require('async');

console.log('Seeding development env');

async.waterfall([
        // cleanning users
        function(callback) {
            User.find({}).remove(function(err) {
                if (err) {
                    return callback(new Error('error cleanning users'));
                }
                console.log('finished cleanning users');
                callback(null);
            });
        },
        // creating flixer pending
        function(callback) {
            User.create({
                    contact: {
                        firstName: 'Ian',
                        lastName: 'Hodges',
                        email: 'ian.hodges.townflix+development@gmail.com',
                        phone: '+54 9 351 3694052'
                    },
                    email: 'ian.hodges.townflix+development@gmail.com',
                    password: 'townflix',
                    address: {
                        street: '123 Huntington Ave',
                        city: 'Boston',
                        state: 'Massachusetts',
                        zip: '02199',
                        country: 'USA',
                        full: '123 Huntington Ave, Boston, MA 02199, USA',
                        timezone: 'America/Los_Angeles'
                    },
                    profilePicture: {
                        entryId: '1_c6my4o1n',
                        type: 'photo',
                        thumbnail: 'http://www.kaltura.com/p/931471/thumbnail/entry_id/1_c6my4o1n'
                    },
                    role: 'flixer'
                },
                function(err, user) {
                    console.log('creating user id: ' + user.id);
                    callback(null);
                }
            );
        },
        // creating flixer accepted
        function(callback) {
            User.create({
                    contact: {
                        firstName: 'Michelle',
                        lastName: 'Cornish',
                        email: 'michelle.cornish.townflix+development@gmail.com',
                        phone: '+54 9 351 3694052'
                    },
                    email: 'michelle.cornish.townflix+development@gmail.com',
                    password: 'townflix',
                    address: {
                        street: '123 Huntington Ave',
                        city: 'Boston',
                        state: 'Massachusetts',
                        zip: '02199',
                        country: 'USA',
                        full: '123 Huntington Ave, Boston, MA 02199, USA',
                        timezone: 'America/Los_Angeles'
                    },
                    role: 'flixer',
                    profilePicture: {
                        entryId: '1_5due6a04',
                        type: 'photo',
                        thumbnail: 'http://www.kaltura.com/p/931471/thumbnail/entry_id/1_5due6a04'
                    }
                },
                function(err, user) {
                    console.log('creating user id: ' + user.id);
                    callback(null);
                }
            );
        },
        // creating flixer rejected
        function(callback) {
            User.create({
                    contact: {
                        firstName: 'Michael',
                        lastName: 'Greene',
                        email: 'michael.greene.townflix+development@gmail.com',
                        phone: '+54 9 351 3694052'
                    },
                    email: 'michael.greene.townflix+development@gmail.com',
                    password: 'townflix',
                    address: {
                        street: '123 Huntington Ave',
                        city: 'Boston',
                        state: 'Massachusetts',
                        zip: '02199',
                        country: 'USA',
                        full: '123 Huntington Ave, Boston, MA 02199, USA',
                        timezone: 'America/Los_Angeles'
                    },
                    profilePicture: {
                        entryId: '1_en5jw1sh',
                        type: 'photo',
                        thumbnail: 'http://www.kaltura.com/p/931471/thumbnail/entry_id/1_en5jw1sh'
                    },
                    role: 'flixer'
                },
                function(err, user) {
                    console.log('creating user id: ' + user.id);
                    callback(null);
                }
            );
        },
        // creating flixer-admin
        function(callback) {
            User.create({
                    contact: {
                        firstName: 'Richard',
                        lastName: 'Martin',
                        email: 'richard.martin.townflix+development@gmail.com',
                        phone: '+54 9 351 3694052'
                    },
                    email: 'richard.martin.townflix+development@gmail.com',
                    password: 'townflix',
                    address: {
                        street: '123 Huntington Ave',
                        city: 'Boston',
                        state: 'Massachusetts',
                        zip: '02199',
                        country: 'USA',
                        full: '123 Huntington Ave, Boston, MA 02199, USA'
                    },
                    profilePicture: {
                        entryId: '1_d2t9pylx',
                        type: 'photo',
                        thumbnail: 'http://www.kaltura.com/p/931471/thumbnail/entry_id/1_d2t9pylx'
                    },
                    role: 'flixer-admin'
                },
                function(err, user) {
                    console.log('creating user id: ' + user.id);
                    callback(null);
                }
            );
        },
        // creating owner
        function(callback) {
            User.create({
                    contact: {
                        firstName: 'Brandon',
                        lastName: 'Simpson',
                        email: 'brandon.simpson.townflix+development@gmail.com',
                        phone: '+54 9 351 3694052'
                    },
                    email: 'brandon.simpson.townflix+development@gmail.com',
                    password: 'townflix',
                    address: {
                        street: '123 Huntington Ave',
                        city: 'Boston',
                        state: 'Massachusetts',
                        zip: '02199',
                        country: 'USA',
                        full: '123 Huntington Ave, Boston, MA 02199, USA'
                    },
                    profilePicture: {
                        entryId: '1_q48onyag',
                        type: 'photo',
                        thumbnail: 'http://www.kaltura.com/p/931471/thumbnail/entry_id/1_q48onyag'
                    },
                    role: 'owner'
                },
                function(err, user) {
                    console.log('creating user id: ' + user.id);
                    callback(null);
                }
            );
        }
    ],
    function(err) {
        if (err) {
            console.log('Error seeding the database: ' + err.message);
        }
    });
