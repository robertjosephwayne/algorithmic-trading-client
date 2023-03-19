module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/charts',
                permanent: true,
            },
        ];
    },
};
