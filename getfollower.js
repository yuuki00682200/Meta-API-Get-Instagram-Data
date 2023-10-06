function writeInstagramFollowerCountToSheet() {
    // Instagram APIのエンドポイントと必要な情報を設定
    var apiUrl = 'https://graph.facebook.com/{api-version}/{ig-user-id}?fields=followers_count&access_token={access-token}';
    var apiVersion = 'v18.0'; // 使用するAPIのバージョン
    var igUserId = ''; // InstagramユーザーのID
  
    // アクセストークンを設定
    var accessToken = '';
  
    // APIエンドポイントを構築
    var apiUrlWithParams = apiUrl
      .replace('{api-version}', apiVersion)
      .replace('{ig-user-id}', igUserId)
      .replace('{access-token}', accessToken);
  
    try {
      // Instagram APIにGETリクエストを送信
      var response = UrlFetchApp.fetch(apiUrlWithParams);
  
      // レスポンスをJSON形式でパース
      var responseData = JSON.parse(response.getContentText());
  
      // フォロワー数を取得
      var followerCount = responseData.followers_count;

  
      // ログにフォロワー数を出力
      Logger.log('Instagramフォロワー数: ' + followerCount);
    } catch (e) {
      // エラーハンドリング
      Logger.log('エラーが発生しました: ' + e.toString());
    }
  }
  