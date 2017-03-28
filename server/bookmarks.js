const bookmarks = function bookmarks(queryFunction) {
  const saveBookmark = (userID, url, title, success) => {
    console.log("Saving bookmark."); // NOTE: Debug.
      queryFunction(`INSERT INTO bookmarks (user_id, url, title) VALUES ('${userID}', '${url}', '${title}') RETURNING (url)`, success);
  };

  const deleteBookmark = (userID, success) => {
    console.log('Deleting bookmark.'); // NOTE: Debug.
    queryFunction(`SELECT url, title FROM users RIGHT JOIN bookmarks ON users.user_id = bookmarks.user_id WHERE users.user_id = '${userID}'`, success)
  };

  const getList = (userID, success) => {
    queryFunction(`SELECT url, title FROM users RIGHT JOIN bookmarks ON users.user_id = bookmarks.user_id WHERE users.user_id = '${userID}'`, success)
  };


  return {
    saveBookmark: saveBookmark,
    deleteBookmark: deleteBookmark,
    getList: getList,
  };
};

module.exports = bookmarks;
