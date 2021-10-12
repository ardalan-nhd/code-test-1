const API = {
    baseURL: 'https://api.cbex.ir',
    endpoints: {
        'check authorization': {
            route: '/api/check-auth/admin',
            method: 'GET',
            description: 'If user was logged in, you will take a 200 response. otherwise you will take a 401 response'
        },
        'captcha': {
            route: '/captcha/api/default',
            method: 'GET',
            description: 'image and key of captcha to take from user when they want to login',
            response: {
                img: 'an image in base64 format',
                key: 'a key to send in your login request to API to check if the user eneterred the correct captcha'
            }
        },
        'login': {
            route: '/api/admin/auth/login',
            method: 'POST',
            'required data': {
                credential: '09121234567',
                password: '09121234567',
                captcha_key: 'the captcha key that you received from captcha endpoint',
                captcha: 'user input captcha',
                remember: '0'
            },
            response: {
                token: 'the token that will act as an API key and you will have to send it through all API calls (inside header of all your requests)'
            }
        },
        'wallet addresses index': {
            route: '/api/admin/wallet-addresses',
            method: 'GET',
            description: 'an array of wallet addresses. You have to show them in a data table.',
            'response for each element in array': {
                id: 'wallet address id',
                title: 'wallet address title',
                status: 'wallet address status',
                is_available: 'wallet address available status',
                address: 'wallet address',
                blockchain: 'wallet address blockchain',
            }
        },
        'wallet addresses create': {
            route: '/api/admin/wallet-addresses',
            method: 'POST',
            description: 'You have to create a form and send data through this endpoint to create a new wallet address',
            'required data': {
                title: 'wallet address title',
                status: '1',
                blockchain: 'BTC or ETH or TRX',
                address: `if blockchain == TRX, address = TPjGbG6L7Rp9tsKzJPvtQr65PCnEtys5KU
                            else if blockchain == ETH, address = 0xa33B17d671968eAcc488726554e0065864198486
                            else if blockchain == BTC, address = bc1qtk6l2cnlyax6x2xynp03q6knzz7eqekmaw2wax`
            }
        }
    }
}