const bookmarks = function bookmarks(queryFunction) {

  const saveBookmark = (userID, url, title, success) => {
    // ID, user id, url, title
    // usr ID?
    queryFunction(`INSERT INTO bookmarks (user_id, url, title) VALUES ('${userID}', '${url}', '${title}') RETURNING (url)`, success);
  };

  const getList = (user, success) => {
    queryFunction(`SELECT url, title FROM  users, bookmarks WHERE EMAIL = '${user}'`, success)
  }

  return {
    saveBookmark: saveBookmark,
    getList: getList,
  };
};

module.exports = bookmarks;
