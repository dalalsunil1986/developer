'use strict';

const Developer = require('../');
const Code = require('code');
const Hapi = require('hapi');
const Lab = require('lab');


const internals = {};


const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;


describe('Developer', () => {

    it('exposes a plugin', async () => {

        expect(Developer.plugin).to.exist();

        const server = Hapi.server();
        await server.register(Developer);
    });
});
