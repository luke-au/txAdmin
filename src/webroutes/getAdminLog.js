//Requires
const { dir, log, logOk, logWarn, logError, cleanTerminal } = require('../extras/console');
const webUtils = require('./webUtils.js');
const context = 'WebServer:getAdminLog';


/**
 * Returns the output page containing the admin log.
 * @param {object} res
 * @param {object} req
 */
module.exports = async function action(res, req) {
    let log = await globals.logger.get();
    let out = await webUtils.renderMasterView('adminLog', {headerTitle: 'Admin Log', log: log});
    return res.send(out);
};
