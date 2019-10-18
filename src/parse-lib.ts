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

/**
 * 
 * @param _file 
 */
async function uploadWithFile(_file: File) {
    try {
        let f = new Parse.File("file" + Date.now(), "");
        let fileObject = await f.save();
        let entry = new Parse.Object("Thing");
        entry.set("file", fileObject);
        entry.set("name", "test with a file objec");
        let result = await entry.save();
        return result
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