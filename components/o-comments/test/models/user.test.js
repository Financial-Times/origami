import User from '../../src/js/models/user';

describe('User', () => {
    let user;

    beforeEach(() => {
        user = new User();
    });

    test('should initialize with default values', () => {
        expect(user.isSubscribed).toBe(false);
        expect(user.isTrialist).toBe(false);
        expect(user.isRegistered).toBe(false);
    });

    test('setUser should update isSubscribed, isTrialist, and isRegistered', () => {
        const props = { isSubscribed: true, isTrialist: true, isRegistered: true };
        user.setUser(props);
        expect(user.isSubscribed).toBe(true);
        expect(user.isTrialist).toBe(true);
        expect(user.isRegistered).toBe(true);
    });

    test('setUser with missing properties should default to false', () => {
        user.setUser({});
        expect(user.isSubscribed).toBe(false);
        expect(user.isTrialist).toBe(false);
        expect(user.isRegistered).toBe(false);
    });

    describe('getNonSubscribersAccessLevel', () => {
        test('returns "trialist" when user is on trial', () => {
            user.setUser({ isTrialist: true, isRegistered: true });
            expect(user.getNonSubscribersAccessLevel()).toBe('trialist');
        });

        test('returns "registered" when user is registered but not a trialist', () => {
            user.setUser({ isTrialist: false, isRegistered: true });
            expect(user.getNonSubscribersAccessLevel()).toBe('registered');
        });

        test('returns "anonymous" when user is neither trialist nor registered', () => {
            user.setUser({ isTrialist: false, isRegistered: false });
            expect(user.getNonSubscribersAccessLevel()).toBe('anonymous');
        });
    });

    describe('isSubscribed getter', () => {
        test('returns false by default', () => {
            expect(user.isSubscribed()).toBe(false);
        });

        test('returns true after setting isSubscribed to true', () => {
            user.setUser({ isSubscribed: true });
            expect(user.isSubscribed()).toBe(true);
        });
    });
});
