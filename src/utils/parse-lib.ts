import Parse from "parse";

export interface IThing {
  name?: string | null;
  fileName?: string | null;
  file?: File | null;
}
/**
 *
 * @param email
 * @param password
 */
const doLogin = async (email: string, password: string) => {
  try {
    let user = await Parse.User.logIn(email, password);
    if (!user.isValid) {
      return user;
    }
  } catch (e) {
    throw e;
  }
};

/**
 *
 * @param _options
 */
async function uploadWithFile(_options: IThing, _callback?: Function) {
  try {
    let f = new Parse.File(_options.fileName as string, _options.file);
    let fileObject = await f.save({ progress: _callback });
    let entry = new Parse.Object("Thing");
    entry.set("asset", fileObject);
    entry.set("name", _options.name);
    let result = await entry.save();
    return result;
  } catch (e) {
    throw e;
  }
}

/**
 *
 */
async function doLogout() {
  try {
    let u = await Parse.User.logOut();
    return u;
  } catch (e) {
    throw e;
  }
}

/**
 *
 * @param objectType
 */
async function loadObjects(objectType: string) {
  try {
    const OT = Parse.Object.extend(objectType);
    const query = new Parse.Query(OT);

    // Sorts the results in ascending order by the likes field
    query.descending("createdAt");

    let queryResults = await query.find();
    return queryResults;
  } catch (e) {
    throw e;
  }
}

export { doLogin, doLogout, loadObjects, uploadWithFile };
