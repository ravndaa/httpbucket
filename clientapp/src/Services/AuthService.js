import jwt_decode from 'jwt-decode';

class AuthService {

    _isAuth = false;
    //test
    _callbacks = [];
    _nextSubscriptionId = 0;

    subscribe(callback) {
        this._callbacks.push({ callback, subscription: this._nextSubscriptionId++ });
        return this._nextSubscriptionId - 1;
    }
    unsubscribe(subscriptionId) {
        const subscriptionIndex = this._callbacks
            .map((element, index) => element.subscription === subscriptionId ? { found: true, index } : { found: false })
            .filter(element => element.found === true);
        if (subscriptionIndex.length !== 1) {
            throw new Error(`Found an invalid number of subscriptions ${subscriptionIndex.length}`);
        }

        this._callbacks = this._callbacks.splice(subscriptionIndex[0].index, 1);
    }

    notifySubscribers() {
        for (let i = 0; i < this._callbacks.length; i++) {
            const callback = this._callbacks[i].callback;
            callback();
        }
    }

    //Test
    
    
    
    setIsAuth = () => {
        this._isAuth = true;
        this.notifySubscribers()
    }

    setIsNoAuth = () => {
        this._isAuth = false;
        this.notifySubscribers()
    }

    IsAuthenticated = () => {return this._isAuth};

    getToken = () => {
        try {
            return localStorage.getItem("token");
        } catch (error) {
            return null;
        }

    }

    decodeToken = (token) => {
        try {
            const decoded = jwt_decode(token);
            return decoded;
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    LogOut = () => {
        try {
            localStorage.removeItem("token");
            this.setIsNoAuth();
            return true;
        } catch (error) {
            return false;
        }
    }
    Login = () => {
        
    }
    isLoggedIn = () => {
        try {
            const token = this.getToken();
            if (token != null) {
                const jwt = this.decodeToken(token);
                if (jwt !== null) {
                    const expires = jwt.exp;
                    var d = new Date();
                    var now = Math.round(d.getTime() / 1000)
                    if(expires > now) {
                        this.setIsAuth();
                        return true
                    }
                }

                
            }
            return false;
        } catch (error) {
            console.log(error)
            return false;
        }

    }

}

const authService = new AuthService();
export default authService;