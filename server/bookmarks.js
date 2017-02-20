const bookmarks = function bookmarks(queryFunction) {

  const saveBookmark = (url, title, success) => {
    // ID, user id, url, title
    queryFunction(`INSERT INTO bookmarks (user_id, url, title) VALUES ('${user_id}', '${url}', '${title}') RETURNING (url)`, success);
  };

  return {
    saveBookmark: saveBookmark,
  };
};

module.exports = bookmarks;
