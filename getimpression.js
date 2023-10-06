function fetchInstagramInsightsForYesterday() {
    // アクセストークンとIGユーザーIDを設定
    var accessToken = ''; // ご自身のアクセストークンに置き換えてください
    var userId = ''; // ご自身のIGユーザーIDに置き換えてください
    
    // 取得したい指標を指定 (コンマ区切りで複数指定可能)
    var metrics = 'impressions,reach,profile_views'; 
    
    // 期間を指定 (前日の日付から前日の日付まで)
    var period = 'day'; // 期間はdayに設定します
    
    // 前日の日付を生成
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // 前日の日付を取得
    var sinceTimestamp = Math.floor(yesterday.getTime() / 1000); // 前日の日付をUnixタイムスタンプに変換
    var untilTimestamp = sinceTimestamp; // untilは同じ日付に設定
  
    // Instagram APIのエンドポイントを構築
    var apiUrl = 'https://graph.facebook.com/v18.0/' + userId + '/insights' +
                 '?metric=' + metrics +
                 '&period=' + period +
                 '&since=' + sinceTimestamp +
                 '&until=' + untilTimestamp +
                 '&access_token=' + accessToken;
  
    // Instagram APIにリクエストを送信
    var response = UrlFetchApp.fetch(apiUrl);
    var responseData = JSON.parse(response.getContentText());
  
    // レスポンスを綺麗に整形してログに出力
    var formattedResponse = JSON.stringify(responseData, null, 2); // 2はインデントのスペース数
    Logger.log(formattedResponse);
  
    // previousページがあるかどうかをチェック
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
  
        // titleに基づいてデータを分類し、それぞれの指標名ごとにログに出力
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
          default:
            Logger.log('その他の指標:');
            break;
        }
  
        for (var j = 0; j < values.length; j++) {
          var value = values[j];
          Logger.log('  Value: ' + value.value);
          Logger.log('  End Time: ' + value.end_time);
        }
  
        Logger.log('-----'); // 各指標の区切り
      }
    }
  }
  
