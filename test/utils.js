const brokenCapabilities = {
    'browserName': 'googlechrome',
    'platformName': 'macOS 11',
    'browserVersion': 'latest',
    'sauce:options': {
        'name': 'Broken Google Search'

    }
};

const workingCapabilities = {
    'browserName': 'googlechrome',
    'platformName': 'macOS 11',
    'browserVersion': 'latest',
    'sauce:options': {
        'name': 'Guinea-Pig Sauce',
        'passed': true,
        'tags': ["workingSauce"],
    }
};

const oddEvenCaps = {
    'browserName': 'googlechrome',
    'platformName': 'windows 10',
    'browserVersion': 'latest',
    'sauce:options': {
        'name': 'bonus: odd & even'
    }
}

const exceptionCaps = {
    'browserName': 'googlechrome',
    'platformName': 'windows 10',
    'browserVersion': 'latest',
    'sauce:options': {
        'name': 'bonus: exception handling',
        'passed': false,
    }
}

exports.brokenCapabilities = brokenCapabilities
exports.workingCapabilities = workingCapabilities
exports.oddEvenCaps = oddEvenCaps
exports.exceptionCaps = exceptionCaps