function fetchInstagramInsightsForYesterday() {
  // アクセストークンとIGユーザーIDを設定
  var accessToken = ''; 
  var userId = ''; 
  
  // 取得したい指標を指定 (コンマ区切りで複数指定可能)
  var metrics = 'impressions,reach,profile_views,website_clicks'; 
  
  // 期間を指定 (前日の日付から前日の日付まで)
  var period = 'day'; // 期間はdayに設定
  
  // 前日の日付を生成
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1); // 前日の日付を取得
  var sinceTimestamp = Math.floor(yesterday.getTime() / 1000); // 前日の日付をUnixタイムスタンプに変換
  var untilTimestamp = sinceTimestamp; // untilは同じ日付に設定

   // Instagram APIのエンドポイントを設定。取得する内容を指定
  var apiUrl = 'https://graph.facebook.com/v18.0/' + userId + '/insights' +
               '?metric=' + metrics +
               '&period=' + period +
               '&since=' + sinceTimestamp +
               '&until=' + untilTimestamp +
               '&access_token=' + accessToken;

  // Instagram APIにリクエストを送信する。
  var response = UrlFetchApp.fetch(apiUrl);
  var responseData = JSON.parse(response.getContentText());

  // レスポンスを綺麗に整形してログに出力する。
  var formattedResponse = JSON.stringify(responseData, null, 2); // 2はインデントのスペース数
  Logger.log(formattedResponse);

  // previousページがあるかどうかをチェックする
  if (responseData.paging && responseData.paging.previous) {
    // previousページのURLを取得
    var previousPageUrl = responseData.paging.previous;

    // previousページのJSONデータを取得
    var previousPageResponse = UrlFetchApp.fetch(previousPageUrl);
    var previousPageData = JSON.parse(previousPageResponse.getContentText());

    // スプレッドシートに書き込む
    writeToSpreadsheet(previousPageData);

    // 各指標のデータを綺麗にログに出力
    var data = previousPageData.data;
    for (var i = 0; i < data.length; i++) {
      var metric = data[i];
      var name = metric.name;
      var values = metric.values;

      // titleに基づいてデータを分類し、それぞれの指標名ごとにログに出力（switch構文のため、titleのcase部分は完全一致させる必要あり。）
      switch (metric.title) {
        case 'インプレッション':
          Logger.log('インプレッション:');
          break;
        case 'リーチ':
          Logger.log('リーチ:');
          break;
        case 'プロフィールビュー':
          Logger.log('プロフィールビュー:');
          break;
        case 'ウェブサイトクリック':
          Logger.log('ウェブサイトクリック:');
          break;
        default:
          Logger.log('その他の指標:'); //キーワードが一致しないとこれが出ます(ex: WebサイトクリックではNG、ウェブサイトとtitleを完全一致させる必要があり)
          break;
      }
      
      for (var j = 0; j < values.length; j++) {
        var value = values[j];
        Logger.log('  Value: ' + value.value);
        Logger.log('  End Time: ' + value.end_time);
      }

      Logger.log('-----'); // 出力を整えるよう
    }
  }
}
