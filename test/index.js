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

    it('returns error message in tact', async () => {

        const server = await internals.prepareServer();
        const res = await server.inject('/throws');

        expect(res.result).to.equal({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'test error'
        });
    });

    it('does not modify non-errors', async () => {

        const server = await internals.prepareServer();
        const res = await server.inject('/success');

        expect(res.result).to.equal('success');
    });
});


internals.prepareServer = async function () {

    const server = Hapi.server();

    await server.register({
        plugin: Developer
    });

    server.route([
        {
            method: 'GET',
            path: '/success',
            handler: (request) => {

                return 'success';
            }
        },
        {
            method: 'GET',
            path: '/throws',
            handler: (request) => {

                throw new Error('test error');
            }
        }
    ]);

    return server;
};
