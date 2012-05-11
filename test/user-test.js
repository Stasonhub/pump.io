// user-test.js
//
// Test the user module
//
// Copyright 2012, StatusNet Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var assert = require('assert'),
    vows = require('vows'),
    databank = require('databank'),
    modelBatch = require('./lib/model').modelBatch,
    Databank = databank.Databank,
    DatabankObject = databank.DatabankObject;

var suite = vows.describe('user module interface');

var testSchema = {
    'pkey': 'nickname',
    'fields': ['passwordHash',
	       'published',
	       'updated',
	       'profile'],
    'indices': ['profile.id']};

var testData = {
    'create': {
        nickname: "evan",
        password: "trustno1",
        profile: {
            displayName: "Evan Prodromou"
        }
    },
    'update': {
        password: "correct horse battery staple" // the most secure password! see http://xkcd.com/936/
    }
};

// XXX: hack hack hack
// modelBatch hard-codes ActivityObject-style

var mb = modelBatch('user', 'User', testSchema, testData);

mb['When we require the user module']
  ['and we get its User class export']
  ['and we create an user instance']
  ['auto-generated fields are there'] = function(err, created) {
      assert.isString(created.passwordHash);
      assert.isString(created.published);
      assert.isString(created.updated);
};

suite.addBatch(mb);

suite.export(module);
