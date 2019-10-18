import Parse from "parse";

async function doLogin(email: string, password: string) {
    try {
        let u = await Parse.User.logIn(email, password);
        if (!u.isValid) {
            return u
        }
    } catch (e) {
        throw e;
    }
}

async function doLogout() {
    try {
        let u = await Parse.User.logOut();
        return u
    } catch (e) {
        throw e;
    }
}


async function loadObjects(objectType: string) {
    try {
        const OT = Parse.Object.extend(objectType);
        const query = new Parse.Query(OT);

        // Sorts the results in ascending order by the likes field
        query.ascending("createdAt");

        let v = await query.find()
        return v;
    } catch (e) {
        throw e;
    }
}

export {
    doLogin,
    doLogout,
    loadObjects
}