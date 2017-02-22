const bookmarks = function bookmarks(queryFunction) {

  const saveBookmark = (userID, url, title, success) => {
    // ID, user id, url, title
    // usr ID?
    queryFunction(`INSERT INTO bookmarks (userID, url, title) VALUES ('${userID}', '${url}', '${title}') RETURNING (url)`, success);
  };

  return {
    saveBookmark: saveBookmark,
  };
};

module.exports = bookmarks;
