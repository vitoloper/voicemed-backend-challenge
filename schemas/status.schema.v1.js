// Status routes schemas

const getStatus = {
    description: 'Get database connection status',
    tags: ['db']
};

const headStatus = {
    description: 'Get database connection status',
    tags: ['db']
};

module.exports = {
    getStatus,
    headStatus
};