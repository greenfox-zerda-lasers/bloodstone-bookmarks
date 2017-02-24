const bookmarks = function bookmarks(queryFunction) {
  const saveBookmark = (userID, url, title, success) => {
    // ID, user id, url, title
    // usr ID?
    queryFunction(`INSERT INTO bookmarks (user_id, url, title) VALUES ('${userID}', '${url}', '${title}') RETURNING (url)`, success);
  };

  const getList = (userID, success) => {
    queryFunction(`SELECT url, title FROM users RIGHT JOIN bookmarks ON users.user_id = bookmarks.user_id WHERE users.user_id = '${userID}'`, success)
  }

  return {
    saveBookmark: saveBookmark,
    getList: getList,
  };
};

module.exports = bookmarks;
